<script>
    import Button from "sveltestrap/src/Button.svelte";
    import Highcharts from "highcharts";
    import { pop } from "svelte-spa-router";
    let datos = [];
    let fechas = [];
    let ventaAnualVehículos = [];
    let ventaAnualVehículosPor1000 = [];
    let variación = [];
    async function loadGraph(){
        console.log("Cargando grafica")
        const res = await fetch("https://sos2122-27.herokuapp.com/api/v2/public-expenditure-stats");
        if(res.ok){
            datos = await res.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2))
            datos.forEach(data => {
                fechas.push(data["country"] + "-" + data.year);
                ventaAnualVehículos.push(data.public_expenditure);
                ventaAnualVehículosPor1000.push(data.pe_to_gdp);
                variación.push(data.pe_on_defence * 10000)
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
        align: 'left',
        text: 'Browser market shares. January, 2018'
    },
    subtitle: {
        align: 'left',
        text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Total percent market share'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}'
            }
        }
    },
    series: [
        {
            name: "VEhivulos anuelaes",
            colorByPoint: true,
            data: ventaAnualVehículos
        },
        {
            name: "VEhivulos por 1000",
            colorByPoint: true,
            data: ventaAnualVehículosPor1000
        },
        {
            name: "VAriacion (x10.000)",
            colorByPoint: true,
            data: variación
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
            <p class="highcharts-description">
               Gráfico de barras sobre el porcentaje de matriculado en todos los niveles escolares.
            </p>
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