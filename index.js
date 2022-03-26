const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8082;
const BASE_API_URL = "/api/v1";

app.use(bodyParser.json());
app.use("/", express.static('public'));

app.get("/cool", (req, res) => {
    console.log("Requested / route");
    res.send(`<html>
                <body>
                    <h1>`+ cool() + `</h1>
                </body>
            </html>`);
})

app.listen(port, () => {
    console.log(`Server ready at port ${port}`)
});



// ############################# Antonio #############################
var inUseVehicles = [];
const API_IUV_DOC = "https://documenter.getpostman.com/view/19548804/UVyn2JQg"

app.get(BASE_API_URL + "/docs", (req, res) => {
    res.redirect(API_IUV_DOC);
})


// RECURSO BASE
app.get(BASE_API_URL + "/in-use-vehicles", (req, res) => {
    res.send(JSON.stringify(inUseVehicles, null, 2));
})

// CREACION DE DATOS
app.get(BASE_API_URL + "/in-use-vehicles/loadInitialData", (req, res) => {
    inUseVehicles = [];
    var iniData = [
        {
            country: "spain",
            year:2020,
            veh_use_comm: 4538423,
            veh_use_pass: 25169158,
            veh_use_per_1000: 626.76,
        },
        {
            country: "germany",
            year: 2020,
            veh_use_comm: 4027249,
            veh_use_pass: 48248584,
            veh_use_per_1000: 628.66,
        },
        {
            country: "united kingdom",
            year: 2020,
            veh_use_comm: 5949323,
            veh_use_pass: 42403988,
            veh_use_per_1000: 632.65,
        },
        {
            country: "france",
            year: 2020,
            veh_use_comm: 6598185,
            veh_use_pass: 44944450,
            veh_use_per_1000: 666.44,
        },
        {
            country: "italy",
            year: 2020,
            veh_use_comm: 5281807,
            veh_use_pass: 44999681,
            veh_use_per_1000: 759.39,
        },
        {
            country: "spain",
            year: 2019,
            veh_use_comm: 4444698,
            veh_use_pass: 25008222,
            veh_use_per_1000: 622.25
        }
    ];
    iniData.forEach((e) => {
        inUseVehicles.push(e);
    });
    res.send(JSON.stringify(inUseVehicles, null, 2));
})

// ACCEDER A ESTADISTICAS DE UN PAIS
app.get(BASE_API_URL + "/in-use-vehicles/:country", (req, res) => {
    var iuvCountry = req.params.country;
    filteredIuv = inUseVehicles.filter((e) => {
        return (e.country == iuvCountry);
    });
    if (filteredIuv == 0) {
        res.sendStatus(404, "NOT FOUND");
    }
    else {
        res.send(JSON.stringify(filteredIuv, null, 2));
    }
})


// ACCEDER A UNA ESTADISTICA CONCRETA
app.get(BASE_API_URL + "/in-use-vehicles/:country/:year", (req, res) => {
    var iuvCountry = req.params.country;
    var iuvYear = req.params.year;
    filteredIuv = inUseVehicles.filter((e) => {
        return ((e.country == iuvCountry) && (e.year == iuvYear));
    });
    if (filteredIuv == 0) {
        res.sendStatus(404, "NOT FOUND");
    }
    else {
        res.send(JSON.stringify(filteredIuv[0], null, 2));
    }
})


//BORRAR TODAS LAS ESTADISTICAS
app.delete(BASE_API_URL+"/in-use-vehicles", (req,res) => {
    inUseVehicles  = [];
    res.sendStatus(200, "OK");
})



//BORRAR UNA ESTADISTICA SEGUN EL PAIS
app.delete(BASE_API_URL+"/in-use-vehicles/:country", (req,res) => {
    var iuvCountry = req.params.country;
    filteredIuv = inUseVehicles.filter( (e) => {
        return ((e.country == iuvCountry));
    });
    if(filteredIuv == 0){
        res.sendStatus(404,"NOT FOUND");
    }
    else{
        inUseVehicles = inUseVehicles.filter( (e) => {
            return ((e.country != iuvCountry));
        });
    }
    res.sendStatus(200, "OK");
})


