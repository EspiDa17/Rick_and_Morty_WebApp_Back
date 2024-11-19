// CONTROLADOR

// EXPRESS --> Es un framework web para NODE.JS 
// ASYNC AWAIT



// ----------------------------------------------------------------------------------------
// PARA CONSEGUIR LOS PRIMEROS 100 PERSONAJES DE LA API Y 
// GUARDARLOS EN EL ARCHIVO DATA
// ----------------------------------------------------------------------------------------

// Requerimos fs para manejar archivos
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Definimos la ruta del archivo donde guardaremos los datos
const dataFilePath = path.join(__dirname, '../Data.json');

// SIEMPRE QUE CONSULTEMOS A BASES DE DATOS O HAGAMOS PETICIONES A API's
// HAY PROMESAS --> FUNCIONES ASINCRONAS


// Esta función hace una request a la API de R&M y obtiene los primeros 100 personajes
const getApiData = async () => {

    try {

        // Variable para almacenar los 100 personajes que treremos de la API
        let allCharactersInfoApi = [];
        for(let i=1 ; i<6 ; i++){
            const apiData = await axios(`https://rickandmortyapi.com/api/character?page=${i}`)
            allCharactersInfoApi.push(apiData);
        }
        
        // Promesas --> Representa la eventual finalización o falla de una operación sincrónica
        //              y su valor resultante.
        // Promise.all --> Devuelve una promesa que termina correctamente cuando todas las promesas
        //                 en el argumento iterable(allCharactersInfoApi) han sido concluidas con exito
        allCharactersInfoApi = await Promise.all(allCharactersInfoApi);
        
        // .data.results --> Necesito acceder hasta acá para acceder a la info que necesito de cada caracter
        // map --> Solo necesito traerme 7 propiedades de los personajes
        let allCharactersInfoApi2 = allCharactersInfoApi.map(response => response.data.results.map(charac => {
            return {
                id: charac.id,
                name: charac.name,
                species: charac.species,
                status: charac.status,
                origin: charac.origin.name,
                gender: charac.gender,
                image: charac.image
            }
        }))
        //console.log('Esto es la nueva info: ', allCharactersInfoApi2);

        // Como en el momento me está llegando un arreglo de arreglos con 20 objetos cada uno
        // Necesito que todos los objetos me queden en un solo arreglo
        // .flat --> Si hay varios arreglos anidados los saca a un solo arreglo
        let allCharacters = allCharactersInfoApi2.flat();
        //console.log('Esta es la respuesta: ', allCharacters);
        return allCharacters; 

    } catch (error) {
        return {error: error.message}
    }

}


// Guardar los datos obtenidos en un archivo JSON
// Esta función es asíncrona porque espera a que se ejecute le función 'getApiData'
const saveApiData = async () => {
    try {
        
        const characterAll = await getApiData();

        // Convertimos los datos en un string JSON
        const jsonData = JSON.stringify(characterAll, null, 2);

        // Guardamos los datos en un archivo llamado Data.json
        fs.writeFileSync(dataFilePath, jsonData);
        
        console.log('Se guardaron los datos en Data.json');
        console.log("----------------------------------------------------------------");

    } 
    catch (error) {
        console.log('Hubo un problema al guardar en Data.json');
        console.log("----------------------------------------------------------------");
        return {error: error.message};
    }
}

// NODE JS
module.exports = {
    saveApiData
};
