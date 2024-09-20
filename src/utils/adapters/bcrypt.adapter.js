import { genSalt, hash, compare } from 'bcrypt';
import CustomError from '../errors/custom.error.js';

const saltRounds = 10;

export const hashPassword = async (password) => {
  const baselog = 'hashPassword';
  try {
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw CustomError.internalServerError('Error hashing the password', baselog);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  const baselog = 'comparePassword';
  try {
    return await compare(password, hashedPassword);
  } catch (error) {
    throw CustomError.internalServerError('Error comparing passwords', baselog);
  }
};
