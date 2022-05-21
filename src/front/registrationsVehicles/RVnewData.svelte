<script>
    import { onMount } from 'svelte';
    export let params = {};
    import { Table,Button } from "sveltestrap";
    import { pop } from "svelte-spa-router"
    import { Icon } from 'sveltestrap';

    const delay = ms => new Promise(res => setTimeout(res, ms));

    onMount(getRv);

    let registrationsVehicles = {};

    let updatedCountry;
    let updatedYear;
    let updatedVeh_sale;
    let updatedVeh_per_1000;
    let updatedVariation;

    let newRv = {
		country: "",
		year: "",
		veh_sale: "",
		veh_per_1000: "",
		variation: "",
	};

    //función para que me cargue los registros antes de que sean editados

    async function getRv(){
        console.log("Fetching data....");
        const res = await fetch("/api/v1/registrations-vehicles/"+params.country+"/"+params.year); 
        if(res.ok){
            const data = await res.json();
            registrationsVehicles = data;
            //datos que tenemos con los que queremos acualizar

            updatedCountry = registrationsVehicles.country;
            updatedYear = registrationsVehicles.year;
            updatedVeh_sale = registrationsVehicles.veh_sale;
		    updatedVeh_per_1000 = registrationsVehicles.veh_per_1000;
		    updatedVariation = registrationsVehicles.variation;

            console.log("Received data.");
        }
        else{
            if(res.status=="404"){
                window.alert(`No existe un registro con el pais '${params.country}' y el año '${params.year}'`);
                pop();
            }
        }
    }
 
    //función para que me edite los registros de ese año y de ese pais

    async function editRv() {
        //año y pais no se actualizan
        newRv.country = registrationsVehicles.country;
        newRv.year = registrationsVehicles.year;
        //actualizamos los demás datos
        //datos que queremos actualizar completando un newRv
        newRv.veh_sale = updatedVeh_sale;
        newRv.veh_per_1000 = updatedVeh_per_1000;
        newRv.variation = updatedVariation;
		console.log("Updating...." + JSON.stringify(newRv));
        console.log(newRv);
		const res = await fetch("/api/v1/registrations-vehicles/"+params.country+"/"+params.year, {
			method: "PUT",
			body: JSON.stringify(newRv),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(function (res) {
            if (res.ok){
			getRv();
            window.alert("Registro modificado correctamente");
            pop();
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
		console.log("DONE");
	}
</script>

<main>
    <h1>Editar registro "{params.country}" para el año "{params.year}" </h1>
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
                   <th>Venta anual de vehículos por 1000 habitantes </th>
                   <th>Variación</th>
                </tr>
           </thead>
            <tbody>
                <tr align="center">
                    <td>{updatedCountry} </td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedVeh_sale}" type="number"></td>
                    <td><input bind:value="{updatedVeh_per_1000}" type="number"></td>
                    <td><input bind:value="{updatedVariation}" type="number"></td>
                    <td><Button outline color="primary" on:click="{editRv}">Editar</Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    {/await}

    <Button color="info" on:click="{pop}"> <Icon name="arrow-return-left"/> </Button>
    </main>