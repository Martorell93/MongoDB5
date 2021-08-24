//Import
const mongoose = require("mongoose");
const Pelicula = require("./peliculasSchema");
const Professional = require("./profesionalSchema");

//Conecto con la BBDD de Mongo
mongoose.connect("mongodb://localhost:27017/IMDB", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

//Creo documentos sobre peliculas y professional
const pro1 = new Professional.Professional ({
    "name" : "Leopoldo",
    "surname": "Pérez",
    "age" : 45,
    "genre": "masculino",
    "profession": "actor"
})

const pro2 = new Professional.Professional ({
    "name" : "María",
    "surname": "Gimenez",
    "age" : 23,
    "genre": "femenino",
    "profession": "actor"
})

const pro3 = new Professional.Professional ({
    "name" : "Alfredo",
    "surname": "Romario",
    "age" : 12,
    "genre": "masculino",
    "profession": "actor"
})

const pro4 = new Professional.Professional ({
    "name" : "Esther",
    "surname": "Diaz",
    "age" : 5,
    "genre": "femenino",
    "profession": "actor"
})

const pro5 = new Professional.Professional ({
    "name" : "Yolanda",
    "surname": "Abejo",
    "age" : 33,
    "genre": "femenino",
    "profession": "actor"
})

const pro6 = new Professional.Professional ({
    "name" : "Mario",
    "surname": "Gómez",
    "age" : 40,
    "genre": "masculino",
    "profession": "guionista"
})

const pro7 = new Professional.Professional ({
    "name" : "Beatriz",
    "surname": "Dominguez",
    "age" : 22,
    "genre": "femenino",
    "profession": "guionista"
})

const pro8 = new Professional.Professional ({
    "name" : "Eduardo",
    "surname": "Esteban",
    "age" : 29,
    "genre": "masculino",
    "profession": "guionista"
})

const pro9 = new Professional.Professional ({
    "name" : "Africa",
    "surname": "Jello",
    "age" : 37,
    "genre": "femenino",
    "profession": "guionista"
})

const pro10 = new Professional.Professional ({
    "name" : "Javier",
    "surname": "López",
    "age" : 55,
    "genre": "masculino",
    "profession": "director"
})

const pro11 = new Professional.Professional ({
    "name" : "María",
    "surname": "Yolins",
    "age" : 42,
    "genre": "femenino",
    "profession": "director"
})

const peli1 = new Pelicula.Pelicula ({
    "title": "Amancer sobre la luna",
    "realeaseYear": "2012-03-24",
    "nationality": "Alemana",
    "genre": "drama",
    "actores": ["611e6af68e2dde6624d2c993", "611e6af68e2dde6624d2c994", "611e6af68e2dde6624d2c995", "611e6af68e2dde6624d2c996"],
    "guionistas" : ["611e6af68e2dde6624d2c99a", "611e6af68e2dde6624d2c999"],
    "directores": ["611e6af68e2dde6624d2c99d"]
})

const peli2 = new Pelicula.Pelicula ({
    "title": "2099 fin",
    "realeaseYear": "2019-08-12",
    "nationality": "Inglesa",
    "genre": "acción",
    "actores": ["611e6af68e2dde6624d2c997", "611e6af68e2dde6624d2c994"],
    "guionistas" : ["611e6af68e2dde6624d2c99b"],
    "directores": ["611e6af68e2dde6624d2c99d", "611e6af68e2dde6624d2c99c"]
})

const peli3 = new Pelicula.Pelicula ({
    "title": "Hormigas",
    "realeaseYear": "2021-01-20",
    "nationality": "Española",
    "genre": "fantasía",
    "actores": ["611e6af68e2dde6624d2c994", "611e6af68e2dde6624d2c993", "611e6af68e2dde6624d2c996"],
    "guionistas" : ["611e6af68e2dde6624d2c99b", "611e6af68e2dde6624d2c99a"],
    "directores": ["611e6af68e2dde6624d2c99c"]
})

//Inserto los documentos creados

// Professional.Professional.insertMany([pro1, pro2, pro3, pro4, pro5, pro6, pro7, pro8, pro9, pro10, pro11])
// .then(function(data) {
//     console.log("Se han creado los professionales: ", data);
//     mongoose.disconnect();
// })
// .catch(function(err) {
//     console.log(err);
//     mongoose.disconnect();
// })

// Pelicula.Pelicula.insertMany([peli1, peli2, peli3])
// .then(function(data) {
//     console.log("Se han creado las películas ", data)
//     mongoose.disconnect();
// })
// .catch(function(err) {
//     console.log(err);
//     mongoose.disconnect();
// })

// Professional.Professional.insertMany([pro1, pro2, pro3, pro4, pro5, pro6, pro7, pro8, pro9, pro10, pro11])
// .then(function(data) {
//     console.log("Se han creado los professionales: ", data);
//     Pelicula.Pelicula.insertMany([peli1, peli2, peli3])
//     .then (function(data1) {
//         console.log(typeof data[0]._id);
//         data1[0].actores.push(data[0]._id);
//         data1[0].actores.push(data[3]._id);
//         data1[0].actores.push(data[5]._id);
//         data1[0].guionistas.push(data[7]._id); 
//         data1[0].guionistas.push(data[8]._id);
//         data1[0].directores.push(data[10]._id);
//         data1[1].actores.push(data[1]._id);
//         data1[1].actores.push(data[4]._id);
//         data1[1].guionistas.push(data[7]._id);
//         data1[1].guionistas.push(data[6]._id);
//         data1[1].directores.push(data[10]._id);
//         data1[1].directores.push(data[9]._id);
//         data1[2].actores.push(data[3]._id);
//         data1[2].actores.push(data[4]._id);
//         data1[2].actores.push(data[5]._id);
//         data1[2].guionistas.push(data[6]._id);
//         data1[2].directores.push(data[9]._id);
//         console.log("Se han creado las películas", data1);
//         mongoose.disconnect();
//     })
//     .catch(function(err) {
//         console.log(err);
//         mongoose.disconnect();
//     })
// })
// .catch(function(err) {
//     console.log(err);
//     mongoose.disconnect();
// })