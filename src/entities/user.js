/**
 * User Entity
 */

export class User {

  id;
  username;
  password;
  email;
  createdAt;
  updatedAt;

  static createEntity(user) {
    const newUser = new User();
    newUser.id = user.id;
    newUser.username = user.username;
    newUser.password = user.password;
    newUser.email = user.email;
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    return newUser;
  }
}