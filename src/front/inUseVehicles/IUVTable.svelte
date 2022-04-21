<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";
	import Button from "sveltestrap/src/Button.svelte";

	let iuv = [];
	let newIuv = {
		country: "",
		year: "",
		veh_use_comm: "",
		veh_use_pass: "",
		veh_use_per_1000: "",
	};

	onMount(getIuv);

	async function getIuv() {
		console.log("Fetching data....");
		const res = await fetch("/api/v1/in-use-vehicles");
		console.log(res.ok);
		if (res.ok) {
			const data = await res.json();
			iuv = data;
			console.log("Received contacts: " + iuv.length);
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
		}).then(function (res) {
			getIuv();
		});
		console.log("DONE");
	}

	async function deleteAll() {
		console.log("Deleting all");
		const res = await fetch("/api/v1/in-use-vehicles", {
			method: "DELETE",
		}).then(function (res) {
			getIuv();
		});
	}

	async function loadInitialData() {
		console.log("Inserting default data");
		await fetch("/api/v1/in-use-vehicles/loadInitialData").then(function (
			res
		) {
			getIuv();
		});
	}


	async function deleteIuv(country,year){
		const id = country + "/" + year;
		const res = await fetch("/api/v1/in-use-vehicles/"+id, {
			method: "DELETE",
		}).then(function (res) {
			console.log("/api/v1/in-use-vehicles"+id)
			getIuv();
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
				<tr align="center">
					<td><input bind:value={newIuv.country} type="text" /></td>
					<td><input bind:value={newIuv.year} type="text" /></td>
					<td><input bind:value={newIuv.veh_use_comm}	type="text"	/></td>
					<td><input bind:value={newIuv.veh_use_pass} type="text"/></td>
					<td><input bind:value={newIuv.veh_use_per_1000} type="text"/></td>
					<td	><Button outline color="primary" on:click={insertIuv}>Añadir</Button></td>
				</tr>
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
			</tbody>
		</Table>
		<Button color="danger" on:click={deleteAll}
			>ELIMINAR TODOS LOS REGISTROS</Button
		>
		<Button outline color="primary" on:click={loadInitialData}
			>Importar registros por defecto</Button
		>
	{/await}
</main>
