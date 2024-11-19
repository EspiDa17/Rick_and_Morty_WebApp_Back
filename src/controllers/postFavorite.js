// CONTROLADOR

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT

// Para manejar la lectura y escritura en archivos
const fs = require('fs');
const path = require('path');

// Ruta del archivo JSON donde se almacenan los favoritos
const favoritesFilePath = path.join(__dirname, '../Favorites.json');

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente
const postFavorite = async (req, res) => {
    console.log("Se acaba de hacer la petición postFavorite al servidor");
    
    try {
        const { id, name, status, species, gender, origin, image } = req.body;

        // Verificamos que todos los campos necesarios estén presentes
        if(!id || !name || !status || !species || !gender || !origin || !image) {
            console.log("faltan datos en el cuerpo de la petición");
            console.log("----------------------------------------------------------------");
            return res.status(400).json({ message: 'Complete all fields' });
        }

        // Leemos el archivo JSON que contiene los favoritos
        fs.readFile(favoritesFilePath, 'utf8', (err, data) => {
            if (err) {
                console.log("Error al leer el archivo JSON: ", err);
                return res.status(500).json({ message: 'Error al leer el archivo de favoritos' });
            }

            // Parseamos los datos del archivo JSON, si no hay favoritos, inicializamos un array vacío
            let favorites = JSON.parse(data || '[]');

            // Verificamos si el personaje ya está en los favoritos
            const exists = favorites.some(fav => fav.id === id);
            if (exists) {
                return res.status(400).json({ message: 'Este personaje ya está en favoritos' });
            }

            // Agregamos el nuevo personaje a la lista de favoritos
            const newFavorite = { id, name, status, species, gender, origin, image };
            favorites.push(newFavorite);

            // Escribimos el nuevo array de favoritos de vuelta en el archivo JSON
            fs.writeFile(favoritesFilePath, JSON.stringify(favorites, null, 2), (err) => {
                if (err) {
                    console.log("Error al guardar el archivo JSON: ", err);
                    return res.status(500).json({ message: 'Error al guardar el archivo de favoritos' });
                }

                console.log("Petición realizada correctamente");
                console.log("----------------------------------------------------------------");
                return res.status(200).json({ message: 'Personaje agregado a favoritos' });
            });
        });
    } catch (error) {
        console.log("Error: ", error.message);
        console.log("----------------------------------------------------------------");
        return res.status(500).json({ message: error.message });
    }
};

module.exports = postFavorite;