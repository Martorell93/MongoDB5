//Controlador de la API IMDB

//Clase Profesional
class Professional {
    constructor (name, surname, age, genre, profession)
    {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.genre = genre;
        this.profession = profession;
    }
};

//Clase Pelicula
class Pelicula {
    constructor(title, releaseYear, nationality, genre, actores, guionistas, directores)
    {
        this.title = title;
        this.releaseYear = releaseYear;
        this.nationality = nationality;
        this.genre = genre;
        this.actores = actores;
        this.guionistas = guionistas;
        this.directores = directores;
    }
};

//Llamada Profesionales a la API método GET
async function getPro() {
    if (document.getElementById("cuerpo")) {
        document.getElementById("cuerpo").remove();
    }
    //Coger id del elemento
    let id = document.getElementById("id").value;

    //Crear el cuerpo de la tabla
    let cuerpo = document.createElement("tbody");
    cuerpo.setAttribute("id", "cuerpo");
    let posicion = document.getElementById("tabla");
    posicion.appendChild(cuerpo);
    
    //Si tiene un id
    if (id) {
        let url = `http://localhost:4000/profesionales?id=${id}`;
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            method: "GET"
        }

        try {
            //Solicito la información a la API -> BBDD
            let data = await fetch(url, param);
            let result = await data.json();

            //Posiciono los datos obtenidos en la tabla
            let posicion = document.getElementById("cuerpo");
            let row = document.createElement("tr");
            let th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.textContent = result._id;
            let td1 = document.createElement("td");
            td1.textContent = result.name;
            let td2 = document.createElement("td");
            td2.textContent = result.surname;
            let td3 = document.createElement("td");
            td3.textContent = result.age;
            let td4 = document.createElement("td");
            td4.textContent = result.genre;
            let td5 = document.createElement("td");
            td5.textContent = result.profession;
            posicion.appendChild(row);
            row.appendChild(th);
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            row.appendChild(td4);
            row.appendChild(td5);
        }
        catch(error) {
            console.log(error);
        }
    }
    else {
        let url ="http://localhost:4000/profesionales";
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
                method: "GET"
        }
        try {
            let data = await fetch(url, param);
            let result = await data.json();
            for (let i = 0; i < result.length; i++) {
                let posicion = document.getElementById("cuerpo");
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.textContent = result[i]._id;
                let td1 = document.createElement("td");
                td1.textContent = result[i].name;
                let td2 = document.createElement("td");
                td2.textContent = result[i].surname;
                let td3 = document.createElement("td");
                td3.textContent = result[i].age;
                let td4 = document.createElement("td");
                td4.textContent = result[i].genre;
                let td5 = document.createElement("td");
                td5.textContent = result[i].profession;
                posicion.appendChild(row);
                row.appendChild(th);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);
                row.appendChild(td5);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada profesional a la API método POST
async function postPro() {
    try
    {
        let pro = new Professional (
            document.getElementById("nombre").value,
            document.getElementById("apellidos").value, 
            document.getElementById("edad").value,
            document.getElementById("genero").value, 
            document.getElementById("profesion").value
        )

        let url ="http://localhost:4000/profesionales";

        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: JSON.stringify(pro),
            method: "POST"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada profesionales a la API método PUT
async function putPro() {
    let id = document.getElementById("id").value;
    let nuevoNombre = document.getElementById("nombre").value;
    let nuevoApellido = document.getElementById("apellidos").value;
    let nuevaEdad = document.getElementById("edad").value;
    let nuevoGenero = document.getElementById("genero").value;
    let nuevaProfesion = document.getElementById("profesion").value;
    try{
        
        let url ="http://localhost:4000/profesionales";
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            body: 
                JSON.stringify({name : nuevoNombre,
                surname : nuevoApellido,
                age: nuevaEdad,
                genre: nuevoGenero,
                profession: nuevaProfesion,
                id : id})
            ,
            method: "PUT"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada Profesionales a la API método DELETE
async function deletePro() {
    let id = document.getElementById("id").value;
    let body1 = {id: id};
    try
    {
        let url ="http://localhost:4000/profesionales";
        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: JSON.stringify(body1),
            method: "DELETE"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada Peliculas a la API método GET
async function getInfo() {
    let actor = document.getElementById("actor").checked;
    let guionista = document.getElementById("guionista").checked;
    let director = document.getElementById("director").checked;
    if (actor) {
        getPeliActores();
    }
    else if (guionista) {
        getPeliGuionistas();
    }
    else if (director) {
        getPeliDirectores();
    }
    else {
        if (document.getElementById("tabla")) {
            document.getElementById("tabla").remove();
        }
        //Coger id del elemento
        let id = document.getElementById("id").value;

        //Crear el cuerpo de la tabla
        let cuerpo = document.createElement("table");
        // cuerpo.setAttribute("class", "space")
        cuerpo.setAttribute("id", "tabla");
        let posicion = document.getElementById("info");
        posicion.appendChild(cuerpo);
        let cuerpo2 = document.createElement("thead");
        let cuerpo3 = document.createElement("tr");
        cuerpo.appendChild(cuerpo2);
        cuerpo2.appendChild(cuerpo3);
        let header1 = document.createElement('th');
        header1.setAttribute("scope", "col");
        header1.textContent = "id";
        let header2 = document.createElement('th');
        header2.setAttribute("scope", "col");
        header2.textContent = "Titulo";
        let header3 = document.createElement('th');
        header3.setAttribute("scope", "col");
        header3.textContent = "Fecha de lanzamiento";
        let header4 = document.createElement('th');
        header4.setAttribute("scope", "col");
        header4.textContent = "Nacionalidad";
        let header5 = document.createElement('th');
        header5.setAttribute("scope", "col");
        header5.textContent = "Género";
        let header6 = document.createElement('th');
        header6.setAttribute("scope", "col");
        header6.setAttribute("class", "colum");
        header6.textContent = "id Actores";
        let header7 = document.createElement('th');
        header7.setAttribute("scope", "col");
        header7.setAttribute("class", "colum");
        header7.textContent = "id Guionistas";
        let header8 = document.createElement('th');
        header8.setAttribute("scope", "col");
        header8.setAttribute("class", "colum");
        header8.textContent = "id Directores";
        cuerpo3.appendChild(header1);
        cuerpo3.appendChild(header2);
        cuerpo3.appendChild(header3);
        cuerpo3.appendChild(header4);
        cuerpo3.appendChild(header5);
        cuerpo3.appendChild(header6);
        cuerpo3.appendChild(header7);
        cuerpo3.appendChild(header8);
        let cuerpo4 = document.createElement("tbody");
        cuerpo4.setAttribute("id", "cuerpo");
        let posicion2 = document.getElementById("tabla");
        posicion2.appendChild(cuerpo4);
        
        //Si tiene un id
        if (id) {
            let url = `http://localhost:4000/peliculas?id=${id}`;
            let param = {
                headers: {
                    "Content-type": "application/json; charset= UTF-8"
                },
                method: "GET"
            }

            try {
                //Solicito la información a la API -> BBDD
                let data = await fetch(url, param);
                let result = await data.json();

                //Posiciono los datos obtenidos en la tabla
                let posicion = document.getElementById("cuerpo");
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.textContent = result._id;
                let td1 = document.createElement("td");
                td1.textContent = result.title;
                let td2 = document.createElement("td");
                td2.textContent = result.releaseYear;
                let td3 = document.createElement("td");
                td3.textContent = result.nationality;
                let td4 = document.createElement("td");
                td4.textContent = result.genre;
                let td5 = document.createElement("td");
                td5.textContent = result.actores;
                let td6 = document.createElement("td");
                td6.textContent = result.guionistas;
                let td7 = document.createElement("td");
                td7.textContent = result.directores;
                posicion.appendChild(row);
                row.appendChild(th);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);
                row.appendChild(td6);
                row.appendChild(td7);
            }
            catch(error) {
                console.log(error);
            }
        }
        else {
            let url ="http://localhost:4000/peliculas";
            let param = {
                headers: {
                    "Content-type": "application/json; charset= UTF-8"
                },
                    method: "GET"
            }
            try {
                let data = await fetch(url, param);
                let result = await data.json();
                for (let i = 0; i < result.length; i++) {
                    let posicion = document.getElementById("cuerpo");
                    let row = document.createElement("tr");
                    let th = document.createElement("th");
                    th.setAttribute("scope", "row");
                    th.textContent = result[i]._id;
                    let td1 = document.createElement("td");
                    td1.textContent = result[i].title;
                    let td2 = document.createElement("td");
                    td2.textContent = result[i].releaseYear;
                    let td3 = document.createElement("td");
                    td3.textContent = result[i].nationality;
                    let td4 = document.createElement("td");
                    td4.textContent = result[i].genre;
                    let td5 = document.createElement("td");
                    td5.textContent = result[i].actores;
                    let td6 = document.createElement("td");
                    td6.textContent = result[i].guionistas;
                    let td7 = document.createElement("td");
                    td7.textContent = result[i].directores;
                    posicion.appendChild(row);
                    row.appendChild(th);
                    row.appendChild(td1);
                    row.appendChild(td2);
                    row.appendChild(td3);
                    row.appendChild(td4);
                    row.appendChild(td5);
                    row.appendChild(td6);
                    row.appendChild(td7);
                }
            }
            catch(error) {
                console.log(error);
            }
        }
        let arrE = document.getElementById("prueba");
        arrE.reset();
    }
};

//Llamada actor de la pelicula a la API método GET
async function getPeliActores() {
    if (document.getElementById("tabla")) {
        document.getElementById("tabla").remove();
    }
    //Coger id del elemento
    let id = document.getElementById("id2").value;

    //Crear el cuerpo de la tabla
    let cuerpo = document.createElement("table");
    cuerpo.setAttribute("class", "table table-hover box_center_rounded")
    cuerpo.setAttribute("id", "tabla");
    let posicion = document.getElementById("info");
    posicion.appendChild(cuerpo);
    let cuerpo2 = document.createElement("tbody");
    cuerpo2.setAttribute("id", "cuerpo");
    let cuerpo3 = document.createElement("thead");
    let cuerpo1 = document.createElement("tr");
    let header1 = document.createElement("th");
    header1.setAttribute("scope", "col");
    header1.textContent = "Id";
    let header2 = document.createElement("th");
    header2.setAttribute("scope", "col");
    header2.textContent = "Nombre";
    let header3 = document.createElement("th");
    header3.setAttribute("scope", "col");
    header3.textContent = "Apellidos";
    let header4 = document.createElement("th");
    header4.setAttribute("scope", "col");
    header4.textContent = "Edad";
    let header5 = document.createElement("th");
    header5.setAttribute("scope", "col");
    header5.textContent = "Genero";
    let header6 = document.createElement("th");
    header6.setAttribute("scope", "col");
    header6.textContent = "Profesión";
    cuerpo.appendChild(cuerpo3);
    cuerpo.appendChild(cuerpo2);
    cuerpo2.appendChild(cuerpo1);
    cuerpo1.appendChild(header1);
    cuerpo1.appendChild(header2);
    cuerpo1.appendChild(header3);
    cuerpo1.appendChild(header4);
    cuerpo1.appendChild(header5);
    cuerpo1.appendChild(header6);
    
    //Si tiene un id
    if (id) {
        let url = `http://localhost:4000/peliculas/actor?idPelicula=${id}`;
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            method: "GET"
        }

        try {
            //Solicito la información a la API -> BBDD
            let data = await fetch(url, param);
            let result = await data.json();
            let actorInfo = result.actores;

            //Posiciono los datos obtenidos en la tabla
            for (let i = 0; i < actorInfo.length; i++) {
                let posicion = document.getElementById("cuerpo");
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.textContent = actorInfo[i]._id;
                let td1 = document.createElement("td");
                td1.textContent = actorInfo[i].name;
                let td2 = document.createElement("td");
                td2.textContent = actorInfo[i].surname;
                let td3 = document.createElement("td");
                td3.textContent = actorInfo[i].age;
                let td4 = document.createElement("td");
                td4.textContent = actorInfo[i].genre;
                let td5 = document.createElement("td");
                td5.textContent = actorInfo[i].profession;
                posicion.appendChild(row);
                row.appendChild(th);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada Guionista de la peli a la API método GET
async function getPeliGuionistas() {
    if (document.getElementById("tabla")) {
        document.getElementById("tabla").remove();
    }
    //Coger id del elemento
    let id = document.getElementById("id2").value;

    //Crear el cuerpo de la tabla
    let cuerpo = document.createElement("table");
    cuerpo.setAttribute("class", "table table-hover box_center_rounded space")
    cuerpo.setAttribute("id", "tabla");
    let posicion = document.getElementById("info");
    posicion.appendChild(cuerpo);
    let cuerpo2 = document.createElement("tbody");
    cuerpo2.setAttribute("id", "cuerpo");
    let cuerpo3 = document.createElement("thead");
    let cuerpo1 = document.createElement("tr");
    let header1 = document.createElement("th");
    header1.setAttribute("scope", "col");
    header1.textContent = "Id";
    let header2 = document.createElement("th");
    header2.setAttribute("scope", "col");
    header2.textContent = "Nombre";
    let header3 = document.createElement("th");
    header3.setAttribute("scope", "col");
    header3.textContent = "Apellidos";
    let header4 = document.createElement("th");
    header4.setAttribute("scope", "col");
    header4.textContent = "Edad";
    let header5 = document.createElement("th");
    header5.setAttribute("scope", "col");
    header5.textContent = "Genero";
    let header6 = document.createElement("th");
    header6.setAttribute("scope", "col");
    header6.textContent = "Profesión";
    cuerpo.appendChild(cuerpo3);
    cuerpo.appendChild(cuerpo2);
    cuerpo2.appendChild(cuerpo1);
    cuerpo1.appendChild(header1);
    cuerpo1.appendChild(header2);
    cuerpo1.appendChild(header3);
    cuerpo1.appendChild(header4);
    cuerpo1.appendChild(header5);
    cuerpo1.appendChild(header6);
    
    //Si tiene un id
    if (id) {
        let url = `http://localhost:4000/peliculas/guionista?idPelicula=${id}`;
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            method: "GET"
        }

        try {
            //Solicito la información a la API -> BBDD
            let data = await fetch(url, param);
            let result = await data.json();
            let actorInfo = result.guionistas;

            //Posiciono los datos obtenidos en la tabla
            for (let i = 0; i < actorInfo.length; i++) {
            let posicion = document.getElementById("cuerpo");
            let row = document.createElement("tr");
            let th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.textContent = actorInfo[i]._id;
            let td1 = document.createElement("td");
            td1.textContent = actorInfo[i].name;
            let td2 = document.createElement("td");
            td2.textContent = actorInfo[i].surname;
            let td3 = document.createElement("td");
            td3.textContent = actorInfo[i].age;
            let td4 = document.createElement("td");
            td4.textContent = actorInfo[i].genre;
            let td5 = document.createElement("td");
            td5.textContent = actorInfo[i].profession;
            posicion.appendChild(row);
            row.appendChild(th);
            row.appendChild(td1);
            row.appendChild(td2);
            row.appendChild(td3);
            row.appendChild(td4);
            row.appendChild(td5);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada Directores de la pelicula a la API método GET
async function getPeliDirectores() {
    if (document.getElementById("tabla")) {
        document.getElementById("tabla").remove();
    }
    //Coger id del elemento
    let id = document.getElementById("id2").value;

    //Crear el cuerpo de la tabla
    let cuerpo = document.createElement("table");
    cuerpo.setAttribute("class", "table table-hover box_center_rounded")
    cuerpo.setAttribute("id", "tabla");
    let posicion = document.getElementById("info");
    posicion.appendChild(cuerpo);
    let cuerpo2 = document.createElement("tbody");
    cuerpo2.setAttribute("id", "cuerpo");
    let cuerpo3 = document.createElement("thead");
    let cuerpo1 = document.createElement("tr");
    let header1 = document.createElement("th");
    header1.setAttribute("scope", "col");
    header1.textContent = "Id";
    let header2 = document.createElement("th");
    header2.setAttribute("scope", "col");
    header2.textContent = "Nombre";
    let header3 = document.createElement("th");
    header3.setAttribute("scope", "col");
    header3.textContent = "Apellidos";
    let header4 = document.createElement("th");
    header4.setAttribute("scope", "col");
    header4.textContent = "Edad";
    let header5 = document.createElement("th");
    header5.setAttribute("scope", "col");
    header5.textContent = "Genero";
    let header6 = document.createElement("th");
    header6.setAttribute("scope", "col");
    header6.textContent = "Profesión";
    cuerpo.appendChild(cuerpo3);
    cuerpo.appendChild(cuerpo2);
    cuerpo2.appendChild(cuerpo1);
    cuerpo1.appendChild(header1);
    cuerpo1.appendChild(header2);
    cuerpo1.appendChild(header3);
    cuerpo1.appendChild(header4);
    cuerpo1.appendChild(header5);
    cuerpo1.appendChild(header6);
    
    //Si tiene un id
    if (id) {
        let url = `http://localhost:4000/peliculas/director?idPelicula=${id}`;
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            method: "GET"
        }

        try {
            //Solicito la información a la API -> BBDD
            let data = await fetch(url, param);
            let result = await data.json();
            let actorInfo = result.directores;

            //Posiciono los datos obtenidos en la tabla
            for (let i = 0; i < actorInfo.length; i++) {
                let posicion = document.getElementById("cuerpo");
                let row = document.createElement("tr");
                let th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.textContent = actorInfo[i]._id;
                let td1 = document.createElement("td");
                td1.textContent = actorInfo[i].name;
                let td2 = document.createElement("td");
                td2.textContent = actorInfo[i].surname;
                let td3 = document.createElement("td");
                td3.textContent = actorInfo[i].age;
                let td4 = document.createElement("td");
                td4.textContent = actorInfo[i].genre;
                let td5 = document.createElement("td");
                td5.textContent = actorInfo[i].profession;
                posicion.appendChild(row);
                row.appendChild(th);
                row.appendChild(td1);
                row.appendChild(td2);
                row.appendChild(td3);
                row.appendChild(td4);
                row.appendChild(td5);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada pelicula a la API método POST
async function postInfo() {
    let actor = document.getElementById("actor").checked;
    let guionista = document.getElementById("guionista").checked;
    let director = document.getElementById("director").checked;
    if (actor) {
        postPeliActores();
    }
    else if (guionista) {
        postPeliGuionista();
    }
    else if (director) {
        postPeliDirector();
    }
    else {
        try
        {
            let pro = new Pelicula (
                document.getElementById("titulo").value,
                document.getElementById("anoLanzamiento").value, 
                document.getElementById("nacionalidad").value,
                document.getElementById("genero").value, 
                document.getElementById("actores").value,
                document.getElementById("guionista").value,
                document.getElementById("director").value,
            )

            let url ="http://localhost:4000/peliculas";

            let param =
            {
                headers: {"Content-type": "application/json; chasert= UTF-8"},
                body: JSON.stringify(pro),
                method: "POST"
            }
            let data = await fetch(url, param);
            let result = await data.json();

            console.log(result);
        }
        catch(error) 
        {
            console.log(error);
        }
        let arrE = document.getElementById("prueba");
        arrE.reset();
    }
};

//Llamada actor sobre peli a la API método POST
async function postPeliActores() {
    let id = document.getElementById("id").value;
    let nuevoNombre = document.getElementById("nombre").value;
    let nuevoApellido = document.getElementById("apellidos").value;
    let nuevaEdad = document.getElementById("edad").value;
    let nuevoGenero = document.getElementById("genero2").value;
    try
    {

        let url ="http://localhost:4000/peliculas/actor";

        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: 
                JSON.stringify({name : nuevoNombre,
                surname : nuevoApellido,
                age: nuevaEdad,
                genre: nuevoGenero,
                id : id})
            ,
            method: "POST"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada guionista sobre peli a la API método POST
async function postPeliGuionista() {
    let id = document.getElementById("id").value;
    let nuevoNombre = document.getElementById("nombre").value;
    let nuevoApellido = document.getElementById("apellidos").value;
    let nuevaEdad = document.getElementById("edad").value;
    let nuevoGenero = document.getElementById("genero2").value;
    try
    {
        let url ="http://localhost:4000/peliculas/guionista";

        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: 
                JSON.stringify({name : nuevoNombre,
                surname : nuevoApellido,
                age: nuevaEdad,
                genre: nuevoGenero,
                id : id})
            ,
            method: "POST"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada director sobre peli a la API método POST
async function postPeliDirector() {
    let id = document.getElementById("id").value;
    let nuevoNombre = document.getElementById("nombre").value;
    let nuevoApellido = document.getElementById("apellidos").value;
    let nuevaEdad = document.getElementById("edad").value;
    let nuevoGenero = document.getElementById("genero2").value;
    try
    {
        let url ="http://localhost:4000/peliculas/director";

        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: 
                JSON.stringify({name : nuevoNombre,
                surname : nuevoApellido,
                age: nuevaEdad,
                genre: nuevoGenero,
                id : id})
            ,
            method: "POST"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada profesionales a la API método PUT
async function putPeli() {
    let id = document.getElementById("id").value;
    let nuevoTitulo = document.getElementById("titulo").value;
    let nuevoAno = document.getElementById("anoLanzamiento").value;
    let nuevaNacionalidad = document.getElementById("nacionalidad").value;
    let nuevoGenero = document.getElementById("genero").value;
    let nuevaActor = document.getElementById("actores").value;
    let nuevaGuionista = document.getElementById("guionistas").value;
    let nuevaDirector = document.getElementById("directores").value;
    try{
        
        let url ="http://localhost:4000/profesionales";
        let param = {
            headers: {
                "Content-type": "application/json; charset= UTF-8"
            },
            body: 
                JSON.stringify({title : nuevoTitulo,
                releaseYear : nuevoAno,
                nationality: nuevaNacionalidad,
                genre: nuevoGenero,
                actores: nuevaActor,
                guionistas: nuevaGuionista,
                directores: nuevaDirector,
                id : id})
            ,
            method: "PUT"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada Peliculas a la API método DELETE
async function deleteInfo() {
    let actor = document.getElementById("actor").checked;
    let guionista = document.getElementById("guionista").checked;
    let director = document.getElementById("director").checked;
    if (actor) {
        deletePeliActor();
    }
    else if (guionista) {
        deletePeliGuionista();
    }
    else if (director) {
        deletePeliDirector();
    }
    else {
        let id = document.getElementById("id").value;
        let body1 = {id: id};
        try
        {
            let url ="http://localhost:4000/peliculas";
            let param =
            {
                headers: {"Content-type": "application/json; chasert= UTF-8"},
                body: JSON.stringify(body1),
                method: "DELETE"
            }
            let data = await fetch(url, param);
            let result = await data.json();

            console.log(result);
        }
        catch(error) 
        {
            console.log(error);
        }
        let arrE = document.getElementById("prueba");
        arrE.reset();
    }
};

//Llamada Actores sobre peli a la API método DELETE
async function deletePeliActor() {
    let id = document.getElementById("id").value;
    let idPro = document.getElementById("idPro").value;
    let body1 = {id: id, idPro: idPro};
    try
    {
        let url ="http://localhost:4000/peliculas/actor";
        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: JSON.stringify(body1),
            method: "DELETE"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada guionistas sobre peli a la API método DELETE
async function deletePeliGuionista() {
    let id = document.getElementById("id").value;
    let idPro = document.getElementById("idPro").value;
    let body1 = {id: id, idPro: idPro};
    try
    {
        let url ="http://localhost:4000/peliculas/guionista";
        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: JSON.stringify(body1),
            method: "DELETE"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Llamada directores sobre peli a la API método DELETE
async function deletePeliDirector() {
    let id = document.getElementById("id").value;
    let idPro = document.getElementById("idPro").value;
    let body1 = {id: id, idPro: idPro};
    try
    {
        let url ="http://localhost:4000/peliculas/director";
        let param =
        {
            headers: {"Content-type": "application/json; chasert= UTF-8"},
            body: JSON.stringify(body1),
            method: "DELETE"
        }
        let data = await fetch(url, param);
        let result = await data.json();

        console.log(result);
    }
    catch(error) 
    {
        console.log(error);
    }
    let arrE = document.getElementById("prueba");
    arrE.reset();
};

//Eliminar info
function eliminarInfo() {
    let posicion = document.getElementById("cuerpo");
    posicion.remove();
}

function eliminarInfo2() {
    let posicion = document.getElementById("cuerpo2");
    posicion.remove();
}

function eliminarInfo3() {
    let posicion = document.getElementById("cuerpo3");
    posicion.remove();
}

function radioButton() {
    let peli = document.getElementById('peli').checked;
    if(!peli){ 
        let posicion = document.getElementById("datos");
        posicion.setAttribute("style", "display: none");
        let posicion2 = document.getElementById("datos2");
        posicion2.setAttribute("style", "display: flex")
    }
    else {
        let posicion = document.getElementById("datos2");
        posicion.setAttribute("style", "display: none");
        let posicion2 = document.getElementById("datos");
        posicion2.setAttribute("style", "display: flex")
    }
}