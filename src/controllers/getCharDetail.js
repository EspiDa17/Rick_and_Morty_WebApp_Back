// CONTROLADOR

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

const axios = require('axios');

const URL = 'https://rickandmortyapi.com/api/character/';

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente
const getCharDetail = async (req, res) => {
    
    const { id } = req.params;
    
    try{
        // Petición asincrónica a la url de rick and morty buscando un id en particular
        const result = await axios(`${URL}${id}`);
        const detailApi = result.data;
            
            // En caso de que sea exitoso me traigo un arreglo con los
            // datos
                let detailCharacter = {
                    id: detailApi.id,
                    image: detailApi.image,
                    name: detailApi.name,
                    gender: detailApi.gender,
                    species: detailApi.species,
                    origin: detailApi.origin,
                    status: detailApi.status
                }
                res.status(200).send(detailCharacter)
        }

        // Si no es exitoso devuelvo la respuesta con el estado 500 y 
        // un mensaje que especifique lo sucedido
        catch(error) {
            res.status(500).json({ message: error.message })
        }
}

// NODE JS
module.exports = getCharDetail;






// PROMESAS

// Realizar una petición por un personaje con el ID

// const axios = require('axios');

// const getCharDetail = (res, id) => {
//     // Petición a la url de rick and morty
//     axios(`https://rickandmortyapi.com/api/character/${id}`)
        
//         // En caso de que sea exitoso
//         .then(result => result.data)
//         .then(data => {
//             let character = {
//                 origin: data.origin,
//                 image: data.image,
//                 name: data.name,
//                 gender: data.gender,
//                 species: data.species,
//                 status: data.status
//             }
//             res.writeHead(200, {'Content-type':'application/json'})
//             res.end(JSON.stringify(character))
//         })

//         // Si no es exitoso
//         .catch(err => {
//             res.writeHead(500, {'Content-type':'text/plain'})
//             res.end(`Character with ${id} ID not found`)
//         })

// }






