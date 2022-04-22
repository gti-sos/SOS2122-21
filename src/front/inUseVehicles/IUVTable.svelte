<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	const delay = ms => new Promise(res => setTimeout(res, ms));

	let iuv = [];
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

	onMount(getIuv);

	async function getIuv(parametros="",b=false) {
		console.log("Fetching data....");
		const res = await fetch("/api/v1/in-use-vehicles"+parametros);
						

		console.log(res.ok);
		if (res.ok && b) {
			
			const data = await res.json();
			iuv = data;
			await delay(50);
			window.alert("Búsqueda realizada");
			for(let i=0; i<iuv.length ; i++){
				let y = iuv[i].year;
				if(y < yFrom){
					yFrom = y;
				}
			}
			console.log("Received data: " + iuv.length);
		}
		else if(res.ok && !b){	
			const data = await res.json();
			iuv = data;
			for(let i=0; i<iuv.length ; i++){
				let y = iuv[i].year;
				if(y < yFrom){
					yFrom = y;
				}
			}
			console.log("Received data: " + iuv.length);
		}
		else{
			if(res.status == "400"){
				window.alert("BAD REQUEST");
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

	async function insertIuv() {
		console.log("Inserting data...." + JSON.stringify(newIuv));
		const res = await fetch("/api/v1/in-use-vehicles", {
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
		const res = await fetch("/api/v1/in-use-vehicles", {
			method: "DELETE",
		}).then(async function (res) {
			getIuv();
			await delay(50);
			window.alert("Registros eliminados correctamente");
		});
	}

	async function loadInitialData() {
		console.log("Inserting default data");
		await fetch("/api/v1/in-use-vehicles/loadInitialData").then(async function (res) {
			getIuv();
			await delay(50);
			window.alert("Registros añadidos correctamente");
		});
	}


	async function deleteIuv(country,year){
		const id = country + "/" + year;
		const res = await fetch("/api/v1/in-use-vehicles/"+id, {
			method: "DELETE",
		}).then(async function (res) {
			getIuv();
			await delay(50);
			window.alert("Registro eliminado correctamente");
		});
	}


</script>

<main>
	<h1>Listado de vehículos en uso</h1>
	{#await iuv}
		loading
	{:then iuv}
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
					<td><input bind:value={newIuv.country} type="text" /></td>
					<td><input bind:value={newIuv.year} type="number" /></td>
					<td><input bind:value={newIuv.veh_use_comm}	type="number"	/></td>
					<td><input bind:value={newIuv.veh_use_pass} type="number"/></td>
					<td><input bind:value={newIuv.veh_use_per_1000} type="number"/></td>
					<td	><Button outline color="primary" on:click={insertIuv}>Añadir</Button></td>
				</tr>
			</tbody>
		</Table>
		<Button color="danger" on:click={deleteAll}>ELIMINAR TODOS LOS REGISTROS</Button>
		<Button outline color="primary" on:click={loadInitialData}>Importar registros por defecto</Button>
		<br>
		<br>
		<br>
		<br>
		<br>
		<h5>Buscar registros entre el año <input bind:value={yFrom} type="text"/> y el <input bind:value={yTo} type="text"/> <Button color="info" on:click={getIuv(`?from=${yFrom}&to=${yTo}`,true)}>Buscar</Button> </h5>
	{/await}
</main>
