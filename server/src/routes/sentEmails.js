import { Router } from "express";
import sentEmailsController from "../controllers/sentEmailsController";

export default () => {
    const api = Router();

    api.get('/', sentEmailsController.findAll);

    api.post('/sendEmail', sentEmailsController.sendEmail);

    api.get('/wiadomosci/:adresat', sentEmailsController.findAllByEmail);

    api.get('/powiadomienia/:adresat', sentEmailsController.findAllByEmailAndType);

    return api;
}