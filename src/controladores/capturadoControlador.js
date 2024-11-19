const { PokemonCapturado, Pokemon, Usuario } = require('../baseDatos');

const capturarPokemon = async (req, res) => {
  try {
    const capturado = await PokemonCapturado.create(req.body);
    res.status(201).json({
      mensaje: "Pokémon capturado exitosamente",
      resultado: capturado,
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message, resultado: null });
  }
};


const listarCapturas = async (req, res) => {
  try {
   
    const capturas = await PokemonCapturado.findAll({
      include: [
        {
          model: Pokemon,
          as: 'Pokemon', 
          attributes: ['nombre'], 
        },
        {
          model: Usuario,
          as: 'Usuario',
          attributes: ['nombre'], 
        },
      ],
    });

    
    const resultado = capturas.map((captura) => ({
      id: captura.id,
      pokemon: captura.Pokemon.nombre,
      usuario: captura.Usuario.nombre,
      fechaCaptura: captura.createdAt, 
    }));

    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ mensaje: error.message, resultado: null });
  }
};

module.exports = {
  capturarPokemon,
  listarCapturas,
};