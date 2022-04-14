
<script>

	let productionsVehicles=[];
	
	import {onMount} from 'svelte';
	onMount(getPv);
	async function getPv(){
		console.log("Fetching productions vehicles...")
		const res=await fetch("api/v1/productions-vehicles");
		if(res.ok){
			const data=await res.json();
			productionsVehicles=data;
			console.log("Received vehicles: " +productionsVehicles.length);
		}
	}
</script>


<main>
    {#await productionsVehicles}
     loading
  {:then productionsVehicles}
  <table>
    <thead>
        <tr>
            <th>
               País
            </th>
            <th>
               Año
            </th>
            <th>
                Vehículos comerciales
             </th>
             <th>
                Vehículos pasajero
             </th>
             <th>
                Producción anual de vehículos
             </th>
        </tr>
    </thead>
    <tbody>
    {#each productionsVehicles as productionVehicle}
    <tr>
        <td>{productionVehicle.country}</td>
        <td>{productionVehicle.year}</td>
        <td>{productionVehicle.veh_comm}</td>
        <td>{productionVehicle.veh_pass}</td>
        <td>{productionVehicle.veh_annprod}</td>

   </tr>
   {/each}
 </tbody>

 </table>
 {/await}
</main>