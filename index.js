"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var fs = require("fs");
var path = require("path");

var server = http.createServer(function (req, res) {
    // Obtener la ruta del archivo index.html
    var indexPath = path.join(__dirname, 'public', 'index.html');
    // Si la petición es para la ruta principal, enviar el archivo index.html
    if (req.url === '/') {
        sendfile(indexPath, res)

    }else {
       indexPath = path.join(__dirname, 'public', decodeURI(req.url))
       sendfile(indexPath, res)
    }
});
// Iniciar el servidor
var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
    console.log("Servidor iniciado en el puerto ".concat(PORT));
});

function sendfile(path, res){

    fs.readFile(path, function (err, data) {

        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
            res.end('Página no encontrada')
        }else {
            res.writeHead(200);
            res.end(data);
        }
    });
}
