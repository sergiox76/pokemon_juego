const express = require('express');
const enrutador = express.Router();
const pokemonCapturado = require('../controladores/capturadoControlador');

enrutador.post('/capturar',pokemonCapturado.capturarPokemon);
enrutador.get('/listarcapturas', pokemonCapturado. listarCapturas);

module.exports = enrutador;