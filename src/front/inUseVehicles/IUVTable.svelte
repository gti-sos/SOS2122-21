<script>
	import { onMount } from "svelte";
	import { Alert, Col, Container, Row } from "sveltestrap";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	const delay = ms => new Promise(res => setTimeout(res, ms));

	let iuv = [];
	let iuvCopy = [];

	let estado = "";
    let visibilidad = false;
    let color = "danger";

	let newIuv = {
		country: "",
		year: "",
		veh_use_comm: "",
		veh_use_pass: "",
		veh_use_per_1000: "",
	};



	var currentTime = new Date();
	let yFrom = currentTime.getFullYear();
	let yTo = currentTime.getFullYear();

	let numPags = 0;
	const limitPag = 6;
	const defaultOffset = 0;
	//onMount(getPags)
	onMount(getIuv);

	async function getPags(){
		const res = await fetch("https://sos2122.herokuapp.com/api/v1/in-use-vehicles");
		if(res.ok){
			const data = await res.json();
			iuv = data;
		}
		numPags = Math.ceil(iuv.length/limitPag);
	}
	
	async function getIuv(parametros="",busqueda=false) {
		
		getPags();
		console.log("Fetching data....");
		let res;
		let resBusqueda;
		if(busqueda){
			res = await fetch("https://sos2122.herokuapp.com/api/v1/in-use-vehicles"+parametros+`&offset=${defaultOffset}&limit=${limitPag}`);
			resBusqueda = await fetch("https://sos2122.herokuapp.com/api/v1/in-use-vehicles"+parametros);
		}
		else{
			res = await fetch("https://sos2122.herokuapp.com/api/v1/in-use-vehicles"+parametros+`?offset=${defaultOffset}&limit=${limitPag}`);
		}
		
		console.log(res.ok);

		if (res.ok && busqueda) {
			const data = await res.json();
			const data2 = await resBusqueda.json();
			iuv = data;
			iuvCopy = data2;
			numPags = Math.ceil(iuvCopy.length/limitPag)
			visibilidad = true;
			color="success";
			estado="Búsqueda realizada correctamente";
			for(let i=0; i<iuv.length ; i++){
				let y = iuv[i].year;
				if(y < yFrom){
					yFrom = y;
				}
			}
			console.log("Received data: " + iuv.length);
		}
		else if(res.ok && !busqueda){	
			const data = await res.json();
			iuv = data;
			for(let i=0; i<iuv.length ; i++){
				let y = iuv[i].year;
				if(y < yFrom){
					yFrom = y;
				}
			}
			console.log("Numero paginas: "+numPags);
			console.log("Received data: " + iuv.length);
		}
		else{
			if(res.status == "400"){
				visibilidad = true;
				color="danger";
				estado="No se puede realizar la búsqueda entre dichos años";
			}
			if(res.status == "405"){
				visibilidad = true;
				color="danger";
				estado="Método no permitido";
			}
			if(res.status == "404"){
				visibilidad = true;
				color="danger";
				estado="Elemento no encontrado";
			}
			if(res.status == "500"){
				visibilidad = true;
				color="success";
				estado="Error interno del servidor";
			}
		}
	}

	async function getIuvPag(offset){
		let off = offset * limitPag;
		const res = await fetch(`https://sos2122.herokuapp.com/api/v1/in-use-vehicles?from=${yFrom}&to=${yTo}&offset=${off}&limit=${limitPag}`);
		if(res.ok){
			const data = await res.json();
				iuv = data;
				await delay(50);
		}
	}

	async function insertIuv() {
		console.log("Inserting data...." + JSON.stringify(newIuv));
		if (newIuv.country == "" || 
			newIuv.year == "" ||
            newIuv.veh_use_comm == "" || 
			newIuv.veh_use_pass == "" || 
			newIuv.veh_use_per_1000 == "" ){
			visibilidad = true;
			color="warning";
			estado=`Ningún campo debe estar vacio`;
		}
		else{
			const res = await fetch("https://sos2122.herokuapp.com/api/v1/in-use-vehicles", {
				method: "POST",
				body: JSON.stringify(newIuv),
				headers: {
					"Content-Type": "application/json",
				},
			}).then(async function (res) {
				if (res.ok){
					newIuv.country="";
					newIuv.year="";
					newIuv.veh_use_comm="";
					newIuv.veh_use_pass="";
					newIuv.veh_use_per_1000="";
					getIuv();
					visibilidad = true;
					color="success";
					estado="Registro añadido correctamente";
				}
				else{
					if(res.status == "409"){
						visibilidad = true;
						color="danger";
						estado=`Ya existe un registro con el país "${newIuv.country}" y el año "${newIuv.year}"`;
					}
				}
			});
			console.log("DONE");
		}
	}

	async function deleteAll() {
		console.log("Deleting all");
		const res = await fetch("https://sos2122.herokuapp.com/api/v1/in-use-vehicles", {
			method: "DELETE",
		}).then(async function (res) {
			visibilidad = true;
			getIuv();
			color="success";
			estado="Registros eliminados correctamente";
		});
	}

	async function loadInitialData() {
		console.log("Inserting default data");
		await fetch("https://sos2122.herokuapp.com/api/v1/in-use-vehicles/loadInitialData").then(async function (res) {
			getIuv();
			visibilidad = true;
			color="success";
			estado="Registros añadidos correctamente";
		});
	}


	async function deleteIuv(country,year){
		const id = country + "/" + year;
		const res = await fetch("https://sos2122.herokuapp.com/api/v1/in-use-vehicles/"+id, {
			method: "DELETE",
		}).then(async function (res) {
			getIuv();
			visibilidad = true;
			color="success";
			estado="Registro eliminado correctamente";
		});
	}

