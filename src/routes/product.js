import { Router } from "express";
import { ProductController } from "../controllers/product.js";
import { authorize, userOwnResources } from "../middlewares/authorize.js";

const controller = new ProductController();

export class ProductRoutes {
  static get routes() {
    const router = Router();

    router.post('/', authorize ,controller.create);
    router.get('/', authorize ,controller.get);
    router.put('/:id', [authorize, userOwnResources] ,controller.update);
    router.delete('/:id', [authorize, userOwnResources] ,controller.delete);

    return router;
  }
}