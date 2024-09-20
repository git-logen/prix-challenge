import jwt from 'jsonwebtoken';
import CustomError from '../errors/custom.error.js';

const JWT_SEED = process.env.JWT_SECRET_KEY;

export const generateToken = (payload, expiresIn = '2d') => {
  const baselog = 'generateToken';
  try {
    return jwt.sign(payload, JWT_SEED, { expiresIn });
  } catch (error) {
    throw CustomError.internalServerError('Error generating token', baselog);
  }
};


export const validateToken = (token) => {
  const baselog = 'validateToken';
  try {
    return jwt.verify(token, JWT_SEED);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw CustomError.unauthorized('Token expired', baselog);
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw CustomError.unauthorized('Invalid token', baselog);
    } else {
      throw CustomError.internalServerError('Error validating token', baselog);
    }
  }
};