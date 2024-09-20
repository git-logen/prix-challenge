import DBWrapper from "../../config/database/databaseWrapper.js";
import { validateToken } from "../adapters/jwt.adapters.js";
import CustomError from "../errors/custom.error.js";
import { UserQueries } from "../queries/index.js";


/**
 * Get user from his token
 * @param {*} token
 */


export const getUserFromToken = async token => {
  const baselog = '[authorize].[getUserFromToken]';
  try {
    const payload = validateToken(token);
    console.log("🚀 ~ getUserFromToken ~ payload:", payload)
    if (!payload || !payload.id) throw CustomError.unauthorized('Invalid token payload', baselog);

    const user = await DBWrapper.get(UserQueries.getUserById, [payload.id]);
    if (!user) throw CustomError.notFound(`User whit id ${payload.id}  not found in database`, baselog);

    return user;
  } catch (error) {
    throw error
  }
}

