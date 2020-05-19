const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// устанавливаю схему
const message = new Schema({
  name: {
    type: String,
  },
  message: {
    type: String,
  },
});
module.exports = mongoose.model("User", message);
