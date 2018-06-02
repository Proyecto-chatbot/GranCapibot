"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.get("/prueba",function(req,res){
  request("https://api.giphy.com/v1/gifs/random?api_key=cpXnSvja7H6tdQ2aY54mFJrpV48e9pwY&tag=hambre&rating=PG-13",function(err,res,body){
  console.log(JSON.parse(body).data.images.original.url);

  return res.json({
    speech: JSON.parse(body).data.images.original.url,
    displayText : JSON.parse(body).data.images.original.url,
    source : "webhook-echo-sample"
  });
  })
});
/*
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
*/
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
