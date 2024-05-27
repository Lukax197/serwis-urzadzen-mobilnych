import { Router } from "express";
import repairOrdersController from "../controllers/repairOrdersController";
const authenticate = require('../middlewares/authenticate')

export default () => {
    const api = Router();

    api.get('/:id', authenticate, repairOrdersController.findOne);

    api.get('/', authenticate, repairOrdersController.findAll);

    api.get('/zgloszenia-uzytkownik/:id', repairOrdersController.findByUserId)

    api.post('/', repairOrdersController.create);

    api.get('/zgloszenia-count/:id', repairOrdersController.zleceniaCount)

    api.get('/zgloszenia-dochod/:id', repairOrdersController.zleceniaDochodSum)

    api.put('/dane-zgloszenia/:id', authenticate, repairOrdersController.updateDaneZgloszenia);

    api.put('/dokument-serwisowy/:id', authenticate, repairOrdersController.updateDokumentSerwisowy);

    api.put('/status-zgloszenia/:id', authenticate, repairOrdersController.updateStatusZgloszenia);

    api.put('/anulowanie-zgloszenia/:id', repairOrdersController.anulowanieZgloszenia)

    api.delete('/:id', authenticate, repairOrdersController.remove);

    return api;
}