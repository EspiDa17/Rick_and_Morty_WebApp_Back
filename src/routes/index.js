// Importación de Router para usar las rutas
const { Router } = require("express");

// EXPRESS --> Importación de los controllers
const getCharById = require('../controllers/getCharById.js');
const getCharDetail = require('../controllers/getCharDetail.js');
const getFavorite = require('../controllers/getFavorite.js');
const postFavorite = require('../controllers/postFavorite.js');
const deleteFavorite = require('../controllers/deleteFavorite.js');
const getAllChars = require('../controllers/getAllChars.js');
const deleteFavorites = require('../controllers/deleteFavorites.js')

const router = Router();

// Las rutas con las funciones

// EXPRESS --> Rutas
router.get('/onsearch/:id', getCharById)
router.get('/detail/:id', getCharDetail)
router.get('/fav', getFavorite)
router.post('/fav', postFavorite) //Esta ruta debe llevar el parámetro fav con los datos del personaje que quiero agregar
router.delete('/fav/:id', deleteFavorite)
router.get('/allCharacters', getAllChars)
router.get('/deleteFavorites', deleteFavorites)

module.exports = { router };

