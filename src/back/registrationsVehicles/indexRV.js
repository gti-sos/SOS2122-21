module.exports = (app, BASE_API_URL, bodyParser) => {
        //---------------------------------------------------------------
    //Javi
    app.use(bodyParser.json());

    var registrationsVehicles = [];

    const API_DOC = "https://documenter.getpostman.com/view/20092351/UVyn2z4A";

    app.get(BASE_API_URL + "/registrations-vehicles/docs", (req, res) => {
        res.redirect(API_DOC);
    })

    
    
    // CREACION DE DATOS
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
                year: 2019,
                veh_sale: 2986933,
                veh_per_1000: 35.92,
                variation: 0.45,
            },
            {
                country: "united kingdom",
                year: 2018,
                veh_sale: 2065898,
                veh_per_1000: 30.82,
                variation: 0.93,
            },
            {
                country: "france",
                year: 2021,
                veh_sale: 2112136,
                veh_per_1000: 31.32,
                variation: -1.42,
            },
            {
                country: "italy",
                year: 2020,
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
    
    // RECURSO BASE
    app.get(BASE_API_URL + "/registrations-vehicles", (req, res) => {
        res.send(JSON.stringify(registrationsVehicles, null, 2));
    })

    // ACCEDER A ESTADISTICAS DE UN PAIS
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


    // ACCEDER A UNA ESTADISTICA CONCRETA
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


    //BORRAR TODAS LAS ESTADISTICAS
    app.delete(BASE_API_URL+"/registrations-vehicles", (req,res) => {
        registrationsVehicles  = [];
        res.sendStatus(200, "OK");
    })



    //BORRAR UNA ESTADISTICA SEGUN EL PAIS
    app.delete(BASE_API_URL+"/registrations-vehicles/:country", (req,res) => {
        var iuvCountry = req.params.country;
        filteredIuv = registrationsVehicles.filter( (e) => {
            return ((e.country == iuvCountry));
        });
        if(filteredIuv == 0){
            res.sendStatus(404,"NOT FOUND");
        }
        else{
            registrationsVehicles = registrationsVehicles.filter( (e) => {
                return ((e.country != iuvCountry));
            });
        }
        res.sendStatus(200, "OK");
    })


    //BORRAR UNA ESTADISTICA CONCRETA
    app.delete(BASE_API_URL+"/registrations-vehicles/:country/:year", (req,res) => {
        var iuvCountry = req.params.country;
        var iuvYear = req.params.year;
        filteredIuv = registrationsVehicles.filter( (e) => {
            return ((e.country == iuvCountry) && (e.year == iuvYear));
        });
        if(filteredIuv == 0){
            res.sendStatus(404,"NOT FOUND");
        }
        else{
            var i = registrationsVehicles.indexOf(filteredIuv[0]);
            if(i!==-1){
                registrationsVehicles.splice(i,1);
            }
        }
        res.sendStatus(200, "OK");
    })


    // CREAR NUEVA ESTADISTICA
    function camposIncorrectos2(e){
        return (Object.keys(e.body).length != 5 ||
            e.body.country == null ||
            e.body.year == null ||
            e.body.veh_sale == null || 
            e.body.veh_per_1000 == null || 
            e.body.variation == null);
    }

    app.post(BASE_API_URL+"/registrations-vehicles", (req,res) => {
        if(camposIncorrectos2(req)){
            res.sendStatus(400,"BAD REQUEST")
        }
        else{
            filteredIuv = registrationsVehicles.filter( (e) => {
                return (e.country == req.body.country
                    &&  e.year == req.body.year
                    &&  e.veh_sale == req.body.veh_sale
                    &&  e.veh_per_1000 == req.body.veh_per_1000
                    &&  e.variation == req.body.variation);
            }); 

            recursoExistente = registrationsVehicles.filter( (e) => {
                return (e.year == req.body.year && e.country == req.body.country);
            })
            if(recursoExistente != 0){
                res.sendStatus(409,"CONFLICT");
            }else{
                registrationsVehicles.push(req.body);
                res.sendStatus(201,"CREATED");
            }
        }
    });


    // POST A UN RECURSO CONCRETO (INCORRECTO)
    app.post(BASE_API_URL+"/registrations-vehicles/:country/:year",(req, res)=>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
    })


    //PUT A UN RECURSO CONCRETO
    app.put(BASE_API_URL+"/registrations-vehicles/:country/:year",(req, res)=>{   
        if(camposIncorrectos2(req)){
            res.sendStatus(400,"BAD REQUEST");
        }else{
            var iuvCountry = req.params.country;
            var iuvYear = req.params.year;
            var iuvBody = req.body;  
            var filteredIuv = registrationsVehicles.filter((e) =>{
                return (e.country == iuvCountry && e.year == iuvYear)
            })

            var i = registrationsVehicles.indexOf(filteredIuv[0]);

            if(filteredIuv == 0){
                res.sendStatus(404,"NOT FOUND");
            }
            else if(iuvCountry != iuvBody.country || iuvYear != iuvBody.year){
                res.sendStatus(400,"BAD REQUEST");
            }
            else{
                registrationsVehicles[i].veh_sale = iuvBody.veh_sale;
                registrationsVehicles[i].veh_per_1000 = iuvBody.veh_per_1000;
                registrationsVehicles[i].variation = iuvBody.variation;
                res.sendStatus(200,"OK");
            }
        }

    })


    //PUT INCORRECTO
    app.put(BASE_API_URL+"/registrations-vehicles",(req, res)=>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
    })

}