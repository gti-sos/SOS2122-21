<script>
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
	
	async function loadGraph(){
	let MyData = [];
	let API_23 = [];
	
	//MI DATOS
	const resData = await fetch("/api/v1/productions-vehicles");
	MyData = await resData.json();
    //DATOS API G23
    const resData2 = await fetch("https://sos2122-23.herokuapp.com/api/v2/premier-league/loadinitialdata");
		if (resData2.ok) {
			console.log("Ok, api 23 loaded");
			const json = await resData2.json();
            API_23 = json;
			console.log(API_23)
		} else {
			console.log("ERROR!");
        }
	//para coger los valores de las 2 APIs
		let aux = []
		let valores = []
		//mi api
		MyData.forEach((x) => {
        	if(x.country=="Spain"||x.country=="Germany"){	
				aux={
					name: x.country +" " +x.year,
					data: [0,0,parseInt(x.veh_comm)/1000,parseInt(x.veh_pass)/1000]
				}
				valores.push(aux)
			}
        });
		//api grupo 23
		API_23.forEach((x) => {
            if((x.country=="Belgium")){	
				aux={
					name: x.country +" " + x.year,
					data: [parseInt(x.appearences),parseInt(x.goals),0,0] 
				}
				valores.push(aux)
			}  
		
		});
		//gráfico
		Highcharts.chart('container', {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Vehículos y jugadores de la Premier League'
			},
			xAxis: {
				categories: [ "Apariciones", "Goles","Vehículos comerciales", "Vehículos pasajeros"]
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Numero'
				}
			},
			tooltip: {
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: true
					}
				}
			},
			series: valores
		});
	};
</script>


<svelte:head>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>
<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
		En esta gráfica podemos ver la integracion con la API del G23.
		<br>
	</p>
	<Button outline color="secondary" on:click="{pop}">Atrás</Button>
</figure>



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
