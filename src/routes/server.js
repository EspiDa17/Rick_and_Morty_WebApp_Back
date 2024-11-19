const { saveApiData } = require('../controllers/saveApiData.js'); 

// Para hacer las peticioes desde el front
const { router } = require('../routes/index.js'); 

// EXPRESS --> Creación de servidores y peticiones a rutas
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const favoritesFilePath = path.join(__dirname, '/Favorites.json');

//EXPRESS --> Creo el servidor con express y el puerto donde va a estar
const server = express(); 
const PORT = 3006; 

// Para los métodos del POST - Configuración de middleware
server.use(express.json());
server.use(cors());


// Configuración del cors --> Para que la ruta(3005) haga peticiones desde la APP del front
server.use((req, res, next) => {
    //Autorizo recibir solicitudes de este dominio
    res.header('Access-Control-Allow-Origin', 'http://localhost:3005'); 
    //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
    res.header('Access-Control-Allow-Credentials', true); 
    //Autorizo recibir solicitudes con dichos hedears
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 
    //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
    next();
 });

// EXPRESS --> 
server.use('/rickandmorty', router)

// Ruta principal para obtener la data desde el archivo `data.json`
server.get('/rickandmorty/characters', (req, res) => {
   try {
       const filePath = path.resolve(__dirname, '../Data.json');
       const data = fs.readFileSync(filePath, 'utf-8');
       const characters = JSON.parse(data);
       res.status(200).json(characters);
   } catch (error) {
       console.error('Error al leer el archivo data.json:', error.message);
       res.status(500).send('Error al leer la información de personajes.');
   }
});


// Inicializar la data y levantar el servidor
// Verifica si el archivo ya contiene datos antes de ejecutarlo
(async () => {
   const filePath = path.resolve(__dirname, '../Data.json');

   if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf-8') === '[]') {
       console.log('Guardando datos iniciales en Data.json...');
       await saveApiData();
   } else {
       console.log('El archivo Data.json ya contiene datos. No es necesario volver a guardarlos.');
   }

   server.listen(PORT, () => {
        console.log(`El servidor está escuchando por el puerto: ${PORT}`);
        console.log("----------------------------------------------------------------");
   });
})();


// Función para borrar el contenido de Favorites.json
const clearFavoritesFile = () => {
    fs.writeFile(favoritesFilePath, JSON.stringify([]), (err) => {
        if (err) {
            console.log("Error al borrar el archivo de favoritos:", err);
        } else {
            console.log("Contenido de Favorites.json borrado al iniciar el servidor.");
        }
    });
};

// Llamar a la función al levantar el servidor
//clearFavoritesFile();



 //------------------------------------------------------------------------------------------------------------------------
//                                      CONFIGURACIÓN DEL MIDDLEWARE PARA MANEJO DE ERRORES               
//------------------------------------------------------------------------------------------------------------------------
// Este middleware captura los errores que se roducen en el servidor y envía una respuesta de error al cliente con un código de estado y un mensaje correspondientes. Además, muestra el error en la consola del servidor para fines de registro y seguimiento

// Error catching endware.
// Define un middleware en el servidor utilizando la función 'use()' de EXPRESS. El middleware se ejecutará cuando se produzca un error durante el procesamiento de una solicitud.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars

   // Define la variable 'status' que representa el código de estado HTTP que se enviará en la respuesta. El valor se tomará del objeto 'err' si tiene una propiedad 'status', de lo contrario, se establecerá en 500(Internal Server Error)
   const status = err.status || 500;
 
   // Define la variable 'message' que representa el mensaje de error que se enviará en la respuesta. El valor se tomará de la propiedad 'message' del objeto 'err' si está definida, de lo ocntrario, se tomará el objeto 'err' directamente.
   const message = err.message || err;
 
   // Muestra el error en la consola del servidor
   console.error(err);
 
   // Envía una respuesta HTTP al cliente con el código de estado 'status' y el mensaje de error 'message'. La respuesta se envía utilizando los métodos 'status()' y 'send()' de la respuesta 'res' del servidor.
   res.status(status).send(message);
 });

module.exports = { server };