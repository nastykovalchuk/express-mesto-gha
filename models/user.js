const mongoose = require('mongoose');
const validator = require('validator');
const { URL_REGEX } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => URL_REGEX.test(url),
      message: 'Enter correct URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'Enter correct email address',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

module.exports = mongoose.model('user', userSchema);
