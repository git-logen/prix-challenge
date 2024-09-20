/**
 * Product Entity
 */

export class Product {

  id;
  name;
  description;
  price;
  userId;
  createdAt;
  updatedAt;

  static createEntity(product) {
    const newProduct = new Product();
    newProduct.id = product.id;
    newProduct.name = product.name;
    newProduct.description = product.description;
    newProduct.price = product.price;
    newProduct.userId = product.userId;
    newProduct.createdAt = new Date();
    newProduct.updatedAt = new Date();
    return newProduct;
  }
}
