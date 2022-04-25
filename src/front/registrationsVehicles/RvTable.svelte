
<script>

import {onMount} from 'svelte';
import {Pagination, PaginationItem, PaginationLink, Table, Button, Alert } from "sveltestrap";

const delay = ms => new Promise(res => setTimeout(res, ms));


//1.variable PV

let productionsVehicles=[];
   
//2.nuevo production-vehicle,para insertar nuevos datos (POST)

	let newPV = {
		country: "",
		year: "",
		veh_comm: "",
		veh_pass: "",
		veh_annprod: ""
	}

   //3.PARA LA BÚSQUEDA (to y from)

	var currentTime = new Date();
	let yFrom = currentTime.getFullYear();
	let yTo = currentTime.getFullYear();

   //4.MÉTODOS DE POST,DELETE Y GET


   //4.1-GET con búsqueda y mensajes

	onMount(getPv);
   
   //añadimos una variable b inicializada a false para la búsqueda
	async function getPv(parametros="",b=false) {
		console.log("Fetching data....");
		const res = await fetch("/api/v1/productions-vehicles"+parametros);
						

		console.log(res.ok);
		if (res.ok && b) {
			
			const data = await res.json();
			productionsVehicles = data;
			//getPaginacionPV();
			await delay(50);
			window.alert("Búsqueda realizada");
			for(let i=0; i<productionsVehicles.length ; i++){
				let y = productionsVehicles[i].year;
				if(y < yFrom){
					yFrom = y;
				}
			}
			console.log("Received data: " + productionsVehicles.length);
		}
      //no realiza la búsqueda
		else if(res.ok && !b){	
			const data = await res.json();
			productionsVehicles = data;
			//getPaginacionPV();
			for(let i=0; i<productionsVehicles.length ; i++){
				let y = productionsVehicles[i].year;
				if(y < yFrom){
					yFrom = y;
				}
			}
			console.log("Received data: " + productionsVehicles.length);
		}
		else{
			//mostrar error en la búsqueda
			if(res.status == "400"){
				window.alert("La petición no está correctamente formulada");
			}
			if(res.status == "405"){
				window.alert("Método no permitido");
			}
			if(res.status == "404"){
				window.alert("Elemento no encontrado");
			}
			if(res.status == "500"){
				window.alert("INTERNAL SERVER ERROR");
			}
		}
	}

   //4.2-POST ,insertar datos y con mensajes

   async function insertPv() {
		console.log("Inserting data...." + JSON.stringify(newPV));
		const res = await fetch("/api/v1/productions-vehicles", {
			method: "POST",
			body: JSON.stringify(newPV),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(async function (res) {
         //añadir datos
			if (res.ok){
				newPV.country="";
				newPV.year="";
				newPV.veh_comm="";
				newPV.veh_pass="";
				newPV.veh_annprod="";
				getPv(); //para que cuando se añadan los registros no haga falta recargar,si no que directamente aparezca la actualización con los añadidos
				getPaginacionPV();
				await delay(50);
				window.alert("Registro añadido correctamente");
			}
         //no se puede añadir porque ya existe
			else{
				if(res.status == "409"){
					window.alert("No se puede añadir este registro porque ya existe");
				}
				if(res.status == "400"){
				window.alert("La petición no está correctamente formulada");
			    }
			    if(res.status == "405"){
				window.alert("Método no permitido");
			    }
			   if(res.status == "404"){
			   window.alert("Elemento no encontrado");
			   }
			  if(res.status == "500"){
				window.alert("INTERNAL SERVER ERROR");
			 }
			}
		});
		console.log("DONE");
	}

   //4.3-LoadInitialData,función donde se cargan los datos para el botón de listar todos los recursos
   //es decir,se cargan los datos inicialesde mi API
   async function loadInitialData() {
		console.log("Inserting default data");
		await fetch("/api/v1/productions-vehicles/loadInitialData").then(async function (res) {
			if (res.ok){
			getPv();
			await delay(50);
			window.alert("Registros añadidos correctamente");
		   }
        else{
			if(res.status == "400"){
				window.alert("La petición no está correctamente formulada");
			}
			if(res.status == "405"){
				window.alert("Método no permitido");
			}
			if(res.status == "404"){
				window.alert("Elemento no encontrado");
			}
			if(res.status == "500"){
				window.alert("INTERNAL SERVER ERROR");
			}

		}

		});
	}

   //4.4 Delete de un recurso en concreto por año y por país

   async function deletePv(country,year){
		const id = country + "/" + year;
		const res = await fetch("/api/v1/productions-vehicles/"+id, {
			method: "DELETE",
		}).then(async function (res) {
			if(res.ok){
			getPv();
			await delay(50);
         //mensaje de eliminado el recurso en concreto
			window.alert("Registro eliminado correctamente");
		}
		else{
			if(res.status == "400"){
				window.alert("La petición no está correctamente formulada");
			}
			if(res.status == "405"){
				window.alert("Método no permitido");
			}
			if(res.status == "404"){
				window.alert("Elemento no encontrado");
			}
			if(res.status == "500"){
				window.alert("INTERNAL SERVER ERROR");
			}

		}
		});
	}

   //4.5 Delete de todos los recursos

   async function deleteAllPv() {
		console.log("Deleting all");
		const res = await fetch("/api/v1/productions-vehicles", {
			method: "DELETE",
		}).then(async function (res) {
			if(res.ok){
			getPv();
			await delay(50);
         //mensaje de elminado todos los registros
			window.alert("Registros eliminados correctamente");
		}
		else{
			if(res.status == "400"){
				window.alert("La petición no está correctamente formulada");
			}
			if(res.status == "405"){
				window.alert("Método no permitido");
			}
			if(res.status == "404"){
				window.alert("Elemento no encontrado");
			}
			if(res.status == "500"){
				window.alert("INTERNAL SERVER ERROR");
			}
		}
		});
	}


/////////////////////////////////////

	//PAGINACIÓN

	let c_offset = 0;
    let offset = 0;
    let limit = 10;
    let c_page = 1;
    let lastPage = 1;
    let total = 0;

	async function getPaginacionPV() {
    	console.log("Fetching data...");
   		const res = await fetch("/api/v1/productions-vehicles"+ "?limit=" + limit + "&offset=" + c_offset);
		
        if(res.ok){

			const data = await res.json();
			productionsVehicles= data;
			console.log("Registros recibidos: "+productionsVehicles.length);
			update();
		}else{
			if(res.status == "400"){
				window.alert("La petición no está correctamente formulada");
			}
			if(res.status == "405"){
				window.alert("Método no permitido");
			}
			if(res.status == "404"){
				window.alert("Elemento no encontrado");
			}
			if(res.status == "500"){
				window.alert("INTERNAL SERVER ERROR");
			}
		}
  	}

//funciones

	  async function update() {
      const res = await fetch("/api/v1/productions-vehicles");
      if (res.status == 200) {
        const json = await res.json();
        total = json.length;
        changePage(c_page, c_offset);
      } 
    }

	
	function range(size, start = 0) {
      return [...Array(size).keys()].map((i) => i + start);
	}

	function changePage(page, offset) {
      
      lastPage = Math.ceil(total/limit);
      console.log("Last page = " + lastPage);
      if (page !== c_page) {
        c_offset = offset;
        c_page = page;
        getPv();
		getPaginacionPV();
      }

	}


</script>

<style>
	h1{
		color:aqua;
	}

</style>

<main>

<!--5.Segunda página donde están todos los métodos de insertar,eliminar y obtener los datos-->
   
<h1 align="center">Listado de producción de vehículos</h1>

    {#await productionsVehicles}
     loading
    {:then productionsVehicles}
         <Table bordered>
            <thead>
                 <tr>
                  <tr align="center">
                    <th>País</th>
                    <th> Año</th>
                    <th>Vehículos comerciales </th>
                    <th>Vehículos pasajero</th>
                    <th>Producción anual de vehículos</th>
                 </tr>
            </thead>
            <tbody>
               <tr/>
               {#each productionsVehicles as productionVehicle}
                  <tr align="center">
                     <td><a href="#/productions-vehicles/{productionVehicle.country}/{productionVehicle.year}">{productionVehicle.country}</a></td>
                     <td>{productionVehicle.year}</td>
                     <td>{productionVehicle.veh_comm}</td>
                     <td>{productionVehicle.veh_pass}</td>
                     <td>{productionVehicle.veh_annprod}</td>
                     <!--botón para eliminar cada uno de los registros-->
                     <td><Button outline color="danger" on:click={deletePv(productionVehicle.country,productionVehicle.year)}>Eliminar recurso</Button></td>
                  </tr>
               {/each}
               <tr align="center">
                  <td><input bind:value={newPV.country} type="text" /></td>
                  <td><input bind:value={newPV.year} type="number" /></td>
                  <td><input bind:value={newPV.veh_comm}	type="number"	/></td>
                  <td><input bind:value={newPV.veh_pass} type="number"/></td>
                  <td><input bind:value={newPV.veh_annprod} type="number"/></td>
                  <td><Button outline color="primary" on:click={insertPv}>Añadir recurso</Button></td>
               </tr>
            </tbody>
         </Table>
         <Button color="danger" on:click={deleteAllPv}>Borrar TODOS los recursos</Button>
         <Button outline color="primary" on:click={loadInitialData}>Cargar todos los recursos</Button>
         <br>
         <br>
         <br>
         <br>
         <br>
         <!--para la búsqueda (to y from)-->
         <h5>Buscar registros entre el año <input bind:value={yFrom} type="text"/> y el año <input bind:value={yTo} type="text"/> <Button color="info" on:click={getPv(`?from=${yFrom}&to=${yTo}`,true)}>Buscar</Button> </h5>
      
		 <div>
			<Pagination ariaLabel="Web pagination">
			  <PaginationItem class = {c_page === 1 ? "disabled" : ""}>
					<PaginationLink previous href="#/productions-vehicles/data" on:click={() => changePage(c_page - 1, c_offset - 10)}/>
			  </PaginationItem>
			  {#each range(lastPage, 1) as page}
					<PaginationItem class = {c_page === page ? "active" : ""}>
					  <PaginationLink previous href="#/productions-vehicles/data" on:click={() => changePage(page, (page - 1) * 10)}>
						  {page}
					  </PaginationLink>
					</PaginationItem>
			  {/each}
			  <PaginationItem class = {c_page === lastPage ? "disabled" : ""}>
					<PaginationLink next href="#/productions-vehicles/data" on:click={() => changePage(c_page + 1, c_offset + 10)}/>
			  </PaginationItem>
			</Pagination>
	
	  </div>
		 {/await}
   </main>
   




           