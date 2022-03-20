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

app.post(BASE_API_URL+"/in-use-vehicles", (req,res) => {
    inUseVehicles.push(req.body);
    res.sendStatus(201,"CREATED")
});