var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
// контроллер получения сообщений из бд
var getMessageController = require("./controller/getMessage.js");
// контроллер отправки сообщений
var sendMessageController = require("./controller/sendMessage.js");
// установка сообщений
app.set("view engine", "ejs");
// декодер строки запроса
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// отображение статики
app.use(express.static(__dirname + "/public"));
//до отображения визуальной части выполняю контроллер
app.get("/", function (req, res) {
  const obj = getMessageController.getMessage();
  obj.then((result) => {
    res.render("index.ejs", {message: result});
  });
});

app.post("/get", (req, res) => {
  const obj = getMessageController.getMessage();
  obj.then((result) => {
    // кол-во смс из запроса
    let html = req.body.count;
    // кол-во смс из бд
    let bd = result.length;
    if (html == bd) {
      return;
    } else if (html < bd) {
      res.redirect("/getmes");
    }
    // result = JSON.parse(result);
    // console.log(result.length);
  });
});
app.get("/getmes", (req, res) => {
  const obj = getMessageController.getMessage();
  obj.then((result) => {
    res.send(result);
  });
});
app.post("/send", function (req, res) {
  sendMessageController.getMessage(req, res);
});
mongoose.connect(
  "mongodb://localhost:27017/Users",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    if (err) return console.log(err);
    app.listen(3000);
  },
);
