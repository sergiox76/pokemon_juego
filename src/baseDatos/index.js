require('dotenv').config();

const { Sequelize,DataTypes } = require('sequelize');
const usuarioModelo = require('../modelos/usuario');
const pokemonModelo = require('../modelos/pokemon');
const capturadoModelo = require('../modelos/pokemonCapturado');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);
const Usuario = usuarioModelo(sequelize, DataTypes);
const Pokemon = pokemonModelo(sequelize, DataTypes);
const Capturado = capturadoModelo(sequelize, DataTypes);

sequelize.authenticate()
  .then(() => console.log('Conectado a la base de datos.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

sequelize.sync({ alter: true, force: false })
  .then(() => console.log('Sincronización completada.'))
  .catch(err => console.error('Error en la sincronización:', err));

  

module.exports = {
    Usuario,
    Pokemon,
    Capturado,
    sequelize
};