</script>

<main>
	<h1>Listado de vehículos en uso</h1>
	{#await iuv}
		loading
	{:then iuv}
		<Container>
			<Row>
				<Col xs="6" sm="4"></Col>
    			<Col xs="6" sm="4">
					<Alert color={color} isOpen={visibilidad} toggle={() => (visibilidad = false)}>
						{estado}
					</Alert>
				</Col>
			</Row>
		</Container>
		
		<Table bordered>
			<thead>
				<tr align="center">
					<th> País </th>
					<th> Año </th>
					<th> Vehículos comerciales en uso </th>
					<th> Vehículos de pasajeros en uso </th>
					<th> Vehículos en uso por 1000 habitantes </th>
				</tr>
			</thead>
			<tbody>
				<tr />
				{#each iuv as e}
					<tr align="center">
						<td><a href="#/in-use-vehicles/{e.country}/{e.year}">{e.country}</a></td>
						<td>{e.year}</td>
						<td>{e.veh_use_comm}</td>
						<td>{e.veh_use_pass}</td>
						<td>{e.veh_use_per_1000}</td>
						<td	><Button outline color="danger" on:click={deleteIuv(e.country,e.year)}>Eliminar</Button></td>
					</tr>
				{/each}
				<tr align="center">
					<td><input bind:value={newIuv.country} type="text" required/></td>
					<td><input bind:value={newIuv.year} type="number" required/></td>
					<td><input bind:value={newIuv.veh_use_comm}	type="number"	required/></td>
					<td><input bind:value={newIuv.veh_use_pass} type="number" required/></td>
					<td><input bind:value={newIuv.veh_use_per_1000} type="number" required/></td>
					<td	><Button outline color="primary" on:click={insertIuv}>Añadir</Button></td>
				</tr>
			</tbody>
		</Table>

		<div align="center">
			{#each Array(numPags) as _,i}
				<Button outline color="secondary" on:click={()=>{getIuvPag(i)}}>{i}</Button>&nbsp
			{/each}
		</div>

		<Button color="danger" on:click={deleteAll}>ELIMINAR TODOS LOS REGISTROS</Button>
		<Button outline color="primary" on:click={loadInitialData}>Importar registros por defecto</Button>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<h5>Buscar registros entre el año <input bind:value={yFrom} type="text"/> y el <input bind:value={yTo} type="text"/> 
			<Button color="info" on:click={getIuv(`?from=${yFrom}&to=${yTo}`,true)}>Buscar</Button> 
			<Button outline color="info" on:click={async () =>{
				visibilidad = true;
				color="success";
				estado="Búsqueda limpiada correctamente";
				getIuv(); 
				}}>Limpiar búsqueda</Button> 
		</h5>
	{/await}
</main>
