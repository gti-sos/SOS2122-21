 //--------------------------------------------María Lacañina Camacho-------------------------------------
 module.exports = (app,BASE_API_URL,bodyParser, db) => {
    app.use(bodyParser.json());
    var ProductionsVehicles = []; 

//POSTMAN
    const API_PV_DOC = "https://documenter.getpostman.com/view/20099214/UVyn2yuQ";
    app.get(BASE_API_URL + "/productions-vehicles/docs", (req, res) => {
        res.redirect(API_PV_DOC);
    })


//MODIFICACIÓN PARA EL FRONT-END -creación de datos automática


// CREACION DE DATOS AUTOMÁTICA
db.find({}).sort({year:1}).exec((err,data) => {
    if(data.length == 0){
        db.insert([
            {
                country:  "Spain",
                year: 2020,
                veh_comm: 467521,
                veh_pass:1800664,
                veh_annprod: 2268185,
            },
            {
                country:  "Germany",
                year: 2020,
                veh_comm: 227082,
                veh_pass: 3515372,
                veh_annprod: 3742454,
            },
            {
                country:  "United Kingdom",
                year: 2020,
                veh_comm:66116,
                veh_pass: 920.928,
                veh_annprod:987.044 ,
            },
            {
                country:  "France",
                year: 2020,
                veh_comm: 388653,
                veh_pass: 927.718,
                veh_annprod: 1316371,
            },
            {
                country:  "Italy",
                year: 2020,
                veh_comm: 325339,
                veh_pass: 451.826,
                veh_annprod: 777.165,
            },
            {
                country: "Spain", 
                year: 2019, 
                veh_comm : 524504, 
                veh_pass: 2248019, 
                veh_annprod: 2772523,	
            }
        ]);
        console.log("Datos iniciales añadidos automaticamente");
    }
    else{
        console.log("Base de datos cargarda con "+data.length+" registros");
    }
});


    //datos de mi API->GET al conjunto de recursos (Manual)
    //ruta que al hacer un GET que cree 6 datos en la base de datos si está vacía

    app.get(BASE_API_URL+"/productions-vehicles/loadInitialData", (req,res) => {
         //búsqueda
         db.find({},function(err, docs){

            if(err){
                res.sendStatus(500, "ERROR IN CLIENT");
                return;
            }
            else{
                db.remove({}, { multi: true }, (err,num)=>{
                    if (err){
                        res.sendStatus(500,"ERROR IN CLIENT");
                        return;
                    }
                    return;
                });
        var iniData = [
            {
                country:  "Spain",
                year: 2020,
                veh_comm: 467521,
                veh_pass:1800664,
                veh_annprod: 2268185,
            },
            {
                country:  "Germany",
                year: 2020,
                veh_comm: 227082,
                veh_pass: 3515372,
                veh_annprod: 3742454,
            },
            {
                country:  "United Kingdom",
                year: 2020,
                veh_comm:66116,
                veh_pass: 920.928,
                veh_annprod:987.044 ,
            },
            {
                country:  "France",
                year: 2020,
                veh_comm: 388653,
                veh_pass: 927.718,
                veh_annprod: 1316371,
            },
            {
                country:  "Italy",
                year: 2020,
                veh_comm: 325339,
                veh_pass: 451.826,
                veh_annprod: 777.165,
            },
            {
                country: "Spain", 
                year: 2019, 
                veh_comm : 524504, 
                veh_pass: 2248019, 
                veh_annprod: 2772523,	
            }
        ];
        iniData.forEach( (e) => {
            db.insert(e);
        });
        res.sendStatus(200,"OK");
    }
   });
})





    //GET a todos los recursos

    
    // FUNCION COMPROBAR QUERYS
    function compruebaQuery(e) {
        if(e.length == 0){
            return true;
        }
        else{
            for (var i = 0; i < e.length; i++) {
                var query = e[i];
                if (query != "year" && query != "from" && query != "to" && query != "limit" && query != "offset") {
                    return false;
                }
            }
        }
    }



    app.get(BASE_API_URL + "/productions-vehicles", (req, res) => {

        var qYear = req.query.year;
        var qOffset = req.query.offset;
        var qLimit = req.query.limit;
        var qFrom = req.query.from;
        var qTo = req.query.to;

        //ESTAN CORRECTAS LAS QUERYS?
        if(compruebaQuery(Object.keys(req.query)) == false){
            res.sendStatus(400, "BAD REQUEST");
        }
        
        //SI estan correctas    
        else{
            // EXISTE LA QUERY FROM O TO?
            if(qFrom != null || qTo != null){ // SI EXISTE
                if(qFrom>qTo){ //COMPROBAR QUE EL FROM NO SEA MAYOR QUE EL TO
                    res.sendStatus(400, "BAD REQUEST");
                }
                else{
                    // EXISTE EL FROM Y EL TO
                    if(qFrom != null && qTo != null){
                        if(qOffset == undefined && qLimit == undefined){
                            db.find({$and: [{year: {$gte: parseInt(qFrom)}}, {year: {$lte: parseInt(qTo)}}]}).sort({year:1}).exec(function(err, docs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                    delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        }
                        else if(qOffset != undefined && qLimit != undefined){
                            db.find({$and: [{year: {$gte: parseInt(qFrom)}}, {year: {$lte: parseInt(qTo)}}]}).limit(qLimit).skip(qOffset).sort({year:1}).exec(function(err, docs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                    delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        }
                        else if(qOffset != undefined && qLimit == undefined){
                            db.find({$and: [{year: {$gte: parseInt(qFrom)}}, {year: {$lte: parseInt(qTo)}}]}).skip(qOffset).sort({year:1}).exec(function(err, docs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                    delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        }
                        else{
                            db.find({$and: [{year: {$gte: parseInt(qFrom)}}, {year: {$lte: parseInt(qTo)}}]}).limit(qLimit).sort({year:1}).exec(function(err, docs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                    delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        }
                    }
                    //EXISTE EL TO PERO NO EL FROM
                    else if(qFrom == null && qTo != null){
                        // NO HAY OFFSET NI LIMIT
                        if(qOffset == undefined && qLimit == undefined){
                            db.find({$or: [{year: {$lte: parseInt(qTo)}}]}).sort({year:1}).exec(function(err, docs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                    delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        }
                        // HAY OFFSET Y LIMIT
                        else if(qOffset != undefined && qLimit != undefined){
                            db.find({$or: [{year: {$lte: parseInt(qTo)}}]}).limit(qLimit).skip(qOffset).sort({year:1}).exec(function(err, docs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                    delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        }
                        // HAY LIMIT PERO NO OFFSET
                        else if(qOffset != undefined && qLimit == undefined){
                            db.find({$or: [{year: {$lte: parseInt(qTo)}}]}).skip(qOffset).sort({year:1}).exec(function(err, docs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                    delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        }
                        // HAY OFFSET PERO NO LIMIT
                        else{
                            db.find({$or: [{year: {$lte: parseInt(qTo)}}]}).limit(qLimit).sort({year:1}).exec(function(err, docs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                    delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        }
                    }
                    //EXISTE EL FROM PERO NO EL TO
                    else {
                        // NO HAY OFFSET Y LIMIT
                        if(qOffset == undefined && qLimit == undefined){
                            db.find({$or: [{year: {$gte: parseInt(qFrom)}}]}).sort({year:1}).exec(function(err, docs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                    delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        }
                        // HAY OFFSET Y LIMIT
                        else if(qOffset != undefined && qLimit != undefined){
                            db.find({$or: [{year: {$gte: parseInt(qFrom)}}]}).limit(qLimit).skip(qOffset).sort({year:1}).exec(function(err, docs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                    delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        }
                        // HAY LIMIT PERO NO OFFSET
                        else if(qOffset != undefined && qLimit == undefined){
                            db.find({$or: [{year: {$gte: parseInt(qFrom)}}]}).skip(qOffset).sort({year:1}).exec(function(err, docs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                    delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        }
                        // HAY OFFSET PERO NO LIMIT
                        else{
                            db.find({$or: [{year: {$gte: parseInt(qFrom)}}]}).limit(qLimit).sort({year:1}).exec(function(err, docs){
                                if(err){
                                    res.sendStatus(500,"INTERNAL SERVER ERROR");
                                }
                                else{
                                    docsCopy = docs;
                                    docsCopy.forEach((e) => {
                                    delete e._id;
                                    });
                                    res.send(JSON.stringify(docsCopy, null, 2));
                                }
                            });
                        }
                    }
                }
            }
            // NO HAY NI FROM NI TO
            else{ 
                // HAY QUERY YEAR?
                // NO HAY
                if(qYear == null){
                    // NO HAY NI OFFSET NI LIMIT
                    if(qOffset == undefined && qLimit == undefined){
                        db.find({}).sort({year:1}).sort({year:1}).exec(function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                    // HAY OFFSET PERO NO LIMIT
                    else if(qOffset != undefined && qLimit == undefined){
                        db.find({}).skip(qOffset).sort({year:1}).exec(function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                    // HAY LIMIT PERO NO OFFSET
                    else if(qOffset == undefined && qLimit != undefined){
                        db.find({}).limit(qLimit).sort({year:1}).exec(function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                    // HAY OFFSET Y LIMIT
                    else{
                        db.find({}).limit(qLimit).skip(qOffset).sort({year:1}).exec(function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                }
                else{ // NO HAY QUERY YEAR
                    // NO HAY OFFSET NI LIMIT
                    if(qOffset == undefined && qLimit == undefined){
                        db.find({year: parseInt(qYear)}).sort({year:1}).exec(function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                    // HAY OFFSET PERO NO LIMIT
                    else if(qOffset != undefined && qLimit == undefined){
                        db.find({year: parseInt(qYear)}).skip(qOffset).sort({year:1}).exec(function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                    // HAY LIMIT PERO NO OFFSET
                    else if(qOffset == undefined && qLimit != undefined){
                        db.find({year: parseInt(qYear)}).limit(qLimit).sort({year:1}).exec(function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                    // HAY LIMIT Y OFFSET
                    else{
                        db.find({year: parseInt(qYear)}).limit(qLimit).skip(qOffset).sort({year:1}).exec(function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = docs;
                                docsCopy.forEach((e) => {
                                delete e._id;
                                });
                                res.send(JSON.stringify(docsCopy, null, 2));
                            }
                        });
                    }
                }
            }
        }

    })




    //GET a un recurso en concreto 
    //obetener un recurso por país y por año

    app.get(BASE_API_URL+"/productions-vehicles/:country/:year", (req,res) => {
        var Country = req.params.country;
        var Year = req.params.year;

        //búsqueda
        db.find({country: Country, year: parseInt(Year)},function(err, docs){

            if(err){
                res.sendStatus(500, "ERROR IN CLIENT");
                return;
            }
            else{
                if(docs == 0){
                    res.sendStatus(404, "NOT FOUND")
                }
                else{
                    docsCopy = docs;
                    //para quitar el id que me viene por defecto
                    docsCopy.forEach((e) => {
                        delete e._id;
                    })
                    res.send(JSON.stringify(docsCopy[0],null,2));
                }
            }
        });
    });
    

        

        



    //GET a un recurso en concreto
    //obtener un recurso por país

    app.get(BASE_API_URL+"/productions-vehicles/:country", (req, res) => {
        var Country = req.params.country;
         //búsqueda
         db.find({country: Country},function(err, docs){

            if(err){
                res.sendStatus(500, "ERROR IN CLIENT");
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
    
       
      
            
        

    //funcion auxiliar para la comprobación de los campos

    function comprobacion(e){
        return (Object.keys(e.body).length != 5 ||
            e.body.country == null ||
            e.body.year == null ||
            e.body.veh_comm == null || 
            e.body.veh_pass == null || 
            e.body.veh_annprod == null);
    }


    //POST al conjunto de recursos
    //añadir un recurso al conjunto de recursos



    app.post(BASE_API_URL+"/productions-vehicles", (req,res) => {
        if(comprobacion(req)){
            res.sendStatus(400, "BAD REQUEST");
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
        if(comprobacion(req)){
            res.sendStatus(400, "BAD REQUEST");
        }else{
            var Country = req.params.country;
            var Year = req.params.year;
            var Body = req.body;  
            
            if(Country != Body.country || Year != Body.year){
                res.sendStatus(400, "BAD REQUEST");
            }
            else{
                db.find({country: Country, year: parseInt(Year)}, function(err,docs){
                    if(err){
                        res.sendStatus(500,"INTERNAL SERVER ERROR");
                    }
                    else{
                        if(docs==0){
                            res.sendStatus(404, "NOT FOUND");
                        }
                        else{
                            db.update({country: Country, year: parseInt(Year)},
                            { $set: {
                                "veh_comm": Body.veh_comm,
                                "veh_pass": Body.veh_pass,
                                "veh_annprod": Body.veh_annprod
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
        

     //PUT a un recurso en concreto
    //actualizar a un recurso en concreto por país 


    app.put(BASE_API_URL+"/productions-vehicles/:country",(req, res)=>{
        //no espera esos campos    
        if(comprobacion(req)){
            res.sendStatus(400, "BAD REQUEST");

            
        }else{
            var Country = req.params.country;
            var Body = req.body;  
            
            if(Country != Body.country ){
                res.sendStatus(400, "BAD REQUEST");
            }
            
        else{
                db.find({country: Country}, function(err,docs){
                    if(err){
                        res.sendStatus(500,"INTERNAL SERVER ERROR");
                    }
                    else{
                        if(docs==0){
                            res.sendStatus(404, "NOT FOUND");
                        }
                        else{
                            db.update({country: Country},
                            { $set: {
                                "year": Body.year,
                                "veh_comm": Body.veh_comm,
                                "veh_pass": Body.veh_pass,
                                "veh_annprod": Body.veh_annprod
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
        
           

    //DELETE a un conjunto de recursos
    //borrar todos los recursos

    app.delete(BASE_API_URL+"/productions-vehicles",(req, res)=>{
        db.remove({}, { multi: true }, (err,num)=>{
            if (err){
                res.sendStatus(500,"ERROR IN CLIENT");
                return;
            }
            res.sendStatus(200, "OK")
            return;
        });
    })

    //DELETE de un recurso en concreto
    //borrar un recurso en concreto por su país


    app.delete(BASE_API_URL+"/productions-vehicles/:country", (req,res) => {
    //el país que quiero borrar
        var Country = req.params.country;
        db.remove({country: Country}, { multi: true }, (err,num)=>{
            if (err){
                res.sendStatus(500,"ERROR IN CLIENT");
                return;
            }
            res.sendStatus(200, "OK")
            return;
        });
       
    })

    //DELETE de un recurso en concreto
    //borrar un recurso en concreto por país y año

    app.delete(BASE_API_URL+"/productions-vehicles/:country/:year", (req,res) => {
        var Country = req.params.country;
        var Year = req.params.year;
        db.remove({country: Country, year: parseInt(Year)}, { multi: true }, (err,num)=>{
            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
            res.sendStatus(200, "OK")
            return;
        });
    });

}