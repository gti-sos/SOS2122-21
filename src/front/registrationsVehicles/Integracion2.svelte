<script>
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
	async function loadGraph(){
        let MyData = [];
        let OtherData = [];
        const url = "https://jsonplaceholder.typicode.com/users";
        const resData = await fetch("/api/v1/registrations-vehicles");
        MyData = await resData.json();
        console.log("Fetching url...");	
		const res = await fetch(url); 
		if (res.ok) {
			console.log("Ok");
            OtherData = await res.json();
		} else {
			console.log("Error al cargar API externa");
        }
        /*
        let MyDataGraph = MyData.map((x) => {
			let res = {name: x.country + " " + x.year, value: x["registrations-vehicles"]};
			return res;
		});
		*/
		let utilData = OtherData;
        let OtherDataGraph = utilData.map((x) => {
				let res = {name: x.name, value: parseInt(x.id)};
			return res;
		});
		
		let datosJuntos = 
        [
            {
                name: "Usuario",
                data: OtherDataGraph
            }
        ];
        
        Highcharts.chart('container', {
			chart: {
				type: 'packedbubble',
				height: '100%'
			},
			title: {
				text: 'Gráfica que representa el ID de los usuarios.'
			},
			tooltip: {
				useHTML: true,
				pointFormat: '<b>{point.name}:</b> {point.value}'
			},
			plotOptions: {
				packedbubble: {
					minSize: '50%',
					maxSize: '50%',
					zMin: 0,
					zMax: 1000,
					layoutAlgorithm: {
						splitSeries: true,
						gravitationalConstant: 0.02
					},
					dataLabels: {
						enabled: true,
						format: '{point.name}',
						filter: {
							property: 'y',
							operator: '>',
							value: 250
						},
						style: {
							color: 'black',
							textOutline: 'none',
							fontWeight: 'normal'
						}
					}
				}
			},
			series: datosJuntos
		});
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}></script>>
    <script src="https://code.highcharts.com/highcharts-more.js" on:load={loadGraph}></script>>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load={loadGraph}></script>>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
    
</svelte:head>
<main>
	<figure class="highcharts-figure">
		<div id="container"></div>
	</figure>
	
	<h4><a >Fuente</a></h4>
	<p></p>
	<Button outline color="secondary" on:click="{pop}"> Volver</Button>
	<p></p>

</main>

<style>
	main {
		text-align: center;
	}
    .highcharts-figure, .highcharts-data-table table {
  min-width: 320px; 
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