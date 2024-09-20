import CustomError from "../utils/errors/custom.error.js";
import { validateUsername } from "../utils/validations/regex.js";


export class LoginUserDto {
  static baselog = "LoginUserDto";

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static create({ username, password }) {
    if (!username || !password) throw CustomError.badRequest("Missing username or password", this.baselog);
    if (typeof username !== "string" || typeof password !== "string") throw CustomError.badRequest("Invalid data type for username and password", this.baselog);

    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) throw CustomError.badRequest("Username must be between 3 and 20 characters", this.baselog);
    if (!validateUsername(trimmedUsername)) throw CustomError.badRequest("Invalid username", this.baselog);
    if (password.length < 8) throw CustomError.badRequest("Password must be at least 8 characters", this.baselog);

    return new LoginUserDto(trimmedUsername, password);
  }
}