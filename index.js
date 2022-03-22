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