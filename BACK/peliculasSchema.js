//Import
const mongoose = require("mongoose");

//Schema de peliculas
const PeliculasSchema = new mongoose.Schema({
    title: String,
    releaseYear: Date,
    nationality: String,
    genre: {
        type: String,
        enum: ["fantasía", "comedia", "acción", "drama", "romantico"]
    },
    actores : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professional"
    }],
    guionistas : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professional"
    }],
    directores : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Professional"
    }]
});

//Creo el modelo sobre peliculas
const Pelicula = mongoose.model("Pelicula", PeliculasSchema);

//Exports
module.exports = {
    Pelicula,
    PeliculasSchema
}