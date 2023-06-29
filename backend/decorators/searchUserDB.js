import User from '../models/user.js';
import NotFoundError from '../errors/NotFoundError.js';

export default function searchUserDB(req, res, next) {
  return function (id) {
    User.findById(id)
      .orFail(() => new NotFoundError('Пользователь не найден'))
      .then((user) => res.send({ data: user }))
      .catch(next);
  };
}
