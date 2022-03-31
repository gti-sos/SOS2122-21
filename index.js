const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8082;
const BASE_API_URL = "/api/v1";



// ########################### INDEX.JS DE LAS DISTINTAS APIS ###########################
const iuvBackend = require("./src/inUseVehicles");
iuvBackend(app, BASE_API_URL);

const pvBackend = require("./src/productionsVehicles");
pvBackend(app, BASE_API_URL);

const rvBackend = require("./src/registrationsVehicles");
rvBackend(app, BASE_API_URL);
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
