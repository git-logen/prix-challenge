import { LoginUserDto, RegisterUserDto, UpdateUserDto } from "../dto/index.js";
import { UserService } from "../services/user.js";
import CustomError from "../utils/errors/custom.error.js";

const userService = new UserService();

export class UserController {
  async register(req, res, next) {
    try {
      const registerUserDto = RegisterUserDto.create(req.body);
      await userService.register(registerUserDto);

      res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {

    try {
      const loginUserDto = LoginUserDto.create(req.body);
      const result = await userService.login(loginUserDto);

      res.status(200).json({ token: result });
    } catch (error) {
      next(error)
    }
  }

  async get(req, res, next) {
    try {
      const result = await userService.get();
      res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    const baselog = 'UserController.update';
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest("Missing id", baselog);
      const updateUserDto = UpdateUserDto.create(req.body);
      await userService.update(updateUserDto, id);

      res.status(200).json({ message: 'Usuario actualizado con éxito.' });
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    const baselog = 'UserController.delete';
    try {
      const id = req.params.id;
      if (!id) throw CustomError.badRequest("Missing id", baselog);
      
      await userService.delete(id);
      res.status(200).json({ message: 'Usuario eliminado con éxito.' });
    } catch (error) {
      next(error)
    }
  }
}