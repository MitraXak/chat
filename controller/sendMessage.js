const Messages = require("../models/Message");

async function getMessage(req, res) {
  // парсинг строки запроса
  const body = req.body;
  const data = {
    name: body.name,
    message: body.message,
  };
  // создание новой коллекции
  await Messages.create(data);
  res.redirect("/");
}

exports.getMessage = getMessage;
