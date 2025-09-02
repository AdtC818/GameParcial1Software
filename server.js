// server.js
import express from 'express';
import cors from 'cors';
import { ScoreFileManager } from './src/services/ScoreFileManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Para obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;
const scoreFileManager = new ScoreFileManager();

// Middleware: parse JSON
app.use(express.json());

// Middleware: CORS
app.use(cors());

// Middleware: Content-Security-Policy para Firefox y Chrome
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "script-src 'self' https://cdn.jsdelivr.net; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data:; " +
    "connect-src 'self' http://localhost:3000 http://localhost:4000; " +
    "font-src 'self' data:; " +  // permite fuentes locales y en base64
    "media-src 'self'; " +
    "frame-src 'self';"
  );
  next();
});

// Servir archivos estáticos (index.html, game.js, images, etc.)
app.use(express.static(path.join(__dirname, '/')));

// Endpoint para guardar puntajes
app.post('/api/scores', (req, res) => {
  const { nombre, puntuacion } = req.body;
  if (nombre && puntuacion !== undefined) {
    scoreFileManager.guardarPuntaje(nombre, puntuacion);
    res.status(200).send('Puntaje guardado correctamente');
  } else {
    res.status(400).send('Datos incompletos');
  }
});

// Endpoint para obtener top 10 puntajes
app.get('/api/scores/top10', (req, res) => {
  const top10 = scoreFileManager.obtenerTop10();
  res.json(top10);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor de juego y puntajes escuchando en http://localhost:${port}`);
});

