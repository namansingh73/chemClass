const AppError = require('./../utils/appError');
const capitalize = require('../utils/capitalize.js');

const handleDuplicateFieldsDB = (err) => {
  const value = capitalize(Object.keys(err.keyValue)[0]);

  const message = `${value} already exists. Please use another ${value}!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(
    (el) =>
      (el?.name === 'CastError' && `${capitalize(el.path)} is not valid.`) ||
      el.message
  );

  const message = errors.filter(Boolean).join('\n') || 'Something went wrong!';
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Please log in again!', 401);

const handleJWTExpiredError = () => new AppError('Please log in again.', 401);

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      if (process.env.NODE_ENV === 'production') {
        return res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
        });
      } else {
        return res.status(err.statusCode).json({
          status: err.status,
          message: err.message,
          errorOnlyInDev: err,
        });
      }
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.code === 11000) err = handleDuplicateFieldsDB(err);
  if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
  if (err.name === 'JsonWebTokenError') err = handleJWTError();
  if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();

  sendErrorProd(err, req, res);
};
