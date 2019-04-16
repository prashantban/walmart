import express from "express";
import logger from "../util/logger";
import {Users} from "../models/users";
import {user} from "../types/user";
const router = express.Router();

const _module = "controllers/user";
const userModel = new Users();

/**
 * Get User By ID
 */
router.get('/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).send({error: 'Bad Request, No User ID Passed'})
        }
        const user = await userModel.getUser(req.params.id);
        logger.info({module : _module, message : `Got the User, returning`});
        res.send(user);
    } catch (err) {
        next(err);
    }
});


/**
 * Get All Users
 */
router.get('/', async (_req, res, next) => {
    try {
        const users = await userModel.getAllUsers();
        logger.info({module : _module, message : `Got All Users, returning`});
        res.send(users);
    } catch (err) {
        next(err);
    }
});

/**
 * Create a New User
 */
router.post('/', async (req, res, next) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({error: 'User must have a name associated with it'})
        }

        const userDetails : user = {
            name : req.body.name
        };

        const createUser = await userModel.createNewUser(userDetails);
        logger.info({module : _module, message : `Created the User, returning`});
        res.send(createUser);
    } catch (err) {
        next(err);
    }
});

/**
 * Update User By ID
 */
router.put('/:id', async (req, res, next) => {
    try {
        if (!req.params.id || !req.body.name) {
            return res.status(400).send({error: 'Bad Request'})
        }

        const user = await userModel.updateUser(req.params.id, req.body.name);
        logger.info({module : _module, message : `Updated the User, returning`});
        res.send(user);
    } catch (err) {
        next(err);
    }
});

/**
 * Delete A Single User By ID
 * Also, Delete all the Foreign Key Records
 */
router.delete('/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            return res.status(400).send({error: 'Bad Request, No User ID Passed'})
        }
        const user = await userModel.deleteUser(req.params.id);
        logger.info({module : _module, message : `User Deleted, returning`});
        res.send(user);
    } catch (err) {
        next(err);
    }
});

export default router;
