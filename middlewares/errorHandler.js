const InternalServer = require('../respons/responsStatus');

const errorHandler = (err, req, res, next) => {
  const { statusCode = InternalServer, message } = err;

  res.status(statusCode).send({
    message: statusCode === InternalServer
      ? 'На сервере произошла ошибка.'
      : message,
  });
  next();
};

module.exports = errorHandler;
