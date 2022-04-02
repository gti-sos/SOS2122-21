  //--------------------------------------------María Lacañina Camacho-------------------------------------
module.exports = (app,BASE_API_URL,bodyParser, db) => {
    app.use(bodyParser.json());
    var ProductionsVehicles = []; 

//POSTMAN
    const API_PV_DOC = "https://documenter.getpostman.com/view/20099214/UVyn2yuQ";
    app.get(BASE_API_URL + "/productions-vehicles/docs", (req, res) => {
        res.redirect(API_PV_DOC);
    })

  


    //datos de mi API->GET al conjunto de recursos
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
            db.insert(e);
        });
        res.sendStatus(200,"OK");
    }
   });
})


    //funcion para la paginación

    function funcionpaginacion(req, lista){

        var res = [];
        const limit = req.query.limit;
        const offset = req.query.offset;
        
        if(limit < 1 || offset < 0 || offset > lista.length){
            res.push("ERROR LIMIT,OFFSET");
            return res;
        }

        res = lista.slice(offset,parseInt(limit)+parseInt(offset));
        return res;

    }


    //GET a todos los recursos

    app.get(BASE_API_URL+"/productions-vehicles", (req,res) => {
        db.find({}, function(err, docs){
            if(err){
                res.sendStatus(500, "INTERNAL SERVER ERROR");
            }
            else{
                res.send(JSON.stringify(docs.map( (e) => {
                    return {
                        country : e.country,
                        year : e.year,
                        veh_comm: e.veh_comm,
                        veh_pass: e.veh_pass,
                        veh_annprod: e.veh_annprod 
                    }
                }),null,2));
            }
        })
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
                    res.send(JSON.stringify(docsCopy,null,2));
                }
            }
        });
    });
    

        
/*
        //paginación,limit y offset
        //funcion paginación creada anteriormente

        if(req.query.limit != undefined || req.query.offset != undefined){
            filtered = funcionpaginacion(req,filtered);
            res.send(JSON.stringify(filtered,null,2));
        }
*/
        



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
    
       
        /*
        //paginación,limit y offset
        //funcion paginación creada anteriormente

        if(req.query.limit != undefined || req.query.offset != undefined){
            filtered = funcionpaginacion(req,filtered);
            res.send(JSON.stringify(filtered,null,2));
        }
*/
        
            
        

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
            
            if(Country != Body.country || Year != iuvBody.year){
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