import { USERS_TABLE } from "../constants/tables.js";



export const createUserTable = `CREATE TABLE IF NOT EXISTS ${USERS_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT UNIQUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`;

export const add = `INSERT INTO ${USERS_TABLE} (username, password, email) VALUES (?, ?, ?);`;

export const getUserByEmail = `SELECT * FROM ${USERS_TABLE} WHERE email = ?;`;

export const getUserByUsername = `SELECT * FROM ${USERS_TABLE} WHERE username = ?;`;

export const getUserById = `SELECT * FROM ${USERS_TABLE} WHERE id = ?;`;

export const getAllUsers = `SELECT * FROM ${USERS_TABLE};`;

export const update = `UPDATE ${USERS_TABLE} SET username = ?, email = ? WHERE id = ?;`;

export const deleteUser = `DELETE FROM ${USERS_TABLE} WHERE id = ?;`;

