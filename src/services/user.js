import DBWrapper from "../config/database/databaseWrapper.js";
import { GetUserDto } from "../dto/index.js";
import { comparePassword, hashPassword } from "../utils/adapters/bcrypt.adapter.js";
import { generateToken } from "../utils/adapters/jwt.adapters.js";
import CustomError from "../utils/errors/custom.error.js";
import { UserQueries } from "../utils/queries/index.js";



export class UserService {


  async register(userData) {
    const baselog = "UserService.register";

    try {

      // verify if user already exists
      const existingUser = await DBWrapper.get(UserQueries.getUserByEmail, [userData.email]);
      if (existingUser) throw CustomError.conflict("User already exist", baselog);

      // hash password
      const hashedPassword = await hashPassword(userData.password);

      // create new user in database
      const { username, email } = userData
      await DBWrapper.run(UserQueries.add, [username, hashedPassword, email]);

      return true;
    } catch (error) {
      throw error
    }
  }

  async login(userData) {
    const baselog = "UserService.login";
    
    try {

      // verify if user exists in database
      const existingUser = await DBWrapper.get(UserQueries.getUserByUsername, [userData.username]);

      if (!existingUser) throw CustomError.notFound("User not found, please register", baselog);

      // compare passwords
      const passwordMatch = await comparePassword(userData.password, existingUser.password);
      if (!passwordMatch) throw CustomError.unauthorized("Invalid credentials", baselog);

      const token = generateToken({ id: existingUser.id });
      if (!token) throw CustomError.internalServerError("Error generating token", baselog);

      return token;
    } catch (error) {
      throw error
    }
  }

  async get() {
    const baselog = "UserService.get";

    try {
      const users = await DBWrapper.all(UserQueries.getAllUsers)
      if (users.length === 0) throw CustomError.notFound('No users found', baselog);
      const usersDto = GetUserDto.fromUsers(users)
      return usersDto;
    } catch (error) {
      throw error
    }
  }

  async update(userData, id) {
    const baselog = "UserService.update";

    try {
      // verify if user exists in database
      const existingUser = await DBWrapper.get(UserQueries.getUserById, [id]);
      if (!existingUser) throw CustomError.notFound("User not found", baselog);

      // update user in database
      const { username, email } = userData
      const result = await DBWrapper.run(UserQueries.update, [username, email, id]);

      return result;
    } catch (error) {
      throw error
    }
  }

  async delete(id) {
    const baselog = "UserService.delete";

    try {
      // verify if user exists in database
      const existingUser = await DBWrapper.get(UserQueries.getUserById, [id]);
      if (!existingUser) throw CustomError.notFound("User not found", baselog);

      // delete user in database
      const result = await DBWrapper.run(UserQueries.deleteUser, [id]);
      console.log("🚀 ~ UserService ~ delete ~ result:", result)
      return result;
    } catch (error) {
      throw error
    }
  }
}