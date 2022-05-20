
<script>

import {onMount} from 'svelte';
import {Pagination, PaginationItem, PaginationLink, Table, Button, Alert } from "sveltestrap";

const delay = ms => new Promise(res => setTimeout(res, ms));


//1.variable RV

let registrationsVehicles=[];
   
//2.nuevo registration-vehicle,para insertar nuevos datos (POST)

	let newRv = {
		country: "",
		year: "",
		veh_sale: "",
		veh_per_1000: "",
		variation: ""
	}

   //3.PARA LA BÚSQUEDA (to y from)

	var currentTime = new Date();
	let yFrom = currentTime.getFullYear();
	let yTo = currentTime.getFullYear();

   //4.MÉTODOS DE POST,DELETE Y GET


   //4.1-GET con búsqueda y mensajes

	onMount(getRv);
   
   //añadimos una variable b inicializada a false para la búsqueda
	async function getRv(parametros="",b=false) {
		console.log("Fetching data....");
		const res = await fetch("/api/v1/registrations-vehicles"+parametros);
						

		console.log(res.ok);
		if (res.ok && b) {
			
			const data = await res.json();
			registrationsVehicles = data;
			//getPaginacionRV();
			await delay(50);
			window.alert("Búsqueda realizada");
			for(let i=0; i<registrationsVehicles.length ; i++){
				let y = registrationsVehicles[i].year;
				if(y < yFrom){
					yFrom = y;
				}
			}
			console.log("Received data: " + registrationsVehicles.length);
		}
      //no realiza la búsqueda
		else if(res.ok && !b){	
			const data = await res.json();
			registrationsVehicles = data;
			//getPaginacionRV();
			for(let i=0; i<registrationsVehicles.length ; i++){
				let y = registrationsVehicles[i].year;
				if(y < yFrom){
					yFrom = y;
				}
			}
			console.log("Received data: " + registrationsVehicles.length);
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

   async function insertRv() {
		console.log("Inserting data...." + JSON.stringify(newRv));
		const res = await fetch("/api/v1/registrations-vehicles", {
			method: "POST",
			body: JSON.stringify(newRv),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(async function (res) {
         //añadir datos
			if (res.ok){
				newRv.country="";
				newRv.year="";
				newRv.veh_sale="";
				newRv.veh_per_1000="";
				newRv.variation="";
				getRv(); //para que cuando se añadan los registros no haga falta recargar,si no que directamente aparezca la actualización con los añadidos
				getPaginacionRV();
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
		await fetch("/api/v1/registrations-vehicles/loadInitialData").then(async function (res) {
			if (res.ok){
			getRv();
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

   async function deleteRv(country,year){
		const id = country + "/" + year;
		const res = await fetch("/api/v1/registrations-vehicles/"+id, {
			method: "DELETE",
		}).then(async function (res) {
			if(res.ok){
			getRv();
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

   async function deleteAllRv() {
		console.log("Deleting all");
		const res = await fetch("/api/v1/registrations-vehicles", {
			method: "DELETE",
		}).then(async function (res) {
			if(res.ok){
			getRv();
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

	async function getPaginacionRV() {
    	console.log("Fetching data...");
   		const res = await fetch("/api/v1/registrations-vehicles"+ "?limit=" + limit + "&offset=" + c_offset);
		
        if(res.ok){

			const data = await res.json();
			registrationsVehicles= data;
			console.log("Registros recibidos: "+registrationsVehicles.length);
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
      const res = await fetch("/api/v1/registrations-vehicles");
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
        getRv();
		getPaginacionRV();
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
   
<h1 align="center">Listado de registro de vehículos</h1>

    {#await registrationsVehicles}
     loading
    {:then registrationsVehicles}
         <Table bordered>
            <thead>
                 <tr>
                  <tr align="center">
                    <th>País</th>
                    <th> Año</th>
                    <th>Venta anual de vehículos </th>
                    <th>Venta anual de vehículos por 1000 habitantes</th>
                    <th>Variación</th>
                 </tr>
            </thead>
            <tbody>
               <tr/>
               {#each registrationsVehicles as registrationVehicle}
                  <tr align="center">
                     <td><a href="#/registrations-vehicles/{registrationVehicle.country}/{registrationVehicle.year}">{registrationVehicle.country}</a></td>
                     <td>{registrationVehicle.year}</td>
                     <td>{registrationVehicle.veh_sale}</td>
                     <td>{registrationVehicle.veh_per_1000}</td>
                     <td>{registrationVehicle.variation}</td>
                     <!--botón para eliminar cada uno de los registros-->
                     <td><Button outline color="danger" on:click={deleteRv(registrationVehicle.country,registrationVehicle.year)}>Eliminar recurso</Button></td>
                  </tr>
               {/each}
               <tr align="center">
                  <td><input bind:value={newRv.country} type="text" /></td>
                  <td><input bind:value={newRv.year} type="number" /></td>
                  <td><input bind:value={newRv.veh_sale}	type="number"	/></td>
                  <td><input bind:value={newRv.veh_per_1000} type="number"/></td>
                  <td><input bind:value={newRv.variation} type="number"/></td>
                  <td><Button outline color="primary" on:click={insertRv}>Añadir recurso</Button></td>
               </tr>
            </tbody>
         </Table>
         <Button color="danger" on:click={deleteAllRv}>Borrar TODOS los recursos</Button>
         <Button outline color="primary" on:click={loadInitialData}>Cargar todos los recursos</Button>
         <br>
         <br>
         <br>
         <br>
         <br>
         <!--para la búsqueda (to y from)-->
         <h5>Buscar registros entre el año <input bind:value={yFrom} type="text"/> y el año <input bind:value={yTo} type="text"/> <Button color="info" on:click={getRv(`?from=${yFrom}&to=${yTo}`,true)}>Buscar</Button> </h5>
      
		 <div>
			<Pagination ariaLabel="Web pagination">
			  <PaginationItem class = {c_page === 1 ? "disabled" : ""}>
					<PaginationLink previous href="#/registrations-vehicles/data" on:click={() => changePage(c_page - 1, c_offset - 10)}/>
			  </PaginationItem>
			  {#each range(lastPage, 1) as page}
					<PaginationItem class = {c_page === page ? "active" : ""}>
					  <PaginationLink previous href="#/registrations-vehicles/data" on:click={() => changePage(page, (page - 1) * 10)}>
						  {page}
					  </PaginationLink>
					</PaginationItem>
			  {/each}
			  <PaginationItem class = {c_page === lastPage ? "disabled" : ""}>
					<PaginationLink next href="#/registrations-vehicles/data" on:click={() => changePage(c_page + 1, c_offset + 10)}/>
			  </PaginationItem>
			</Pagination>
	
	  </div>
		 {/await}
   </main>
   




           