// ############################# Antonio #############################
module.exports = (app, BASE_API_URL, bodyParser, db) => {
    app.use(bodyParser.json());
    var inUseVehicles = [];
    const API_IUV_DOC = "https://documenter.getpostman.com/view/19548804/UVyn2JQg";

    app.get(BASE_API_URL + "/in-use-vehicles/docs", (req, res) => {
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
}