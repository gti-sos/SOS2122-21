<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";

	let iuv = [];

	onMount(getIuv);

	async function getIuv() {
		console.log("Fetching data....");
		await fetch("/api/v1/in-use-vehicles/loadInitialData").then(async function (response) {
			const res = await fetch("/api/v1/in-use-vehicles");
			console.log(res.ok);
			if (res.ok) {
				const data = await res.json();
				iuv = data;
				console.log("Received contacts: " + iuv.length);
			}
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
				<tr>
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
					<tr>
						<td>{e.country}</td>
						<td>{e.year}</td>
						<td>{e.veh_use_comm}</td>
						<td>{e.veh_use_pass}</td>
						<td>{e.veh_use_per_1000}</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
</main>
