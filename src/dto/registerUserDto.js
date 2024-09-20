import CustomError from "../utils/errors/custom.error.js";
import { validateEmail, validateUsername } from "../utils/validations/regex.js";


export class RegisterUserDto {
  static baselog = "RegisterUserDto";

  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  static create({ username, password, email }) {
    if (!username || !password || !email) throw CustomError.badRequest("Missing username, password or email", this.baselog);
    if (typeof username !== "string" || typeof password !== "string" || typeof email !== "string") throw CustomError.badRequest("Invalid data type for username, password or email", this.baselog);
    if (!validateEmail(email)) throw CustomError.badRequest("Invalid email", this.baselog);

    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) throw CustomError.badRequest("Username must be between 3 and 20 characters", this.baselog);
    if (!validateUsername(trimmedUsername)) throw CustomError.badRequest("Invalid username", this.baselog);
    if (password.length < 8) throw CustomError.badRequest("Password must be at least 8 characters", this.baselog);

    return new RegisterUserDto(trimmedUsername, password, email);
  }
}