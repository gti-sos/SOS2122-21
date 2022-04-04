const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");
const Datastore = require("nedb");

const app = express();
const port = process.env.PORT || 8082;
const BASE_API_URL = "/api/v1";


db_in_use_vehicles = new Datastore();
db_productions_vehicles=new Datastore();
db_registrations_vehicles=new Datastore();

// ########################### INDEX.JS DE LAS DISTINTAS APIS ###########################
const iuvBackend = require("./src/inUseVehicles/indexIUVnedb.js");
iuvBackend(app, BASE_API_URL, bodyParser, db_in_use_vehicles);

const pvBackend = require("./src/productionsVehicles/indexPVnedb.js");
pvBackend(app, BASE_API_URL, bodyParser,db_productions_vehicles);

const rvBackend = require("./src/registrationsVehicles/indexRVnedb.js");
rvBackend(app, BASE_API_URL, bodyParser, db_registrations_vehicles);
// #######################################################################################



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
