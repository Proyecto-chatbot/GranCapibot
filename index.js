"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/webhook", function(req, res) {
  /*
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.tipo
      ? response(req.body.result.parameters.tipo.toLowerCase())
      : "Ups... ha habido algún problema con nuestra comunicación, sorry!";*/
  var speech;
  if(req.body.result && req.body.result.parameters){
    if(req.body.result.parameters.tipo)
      speech = response(req.body.result.parameters.tipo.toLowerCase());
    else if(req.body.result.parameters.nombre_ciclo)
      speech = response(req.body.result.parameters.nombre_ciclo.toLowerCase());
  }else{
      speech = "Ups... ha habido algún problema con nuestra comunicación, sorry!";
  }

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
    case 'asir':  response = 'Mira aquí --> http://moodle.iesgrancapitan.org/course/index.php?categoryid=4'; break;
    default: response = 'bollos y magdalenas'; break;
  }
  return response;
}



restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
