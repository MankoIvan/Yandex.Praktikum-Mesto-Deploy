const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
    match: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|svg|png)/,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Неправильный формат почты",
    },
  },
  password: {
    required: true,
    type: String,
    minlength: 8,
    select: false,
  },
});

// eslint-disable-next-line arrow-body-style
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error("Неправильные почта или пароль"));
          }
          return user;
        });
    });
};

module.exports = mongoose.model("user", userSchema);
