const Card = require('../models/card');
const {
  OK,
  CREATED,
  INVALID_DATA,
  NOT_FOUND,
  INTERNAL,
} = require('../utils/resStatus');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(OK.CODE).send(cards))
    .catch(() => res.status(INTERNAL.CODE).send({ message: INTERNAL.MESSAGE }));
};

module.exports.createCard = (req, res) => {
  Card.create({ name: req.body.name, link: req.body.link, owner: req.user._id })
    .then((card) => res.status(CREATED.CODE).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INVALID_DATA.CODE).send({ message: INVALID_DATA.MESSAGE });
      }
      return res.status(INTERNAL.CODE).send({ message: INTERNAL.MESSAGE });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND.CODE).send({ message: NOT_FOUND.CARD_MESSAGE });
      }
      return res.status(OK.CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INVALID_DATA.CODE).send({ message: INVALID_DATA.MESSAGE });
      }
      return res.status(INTERNAL.CODE).send({ message: INTERNAL.MESSAGE });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND.CODE)
          .send({ message: NOT_FOUND.CARD_MESSAGE });
      }
      return res.status(OK.CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INVALID_DATA.CODE)
          .send({ message: INVALID_DATA.MESSAGE });
      }
      return res.status(INTERNAL.CODE).send({ message: INTERNAL.MESSAGE });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND.CODE)
          .send({ message: NOT_FOUND.CARD_MESSAGE });
      }
      return res.status(OK.CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INVALID_DATA.CODE)
          .send({ message: INVALID_DATA.MESSAGE });
      }
      return res.status(INTERNAL.CODE).send({ message: INTERNAL.MESSAGE });
    });
};
