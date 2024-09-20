import CustomError from "../utils/errors/custom.error.js";

/**
 * This DTO converts an array of products into an array of product dto
 * Is for only return the properties that the challenge requires and to make some validations
 * @param {*} products 
 */



export class GetProductsDto {
  static baselog = "GetProductsDto";

  constructor(id, name, description, price, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromProduct(product) {
    if (!product || typeof product !== 'object') {
      throw CustomError.badRequest("Invalid product data", this.baselog);
    }

    if ( !product.id || !product.name || !product.description || !product.price || !product.createdAt || !product.updatedAt) {
      throw CustomError.badRequest("Missing required product properties", this.baselog);
    }

    return new GetProductsDto(
      product.id,
      product.name,
      product.description,
      product.price, 
      product.createdAt, // could convert to Date object instead --> using new Date(product.createdAt), but the challenge expects a string
      product.updatedAt
    );
  }

  static fromProducts(products) {
    if (!Array.isArray(products)) {
      throw CustomError.badRequest("Invalid products data", this.baselog);
    }

    return products.map(product => GetProductsDto.fromProduct(product));
  }
}