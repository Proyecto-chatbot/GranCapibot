"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const restService = express();
const GIPHY_TOKEN =  process.env.giphy; // Defined as env var on Heroku
restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/webhook",function(req,res){
  let response;
  let promise;
 let tag = req.body.actions //We can change the tag to get differents gifs 
  console.log('tag ->' + tag);
  promise = new Promise(function(resolve){
   
    request("https://api.giphy.com/v1/gifs/random?api_key="+GIPHY_TOKEN+"&tag="+tag+"&rating=PG-13",function(err,res,body){
      resolve(response = JSON.parse(body).data.images.original.url)

    });
  });
  promise.then(function(response){
    return res.json({
      messages:[
        {
          type : 3,
          imageUrl : response
        }
      ],
      source : "webhook-echo-sample"
      
    },
    
  );
  });
});

/*
restService.post("/webhook", function(req, res) {
 var speech;
  if(req.body.result && req.body.result.parameters){
    if(req.body.result.parameters.tipo)
      speech = response_fp(req.body.result.parameters.tipo.toLowerCase());
    else if(req.body.result.parameters.nombre_ciclo)
      speech = response_fp(req.body.result.parameters.nombre_ciclo.toLowerCase());
  }else{
      speech = "Ups... ha habido algún problema con nuestra comunicación, sorry!";
 }

  return res.json({
        speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

let response_fp = function(tipo){
  let response_fp;
  switch(tipo){
    case 'daw':
      response_fp = 'Aquí hay un montón de información --> http://moodle.iesgrancapitan.org/course/index.php?categoryid=7';
      break;
    case 'asir':
      response_fp = 'Mira aquí --> http://moodle.iesgrancapitan.org/course/index.php?categoryid=4';
      break;
    case 'cocina y gastronomia':
      response_fp = 'Quizás aquí obtengas la información que buscas --> http://www.juntadeandalucia.es/educacion/portals/web/formacion-profesional-andaluza/fp-grado-medio/detalle-titulo?idTitulo=1';
      break;
    case 'servicios restauracion':
      response_fp = 'Mira aquí --> http://www.juntadeandalucia.es/educacion/portals/web/formacion-profesional-andaluza/fp-grado-medio/detalle-titulo?idTitulo=2';
      break;
    case 'cocina y restauracion':
      response_fp = 'Aquí hay un montón de información --> http://www.juntadeandalucia.es/educacion/portals/web/formacion-profesional-andaluza/fp-basica/detalle-titulo?idTitulo=148';
      break;
    case 'direccion cocina':
      response_fp = 'He encontrado esto al respecto --> http://www.juntadeandalucia.es/educacion/portals/web/formacion-profesional-andaluza/fp-grado-superior/detalle-titulo?idTitulo=57';
      break;
    case 'direccion restauracion':
      response_fp = 'Aquí está la información que buscas --> http://www.juntadeandalucia.es/educacion/portals/web/formacion-profesional-andaluza/fp-grado-superior/detalle-titulo?idTitulo=58';
      break;
    default: response_fp = 'Ese ciclo yo no lo conozco, tendré que ponerme al día!'; break;
  }
  return response_fp;
}
*/


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
