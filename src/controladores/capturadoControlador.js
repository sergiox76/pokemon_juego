const { Capturado } = require('../baseDatos');

const capturarPokemon = async (req, res) => {
  try {
    const capturado = await Capturado.create(req.body);
    const response = { 
      ...capturado.dataValues, 
      fechaCaptura: new Date() 
    };
    res.status(201).json({ mensaje: "Pokémon capturado exitosamente", resultado: response });
  } catch (error) {
    res.status(400).json({ mensaje: error.message, resultado: null });
  }
};

const listarCapturas = async (req, res) => {
  try {
    const capturas = await Capturado.findAll();
    res.status(200).json(capturas);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

module.exports = {
  capturarPokemon,
  listarCapturas,
};