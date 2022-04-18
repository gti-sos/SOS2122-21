<script>
	import { onMount } from "svelte";
	import Table from "sveltestrap/src/Table.svelte";

	let iuv = [];

	onMount(getIuv);

	async function getIuv() {
		console.log("Fetching data....");
		await fetch("/api/v1/registrations-vehicles/loadInitialData").then(async function (response) {
			const res = await fetch("/api/v1/registrations-vehicles");
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
	<h1>Listado de vehículos nuevos matriculados</h1>
	{#await iuv}
		loading
	{:then iuv}
		<Table bordered>
			<thead>
				<tr>
					<th> País </th>
					<th> Año </th>
					<th> Venta anual de vehículos </th>
					<th> Venta anual de vehículos por 1000 habitantes </th>
					<th> Variación </th>
				</tr>
			</thead>
			<tbody>
				<tr />
				{#each iuv as e}
					<tr>
						<td>{e.country}</td>
						<td>{e.year}</td>
						<td>{e.veh_sale}</td>
						<td>{e.veh_per_1000}</td>
						<td>{e.variation}</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
</main>
