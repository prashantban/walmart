import sqlite3 from 'sqlite3';
import logger from "../util/logger";
const _module = "data/Database";

export class Database {

    private static _instance:Database = new Database();
    private static db : sqlite3.Database;

    constructor() {
        if(Database._instance){
            return Database._instance;
        };
        Database._instance = this;
    }

    public static getInstance() : Database {
        return Database._instance;
    }

    public openDb (dbFilePath : string) {
        Database.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                logger.error({module : _module, message : "Failed to Connect", details: err});
            } else {
                logger.info({module : _module, message : "Connected to DB"});
            }
        })
    }

    public exec ({sql} : {sql : string}) : Promise<boolean> {
        logger.info({module : _module, message : `Executing ${sql}`});
        return new Promise<boolean>((resolve) => {
            Database.db.exec(sql, (err) =>  {
                if (err){
                    logger.error({module : _module, message : `${sql} didnt work`, details: err});
                    throw err;
                }
                logger.info({module : _module, message : `${sql} worked`});
                resolve(true);
            });
        })
    };

    public run ({sql, params = []} : {sql : string, params ?: Array<string>}) : Promise<any>{
        return new Promise<any>((resolve, reject) => {
            Database.db.run(sql, params, function (err) {
                if (err) {
                    logger.error({module : _module, message : "Error Running SQL", details: err});
                    reject(err)
                } else {
                    logger.debug({module : _module, message : "Query Ran Succesfully", details: `${sql} with param ${params}`});
                    resolve({ id: this.lastID })
                }
            })
        })
    }

    public get({sql, params = []} : {sql : string, params ?: Array<string>}) {
        return new Promise((resolve, reject) => {
            Database.db.get(sql, params, (err, result) => {
                if (err) {
                    logger.error({module : _module, message : "Error Running SQL", details: err});
                    reject(err);
                } else {
                    resolve(result)
                }
            })
        })
    }

    public all({sql, params = []} : {sql : string, params ?: Array<string>}) {
        return new Promise((resolve, reject) => {
            Database.db.all(sql, params, (err, rows) => {
                if (err) {
                    logger.error({module : _module, message : "Error Running SQL", details: err});
                    reject(err);
                } else {
                    resolve(rows)
                }
            })
        })
    }
}
