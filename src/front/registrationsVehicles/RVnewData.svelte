<script>
    import { onMount } from 'svelte';
    export let params = {};
    import { Table,Button } from "sveltestrap";
    import { pop } from "svelte-spa-router"
    import { Icon } from 'sveltestrap';

    const delay = ms => new Promise(res => setTimeout(res, ms));

    onMount(getRv);

    let rv = {};

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


    async function getRv(){
        console.log("Fetching data....");
        const res = await fetch("/api/v1/registrations-vehicles/"+params.country+"/"+params.year); 
        if(res.ok){
            const data = await res.json();
            rv = data;
            updatedCountry = rv.country;
            updatedYear = rv.year;
            updatedVeh_sale = rv.veh_sale;
		    updatedVeh_per_1000 = rv.veh_per_1000;
		    updatedVeh_use_per_1000 = rv.variation;

            console.log("Received data.");
        }
        else{
            if(res.status=="404"){
                window.alert(`No existe un registro con el pais '${params.country}' y el año '${params.year}'`);
                pop();
            }
        }
    }

    async function editRv() {
        newRv.country = rv.country;
        newRv.year = rv.year;
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
			getRv();
            window.alert("Registro modificado correctamente");
            pop();
		});
		console.log("DONE");
	}
</script>

<main>
    <h1>Editar registro "{params.country}" para el año "{params.year}" </h1>
    {#await rv}
    loading
        {:then rv}
        
    
        <Table bordered>
            <thead>
                <tr align="center">
					<th> País </th>
					<th> Año </th>
					<th> Venta anual de vehículos </th>
					<th> Venta anual de vehículos por 1000 habitantes </th>
					<th> Variación </th>
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