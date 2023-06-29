import Card from '../models/card.js';
import NotFoundError from '../errors/NotFoundError.js';
import NotEnoughRights from '../errors/NotEnoughRights.js';
import searchAndUpdateCardDB from '../decorators/searchAndUpdateCardDB.js';

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Карточка не найдена'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Card.deleteOne(card)
          .then(() => res.send({ data: card }))
          .catch(next);
      } else {
        throw new NotEnoughRights('Недостаточно прав для удаления');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;

  const update = searchAndUpdateCardDB(req, res, next);
  update({ $addToSet: { likes: owner } });
};

const dislikeCard = (req, res, next) => {
  const owner = req.user._id;

  const update = searchAndUpdateCardDB(req, res, next);
  update({ $pull: { likes: owner } });
};

export {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
};
