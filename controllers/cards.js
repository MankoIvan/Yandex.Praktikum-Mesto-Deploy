const Card = require("../models/card");

const ForbiddenError = require("../errors/forbidden-error");
const NotFoundError = require("../errors/not-found-error");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (card) {
        if (card.owner.toString() === req.user._id) {
          Card.findByIdAndRemove(cardId)
            .then((deletedCard) => res.send(deletedCard))
            .catch(next);
        } else {
          throw new ForbiddenError("Вы не можете удалять чужие карточки");
        }
      } else {
        throw new NotFoundError("Эта карточка не найдена");
      }
    })
    .catch(next);
};
