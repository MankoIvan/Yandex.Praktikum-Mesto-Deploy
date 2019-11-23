const cardsRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const { getCards, createCard, deleteCard } = require("../controllers/cards");
const auth = require("../middlewares/auth");

cardsRouter.post("/cards", celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|svg|png)/),
  }),
}), auth, createCard);
cardsRouter.get("/cards", auth, getCards);
cardsRouter.delete("/cards/:cardId", auth, deleteCard);

module.exports = cardsRouter;