//BORRAR UNA ESTADISTICA CONCRETA
app.delete(BASE_API_URL+"/in-use-vehicles/:country/:year", (req,res) => {
    var iuvCountry = req.params.country;
    var iuvYear = req.params.year;
    filteredIuv = inUseVehicles.filter( (e) => {
        return ((e.country == iuvCountry) && (e.year == iuvYear));
    });
    if(filteredIuv == 0){
        res.sendStatus(404,"NOT FOUND");
    }
    else{
        var i = inUseVehicles.indexOf(filteredIuv[0]);
        if(i!==-1){
            inUseVehicles.splice(i,1);
        }
    }
    res.sendStatus(200, "OK");
})


// CREAR NUEVA ESTADISTICA
function camposIncorrectos(e){
    return (Object.keys(e.body).length != 5 ||
        e.body.country == null ||
        e.body.year == null ||
        e.body.veh_use_comm == null || 
        e.body.veh_use_pass == null || 
        e.body.veh_use_per_1000 == null);
}

app.post(BASE_API_URL+"/in-use-vehicles", (req,res) => {
    if(camposIncorrectos(req)){
        res.sendStatus(400,"BAD REQUEST")
    }
    else{
        filteredIuv = inUseVehicles.filter( (e) => {
            return (e.country == req.body.country
                &&  e.year == req.body.year
                &&  e.veh_use_comm == req.body.veh_use_comm
                &&  e.veh_use_pass == req.body.veh_use_pass
                &&  e.veh_use_per_1000 == req.body.veh_use_per_1000);
        }); 

        recursoExistente = inUseVehicles.filter( (e) => {
            return (e.year == req.body.year && e.country == req.body.country);
        })
        if(recursoExistente != 0){
            res.sendStatus(409,"CONFLICT");
        }else{
            inUseVehicles.push(req.body);
            res.sendStatus(201,"CREATED");
        }
    }
});


// POST A UN RECURSO CONCRETO (INCORRECTO)
app.post(BASE_API_URL+"/in-use-vehicles/:country/:year",(req, res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
})


//PUT A UN RECURSO CONCRETO
app.put(BASE_API_URL+"/in-use-vehicles/:country/:year",(req, res)=>{   
    if(camposIncorrectos(req)){
        res.sendStatus(400,"BAD REQUEST");
    }else{
        var iuvCountry = req.params.country;
        var iuvYear = req.params.year;
        var iuvBody = req.body;  
        var filteredIuv = inUseVehicles.filter((e) =>{
            return (e.country == iuvCountry && e.year == iuvYear)
        })

        var i = inUseVehicles.indexOf(filteredIuv[0]);

        if(filteredIuv == 0){
            res.sendStatus(404,"NOT FOUND");
        }
        else if(iuvCountry != iuvBody.country || iuvYear != iuvBody.year){
            res.sendStatus(400,"BAD REQUEST");
        }
        else{
            inUseVehicles[i].veh_use_comm = iuvBody.veh_use_comm;
            inUseVehicles[i].veh_use_pass = iuvBody.veh_use_pass;
            inUseVehicles[i].veh_use_per_1000 = iuvBody.veh_use_per_1000;
            res.sendStatus(200,"OK");
        }
    }

})


//PUT INCORRECTO
app.put(BASE_API_URL+"/in-use-vehicles",(req, res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
})

//--------------------------------------------María Lacañina Camacho-------------------------------------

var ProductionsVehicles = []; 

//productions-vehicles

app.get(BASE_API_URL+"/productions-vehicles", (req,res) => {
    res.send(JSON.stringify(ProductionsVehicles,null,2));
})


//datos de mi API->GET al conjunto de recursos
//ruta que al hacer un GET que cree 6 datos en la base de datos si está vacía

