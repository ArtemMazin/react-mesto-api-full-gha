import Card from '../models/card.js';
import NotFoundError from '../errors/NotFoundError.js';

export default function searchAndUpdateCardDB(req, res, next) {
  return function (newData) {
    Card.findByIdAndUpdate(req.params.cardId, newData, { new: true })
      .orFail(() => new NotFoundError('Карточка не найдена'))
      .then((card) => res.send({ data: card }))
      .catch(next);
  };
}
