import { Router } from "express";
import devicesController from "../controllers/devicesController";

export default () => {
    const api = Router();

    api.get('/', devicesController.findAll);

    api.get('/urzadzenia-count', devicesController.findAllWithCount)

    api.post('/', devicesController.create);

    api.delete('/:id', devicesController.remove);

    api.get('/:id', devicesController.findOne);

    api.put('/:id', devicesController.update);

    return api;
}