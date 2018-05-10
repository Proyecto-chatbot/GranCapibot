"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '594433471:AAEa2tidUbvEAau5vUKMjGTIcnUQ_dkqfQs';

// Create a bot that uses 'polling' to fetch new updates
const URL = 'https://grancapibot.herokuapp.com/';

const bot = new TelegramBot(token);

bot.setWebHook(`${URL}/bot${token}`);

// Express
const app = express();

// Use Node-Telegram-Bot-API As An Express Middleware
app.use(bot.webhookCallback((`/bot${token}`))
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

/*// Listen for any kind of message. There are different kinds of
// messages.
bot.on(/[h]+/, (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);*/

restService.use(bodyParser.json());

restService.post("/webhook", function(req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.tipo
      ? response(req.body.result.parameters.tipo.toLowerCase())
      : "Ups... ha habido algún problema con nuestra comunicación, sorry!";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

let response = function(tipo){
  let response;
  switch(tipo){
    case 'daw':  response = 'Aquí hay un montón de información --> http://moodle.iesgrancapitan.org/course/index.php?categoryid=7'; break;
    case 'asir':  response = 'http://moodle.iesgrancapitan.org/course/index.php?categoryid=4'; break;
    default: response = 'bollos y magdalenas'; break;
  }
  return response;
}




restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
