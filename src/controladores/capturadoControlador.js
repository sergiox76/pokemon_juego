const { Capturado } = require('../baseDatos');

const capturarPokemon = async (req, res) => {
  try {
    const capturado = await Capturado.create(req.body);
    res.status(201).json({ mensaje: "Pokemon capturado",resultado:capturado });
  } catch (error) {
    res.status(400).json({ mensaje: error.message,resultado:null });
  }
};

const listarCapturas = async (req, res) => {
  try {
    const capturas = await Capturado.findAll();
    res.status(200).json(capturas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar capturas', error });
  }
};

module.exports = {
    capturarPokemon,
    listarCapturas
};