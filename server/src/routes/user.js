import { Router } from "express";
import userController from "../controllers/userController";
const authenticate = require('../middlewares/authenticate')

export default () => {
    const api = Router();

    api.get('/:id', userController.findOne);

    api.get('/', userController.findAll);

    api.get('/dane-osobowe/:username', userController.getUserDaneOsobowe);

    api.post('/', userController.create);

    api.put('/:id', userController.update);

    api.delete('/:id', userController.remove);

    api.get('/count/:id', userController.userCount);

    return api;
}