app.get(BASE_API_URL+"/productions-vehicles/loadInitialData", (req,res) => {
    var iniData = [
        {
            country:  "Spain",
            year: 2020,
            veh_comm: 467.521,
            veh_pass:1800664,
            veh_annprod: 2268185,
        },
        {
            country:  "Germany",
            year: 2020,
            veh_comm: 227.082,
            veh_pass: 3515372,
            veh_annprod: 3742454,
        },
        {
            country:  "United Kingdom",
            year: 2020,
            veh_comm:66.116,
            veh_pass: 920.928,
            veh_annprod:987.044 ,
        },
        {
            country:  "France",
            year: 2020,
            veh_comm: 388.653,
            veh_pass: 927.718,
            veh_annprod: 1316371,
        },
        {
            country:  "Italy",
            year: 2020,
            veh_comm: 325.339,
            veh_pass: 451.826,
            veh_annprod: 777.165,
        },
        {
            country: "Spain", 
            year: 2019, 
            veh_comm : 524.504, 
            veh_pass: 2248019, 
            veh_annprod: 2772523,	
        }
    ];
    iniData.forEach( (e) => {
        ProductionsVehicles.push(e);
    });
    res.send(JSON.stringify(ProductionsVehicles,null,2));
})

//GET a un recurso en concreto 
//obetener un recurso por país y por año

app.get(BASE_API_URL+"/productions-vehicles/:country/:year", (req,res) => {
    var Country = req.params.country;
    var Year = req.params.year;
    filtered = ProductionsVehicles.filter( (e) => {
        return ((e.country == Country) && (e.year == Year));
    });
    if(filtered == 0){
        res.sendStatus(404,"NOT FOUND");
    }
    else{
        res.send(JSON.stringify(filtered[0],null,2));
    }
})

//GET a un recurso en concreto
//obtener un recurso por país

app.get(BASE_API_URL+"/productions-vehicles/:country", (req, res) => {
    var Country = req.params.country;
    filtered = ProductionsVehicles.filter((e) => {
        return (e.country == Country);
    });
    if (filtered == 0) {
        res.sendStatus(404, "NOT FOUND");
    }
    else {
        res.send(JSON.stringify(filtered, null, 2));
    }
})

//POST al conjunto de recursos
//añadir un recurso al conjunto de recursos



app.post(BASE_API_URL+"/productions-vehicles", (req,res) => {
    if(Object.keys(req.body).length != 5){
        res.sendStatus(400, "BAD REQUEST");
    }
    else{
        var filteredList = ProductionsVehicles.filter((e)=>
        {
            return(req.body.country == e.country && req.body.year == e.year
                && req.body.veh_comm == e.veh_comm && req.body.veh_pass== e.veh_pass
                && req.body.veh_annprod == e.veh_annprod)
        })
        
        // tenemos un recurso que ya existe
        if(filteredList.length != 0){
            res.sendStatus(409,"CONFLICT");
        }else{
            ProductionsVehicles.push(req.body);
            res.sendStatus(201,"CREATED");
        }
    }
});

//POST a un recurso en concreto
//añado un recurso con país y año.
//error,405 METHOD NOT ALLOWED


app.post(BASE_API_URL+"/productions-vehicles/:country/:year",(req, res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
})

//PUT al conjunto de recursos
//actualizar la lista de recursos
//error,405 METHOD NOT ALLOWED

app.put(BASE_API_URL+"/productions-vehicles",(req, res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
})

//PUT a un recurso en concreto
//actualizar a un recurso en concreto por país y por año


