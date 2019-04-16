import express from "express";
import logger from "../util/logger";
import {Items} from "../models/items";
import {item} from "../types/item";
const router = express.Router();

const _module = "controllers/api";
const itemModel = new Items();

/**
 * Define Home page route
 * Not using this here though
 */
router.get('/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).send({error: 'Bad Request, No Item ID Passed'})
        }
        const item = await itemModel.getItem(req.params.id);
        logger.info({module : _module, message : `Got the Item, returning`});
        res.send(item);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        let items;
        if (req.query.order_id) {
            logger.info({module : _module, message : `Got All Items By Order ID - ${req.query.order_id}`});
            items = await itemModel.getAllItemsByOrder(req.query.order_id);
        }
        else items = await itemModel.getAllItems();
        logger.info({module : _module, message : `Got All Items, returning`});
        res.send(items);
    } catch (err) {
        next(err);
    }
});


router.post('/', async (req, res, next) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({error: 'Item must have a name associated with it'})
        }

        const itemDetails : item = {
            name : req.body.name
        };

        const createItem = await itemModel.createNewItem(itemDetails);
        logger.info({module : _module, message : `Created the Item, returning`});
        res.send(createItem);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        if (!req.params.id || !req.body.name) {
            return res.status(400).send({error: 'Bad Request'})
        }

        const items = await itemModel.updateItem(req.params.id, req.body.name);
        logger.info({module : _module, message : `Updated the Item, returning`});
        res.send(items);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).send({error: 'Bad Request, No Item ID Passed'})
        }
        const items = await itemModel.deleteItem(req.params.id);
        logger.info({module : _module, message : `Item Deleted, returning`});
        res.send(items);
    } catch (err) {
        next(err);
    }
});

export default router;
