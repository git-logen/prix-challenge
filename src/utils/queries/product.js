import { PRODUCTS_TABLE } from "../constants/tables.js";

export const createProductTable  =  `CREATE TABLE IF NOT EXISTS ${PRODUCTS_TABLE} (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    description TEXT,
    price REAL,
    userId INTEGER,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
)`;

export const add = `INSERT INTO ${PRODUCTS_TABLE} (name, description, price, userId) VALUES (?, ?, ?, ?);`;

export const getProductsByUserId = `SELECT * FROM ${PRODUCTS_TABLE} WHERE userId = ?;`;

export const getProductById = `SELECT * FROM ${PRODUCTS_TABLE} WHERE id = ?;`;

export const update = `UPDATE ${PRODUCTS_TABLE} SET name = ?, description = ?, price = ? WHERE id = ?;`;

export const deleteProduct = `DELETE FROM ${PRODUCTS_TABLE} WHERE id = ?;`;