import ApplicationError from "./application.error.js";

/**
 * 
 * @param {string} message
 * @param {number} statusCode
 * @param {string} baselog
 * 
 */


export default class CustomError extends ApplicationError {
  constructor(message, statusCode, baselog) {
    super(message);
    this.statusCode = statusCode;
    this.baselog = baselog;
  }

  static badRequest(message, baselog) {
    return new CustomError(message, 400, baselog);
  }

  static unauthorized(message, baselog) {
    return new CustomError(message, 401, baselog);
  }

  static forbidden(message, baselog) {
    return new CustomError(message, 403, baselog);
  }

  static notFound(message, baselog) {
    return new CustomError(message, 404, baselog);
  }

  static conflict(message, baselog) {
    return new CustomError(message, 409, baselog);
  }

  static internalServerError(message, baselog) {
    return new CustomError(message, 500, baselog);
  }

  // TODO: probar esto, sino quitarlo

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        statusCode: this.statusCode,
        baselog: this.baselog
      }
    };
  }

}