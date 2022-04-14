

  //--------------------------------------------María Lacañina Camacho-------------------------------------
  module.exports = (app, BASE_API_URL, bodyParser) => {
    app.use(bodyParser.json());

//POSTMAN
    const API_PV_DOC = "https://documenter.getpostman.com/view/20099214/UVyn2yuQ";
    app.get(BASE_API_URL + "/productions-vehicles/docs", (req, res) => {
        res.redirect(API_PV_DOC);
    })

    var ProductionsVehicles = []; 


    //datos de mi API->GET al conjunto de recursos
    //ruta que al hacer un GET que cree 6 datos en la base de datos si está vacía

    app.get(BASE_API_URL+"/productions-vehicles/loadInitialData", (req,res) => {
        ProductionsVehicles=[];
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
            ProductionsVehicles.push(e);
        });
        res.send(JSON.stringify(ProductionsVehicles,null,2));
    })

    //GET a todos los recursos

    app.get(BASE_API_URL+"/productions-vehicles", (req,res) => {
        res.send(JSON.stringify(ProductionsVehicles,null,2));
    })


    //GET a un recurso en concreto 
    //obetener un recurso por país y por año

    app.get(BASE_API_URL+"/productions-vehicles/:country/:year", (req,res) => {
        var Country = req.params.country;
        var Year = req.params.year;
        filtered = ProductionsVehicles.filter( (e) => {
            return ((e.country == Country) && (e.year == Year));
        });
        if(filtered == 0){
            res.sendStatus(404,"NOT FOUND");
        }
        else{
            res.send(JSON.stringify(filtered[0],null,2));
        }
    })

    //GET a un recurso en concreto
    //obtener un recurso por país

    app.get(BASE_API_URL+"/productions-vehicles/:country", (req, res) => {
        var Country = req.params.country;
        filtered = ProductionsVehicles.filter((e) => {
            return (e.country == Country);
        });
        if (filtered == 0) {
            res.sendStatus(404, "NOT FOUND");
        }
        else {
            res.send(JSON.stringify(filtered, null, 2));
        }
    })


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
            filtered = ProductionsVehicles.filter( (e) => {
                return (e.country == req.body.country
                    &&  e.year == req.body.year
                    &&  e.veh_comm == req.body.veh_comm
                    &&  e.veh_pass == req.body.veh_pass
                    &&  e.veh_ann == req.body.veh_ann);
            }); 
            recursoExistente = ProductionsVehicles.filter( (e) => {
                return (e.year == req.body.year && e.country == req.body.country);
            })
            
            // tenemos un recurso que ya existe,para que no exista tiene que dar 0
            if(recursoExistente != 0){
                res.sendStatus(409,"CONFLICT");
                //si no creamos el recurso
            }else{
                ProductionsVehicles.push(req.body);
                res.sendStatus(201,"CREATED");
            }
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
        }
        else{
            //pais y año del recurso que quiero actualizar
            var Country = req.params.country;
            var Year = req.params.year;
            var Body = req.body;  
            var filtered = ProductionsVehicles.filter((e) =>{
                return (e.country == Country && e.year == Year)
            })
            var i = ProductionsVehicles.indexOf(filtered[0]);
            
            //no encuentra ningún recurso con el pais y año que quiero actualizar
            if(filtered == 0){
                res.sendStatus(404,"NOT FOUND");
            }
            //no coinciden los recursos de pais o de año con los del recurso que voy
            //a actualizar
            else if(Country != Body.country || Year != Body.year){
                res.sendStatus(400,"BAD REQUEST");
            }
            //voy a actualizar el recurso en concreto
            //los tres datos que quedan es lo que actualizo
            else{
                ProductionsVehicles[i].veh_comm = Body.veh_comm;
                ProductionsVehicles[i].veh_pass = Body.veh_pass;
                ProductionsVehicles[i].veh_annprod = Body.veh_annprod;
                res.sendStatus(200,"OK");
            }
        }

    })



    //DELETE a un conjunto de recursos
    //borrar todos los recursos

    app.delete(BASE_API_URL+"/productions-vehicles",(req, res)=>{
        ProductionsVehicles= [];
        res.sendStatus(200,"OK");
    })

    //DELETE de un recurso en concreto
    //borrar un recurso en concreto por su país


    app.delete(BASE_API_URL+"/productions-vehicles/:country", (req,res) => {
    //el país que quiero borrar
        var Country = req.params.country;
        filtered = ProductionsVehicles.filter( (e) => {
            return ((e.country == Country));
        });
        //no encuentra el recurso que va a borrar
        if(filtered == 0){
            res.sendStatus(404,"NOT FOUND");
        }
        else{
            ProductionsVehicles = ProductionsVehicles.filter( (e) => {
                return ((e.country != Country));
            });
        }
        res.sendStatus(200, "OK");
    })

    //DELETE de un recurso en concreto
    //borrar un recurso en concreto por país y año

    app.delete(BASE_API_URL+"/productions-vehicles/:country/:year", (req,res) => {
        var Country = req.params.country;
        var Year = req.params.year;
        filtered = ProductionsVehicles.filter( (e) => {
            return ((e.country == Country) && (e.year == Year));
        });
        if(filtered == 0){
            res.sendStatus(404,"NOT FOUND");
        }
        else{
            var i = ProductionsVehicles.indexOf(filtered[0]);
            if(i!==-1){
                ProductionsVehicles.splice(i,1);
            }
        }
        res.sendStatus(200, "OK");
    })

}