import {Database} from "../data/database";
import {order} from "../types/order";
import {item} from "../types/item";

export class Orders {

    constructor () {}

    getAllOrders () {
        return Database.getInstance().all({ sql : "SELECT o.id, u.name, u.id as user_id from orders o INNER JOIN users u on u.id = o.user_id"});
    }

    getOrder (order_id : any) {
        return Database.getInstance().get({ sql : "SELECT o.id, u.name, u.id as user_id from orders o INNER JOIN users u on u.id = o.user_id where o.id = ?", params : [order_id]});
    }

    updateOrder (user_id : any, order_id : any) {
        return Database.getInstance().get({ sql : "UPDATE orders SET user_id = ? WHERE id = ?", params : [user_id, order_id]});
    }

    deleteOrder (order_id : any) {
        return Database.getInstance().run({ sql : "DELETE FROM orders WHERE id = ?", params : [order_id]});
    }

    createNewOrder (order : order) {
        return Database.getInstance().run({ sql : "INSERT INTO orders (user_id) VALUES (?)", params : [order.user_id as any]})
            .then(data => {
                let sql = "INSERT INTO order_items (order_id, item_id) VALUES ";
                order.items.forEach((item, index) => {
                    sql += `(${data.id}, ${item.id})`
                    if (index != order.items.length - 1) {
                        sql += ',';
                    }
                    else sql += ';';
                });
                return Database.getInstance().exec({sql})
                    .then(_res => data.id)
            })
    }

    updateOrderItems (order_id : any, items : Array<item>) {
        let sql = "INSERT INTO order_items (order_id, item_id) VALUES ";
        items.forEach((item, index) => {
            sql += `(${order_id}, ${item.id})`
            if (index != items.length - 1) {
                sql += ',';
            }
            else sql += ';';
        });
        return Database.getInstance().exec({sql})
            .then(_res => order_id)
    }

    deleteItemByOrderAndItem (order_id : any, item_id : any) {
        return Database.getInstance().run({ sql : "DELETE FROM order_items WHERE order_id = ? AND item_id = ?", params : [order_id, item_id]});
    }

    deleteItemByOrder (order_id : any) {
        return Database.getInstance().run({ sql : "DELETE FROM order_items WHERE order_id = ? ", params : [order_id]});
    }
}