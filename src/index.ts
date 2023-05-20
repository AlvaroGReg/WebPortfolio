import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const server = http.createServer((req, res) => {
  // Obtener la ruta del archivo index.html
  const indexPath = path.join(__dirname, 'public', 'index.html');

  // Si la petición es para la ruta principal, enviar el archivo index.html
  if (req.url === '/') {
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(`Error interno del servidor: ${err}`);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // Si no es la ruta principal, devolver un error 404
    res.writeHead(404);
    res.end('Página no encontrada');
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
