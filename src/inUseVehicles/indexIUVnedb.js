// ############################# Antonio #############################
module.exports = (app, BASE_API_URL, bodyParser, db) => {
    app.use(bodyParser.json());
    var inUseVehicles = [];
    const API_IUV_DOC = "https://documenter.getpostman.com/view/19548804/UVyn2JQg";

    app.get(BASE_API_URL + "/in-use-vehicles/docs", (req, res) => {
        res.redirect(API_IUV_DOC);
    })


    // CREACION DE DATOS
    app.get(BASE_API_URL+"/in-use-vehicles/loadInitialData", (req, res) => {
        db.find({}, function (err, docs) {
            if (err) {
                res.sendStatus(500, "ERROR EN CLIENTE");
                return;
            }
            else{
                db.remove({}, { multi: true }, (err,num)=>{
                    if (err){
                        res.sendStatus(500,"ERROR EN CLIENTE");
                        return;
                    }
                    return;
                });
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
                    db.insert(e);
                });
                res.sendStatus(200, "OK");
            }
        });
    })

    // RECURSO BASE
    app.get(BASE_API_URL + "/in-use-vehicles", (req, res) => {
        db.find({}, function(err, docs){
            if(err){
                res.sendStatus(500, "INTERNAL SERVER ERROR");
            }
            else{
                res.send(JSON.stringify(docs.map( (e) => {
                    return {
                        country : e.country,
                        year : e.year,
                        veh_use_comm: e.veh_use_comm,
                        veh_use_pass: e.veh_use_pass,
                        veh_use_per_1000: e.veh_use_per_1000  
                    }
                }),null,2));
            }
        })
        //res.send(JSON.stringify(inUseVehicles, null, 2));
    })
    

    // FUNCION COMPROBAR QUERYS
    function compruebaQuery(e) {
        for (var i = 0; i < e.length; i++) {
            var query = e[i];
            if (query != "year" && query != "from" && query != "to" && query != "limit" && query != "offset") {
                res.sendStatus(400, "BAD REQUEST");
                return;
            }
        }
    }

    // ACCEDER A ESTADISTICAS DE UN PAIS
    app.get(BASE_API_URL + "/in-use-vehicles/:country", (req, res) => {
        var iuvCountry = req.params.country;
        var iuvCountry = req.params.country;
        db.find({country: iuvCountry}, function(err,docs){
            if(err){
                res.sendStatus(500, "INTERNAL SERVER ERROR");
                return;
            }
            else{
                if(docs == 0){
                    res.sendStatus(404, "NOT FOUND")
                }
                else{
                    docsCopy = docs;
                    docsCopy.forEach((e) => {
                        delete e._id;
                    })
                    res.send(JSON.stringify(docsCopy,null,2));
                }
            }
        });
    });


    // ACCEDER A UNA ESTADISTICA CONCRETA
    app.get(BASE_API_URL + "/in-use-vehicles/:country/:year", (req, res) => {
        var iuvCountry = req.params.country;
        var iuvYear = req.params.year;
        db.find({country: iuvCountry, year: parseInt(iuvYear)}, function(err,docs){
            if(err){
                res.sendStatus(500, "INTERNAL SERVER ERROR");
                return;
            }
            else{
                if(docs == 0){
                    res.sendStatus(404, "NOT FOUND")
                }
                else{
                    docsCopy = docs;
                    docsCopy.forEach((e) => {
                        delete e._id;
                    })
                    res.send(JSON.stringify(docsCopy,null,2));
                }
            }
        });
    });


    //BORRAR TODAS LAS ESTADISTICAS
    app.delete(BASE_API_URL+"/in-use-vehicles", (req,res) => {
        db.remove({}, { multi: true }, (err,num)=>{
            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
            res.sendStatus(200, "OK")
            return;
        });
    })



    //BORRAR UNA ESTADISTICA SEGUN EL PAIS
    app.delete(BASE_API_URL+"/in-use-vehicles/:country", (req,res) => {
        var iuvCountry = req.params.country;
        db.remove({country: iuvCountry}, { multi: true }, (err,num)=>{
            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
            res.sendStatus(200, "OK")
            return;
        });
    })


    //BORRAR UNA ESTADISTICA CONCRETA
    app.delete(BASE_API_URL+"/in-use-vehicles/:country/:year", (req,res) => {
        var iuvCountry = req.params.country;
        var iuvYear = req.params.year;
        db.remove({country: iuvCountry, year: parseInt(iuvYear)}, { multi: true }, (err,num)=>{
            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
            res.sendStatus(200, "OK")
            return;
        });
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
            
            db.find({country: req.body.country, year: req.body.year}, function(err,docs){
                if(err){
                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                }
                else{
                    if(docs!=0){
                        res.sendStatus(409, "CONFLICT");
                    }
                    else{
                        db.insert(req.body,function(err,newDocs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                res.sendStatus(201, "CREATED");
                            }
                        });
                    }
                }
            })
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
            
            if(iuvCountry != iuvBody.country || iuvYear != iuvBody.year){
                res.sendStatus(400, "BAD REQUEST");
            }
            else{
                db.find({country: iuvCountry, year: parseInt(iuvYear)}, function(err,docs){
                    if(err){
                        res.sendStatus(500,"INTERNAL SERVER ERROR");
                    }
                    else{
                        if(docs==0){
                            res.sendStatus(404, "NOT FOUND");
                        }
                        else{
                            db.update({country: iuvCountry, year: parseInt(iuvYear)},
                            { $set: {
                                "veh_use_comm": iuvBody.veh_use_comm,
                                "veh_use_pass": iuvBody.veh_use_pass,
                                "veh_use_per_1000": iuvBody.veh_use_per_1000
                            }},function(err,newDocs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    res.sendStatus(200, "OK");
                                }
                            });
                        }
                    }
                })
            }
        }

    })


    //PUT INCORRECTO
    app.put(BASE_API_URL+"/in-use-vehicles",(req, res)=>{
        res.sendStatus(405,"METHOD NOT ALLOWED");
    })
}