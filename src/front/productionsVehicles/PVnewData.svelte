<script>
    import { onMount } from 'svelte';
    export let params = {};
    import { Table,Button,Alert,Container,Row,Col} from "sveltestrap";
    import { pop } from "svelte-spa-router"
    import { Icon } from 'sveltestrap';

    const delay = ms => new Promise(res => setTimeout(res, ms));

    onMount(getPv);

    let productionsVehicles = {};

    let estado = "";
    let visibilidad = false;
    let color = "danger";
    let cargarTabla = true;

 
    //1.datos para que se actualicen los registros
    //datos que ponemos para actualizar el registro
    //para la función getPv

    let updatedCountry;
    let updatedYear;
    let updatedVeh_comm;
    let updatedVeh_pass;
    let updatedVeh_annprod;
 
    //2.datos nuevos una vez que hemos puesto con cuales los queremos actualizar
    //para la funcion editPv
    let newPV = {
		country: "",
		year: "",
		veh_comm: "",
		veh_pass: "",
		veh_annprod: "",
	};

    //función para que me cargue los registros antes de que sean editados

    async function getPv(){
        console.log("Fetching data....");
        const res = await fetch("/api/v1/productions-vehicles/"+params.country+"/"+params.year); 
        if(res.ok){
            const data = await res.json();
            productionsVehicles = data;
            //datos que tenemos con los que queremos acualizar

            updatedCountry = productionsVehicles.country;
            updatedYear = productionsVehicles.year;
            updatedVeh_comm = productionsVehicles.veh_comm;
		    updatedVeh_pass = productionsVehicles.veh_pass;
		    updatedVeh_annprod = productionsVehicles.veh_annprod;

            console.log("Received data.");
        }
        else{
            if(res.status=="404"){
                cargarTabla = false;
                visibilidad = true;
			    color="danger";
			    estado=`No existe ningun recurso con el país "${params.country}" y el año "${params.year}"`;
                //pop();
            }
        }
    }
 
    //función para que me edite los registros de ese año y de ese pais

    async function editPv() {
        //año y pais no se actualizan
        newPV.country = productionsVehicles.country;
        newPV.year = productionsVehicles.year;
        //actualizamos los demás datos
        //datos que queremos actualizar completando un newPV
        newPV.veh_comm = updatedVeh_comm;
        newPV.veh_pass = updatedVeh_pass;
        newPV.veh_annprod = updatedVeh_annprod;
		console.log("Updating...." + JSON.stringify(newPV));
        console.log(newPV);
		const res = await fetch("/api/v1/productions-vehicles/"+params.country+"/"+params.year, {
			method: "PUT",
			body: JSON.stringify(newPV),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(function (res) {
            if (res.ok){
			getPv();
            visibilidad = true;
            color="success";
            estado=`Registro editado correctamente`;
        }
        else{
            if(res.status == "400"){
                visibilidad = true;
                color="danger";
                estado=`Ningún campo debe estar vacio`;
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
		});
		console.log("DONE");
	}
</script>

<main>
    <h1>Editar registro "{params.country}" para el año "{params.year}" </h1>
    {#await productionsVehicles}
    loading
        {:then productionsVehicles}
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

        {#if cargarTabla}
    
        <Table bordered>
            <thead>
                <tr>
                 <tr align="center">
                   <th>País</th>
                   <th> Año</th>
                   <th>Vehículos comerciales </th>
                   <th>Vehículos pasajero</th>
                   <th>Producción anual de vehículos</th>
                </tr>
           </thead>
            <tbody>
                <tr align="center">
                    <td>{updatedCountry} </td>
                    <td>{updatedYear}</td>
                    <td><input bind:value="{updatedVeh_comm}" type="number"></td>
                    <td><input bind:value="{updatedVeh_pass}" type="number"></td>
                    <td><input bind:value="{updatedVeh_annprod}" type="number"></td>
                    <td><Button outline color="primary" on:click="{editPv}">Editar</Button>
                    </td>
                </tr>
            </tbody>
        </Table>
        {/if}
    {/await}

    <Button color="info" on:click="{pop}"> <Icon name="arrow-return-left"/> </Button>
    </main>