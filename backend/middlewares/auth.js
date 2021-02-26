const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/index');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    // return res
    //   .status(401)
    //   .send({ message: 'Необходима авторизация1' });
    // const error = { message: 'Необходима Авторизация!', statusCode: 401 };
    // return next(error);
    return next(new UnauthorizedError('Необходима Авторизация!'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // return res
    //   .status(401)
    //   .send({ message: 'Необходима авторизация1' });
    return next(new UnauthorizedError('Необходима Авторизация!'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше

  return req.user;
};
