const express = require('express');
const enrutador = express.Router();
const capturadoControlador = require('../controladores/capturadoControlador');

enrutador.post('/capturar',capturadoControlador.capturarPokemon);
enrutador.get('/listarcapturas', capturadoControlador. listarCapturas);

module.exports = enrutador;