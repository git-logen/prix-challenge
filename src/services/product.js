import DBWrapper from "../config/database/databaseWrapper.js";
import { GetProductsDto } from "../dto/index.js";
import CustomError from "../utils/errors/custom.error.js";
import { ProductQueries } from "../utils/queries/index.js";




export class ProductServices {

  async create(product, userId) {
    const baselog = 'ProductServices.create';

    try {
      const result = await DBWrapper.run(ProductQueries.add, [product.name, product.description, product.price, userId]);
      if (result.changes === 0) throw CustomError.badRequest('Product could not be created', baselog);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async get(userId) {
    const baselog = 'ProductServices.get';
    try {
      const products = await DBWrapper.all(ProductQueries.getProductsByUserId, [userId]);
      if (products.length === 0) throw CustomError.notFound('No products found', baselog);
      const result = GetProductsDto.fromProducts(products);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(product, productId) {
    const baselog = 'ProductServices.update';
    try {
      const result = await DBWrapper.run(ProductQueries.update, [product.name, product.description, product.price, productId]);
      if (result.changes === 0) throw CustomError.badRequest('Product could not be updated', baselog);
      return result;

    }
    catch (error) {
      throw error;
    }
  }

  async delete(productId) {
    const baselog = 'ProductServices.delete';
    try {
      const result = await DBWrapper.run(ProductQueries.deleteProduct, [productId]);
      if (result.changes === 0) throw CustomError.badRequest('Product could not be deleted', baselog);
      return result;
    }
    catch (error) {
      throw error;
    }
  } 
}