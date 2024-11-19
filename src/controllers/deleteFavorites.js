const fs = require('fs').promises; // Usa fs.promises para trabajar con promesas
const path = require('path');

// Ruta del archivo Favorites.json
const favoritesFilePath = path.join(__dirname, '../Favorites.json');

// Ruta para limpiar el archivo de favoritos
const deleteFavorites = async (req, res) => {
    try {
        // Escribir un array vacío en el archivo
        await fs.writeFile(favoritesFilePath, JSON.stringify([]));
        console.log('Favorites.json borrado exitosamente');
        return res.status(200).json({ message: 'Contenido de Favorites.json borrado' });
    } catch (error) {
        console.error('Error al borrar el archivo de favoritos:', error);
        return res.status(500).json({ message: 'Error al borrar el archivo de favoritos' });
    }
};

module.exports = deleteFavorites;