// ############################# Antonio #############################
const request = require("request");

var urlAPI1='/remoteAPI1';
var apiHost1 = 'https://idealspot-geodata.p.rapidapi.com/api/v1/traffic/counts/1595369397';

var urlAPI2 = '/remoteAPI2';
var apiHost2 = 'https://sos2122-27.herokuapp.com/api/v2/public-expenditure-stats'

var urlAPI3 = "/remoteAPI3";
var apiHost3 = 'https://sos2122-20.herokuapp.com/api/v1/agriculturalproduction-stats'

module.exports = (app, BASE_API_URL, bodyParser, db) => {

    //INTEGRACIONES
    app.use(urlAPI1, function(req, res) {
        var url = apiHost1 + req.url;
        console.log('piped: ' + req.baseUrl + req.url);
        req.pipe(request(url)).pipe(res);
    });

    app.use(urlAPI2, function(req, res) {
        var url = apiHost2 + req.url;
        console.log('piped: ' + req.baseUrl + req.url);
        req.pipe(request(url)).pipe(res);
    });


    app.use(urlAPI3, function(req, res) {
        var url = apiHost3 + req.url;
        console.log('piped: ' + req.baseUrl + req.url);
        req.pipe(request(url)).pipe(res);
    });

    app.use(bodyParser.json());
    var inUseVehicles = [];
    const API_IUV_DOC = "https://documenter.getpostman.com/view/19548804/UVysxbPu";
    

    app.get(BASE_API_URL + "/in-use-vehicles/docs", (req, res) => {
        res.redirect(API_IUV_DOC);
    })

    // CREACION DE DATOS AUTOMÁTICA
    db.find({}).sort({year:1}).exec(function(err,data){
        if(data.length == 0){
            db.insert([
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
                },
                {
                    country: "germany",
                    year: 2019,
                    veh_use_comm: 3889521,
                    veh_use_pass: 47715977,
                    veh_use_per_1000: 620.51,
                },
                {
                    country: "united kingdom",
                    year: 2019,
                    veh_use_comm: 5218170,
                    veh_use_pass: 35168259,
                    veh_use_per_1000: 602.55,
                },
                {
                    country: "france",
                    year: 2019,
                    veh_use_comm: 6702546,
                    veh_use_pass: 38467190,
                    veh_use_per_1000: 669.32,
                },
                {
                    country: "italy",
                    year: 2019,
                    veh_use_comm: 5219523,
                    veh_use_pass: 39545232,
                    veh_use_per_1000: 750.56,
                },
                {
                    country: "spain",
                    year: 2018,
                    veh_use_comm: 4316530,
                    veh_use_pass: 24520287,
                    veh_use_per_1000: 614.37
                },
                {
                    country: "germany",
                    year: 2018,
                    veh_use_comm: 3751843,
                    veh_use_pass: 47095784,
                    veh_use_per_1000: 612.48,
                },
                {
                    country: "united kingdom",
                    year: 2018,
                    veh_use_comm: 5097345,
                    veh_use_pass: 34887915,
                    veh_use_per_1000: 599.95,
                },
                {
                    country: "france",
                    year: 2018,
                    veh_use_comm: 6891587,
                    veh_use_pass: 38253851,
                    veh_use_per_1000: 670.90,
                },
                {
                    country: "italy",
                    year: 2018,
                    veh_use_comm: 5150556,
                    veh_use_pass: 39018170,
                    veh_use_per_1000: 738.40,
                },
                {
                    country: "spain",
                    year: 2017,
                    veh_use_comm: 4172980,
                    veh_use_pass: 23942022,
                    veh_use_per_1000: 602.57,
                  },
                  {
                    country: "germany",
                    year: 2017,
                    veh_use_comm: 3617895,
                    veh_use_pass: 46474594,
                    veh_use_per_1000: 605.04,
                  },
                  {
                    country: "united kingdom",
                    year: 2017,
                    veh_use_comm: 4989234,
                    veh_use_pass: 34686328,
                    veh_use_per_1000: 598.66,
                  },
                  {
                    country: "france",
                    year: 2017,
                    veh_use_comm: 6842358,
                    veh_use_pass: 38086586,
                    veh_use_per_1000: 670.32,
                  },
                  {
                    country: "italy",
                    year: 2017,
                    veh_use_comm: 5077594,
                    veh_use_pass: 38520321,

                    veh_use_per_1000: 720.82,
                  },
                  {
                    country: "spain",
                    year: 2016,
                    veh_use_comm: 4033165,
                    veh_use_pass: 23320290,
                    veh_use_per_1000: 587.90,
                  },
                  {
                    country: "germany",
                    year: 2016,
                    veh_use_comm: 3481864,
                    veh_use_pass: 45803560,
                    veh_use_per_1000: 597.24,
                  },
                  {
                    country: "united kingdom",
                    year: 2016,
                    veh_use_comm: 4862053,
                    veh_use_pass: 34378386,
                    veh_use_per_1000: 595.96,
                  },
                  {
                    country: "france",
                    year: 2016,
                    veh_use_comm: 6677167,
                    veh_use_pass: 37586724,
                    veh_use_per_1000: 662.54,
                  },
                  {
                    country: "italy",
                    year: 2016,
                    veh_use_comm: 4985908,
                    veh_use_pass: 37876138,
                    veh_use_per_1000: 707.42,
                  },
            ]);
            console.log("Datos iniciales añadidos automaticamente");
        }
        else{
            console.log("Base de datos cargarda con "+data.length+" registros");
        }
    });

    // CREACION DE DATOS MANUAL
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
                    },
                    {
                        country: "germany",
                        year: 2019,
                        veh_use_comm: 3889521,
                        veh_use_pass: 47715977,
                        veh_use_per_1000: 620.51,
                    },
                    {
                        country: "united kingdom",
                        year: 2019,
                        veh_use_comm: 5218170,
                        veh_use_pass: 35168259,
                        veh_use_per_1000: 602.55,
                    },
                    {
                        country: "france",
                        year: 2019,
                        veh_use_comm: 6702546,
                        veh_use_pass: 38467190,
                        veh_use_per_1000: 669.32,
                    },
                    {
                        country: "italy",
                        year: 2019,
                        veh_use_comm: 5219523,
                        veh_use_pass: 39545232,
                        veh_use_per_1000: 750.56,
                    },
                    {
                        country: "spain",
                        year: 2018,
                        veh_use_comm: 4316530,
                        veh_use_pass: 24520287,
                        veh_use_per_1000: 614.37
                    },
                    {
                        country: "germany",
                        year: 2018,
                        veh_use_comm: 3751843,
                        veh_use_pass: 47095784,
                        veh_use_per_1000: 612.48,
                    },
                    {
                        country: "united kingdom",
                        year: 2018,
                        veh_use_comm: 5097345,
                        veh_use_pass: 34887915,
                        veh_use_per_1000: 599.95,
                    },
                    {
                        country: "france",
                        year: 2018,
                        veh_use_comm: 6891587,
                        veh_use_pass: 38253851,
                        veh_use_per_1000: 670.90,
                    },
                    {
                        country: "italy",
                        year: 2018,
                        veh_use_comm: 5150556,
                        veh_use_pass: 39018170,
                        veh_use_per_1000: 738.40,
                    },
                    {
                        country: "spain",
                        year: 2017,
                        veh_use_comm: 4172980,
                        veh_use_pass: 23942022,
                        veh_use_per_1000: 602.57,
                      },
                      {
                        country: "germany",
                        year: 2017,
                        veh_use_comm: 3617895,
                        veh_use_pass: 46474594,
                        veh_use_per_1000: 605.04,
                      },
                      {
                        country: "united kingdom",
                        year: 2017,
                        veh_use_comm: 4989234,
                        veh_use_pass: 34686328,
                        veh_use_per_1000: 598.66,
                      },
                      {
                        country: "france",
                        year: 2017,
                        veh_use_comm: 6842358,
                        veh_use_pass: 38086586,
                        veh_use_per_1000: 670.32,
                      },
                      {
                        country: "italy",
                        year: 2017,
                        veh_use_comm: 5077594,
                        veh_use_pass: 38520321,
    
                        veh_use_per_1000: 720.82,
                      },
                      {
                        country: "spain",
                        year: 2016,
                        veh_use_comm: 4033165,
                        veh_use_pass: 23320290,
                        veh_use_per_1000: 587.90,
                      },
                      {
                        country: "germany",
                        year: 2016,
                        veh_use_comm: 3481864,
                        veh_use_pass: 45803560,
                        veh_use_per_1000: 597.24,
                      },
                      {
                        country: "united kingdom",
                        year: 2016,
                        veh_use_comm: 4862053,
                        veh_use_pass: 34378386,
                        veh_use_per_1000: 595.96,
                      },
                      {
                        country: "france",
                        year: 2016,
                        veh_use_comm: 6677167,
                        veh_use_pass: 37586724,
                        veh_use_per_1000: 662.54,
                      },
                      {
                        country: "italy",
                        year: 2016,
                        veh_use_comm: 4985908,
                        veh_use_pass: 37876138,
                        veh_use_per_1000: 707.42,
                      },
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
                                    docsCopy = [];
                                    for(let i=0; i < qLimit ; i++){
                                        if(docs[i] != undefined){
                                            docsCopy.push(docs[i]);
                                        }
                                    }
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
                                    docsCopy = [];
                                    for(let i=0; i < qLimit ; i++){
                                        if(docs[i] != undefined){
                                            docsCopy.push(docs[i]);
                                        }
                                    }
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
                                    docsCopy = [];
                                    for(let i=0; i < qLimit ; i++){
                                        if(docs[i] != undefined){
                                            docsCopy.push(docs[i]);
                                        }
                                    }
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
                        db.find({}).skip(qOffset).sort({year:1}).limit(qLimit).exec(function(err, docs){
                            if(err){
                                res.sendStatus(500,"INTERNAL SERVER ERROR");
                            }
                            else{
                                docsCopy = [];
                                for(let i=0; i < qLimit ; i++){
                                    if(docs[i] != undefined){
                                        docsCopy.push(docs[i]);
                                    }
                                }
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
                                docsCopy = [];
                                for(let i=0; i < qLimit ; i++){
                                    if(docs[i] != undefined){
                                        docsCopy.push(docs[i]);
                                    }
                                }
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
                    res.send(JSON.stringify(docsCopy[0],null,2));
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