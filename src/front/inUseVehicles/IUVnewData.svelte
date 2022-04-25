<script>
    import { onMount } from 'svelte';
    export let params = {};
    import { Table,Button,Alert } from "sveltestrap";
    import { pop } from "svelte-spa-router"
    import { Icon } from 'sveltestrap';

    const delay = ms => new Promise(res => setTimeout(res, ms));

    onMount(getIuv);

    let iuv = {};

    let estado = "";
    let visibilidad = false;
    let color = "danger";

    let updatedCountry;
    let updatedYear;
    let updatedVeh_use_comm;
    let updatedVeh_use_pass;
    let updatedVeh_use_per_1000;

    let newIuv = {
		country: "",
		year: "",
		veh_use_comm: "",
		veh_use_pass: "",
		veh_use_per_1000: "",
	};


    async function getIuv(){
        console.log("Fetching data....");
        const res = await fetch("/api/v1/in-use-vehicles/"+params.country+"/"+params.year); 
        if(res.ok){
            const data = await res.json();
            iuv = data;
            updatedCountry = iuv.country;
            updatedYear = iuv.year;
            updatedVeh_use_comm = iuv.veh_use_comm;
		    updatedVeh_use_pass = iuv.veh_use_pass;
		    updatedVeh_use_per_1000 = iuv.veh_use_per_1000;

            console.log("Received data.");
        }
        else{
            if(res.status=="404"){
                visibilidad = true;
			    color="danger";
			    estado=`No existe ningun recurso con el país "${params.country}" y el año "${params.year}"`;
                //pop();
            }
        }
    }

    async function editIuv() {
        newIuv.country = iuv.country;
        newIuv.year = iuv.year;
        newIuv.veh_use_comm = updatedVeh_use_comm;
        newIuv.veh_use_pass = updatedVeh_use_pass;
        newIuv.veh_use_per_1000 = updatedVeh_use_per_1000;
		console.log("Updating...." + JSON.stringify(newIuv));
        console.log(newIuv);
        if (updatedVeh_use_comm == null || 
			updatedVeh_use_pass == null || 
			updatedVeh_use_per_1000 == null ){
			visibilidad = true;
			color="danger";
			estado=`Ningún campo debe estar vacio`;
		}
        else{
            const res = await fetch("/api/v1/in-use-vehicles/"+params.country+"/"+params.year, {
                method: "PUT",
                body: JSON.stringify(newIuv),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (res) {
                getIuv();
                visibilidad = true;
                color="success";
                estado=`Registro editado correctamente`;
            });
            console.log("DONE");
        }
	}
</script>

<main>
    <h1>Editar registro "{params.country}" para el año "{params.year}" </h1>
    {#await iuv}
    loading
        {:then iuv}
        
        <Alert color={color} isOpen={visibilidad} toggle={() => (visibilidad = false)}>
            {estado}
        </Alert>

        {#if !visibilidad}
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
                    <td>{updatedCountry} </td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedVeh_use_comm}" type="number"></td>
                    <td><input bind:value="{updatedVeh_use_pass}" type="number"></td>
                    <td><input bind:value="{updatedVeh_use_per_1000}" type="number"></td>
                    <td><Button outline color="primary" on:click="{editIuv}">Editar</Button>
                    </td>
                </tr>
            </tbody>
        </Table>
        {/if}
    {/await}

    <Button color="info" on:click="{pop}"> <Icon name="arrow-return-left"/> </Button>
    </main>