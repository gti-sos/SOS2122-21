<script>
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
	async function loadGraph(){
	    let MisDatos = [];
	    let G10 = [];
        //mis datos
	    const VehDatos = await fetch("/api/v1/productions-vehicles");
        //datos del G10 con PROXY
	    MisDatos = await VehDatos.json();
        const DatosExternos = await fetch("/remoteAPI2PV");
		if (DatosExternos.ok) {
			console.log("G10 cargado");
			const json = await DatosExternos.json();
            G10 = json;
			console.log(G10)
		} else {
			console.log("ERROR!");
        }
		let aux = []
        let valores = []
        
        //leer los datos de las 2 APIs
        MisDatos.forEach((x) => {
        	if(x.country=="Spain"||x.country=="Germany"){	
				aux={
					name: x.country +" " +x.year,
					data: [0,0,parseInt(x.veh_comm)/1000,parseInt(x.veh_pass)/1000]
				}
				valores.push(aux)
			}
        });
		G10.forEach((x) => {
            if((x.country=="spain"||x.country=="italy")){	
				aux={
					name: x.country +" " +x.year,
					data: [x["non_renewable_energy_consumptions"],x["renewable_energy_consumptions"],0,0]
				}
				valores.push(aux)
			}  	
		
        });
    //gráfico
    Highcharts.chart('container', {
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Vehículos y consumo de energía'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {
            categories: [
                'non_renewable_energy_consumptions',
                'renewable_energy_consumptions',
                'veh_com',
                'veh_pass'
            ],
            plotBands: [{ 
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]
        },
        yAxis: {
            title: {
                text: 'Unidades'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series:  valores
        
    });
}
</script>

    <svelte:head>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
    </svelte:head>
<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
           En esta gráfica se ve la integración de mi API con la del grupo 10
        </p>
        <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
    </figure>
</main>

<style>
#container {
    height: 400px; 
}
.highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}
.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #EBEBEB;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>