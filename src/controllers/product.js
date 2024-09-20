import { CreateProductDto } from "../dto/index.js";
import { ProductServices } from "../services/product.js";
import CustomError from "../utils/errors/custom.error.js";

const productService = new ProductServices();

export class ProductController {

  async create(req, res, next) {
    try {
      const userId = req.requestUser.id
      const createProductDto = CreateProductDto.create(req.body);
      const product = await productService.create(createProductDto, userId);

      res.status(201).json({ message: 'Producto creado con éxito', productId: product.id });
    } catch (error) {
      next(error)
    }
  }

  async get(req, res, next) {
    try {
      const userId = req.requestUser.id
      const result = await productService.get(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    const baselog = 'ProductController.update';
    try {
      const productId = req.params.id;
      if(!productId) throw CustomError.badRequest('Missing id', baselog);
      const updateProductDto = CreateProductDto.create(req.body); // You can use the same user creation dto
      await productService.update(updateProductDto, productId);

      res.status(200).json({ message: 'Producto actualizado con éxito' });
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    const baselog = 'ProductController.delete';
    try {
      const productId = req.params.id;
      if(!productId) throw CustomError.badRequest('Missing id', baselog);
      await productService.delete(productId);
      res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
      next(error)
    }
  }
}