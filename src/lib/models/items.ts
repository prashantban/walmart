import {Database} from "../data/database";
import {item} from "../types/item";

export class Items {

    constructor () {}

    getAllItemsByOrder (order_id : any) {
        return Database.getInstance().all({ sql : "SELECT i.id, i.name, o.order_id FROM items i INNER JOIN order_items o ON o.item_id = i.id AND o.order_id = ?", params : [order_id]});
    }

    getAllItems () {
        return Database.getInstance().all({ sql : "SELECT * FROM items"});
    }

    getItem (item_id : any) {
        return Database.getInstance().get({ sql : "SELECT * FROM items where items.id = ?", params : [item_id]});
    }

    updateItem (item_id : any, name : string) {
        return Database.getInstance().get({ sql : "UPDATE items SET name = ? WHERE id = ?", params : [name, item_id]});
    }

    deleteItem (item_id : any) {
        return Database.getInstance().run({ sql : "DELETE FROM items WHERE id = ?", params : [item_id]});
    }

    createNewItem (item : item) {
        return Database.getInstance().run({ sql : "INSERT INTO items (name) VALUES (?)", params : [item.name]})
    }
}