const express = require('express');
const enrutador = express.Router();
const pokemonControlador = require('../controladores/pokemonControlador');

enrutador.post('/registrar', pokemonControlador.registrarPokemon);
enrutador.get('/listarpokemon', pokemonControlador. listarPokemon);

module.exports = enrutador;