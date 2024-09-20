import { Router } from "express";
import { UserController } from "../controllers/user.js";
import { authorize } from "../middlewares/authorize.js";

const controller = new UserController();

export class UserRoutes {
  static get routes() {
    const router = Router();

    router.get('/', authorize, controller.get);
    router.put('/:id', authorize, controller.update);
    router.delete('/:id', authorize, controller.delete);
    return router;
  }
}