// MODELO (Tabla)

// Paquete que tiene todo los dataTypes que se le dan a los atributos
const { DataTypes } = require('sequelize');


// Se realiza la exportación de sequelize con el modelo que se está creando
module.exports = (sequelize) => {
   
   // 'Character' --> El nombre que va a tener la tabla en la BD
   sequelize.define('Character', {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement:true
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      status: {
         type: DataTypes.ENUM('Alive', 'Dead', 'unknown'),
         allowNull: false
      },
      species: {
         type: DataTypes.STRING,
         allowNull: false
      },
      gender: {
         type: DataTypes.ENUM('Female', 'Male', 'Genderless', 'unknown'),
         allowNull: false
      },
      origin: {
         type: DataTypes.STRING,
         allowNull: false
      },
      image: {
         type: DataTypes.STRING,
         allowNull: false
      }
   }, {
      // timestamps --> Especifica una indicación de fecha y hora cuando se ejecuta la sentencia de 
      //                SQL en el servidor de aplicaciones.
      timestamps: false
   });
};
