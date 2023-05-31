const User = require('../models/user');
const {
  OK,
  CREATED,
  INVALID_DATA,
  NOT_FOUND,
  INTERNAL,
} = require('../utils/resStatus');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK.CODE).send(users))
    .catch(() => res.status(INTERNAL.CODE).send({ message: INTERNAL.MESSAGE }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!(user)) {
        return res.status(NOT_FOUND.CODE)
          .send({ message: NOT_FOUND.USER_MESSAGE });
      }
      return res.status(OK.CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(INVALID_DATA.CODE)
          .send({ message: INVALID_DATA.MESSAGE });
      }
      return res.status(INTERNAL.CODE).send({ message: INTERNAL.MESSAGE });
    });
};

module.exports.createUser = (req, res) => {
  User.create({ name: req.body.name, about: req.body.about, avatar: req.body.avatar})
    .then((user) => res.status(CREATED.CODE).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INVALID_DATA.CODE)
          .send({ message: INVALID_DATA.MESSAGE });
      }
      return res.status(INTERNAL.CODE).send({ message: INTERNAL.MESSAGE });
    });
};

module.exports.patchProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND.CODE)
          .send({ message: NOT_FOUND.USER_MESSAGE });
      }
      return res.status(OK.CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INVALID_DATA.CODE)
          .send({ message: INVALID_DATA.MESSAGE });
      }
      return res.status(INTERNAL.CODE).send({ message: INTERNAL.MESSAGE });
    });
};

module.exports.patchAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND.CODE)
          .send({ message: NOT_FOUND.USER_MESSAGE });
      }
      return res.status(OK.CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(INVALID_DATA.CODE)
          .send({ message: INVALID_DATA.MESSAGE });
      }
      return res.status(INTERNAL.CODE).send({ message: INTERNAL.MESSAGE });
    });
};
