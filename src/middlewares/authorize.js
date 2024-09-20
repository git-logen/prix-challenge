import DBWrapper from "../config/database/databaseWrapper.js";
import CustomError from "../utils/errors/custom.error.js";
import { ProductQueries } from "../utils/queries/index.js";
import { getUserFromToken } from "../utils/validations/getUserFromToken.js";


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * This middleware checks if the user is authenticated and if the provided token is valid
 * Also, it saves the user(requestUser) in the request object for future use throughout the app
 */


export const authorize = async (req, res, next) => {
  const baselog = 'authorize';

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw CustomError.unauthorized('Token no provided', baselog);

    const [baerer, token] = authHeader.split(' ');
    if (baerer !== 'Bearer' || !token) throw CustomError.unauthorized('Malformed token', baselog);

    const userFromToken = await getUserFromToken(token);
    console.log("🚀 ~ authorize ~ userFromToken:", userFromToken)
    req.requestUser = userFromToken;

    next();
  } catch (error) {
    next(error)
  }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * This middleware checks if the user making the request is the owner of the requested resource.
 */

export const userOwnResources = async (req, res, next) => {
  const baselog = 'userOwnResources';
  console.log(`${baselog}: Checking if user ${req.requestUser.id} owns resource ${req.params.id}`);

  try {
    if (!req.requestUser) throw CustomError.notFound('User not found', baselog);
    const productId = req.params.id

    const product = await DBWrapper.get(ProductQueries.getProductById, [productId]);
    if (!product) throw CustomError.notFound('Product not found', baselog);
    console.log("🚀 ~ userOwnResources ~ product:", product)

    if (product.userId !== req.requestUser.id) throw CustomError.forbidden('User not allowed', baselog);

    next();
  } catch (error) {
    next(error)
  }
}