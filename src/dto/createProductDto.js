import CustomError from "../utils/errors/custom.error.js";


export class CreateProductDto {
  static baselog = 'CreateProductDto';
  constructor(name, description, price) {

    this.name = name;
    this.description = description;
    this.price = price;
  }

  static create({ name, description, price }) {
    if (!name || !description || !price) throw CustomError.badRequest('Missing name, description or price', this.baselog);
    if (typeof name !== 'string' || typeof description !== 'string' || typeof price !== 'number')
      throw CustomError.badRequest('Invalid data type for name, description or price', this.baselog);
    if (price < 0) throw CustomError.badRequest('Price must be a positive number', this.baselog);
    return new CreateProductDto(name, description, price);
  }
}