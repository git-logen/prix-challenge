import CustomError from "../utils/errors/custom.error.js";
import { validateEmail, validateUsername } from "../utils/validations/regex.js";


export class UpdateUserDto {
  static baselog = "UpdateUserDto";

  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  static create({ username, email }) {
    if (!username || !email) throw CustomError.badRequest("Missing username, or email", this.baselog);
    if (typeof username !== "string" || typeof email !== "string") throw CustomError.badRequest("Invalid data type for username, or email", this.baselog);
    if (!validateEmail(email)) throw CustomError.badRequest("Invalid email", this.baselog);

    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) throw CustomError.badRequest("Username must be between 3 and 20 characters", this.baselog);
    if (!validateUsername(trimmedUsername)) throw CustomError.badRequest("Invalid username", this.baselog);

    return new UpdateUserDto(trimmedUsername, email);
  }
}