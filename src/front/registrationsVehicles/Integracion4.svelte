<script>
    import Button from "sveltestrap/src/Button.svelte";
    import Highcharts from "highcharts";
    import { pop } from "svelte-spa-router";
    let datos = [];
    let fechas = [];
    let dat1 = [];
    let dat2 = [];
    let dat3 = [];
    let ventaAnualVehículos = [];
    let ventaAnualVehículosPor1000 = [];
    let variación = [];
    async function loadGraph(){
        console.log("Cargando grafica")
        const res = await fetch("https://api.covidtracking.com/v1/states/current.json");
        if(res.ok){
            datos = await res.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2))
            datos.forEach(data => {
                fechas.push(data["country"] + "-" + data.state);
                dat1.push(data.death*10000);
                dat2.push(data.hospitalized*10000);
                dat3.push(data.positiveTestsViral*100)
            });
        }else{
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/registrations-vehicles/`;
        }

        const res2 = await fetch("/api/v1/registrations-vehicles");
        if(res2.ok){
            datos = await res2.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2))
            datos.forEach(data => {
                fechas.push(data["country"] + "-" + data.year);
                ventaAnualVehículos.push(data.veh_sale);
                ventaAnualVehículosPor1000.push(data.veh_per_1000);
                variación.push(data.variation * 10000)
            });
        }else{
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/registrations-vehicles`;
        }

        Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Datos Covid en diferentes estados'
    },
    subtitle: {
        text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Population (millions)'
        }
    },
    legend: {
        enabled: false
    },
    series: [
        {
            name: "death",
            colorByPoint: true,
            data: dat1
        },
        {
            name: "hospitalized",
            colorByPoint: true,
            data: dat2
        },
        {
            name: "positiveTestsViral",
            colorByPoint: true,
            data: dat3
        }
    ]
});
}
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>        
    <br>
    <br>
    <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>
        <div style="margin:auto;"> 
        <figure class="highcharts-figure">
            <div id="container"></div>
        </figure>  
    </main>
    
    
    <style>
        .highcharts-figure {
          min-width: 100%;
          max-width:100%;
          margin: 1em auto;
        }
        #container {
          height: 600px;
        }
        
    </style>