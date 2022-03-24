const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;
const BASE_API_URL = "/api/v1";

app.use(bodyParser.json());
app.use("/",express.static('public'));

app.get("/cool", (req,res) => {
    console.log("Requested / route");
    res.send(`<html>
                <body>
                    <h1>`+cool()+`</h1>
                </body>
            </html>`);
})

app.listen(port, () => {
    console.log(`Server ready at port ${port}`)
});



//Antonio
var inUseVehicles = []; 

app.get(BASE_API_URL+"/in-use-vehicles", (req,res) => {
    res.send(JSON.stringify(inUseVehicles,null,2));
})


app.get(BASE_API_URL+"/in-use-vehicles/loadInitialData", (req,res) => {
    var iniData = [
        {
            country:  "spain",
            year: 2020,
            veh_use_comm: 4538423,
            veh_use_pass: 25169158,
            veh_use_per_1000: 626.76,
        },
        {
            country:  "germany",
            year: 2020,
            veh_use_comm: 4027249,
            veh_use_pass: 48248584,
            veh_use_per_1000: 628.66,
        },
        {
            country:  "united kingdom",
            year: 2020,
            veh_use_comm: 5949323,
            veh_use_pass: 42403988,
            veh_use_per_1000: 632.65,
        },
        {
            country:  "france",
            year: 2020,
            veh_use_comm: 6598185,
            veh_use_pass: 44944450,
            veh_use_per_1000: 666.44,
        },
        {
            country:  "italy",
            year: 2020,
            veh_use_comm: 5281807,
            veh_use_pass: 44999681,
            veh_use_per_1000: 759.39,
        },
        {
            country: "spain", 
            year: 2019, 
            veh_use_comm : 4444698, 
            veh_use_pass: 25008222, 
            veh_use_per_1000: 622.25
        }
    ];
    iniData.forEach( (e) => {
        inUseVehicles.push(e);
    });
    res.send(JSON.stringify(inUseVehicles,null,2));
})

app.get(BASE_API_URL+"/in-use-vehicles/:country", (req,res) => {
    var iuvCountry = req.params.country;
    filteredIuv = inUseVehicles.filter( (e) => {
        return (e.country == iuvCountry);
    });
    if(filteredIuv == 0){
        res.sendStatus(404,"NOT FOUND");
    }
    else{
        res.send(JSON.stringify(filteredIuv,null,2));
    }
})

app.get(BASE_API_URL+"/in-use-vehicles/:country/:year", (req,res) => {
    var iuvCountry = req.params.country;
    var iuvYear = req.params.year;
    filteredIuv = inUseVehicles.filter( (e) => {
        return ((e.country == iuvCountry) && (e.year == iuvYear));
    });
    if(filteredIuv == 0){
        res.sendStatus(404,"NOT FOUND");
    }
    else{
        res.send(JSON.stringify(filteredIuv[0],null,2));
    }
})

app.post(BASE_API_URL+"/in-use-vehicles", (req,res) => {
    inUseVehicles.push(req.body);
    res.sendStatus(201,"CREATED")
});

<<<<<<< HEAD
//---------------------------------------------------------------
//Javi
var registrationsVehicles = []; 

app.get(BASE_API_URL+"/registrations-vehicles", (req,res) => {
    res.send(JSON.stringify(registrationsVehicles,null,2));
})


app.get(BASE_API_URL+"/registrations-vehicles/loadInitialData", (req,res) => {
    var iniData = [
        {
            country:  "spain",
            year: 2022,
            veh_sale: 1030173,
            veh_per_1000: 21.77,
            variation: -0.18,
        },
        {
            country:  "germany",
            year: 2022,
            veh_sale: 2986933,
            veh_per_1000: 35.92,
            variation: 0.45,
        },
        {
            country:  "united kingdom",
            year: 2022,
            veh_sale: 2065898,
            veh_per_1000: 30.82,
            variation: 0.93,
        },
        {
            country:  "france",
            year: 2022,
            veh_sale: 2112136,
            veh_per_1000: 31.32,
            variation: -1.42,
        },
        {
            country:  "italy",
            year: 2022,
            veh_sale: 1637736,
            veh_per_1000: 27.64,
            variation: -1.58,
=======

//Maria

var ProductionsVehicles = []; 

//api para producions-vehicles


app.get(BASE_API_URL+"/productions-vehicles", (req,res) => {
    res.send(JSON.stringify(ProductionsVehicles,null,2));
})


//datos de mi API

app.get(BASE_API_URL+"/productions-vehicles/loadInitialData", (req,res) => {
    var iniData = [
        {
            country:  "spain",
            year: 2020,
            veh_comm: 467521,
            veh_pass:1800664,
            veh_annprod: 2268185,
        },
        {
            country:  "germany",
            year: 2020,
            veh_comm: 227082,
            veh_pass: 3515372,
            veh_annprod: 3742454,
        },
        {
            country:  "united kingdom",
            year: 2020,
            veh_comm:66116,
            veh_pass: 920928,
            veh_annprod:987044 ,
        },
        {
            country:  "france",
            year: 2020,
            veh_comm: 388653,
            veh_pass: 927718,
            veh_annprod: 1316371,
        },
        {
            country:  "italy",
            year: 2020,
            veh_comm: 325339,
            veh_pass: 451826,
            veh_annprod: 777165,
>>>>>>> 568c57fbbc813b52a4eabbaf555e8f85eda73dc2
        },
        {
            country: "spain", 
            year: 2019, 
<<<<<<< HEAD
            veh_sale: 1554261,
            veh_per_1000: 33.11,
            variation: -1.18
        }
    ];
    iniData.forEach( (e) => {
        registrationsVehicles.push(e);
    });
    res.send(JSON.stringify(registrationsVehicles,null,2));
})

app.get(BASE_API_URL+"/registrations-vehicles/:country", (req,res) => {
    var iuvCountry = req.params.country;
    filteredIuv = registrationsVehicles.filter( (e) => {
        return (e.country == iuvCountry);
    });
    if(filteredIuv == 0){
        res.sendStatus(404,"NOT FOUND");
    }
    else{
        res.send(JSON.stringify(filteredIuv,null,2));
    }
})

app.get(BASE_API_URL+"/registrations-vehicles/:country/:year", (req,res) => {
    var iuvCountry = req.params.country;
    var iuvYear = req.params.year;
    filteredIuv = registrationsVehicles.filter( (e) => {
        return ((e.country == iuvCountry) && (e.year == iuvYear));
    });
    if(filteredIuv == 0){
        res.sendStatus(404,"NOT FOUND");
    }
    else{
        res.send(JSON.stringify(filteredIuv[0],null,2));
    }
})

app.post(BASE_API_URL+"/registrations-vehicles", (req,res) => {
    registrationsVehicles.push(req.body);
    res.sendStatus(201,"CREATED")
});
=======
            veh_comm : 524504, 
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



>>>>>>> 568c57fbbc813b52a4eabbaf555e8f85eda73dc2
