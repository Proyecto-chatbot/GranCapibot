var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
const ACCESS_TOKEN = '';
var app = express();
app.use(bodyParser.json());

app.listen(3000,function(){
	console.log('El servidor se encuentra en el puerto 3000');
});

app.get('/', function(req, res){
	res.send("Servidor levantado");
});

app.get('/webhook', function(req, res){
	if(req.query['hub.verify_token'] === 'Aqui_mi_token'){
		res.send(req.query['hub.challenge']);
	}
	else{
		res.send('Aquí no debería entrar');
	}
});
