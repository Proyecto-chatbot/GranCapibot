'use strict';

const apiai = require('apiai');
const express = require('express');
const bodyParser = require('body-parser');

const TelegramBot = require('./telegrambot');
const TelegramBotConfig = require('./telegrambotconfig');
//const env = require('./env');
const REST_PORT = (8443);
const DEV_CONFIG = 'true';
const APP_NAME= "grancapibot";
const TELEGRAM_TOKEN = "594433471:AAEa2tidUbvEAau5vUKMjGTIcnUQ_dkqfQs";
const APIAI_ACCESS_TOKEN = "49d25ee944bf42a4a1ffca1d285c514a";
const APIAI_LANG = "es";
const PORT = 3000;
//const APP_NAME = env.APP_NAME;
//const APIAI_ACCESS_TOKEN = env.APIAI_ACCESS_TOKEN;
//const APIAI_LANG = env.APIAI_LANG;
//const TELEGRAM_TOKEN = env.TELEGRAM_TOKEN;

var baseUrl = "";
if (APP_NAME) {
    // Heroku case
    baseUrl = 'localhost:8443';
//    baseUrl = `https://${APP_NAME}.herokuapp.com`;
} else {
}

// console timestamps
require('console-stamp')(console, 'yyyy.mm.dd HH:MM:ss.l');

const botConfig = new TelegramBotConfig(
    APIAI_ACCESS_TOKEN,
    APIAI_LANG,
    TELEGRAM_TOKEN);

botConfig.devConfig = DEV_CONFIG;

const bot = new TelegramBot(botConfig, baseUrl);
bot.start(() => {
        console.log("Bot started");
    },
    (errStatus) => {
        console.error('It seems the TELEGRAM_TOKEN is wrong! Please fix it.');
    });


const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log('POST webhook');

    try {
        bot.processMessage(req, res);
    } catch (err) {
        return res.status(400).send('Error while processing ' + err.message);
    }
});

app.listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
});