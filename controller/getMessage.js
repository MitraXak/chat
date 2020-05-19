const Messages = require("../models/Message");

async function getMessage(req, res) {
  const obj = await Messages.find({});
  // async возвращает промис
  return obj;
}

exports.getMessage = getMessage;
