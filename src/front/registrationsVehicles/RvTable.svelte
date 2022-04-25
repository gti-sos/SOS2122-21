<script>
	import { onMount, afterUpdate } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	const delay = ms => new Promise(res => setTimeout(res, ms));

	let rv = [];
	let rvCopy = [];

	let newRv = {
		country: "",
		year: "",
		veh_sale: "",
		veh_per_1000: "",
		variation: "",
	};

	var currentTime = new Date();
	let yFrom = currentTime.getFullYear();
	let yTo = currentTime.getFullYear();

	let numPags = 0;
	const limitPag = 10;
	const defaultOffset = 0;
	onMount(getPags)
	onMount(getRv);

	async function getPags(){
		const res = await fetch("/api/v1/registrations-vehicles");
		if(res.ok){
			const data = await res.json();
			rv = data;
		}
		numPags = Math.ceil(rv.length/limitPag);
	}

	async function getRv(parametros="",busqueda=false) {
		console.log("Fetching data....");
		let res;
		let resBusqueda;
		if(busqueda){
			res = await fetch("/api/v1/registrations-vehicles"+parametros+`&offset=${defaultOffset}&limit=${limitPag}`);
			resBusqueda = await fetch("/api/v1/registrations-vehicles"+parametros);
		}
		else{
			res = await fetch("/api/v1/registrations-vehicles"+parametros+`?offset=${defaultOffset}&limit=${limitPag}`);
		}
		
		console.log(res.ok);
		getPags();

		if (res.ok && busqueda) {
			const data = await res.json();
			const data2 = await resBusqueda.json();
			rv = data;
			rvCopy = data2;
			numPags = Math.ceil(rvCopy.length/limitPag)
			await delay(50);
			window.alert("Búsqueda realizada correctamente");
			for(let i=0; i<rv.length ; i++){
				let y = rv[i].year;
				if(y < yFrom){
					yFrom = y;
				}
			}
			console.log("Received data: " + rv.length);
		}
		else if(res.ok && !busqueda){	
			const data = await res.json();
			rv = data;
			for(let i=0; i<rv.length ; i++){
				let y = rv[i].year;
				if(y < yFrom){
					yFrom = y;
				}
			}
			console.log("Numero paginas: "+numPags);
			console.log("Received data: " + rv.length);
		}
		else{
			if(res.status == "400"){
				window.alert("No se puede realizar la búsqueda entre dichos años");
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

	async function getRvPag(offset){
		let off = offset * limitPag;
		const res = await fetch(`/api/v1/registrations-vehicles?from=${yFrom}&to=${yTo}&offset=${off}&limit=${limitPag}`);
		if(res.ok){
			const data = await res.json();
				rv = data;
				await delay(50);
		}
	}

	async function insertRv() {
		console.log("Inserting data...." + JSON.stringify(newRv));
		const res = await fetch("/api/v1/registrations-vehicles", {
			method: "POST",
			body: JSON.stringify(newRv),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(async function (res) {
			if (res.ok){
				newRv.country="";
				newRv.year="";
				newRv.veh_sale="";
				newRv.veh_per_1000="";
				newRv.variation="";
				getRv();
				await delay(50);
				window.alert("Registro añadido correctamente");
			}
			else{
				if(res.status == "409"){
					window.alert("No se puede añadir este registro porque ya existe");
				}
			}
		});
		console.log("DONE");
	}

	async function deleteAll() {
		console.log("Deleting all");
		const res = await fetch("/api/v1/registrations-vehicles", {
			method: "DELETE",
		}).then(async function (res) {
			getRv();
			await delay(50);
			window.alert("Registros eliminados correctamente");
		});
	}

	async function loadInitialData() {
		console.log("Inserting default data");
		await fetch("/api/v1/registrations-vehicles/loadInitialData").then(async function (res) {
			getRv();
			await delay(50);
			window.alert("Registros añadidos correctamente");
		});
	}


	async function deleteRv(country,year){
		const id = country + "/" + year;
		const res = await fetch("/api/v1/registrations-vehicles/"+id, {
			method: "DELETE",
		}).then(async function (res) {
			getRv();
			await delay(50);
			window.alert("Registro eliminado correctamente");
		});
	}


</script>

<main>
	<h1>Listado de vehículos matriculados nuevos</h1>
	{#await rv}
		loading
	{:then rv}
		<Table bordered>
			<thead>
				<tr align="center">
					<th> País </th>
					<th> Año </th>
					<th> Venta anual de vehículos</th>
					<th> Venta anual de vehículos por 1000 habitantes </th>
					<th> Variación </th>
				</tr>
			</thead>
			<tbody>
				<tr />
				{#each rv as e}
					<tr align="center">
						<td><a href="#/registrations-vehicles/{e.country}/{e.year}">{e.country}</a></td>
						<td>{e.year}</td>
						<td>{e.veh_sale}</td>
						<td>{e.veh_per_1000}</td>
						<td>{e.variation}</td>
						<td	><Button outline color="danger" on:click={deleteRv(e.country,e.year)}>Eliminar</Button></td>
					</tr>
				{/each}
				<tr align="center">
					<td><input bind:value={newRv.country} type="text" /></td>
					<td><input bind:value={newRv.year} type="number" /></td>
					<td><input bind:value={newRv.veh_sale}	type="number"	/></td>
					<td><input bind:value={newRv.veh_per_1000} type="number"/></td>
					<td><input bind:value={newRv.variation} type="number"/></td>
					<td	><Button outline color="primary" on:click={insertRv}>Añadir</Button></td>
				</tr>
			</tbody>
		</Table>

		<div align="center">
			{#each Array(numPags) as _,i}
				<Button outline color="secondary" on:click={()=>{getRvPag(i)}}>{i}</Button>&nbsp
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
			<Button color="info" on:click={getRv(`?from=${yFrom}&to=${yTo}`,true)}>Buscar</Button> 
			<Button outline color="info" on:click={async () =>{
				window.alert("Búsqueda limpiada correctamente");
				getRv(); 
				location.reload();
				}}>Limpiar búsqueda</Button> 
		</h5>
	{/await}
</main>


