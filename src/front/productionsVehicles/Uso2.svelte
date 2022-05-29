<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    let estados=[];
    let muertes=[];
    //se cargan los datos de la API
    async function cargagraph(){
        const resData = await fetch("https://disease.sh/v3/covid-19/states", {
            "method": "GET",
        });
       let coviddata = await resData.json();
       console.log(coviddata) ;
       coviddata.forEach(element => {
           estados.push(element["state"]);
           muertes.push(element["deaths"]);
       });
       //gráfico
       Highcharts.chart('container', {
        title: {
            text: 'Muertes por covid en los estados de EEUU'
        },
        xAxis: {
            categories: estados
        },
        yAxis:{
            ceiling: 60000
        },
        series: [{
            type: 'column',
            name: 'muertes por covid',
            data: muertes
        }]
    });
    }
    </script>
    <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{cargagraph}"></script>
    </svelte:head>
    <main>
    <figure class="highcharts-figure">
        <div id="container" ></div>
        <p class="highcharts-description">
           En esta gráfica vemos representadas las muertes por Covid en los estados de EEUU.
        </p>
        <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
        <br>
    </figure>
    </main>