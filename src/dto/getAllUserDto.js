import CustomError from "../utils/errors/custom.error.js";

/**
 * This DTO converts an array of users into an array of user dto
 * Is for only return the properties that the challenge requires and to make some validations
 * @param {*} users 
 */



export class GetUserDto {
  static baselog = "GetUserDto";

  constructor(id, username, email, createdAt, updatedAt) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromUser(user) {
    if (!user || typeof user !== 'object') {
      throw CustomError.badRequest("Invalid user data", this.baselog);
    }

    if (!user.id || !user.username || !user.email || !user.createdAt || !user.updatedAt) {
      throw CustomError.badRequest("Missing required user properties", this.baselog);
    }

    return new GetUserDto(
      user.id,
      user.username,
      user.email,
      user.createdAt, // could convert to Date object instead --> using new Date(user.createdAt), but the challenge expects a string
      user.updatedAt
    );
  }

  static fromUsers(users) {
    if (!Array.isArray(users)) {
      throw CustomError.badRequest("Invalid users data", this.baselog);
    }

    return users.map(user => GetUserDto.fromUser(user));
  }
}