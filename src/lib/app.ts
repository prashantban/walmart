import express from "express";
import logger from "./util/logger";
import {Database} from "./data/database";
import {dbSchema} from "./data/dbSchema";

// Controllers (route handlers)
import orderController from "./controllers/order";
import itemController from "./controllers/item";
import userController from "./controllers/user";

// Create Express server
const app = express();

// Database
const db = new Database();
db.openDb(`./db/franklin.db`);

// Run Migrations
Promise.resolve()
    .then(() => db.exec({sql : dbSchema}))
    .then(() => {
        logger.info({"module": "Server", "details" : `DB Succesfully Opened`});
    })
    .catch((err) => {
        logger.error({"module": "Server", "message" : `Error`, details : err});
    });

// Express configuration
app.set("port", process.env.PORT || 3001);
app.use(express.json());

// Middleware to Log Out Every Request Coming to the System
app.use((req: express.Request, _res: express.Response, next: express.NextFunction) => {
    logger.info({"module": "App", message : `Got a request from ${req.hostname} at ${Date.now()}`});
    next();
});

// Error Middleware
app.use((err : any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error({"module": "App", message : `Got Error Serving the request`, details : err});
    // Send 500 for Now
    res.status(500).send({error: err});
});

/**
 * Primary app routes.
 */
app.use("/api/v1/orders/", orderController);
app.use("/api/v1/items/", itemController);
app.use("/api/v1/users/", userController);

export {
    app
}
