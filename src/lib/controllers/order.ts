import express from "express";
import {Orders} from "../models/orders";
import logger from "../util/logger";
import {order} from "../types/order";
const router = express.Router();

const _module = "controllers/api";
const orderModel = new Orders();

/**
 * Define Home page route
 * Not using this here though
 */
router.get('/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).send({error: 'Bad Request, No Order ID Passed'})
        }
        const orders = await orderModel.getOrder(req.params.id);
        logger.info({module : _module, message : `Got the Order, returning`});
        res.send(orders);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (_req, res, next) => {
    try {
        const orders = await orderModel.getAllOrders();
        logger.info({module : _module, message : `Got All Orders, returning`});
        res.send(orders);
    } catch (err) {
        next(err);
    }
});


router.post('/', async (req, res, next) => {
    logger.info({module : _module, message : `Got Request`, details : req.body});
    try {
        if (!req.body.user_id && req.body.user_id !== 0) {
            return res.status(400).send({error: 'Order must have a user associated with it'})
        }

        if (!req.body.items || !req.body.items.length) {
            return res.status(400).send({error: 'Order request body must contain items'})
        }

        const orderDetails : order = {
            user_id : req.body.user_id,
            items : req.body.items
        };

        const createOrder = await orderModel.createNewOrder(orderDetails);
        logger.info({module : _module, message : `Created the order, returning`});
        res.send({order_id : createOrder});
    } catch (err) {
        next(err);
    }
});

router.post('/:order_id/items', async (req, res, next) => {
    logger.info({module : _module, message : `Got Request to Update Items In Request`, details : req.body});
    try {
        if (!req.body.items || !req.body.items.length) {
            return res.status(400).send({error: 'Order request body must contain items'})
        }

        const createOrder = await orderModel.updateOrderItems(req.params.order_id, req.body.items);
        logger.info({module : _module, message : `Created the order, returning`});
        res.send({order_id : createOrder});
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).send({error: 'Bad Request, No Order ID Passed'})
        }

        if (!req.body.user_id && req.body.user_id !== 0) {
            return res.status(400).send({error: 'Order must have a user associated with it'})
        }

        const orders = await orderModel.updateOrder(req.body.user_id, req.params.id);
        logger.info({module : _module, message : `Updated the order, returning`});
        res.send(orders);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).send({error: 'Bad Request, No Order ID Passed'})
        }
        const delItemRecords = await orderModel.deleteItemByOrder(req.params.id);
        const orders = await orderModel.deleteOrder(req.params.id);
        logger.info({module : _module, message : `Order Deleted, returning`, details : delItemRecords});
        res.send(orders);
    } catch (err) {
        next(err);
    }
});

router.delete('/:order_id/items/:item_id', async (req, res, next) => {
    try {
        if (!req.params.order_id && !req.params.item_id) {
            return res.status(400).send({error: 'Bad Request, No IDS Passed'})
        }
        const orders = await orderModel.deleteItemByOrderAndItem(req.params.order_id, req.params.item_id);
        logger.info({module : _module, message : `Order Item Deleted, returning`});
        res.send(orders);
    } catch (err) {
        next(err);
    }
});

export default router;
