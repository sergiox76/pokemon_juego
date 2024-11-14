require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const usuarioRutas = require('./rutas/rutasUsuarios');
const pokemonRutas = require('./rutas/rutasPokemon');
const capturaRutas = require('./rutas/rutasCapturados');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'vistas')));
app.get('/vista', async(req, res) => {
  res.sendFile(path.join(__dirname, 'vistas', 'vista.html'));
});

// Rutas
app.use('/api/usuarios', usuarioRutas);
app.use('/api/pokemon', pokemonRutas);
app.use('/api/captura', capturaRutas);

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});