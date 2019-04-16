import {Database} from "../data/database";
import {user} from "../types/user";

export class Users {

    constructor () {}

    getAllUsers () {
        return Database.getInstance().all({ sql : "SELECT * FROM users"});
    }

    getUser (user_id : any) {
        return Database.getInstance().get({ sql : "SELECT * from users where id = ?", params : [user_id]});
    }

    updateUser (user_id : any, name : string) {
        return Database.getInstance().get({ sql : "UPDATE users SET name = ? WHERE id = ?", params : [name, user_id]});
    }

    deleteUser (user_id : any) {
        return Database.getInstance().run({ sql : "DELETE FROM users WHERE id = ?", params : [user_id]});
    }

    createNewUser (user : user) {
        return Database.getInstance().run({ sql : "INSERT INTO users (name) VALUES (?)", params : [user.name]})
    }
}