// CONEXIÓN Y EL TRABAJO DE SEQUELIZE

// Requerir lo que tenemos en nuestro archivo .env
require('dotenv').config();

// Nos traemos a sequelize
const { Sequelize } = require('sequelize');

// Tener las variables de entorno de nuestro archivo .env
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// Importamos los modelos
const Character = require('./models/Character.js')
const Favorite = require('./models/Favorite.js')

/*
EJERCICIO 01
A la instancia de Sequelize le falta la URL de conexión.
Recuerda pasarle la información de tu archivo '.env'.

URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
*/
// Se crea la instancia de sequelize para tener la conexión
const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, // URL
   { logging: false, native: false } // Para que no me muestre en la consola a la hora de crear o modificar en la BD
);

/*
EJERCICIO 03
Debajo de este comentario puedes ejecutar la función de los modelos.
*/
// Esto permite que se cree y se guarde el modelo con sus atributos y el timestamp en la BD
Character(sequelize);
Favorite(sequelize);

module.exports = {
   // Hace una copia de todos los modelos que tiene Sequelize
   // se guardan en un objetos models 
   ...sequelize.models,
   sequelize,
};
