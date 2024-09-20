import CustomError from '../utils/errors/custom.error.js';
import sqlite3 from 'sqlite3';

export const errorHandler = (err, req, res, next) => {
  console.error('Error caught in middleware:', err);

  // Handling custom errors (CustomError)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: err.message,
      baselog: err.baselog
    });
  }

  // Handling SQLite3 errors
  if (err.code === 'SQLITE_CONSTRAINT') {
    console.error('SQLite Error:', err.message);
    return res.status(409).json({
      error: 'Database constraint error',
      details: err.message
    });
  }

  // Handling other errors
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected error occurred';
  const baselog = err.baselog || 'UnknownError';

  res.status(statusCode).json({
    error: message,
    baselog: baselog
  });
};

export default errorHandler;