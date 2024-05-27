import { Router } from "express";
import AuthController from "../controllers/authController";

export default () => {
    const api = Router()

    api.post('/login', AuthController.login)

    api.post('/register', AuthController.register)

    api.get('/refresh', AuthController.refresh)

    api.get('/logout', AuthController.logout)

    return api
}