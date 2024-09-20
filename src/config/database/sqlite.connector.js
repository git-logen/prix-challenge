import sqlite3 from 'sqlite3';
import { ProductQueries, UserQueries } from '../../utils/queries/index.js';
import { PRODUCTS_TABLE, USERS_TABLE } from '../../utils/constants/tables.js';
import CustomError from '../../utils/errors/custom.error.js';

const sql3 = sqlite3.verbose();
const databaseFile = './src/database.db'
export const DB = new sql3.Database(databaseFile, connected);

DB.run(UserQueries.createUserTable, createdTable(USERS_TABLE));
DB.run(ProductQueries.createProductTable, createdTable(PRODUCTS_TABLE));



function connected(err) {
  const baselog = 'sqlite.connector';
  if (err) throw CustomError.internalServerError(err.message, baselog);
  console.log('Connected to the SQLite database.');
}

function createdTable(tableName) {
  const baselog = 'sqlite.createdTable';
  return function (err) {
    const baselog = 'sqlite.createdTable';

    if (err) throw CustomError.internalServerError(`Error creating ${tableName} table`, baselog);
    console.log(`${tableName} table created successfully`);
  };
}