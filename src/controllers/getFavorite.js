// CONTROLADOR

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

// Para manejar la lectura de archivos
const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON donde se almacenan los favoritos
const favoritesFilePath = path.join(__dirname, '../Favorites.json');

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente
const getFavorite = async (req, res) => {
    try {
        // Leemos el archivo JSON que contiene los favoritos
        fs.readFile(favoritesFilePath, 'utf8', (err, data) => {
            if (err) {
                console.log("Error al leer el archivo JSON: ", err);
                return res.status(500).json({ message: 'Error al leer el archivo de favoritos' });
            }

            // Parseamos los datos del archivo JSON
            const favorites = JSON.parse(data || '[]');

            // Si no hay favoritos, devolvemos un mensaje adecuado
            if (!favorites.length) {
                return res.status(404).json({ message: 'No favorites yet' });
            } else {
                // Si hay favoritos, los devolvemos en la respuesta
                return res.status(200).json(favorites);
            }
        });
    } catch (error) {
        console.log("Error: ", error.message);
        return res.status(500).json({ message: error.message });
    }
};

// NODE JS
module.exports = getFavorite;