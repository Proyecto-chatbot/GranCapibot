# Webhook para Chatbot

## Proyecto final C.F.G.S Desarrollo de Aplicaciones Web

Esta aplicación está desarrollada en Node.js y permite conectar la plataforma *Dialogflow* (v1) con diferentes APIs de terceros.

El proyecto está conformado además por [este](https://github.com/Proyecto-chatbot/panel-administracion-chatbot) repositorio donde se encuentra el panel de configuración para el chatbot conversacional desarrollado para el centro.

El webhook realiza llamadas a la API de *Giphy* para la obtención de gifs. Por motivos de seguridad no se ha incluido ningún fichero de almacenamiento de tokens o api keys, por lo que es necesario generarlo o almacenarlo como variable de sesión en el servidor o plataforma en que despleguemos la aplicación.

```javascript
 //Cargar los módulos requeridos
 npm install
 //Lanzar el servicio
 node index.js
```

## Authors

* [Nieves Borrero](https://github.com/NievesBorrero)
* [Pablo León](https://github.com/pabloleonalcaide)

## Deployment
  El Webhook se despliega actualmente en *Heroku*
## Built with

* Express - como framework para Node.js
* GIPHY API

## License
[GNU General Public License v3.0](../master/LICENSE)

## Acknowledgments
