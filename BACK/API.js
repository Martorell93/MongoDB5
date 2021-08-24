//Importamos los módulos necesarios
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Professional = require("./profesionalSchema");
const Pelicula = require("./peliculasSchema");

//Conecto con la BBDD de Mongo
const urlDataBase = "mongodb://localhost:27017/IMDB";
function crearConexion() {
    mongoose.connect(urlDataBase, 
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then((db)=>console.log("db connected"))
    .catch((err)=> console.log(err))
}

//Uso del express y JSONs
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//Metódo GET sobre profesionales
app.get("/profesionales", 
    function(request, response)
        {
            crearConexion()
            let id = request.query.id;
            if (id) {
                Professional.Professional.findOne({_id: id})
                .then(function(data)
                {
                    response.status(200).send(data);
                    mongoose.disconnect();
                    console.log(`Se ha pedido un GET del profesional id ${id}`)
                })
                .catch(function (err)
                {
                    console.log(err)
                    mongoose.disconnect();
                })
            }
            else {
                console.log("Entra")
                Professional.Professional.find({})
                .then(function(data)
                {
                    response.status(200).send(data);
                    mongoose.disconnect();
                    console.log(`Se ha pedido un GET de todos los profesionales`)
                })
                .catch(function(err)
                {
                    console.log(err);
                    mongoose.disconnect();
                })
            }
        }
);

//Método POST sobre profesionales
app.post("/profesionales", 
    function (request, response) {  
        crearConexion() 
        let newPro = new Professional.Professional ({
            name : request.body.name,
            surname: request.body.surname,
            age: request.body.age,
            genre: request.body.genre,
            profession: request.body.profession
        });
        console.log(newPro);
        Professional.Professional.create(newPro)
        .then(function(data)
        {
            response.status(200).send(data);
            mongoose.disconnect();
            console.log(`Se ha echo un POST de un profesional`)
        })
        .catch(function (err)
        {
            console.log(err);
            mongoose.disconnect();
        })
    }
);

//Método PUT sobre profesionales
app.put("/profesionales", function(request, response) {
    crearConexion()
    let id = request.body.id;
    let modPro = {};
    for (let i in request.body) {
        if (request.body[i].length != 0) {
            modPro[i] = request.body[i];
        }
    }
    Professional.Professional.updateOne({_id: id}, modPro)
    .then(function(data) {
        response.send(data);
        mongoose.disconnect();
        console.log(`Profesional actualizado con id ${id}`);
    })
    .catch(function(err) {
        console.log(err)
        mongoose.disconnect();
    })
});

//Método DEL sobre profesionales
app.delete("/profesionales", function (request, response) {
    crearConexion()
    let id = request.body.id;
    Professional.Professional.deleteOne({_id: id})
    .then(function(data) {
        response.send(data);
        mongoose.disconnect();
        console.log(`Profesional eliminado con id ${id}`);
    })
    .catch(function(err) {
        console.log(err);
        mongoose.disconnect();
    })
});

//Metódo GET sobre peliculas
app.get("/peliculas", 
    function(request, response)
        {
            crearConexion();
            let id = request.query.id;
            if (id) {
                Pelicula.Pelicula.findOne({_id: id})
                .then(function(data)
                {
                    response.status(200).send(data);
                    mongoose.disconnect();
                    console.log(`Se ha pedido un GET del peliculas id ${id}`)
                })
                .catch(function (err)
                {
                    console.log(err);
                    mongoose.disconnect();
                })
            }
            else {
                console.log("Entra")
                Pelicula.Pelicula.find({})
                .then(function(data)
                {
                    // for (let i = 0; i < data.actores.length; i++) {
                    //     let data2 = data.actores[i] + " | "
                    // }
                    
                    response.status(200).send(data);
                    mongoose.disconnect();
                    console.log(`Se ha pedido un GET de todos las peliculas`)
                })
                .catch(function(err)
                {
                    console.log(err);
                    mongoose.disconnect();
                })
            }
        }
);

//Método GET sobre peliculas para saber actores
app.get("/peliculas/actor", function(request, response) {
    crearConexion();
    let id = request.query.idPelicula;
    Pelicula.Pelicula.findOne({_id: id}, {actores: 1, _id: 0}).populate("actores")
    .then(function(data)
    {
        response.status(200).send(data);
        mongoose.disconnect();
        console.log(`Se ha pedido un GET de los actores con pelicula id ${id}`)
    })
    .catch(function (err)
    {
        console.log(err);
        mongoose.disconnect();
    })
})

//Método GET sobre peliculas para saber guionistas
app.get("/peliculas/guionista", function(request, response) {
    crearConexion();
    let id = request.query.idPelicula;
    Pelicula.Pelicula.findOne({_id: id}, {guionistas: 1, _id: 0}).populate("guionistas")
    .then(function(data)
    {
        response.status(200).send(data);
        mongoose.disconnect();
        console.log(`Se ha pedido un GET de los guionistas con pelicula id ${id}`)
    })
    .catch(function (err)
    {
        console.log(err);
        mongoose.disconnect();
    })
})

//Método GET sobre peliculas para saber directores
app.get("/peliculas/director", function(request, response) {
    crearConexion();
    let id = request.query.idPelicula;
    Pelicula.Pelicula.findOne({_id: id}, {directores: 1, _id: 0}).populate("directores")
    .then(function(data)
    {
        response.status(200).send(data);
        mongoose.disconnect();
        console.log(`Se ha pedido un GET de los directores con pelicula id ${id}`)
    })
    .catch(function (err)
    {
        console.log(err);
        mongoose.disconnect();
    })
})

//Método POST sobre pelciulas
app.post("/peliculas", 
    function (request, response) {  
        crearConexion() 
        let newPeli = new Pelicula.Pelicula ({
            title : request.body.title,
            releaseYear: request.body.releaseYear,
            nationality: request.body.nationality,
            genre: request.body.genre,
            actores: request.body.actores,
            guionistas: request.body.guionistas,
            directores: request.body.directores
        });
        let modPro = {};
    
        console.log(newPeli);
        Pelicula.Pelicula.create(newPeli)
        .then(function(data)
        {
            response.status(200).send(data);
            mongoose.disconnect();
            console.log(`Se ha echo un POST de una pelicula`)
        })
        .catch(function (err)
        {
            console.log(err);
            mongoose.disconnect();
        })
    }
);

//Metódo POST de actor de dicha peli Metodo Push y PUll de mongoose
app.post("/peliculas/actor", 
    function (request, response) {  
        crearConexion()
        const id = request.body.id;
        const newActor = new Professional.Professional ({
            name : request.body.name,
            surname: request.body.surname,
            age: request.body.age,
            genre: request.body.genre,
            profession: "actor"
        });
        Professional.Professional.create(newActor)
        .then(function(data)
        {
            Pelicula.Pelicula.findOne({_id: id}, {actores: 1})
            .then(function(data1) {
                data1.actores.push(newActor._id);
                console.log(data1);
                return Pelicula.Pelicula.updateMany({_id: id}, {actores: data1.actores})
                .then(function(data2) {
                    response.status(200).send(data2);
                    console.log(`Se ha echo un POST de un actor sobre la pelicula ${id}`)
                })
                .catch(function (err)
                {
                    console.log(err);
                    mongoose.disconnect();
                })
            })
        })
        .catch(function (err)
        {
            console.log(err);
            mongoose.disconnect();
        })
    }
);

//Metódo POST de guionista de dicha peli
app.post("/peliculas/guionista", 
    function (request, response) {  
        crearConexion()
        const id = request.body.id;
        const newGuionista = new Professional.Professional ({
            name : request.body.name,
            surname: request.body.surname,
            age: request.body.age,
            genre: request.body.genre,
            profession: "guionista"
        });
        Professional.Professional.create(newGuionista)
        .then(function(data)
        {
            Pelicula.Pelicula.findOne({_id: id}, {guionistas: 1})
            .then(function(data1) {
                data1.guionistas.push(newGuionista._id);
                console.log(data1);
                return Pelicula.Pelicula.updateMany({_id: id}, {guionistas: data1.guionistas})
                .then(function(data2) {
                    response.status(200).send(data2);
                    console.log(`Se ha echo un POST de un guionista sobre la pelicula ${id}`)
                })
                .catch(function (err)
                {
                    response.send(data);
                    mongoose.disconnect();
                })
            })
        })
        .catch(function (err)
        {
            console.log(err);
            mongoose.disconnect();
        })
    }
);

//Metódo POST de director de dicha peli
app.post("/peliculas/director", 
    function (request, response) {  
        crearConexion()
        const id = request.body.id;
        const newDirector = new Professional.Professional ({
            name : request.body.name,
            surname: request.body.surname,
            age: request.body.age,
            genre: request.body.genre,
            profession: "director"
        });
        Professional.Professional.create(newDirector)
        .then(function(data)
        {
            Pelicula.Pelicula.findOne({_id: id}, {directores: 1})
            .then(function(data1) {
                data1.directores.push(newDirector._id);
                console.log(data1);
                return Pelicula.Pelicula.updateMany({_id: id}, {directores: data1.directores})
                .then(function(data2) {
                    response.status(200).send(data2);
                    console.log(`Se ha echo un POST de un director sobre la pelicula ${id}`)
                })
                .catch(function (err)
                {
                    console.log(err);
                    mongoose.disconnect();
                })
            })
        })
        .catch(function (err)
        {
            console.log(err);
            mongoose.disconnect();
        })
    }
);

//Método PUT sobre peliculas
app.put("/peliculas", function(request, response) {
    crearConexion()
    let id = request.body.id;
    let modPro = {};
    for (let i in request.body) {
        if (i != null || i != undefined) {
            modPro[i] = request.body[i];
        }
    }
    Pelicula.Pelicula.updateOne({_id: id}, modPro)
    .then(function(data) {
        response.send(data);
        mongoose.disconnect();
        console.log(`Pelicula actualizada con id ${id}`);
    })
    .catch(function(err) {
        console.log(err);
        mongoose.disconnect();
    })
});

//Método DEL sobre peliculas
app.delete("/peliculas", function (request, response) {
    crearConexion()
    let id = request.body.id;
    Pelicula.Pelicula.deleteOne({_id: id})
    .then(function(data) {
        response.send(data);
        mongoose.disconnect();
        console.log(`Pelicula eliminada con id ${id}`);
    })
    .catch(function(err) {
        console.log(err);
        mongoose.disconnect();
    })
});

//Metódo DELETE de actor de dicha peli
app.delete("/peliculas/actor", 
    function (request, response) {  
        crearConexion()
        const id = request.body.id;
        const idPro = request.body.idPro;
        Pelicula.Pelicula.findOne({_id: id}, {actores: 1})
        .then(function(data1) {
            for (let i = 0; i < data1.actores.length; i++) {
                if(data1.actores[i] == idPro) {
                    data1.actores.splice(i, 1);
                }
            }
            console.log(data1.actores);
            return Pelicula.Pelicula.updateMany({_id: id}, {actores: data1.actores})
            .then(function(data2) {
                response.status(200).send(data2);
                console.log(`Se ha echo un DELETE de un actor sobre la pelicula ${id}`)
            })
            .catch(function (err)
            {
                console.log(err);
                mongoose.disconnect();
            })
        })
        .catch(function (err){
                console.log(err);
                mongoose.disconnect();
        })
    }
);

//Metódo PELETE de guionista de dicha peli
app.delete("/peliculas/guionista", 
    function (request, response) {  
        crearConexion()
        const id = request.body.id;
        const idPro = request.body.idPro;
        Pelicula.Pelicula.findOne({_id: id}, {guionistas: 1})
        .then(function(data1) {
            for (let i = 0; i < data1.guionistas.length; i++) {
                if(data1.guionistas[i] == idPro) {
                    data1.guionistas.splice(i, 1);
                }
            }
            console.log(data1.guionistas);
            return Pelicula.Pelicula.updateMany({_id: id}, {guionistas: data1.guionistas})
            .then(function(data2) {
                response.status(200).send(data2);
                console.log(`Se ha echo un DELETE de un guionista sobre la pelicula ${id}`)
            })
            .catch(function (err)
            {
                console.log(err);
                mongoose.disconnect();
            })
        })
        .catch(function (err){
                console.log(err);
                mongoose.disconnect();
        })
    }
);

//Metódo PELETE de guionista de dicha peli
app.delete("/peliculas/director", 
    function (request, response) {  
        crearConexion()
        const id = request.body.id;
        const idPro = request.body.idPro;
        Pelicula.Pelicula.findOne({_id: id}, {directores: 1})
        .then(function(data1) {
            for (let i = 0; i < data1.directores.length; i++) {
                if(data1.directores[i] == idPro) {
                    data1.directores.splice(i, 1);
                }
            }
            console.log(data1.directores);
            return Pelicula.Pelicula.updateMany({_id: id}, {directores: data1.directores})
            .then(function(data2) {
                response.status(200).send(data2);
                console.log(`Se ha echo un DELETE de un director sobre la pelicula ${id}`)
            })
            .catch(function (err)
            {
                console.log(err);
                mongoose.disconnect();
            })
        })
        .catch(function (err){
                console.log(err);
                mongoose.disconnect();
        })
    }
);

//listen
app.listen(4000, ()=> console.log("server on port 4000"));