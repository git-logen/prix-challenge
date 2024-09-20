import { Router } from "express";
import { UserController } from "../controllers/user.js";

const controller = new UserController();

export class AuthRoutes {
  static get routes() {
    const router = Router();

    router.post('/register', controller.register);
    router.post('/login', controller.login);
    return router;
  }
}