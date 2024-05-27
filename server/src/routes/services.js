import { Router } from "express";
import servicesController from "../controllers/servicesController";

export default () => {
    const api = Router();

    // GET /songs/:slug
    api.get('/:typeName', servicesController.findByType);

    api.get('/options/:typeName', servicesController.findByTypeOption)

    // GET /songs
    api.get('/', servicesController.findAll);

    api.post('/', servicesController.create);

    // PUT /songs/:slug
    api.put('/:id', servicesController.update);

    // DELETE /songs/:slug
    api.delete('/:id', servicesController.remove);

    return api;
}