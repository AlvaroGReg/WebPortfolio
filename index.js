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
        fs.readFile(indexPath, function (err, data) {
            if (err) {
                res.writeHead(500);
                res.end("Error interno del servidor: ".concat(err));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }
    else {
        // Si no es la ruta principal, devolver un error 404
        res.writeHead(404);
        res.end('Página no encontrada');
    }
});
// Iniciar el servidor
var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
    console.log("Servidor iniciado en el puerto ".concat(PORT));
});