app.put(BASE_API_URL+"/productions-vehicles/:country/:year",(req, res)=>{
    //no espera esos campos    
    if(Object.keys(req.body).length != 5){
        res.sendStatus(400, "BAD REQUEST");
    }
    else{
        //pais y año del recurso que quiero actualizar
        var Country = req.params.country;
        var Year = req.params.year;
        var body = req.body;  
        var index = ProductionsVehicles.findIndex((e) =>{
            return (e.country == Country && e.year == Year)
        })
        //no exite el recurso que quiero actualizar
        if(index == null){
            res.sendStatus(404,"NOT FOUND");
            //si el recurso con el año y el pais que quiero actualizar
            //no es ese recurso me devuelve 400
        }else if(country != body.country || year != body.year){
            res.sendStatus(400,"BAD REQUEST");
        
            //si son iguales,entonces es el que quiero actualizar
        }else{
            var  update_ProductionsVehicles = {...body};
            ProductionsVehicles[index] = update_ProductionsVehicles;
        
            res.sendStatus(200,"UPDATED");
        }
    }

})



//DELETE a un conjunto de recursos
//borrar todos los recursos

app.delete(BASE_API_URL+"/productions-vehicles",(req, res)=>{
    ProductionsVehicles= [];
    res.sendStatus(200,"OK");
})

//DELETE de un recurso en concreto
//borrar un recurso en concreto por su país


app.delete(BASE_API_URL+"/productions-vehicles/:country", (req,res) => {
   //el país que quiero borrar
    var Country = req.params.country;
    filtered = ProductionsVehicles.filter( (e) => {
        return ((e.country == Country));
    });
    //no encuentra el recurso que va a borrar
    if(filtered == 0){
        res.sendStatus(404,"NOT FOUND");
    }
    else{
        ProductionsVehicles = ProductionsVehicles.filter( (e) => {
            return ((e.country != Country));
        });
    }
    res.sendStatus(200, "OK");
})




//---------------------------------------------------------------
//Javi
var registrationsVehicles = [];

    app.get(BASE_API_URL + "/registrations-vehicles", (req, res) => {
        res.send(JSON.stringify(registrationsVehicles, null, 2));
    })


    app.get(BASE_API_URL + "/registrations-vehicles/loadInitialData", (req, res) => {
        var iniData = [
            {
                country: "spain",
                year: 2022,
                veh_sale: 1030173,
                veh_per_1000: 21.77,
                variation: -0.18,
            },
            {
                country: "germany",
                year: 2022,
                veh_sale: 2986933,
                veh_per_1000: 35.92,
                variation: 0.45,
            },
            {
                country: "united kingdom",
                year: 2022,
                veh_sale: 2065898,
                veh_per_1000: 30.82,
                variation: 0.93,
            },
            {
                country: "france",
                year: 2022,
                veh_sale: 2112136,
                veh_per_1000: 31.32,
                variation: -1.42,
            },
            {
                country: "italy",
                year: 2022,
                veh_sale: 1637736,
                veh_per_1000: 27.64,
                variation: -1.58,
            },
            {
                country: "spain",
                year: 2019,
                veh_sale: 1554261,
                veh_per_1000: 33.11,
                variation: -1.18
            }
        ];
        iniData.forEach((e) => {
            registrationsVehicles.push(e);
        });
        res.send(JSON.stringify(registrationsVehicles, null, 2));
    })

    app.get(BASE_API_URL + "/registrations-vehicles/:country", (req, res) => {
        var iuvCountry = req.params.country;
        filteredIuv = registrationsVehicles.filter((e) => {
            return (e.country == iuvCountry);
        });
        if (filteredIuv == 0) {
            res.sendStatus(404, "NOT FOUND");
        }
        else {
            res.send(JSON.stringify(filteredIuv, null, 2));
        }
    })

    app.get(BASE_API_URL + "/registrations-vehicles/:country/:year", (req, res) => {
        var iuvCountry = req.params.country;
        var iuvYear = req.params.year;
        filteredIuv = registrationsVehicles.filter((e) => {
            return ((e.country == iuvCountry) && (e.year == iuvYear));
        });
        if (filteredIuv == 0) {
            res.sendStatus(404, "NOT FOUND");
        }
        else {
            res.send(JSON.stringify(filteredIuv[0], null, 2));
        }
    })

    app.post(BASE_API_URL + "/registrations-vehicles", (req, res) => {
        registrationsVehicles.push(req.body);
        res.sendStatus(201, "CREATED")
    });

