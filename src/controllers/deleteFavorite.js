// CONTROLADOR

// NODE.JS --> Necesitamos trabajar con el sistema de archivos
const fs = require('fs');
const path = require('path');

// Ruta al archivo favorites.json
const favoritesFilePath = path.resolve(__dirname, '../Favorites.json');

// Request --> Realiza solicitudes HTTP al servidor
// Response --> Envía las respuestas al cliente
const deleteFavorite = async (req, res) => { 
    console.log("Se acaba de hacer la petición deleteFavorite al servidor");

    try {
        const id = Number(req.params.id); // Convertir id a número
        console.log("ID recibido para eliminar:", id);

        // Leer el archivo favorites.json
        const data = fs.readFileSync(favoritesFilePath, 'utf-8');
        const favorites = JSON.parse(data);

        // Filtrar el favorito a eliminar
        const updatedFavorites = favorites.filter(fav => fav.id !== id);

        // Si no se encontró el favorito
        if (favorites.length === updatedFavorites.length) {
            console.log(`No se encontró el personaje con id ${id}`);
            return res.status(404).json({ message: `There is no character with id ${id}` });
        }

        // Escribir la lista actualizada en el archivo
        fs.writeFileSync(favoritesFilePath, JSON.stringify(updatedFavorites, null, 2));

        console.log(`Personaje con id ${id} eliminado correctamente.`);
        return res.status(200).json(updatedFavorites);
    } catch (error) {
        console.log("Error al procesar la petición:");
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

// NODE JS
module.exports = deleteFavorite;