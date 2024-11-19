// CONTROLADOR

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

// SE ENCARGA DE BUSCAR TODOS LOS PERSONAJES GUARDADOS EN LA BD

// SEQUELIZE --> Requiero conectarme con la BD con e modelo "Character"
const { Character } = require('../DB_connection.js');

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente
const getAllChars = async (req, res) => {
    try {
        // Hacemos la consulta a la BD del modelo con todos los personajes
        // .findAll --> Me trae todos los personajes del modelo Character
        const allCharacters = await Character.findAll();

        // Respondemos con un status 200 y con un json que tiene los personajes
        return res.status(200).json(allCharacters);
    } catch (error) {
        // Responder directamente en la ruta un mensaje 404 de error
        return res.status(404).json({message: error.message})
    }
}

// NODE JS
module.exports = getAllChars;
