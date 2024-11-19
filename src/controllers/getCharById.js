// CONTROLADOR

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

const axios = require('axios');

const URL = 'https://rickandmortyapi.com/api/character/';

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente
const getCharById = async (req, res) => {
    
    const { id } = req.params;
    console.log('Se solicitó un personaje con el ID --> ' + id);
    
    try {
        // Petición asincrónica a la url de rick and morty buscando un id en particular
        const result = await axios(`${URL}${id}`)
        const characterApi = result.data;
            
        // En caso de que sea exitoso me traigo un arreglo con los datos
        let character = {
            id: characterApi.id,
            image: characterApi.image,
            name: characterApi.name,
            gender: characterApi.gender,
            species: characterApi.species,
            origin: characterApi.origin.name,
            status: characterApi.status
        }
        res.status(200).send(character);
        console.log("Petición realizada correctamente");
        console.log("----------------------------------------------------------------");
    }

    // Si no es exitoso devuelvo la respuesta con el estado 500 y 
    // un mensaje que especifique lo sucedido
    catch(error) {
        console.log("Error 500: ", error.message);
        console.log("----------------------------------------------------------------");
        res.status(500).json({ message: error.message })
    }
}


// NODE JS
module.exports = getCharById;

