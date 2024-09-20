import { DB } from './sqlite.connector.js';

/**
 * 
 * @param {string} sql
 * @param {array} params
 * 
 * This wrapper is used to convert the database methods into promises, so we can use them in async functions.
 * This is because sqlite3 is based on callbacks and not on promises
 * 
 */

export const DBWrapper = {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      DB.run(sql, params, function (err) {
        if (err) {
          console.error("Error in run:", sql, "with params:", params, "Error:", err);
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            changes: this.changes
          });
        }
      });
    });
  },

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      DB.get(sql, params, (err, result) => {
        if (err) {
          console.error("Error in get:", sql, "with params:", params, "Error:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      DB.all(sql, params, (err, rows) => {
        if (err) {
          console.error("Error in all:", sql, "with params:", params, "Error:", err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
};

export default DBWrapper;