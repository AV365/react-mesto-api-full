const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Исследователь',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    tags: { type: [String], index: true },
    validate: {
      validator(v) {
        const regexpUrl = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        return regexpUrl.test(v);
      },
      message: 'Email имеет неправильный формат',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        const regexpUrl = /https?:\/\/[\w\d-]*\.*[\w\d-]{2,}.\/*[\w\d-]+.[-._~:/?#[\]@!$&'()*+,;=\w\d]*#*$/img;
        return regexpUrl.test(v);
      },
      message: 'Ссылка имеет неправильный формат',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user; // теперь user доступен
        });
    });
};





module.exports = mongoose.model('user', userSchema);
