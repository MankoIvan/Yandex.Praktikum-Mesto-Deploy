const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: String,
    match: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|svg|png)/,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
