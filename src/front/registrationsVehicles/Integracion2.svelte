<script>
    import Button from "sveltestrap/src/Button.svelte";
    import Highcharts from "highcharts";
    import { pop } from "svelte-spa-router";
    let datos = [];
    let fechas = [];
    let llegadas = [];
    let salidas = [];
    let gastos = [];
    async function loadGraph(){
        console.log("Cargando grafica")
        const res = await fetch("https://sos2021-03.herokuapp.com/api/integration/international-tourisms");
        if(res.ok){
            datos = await res.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2))
            datos.forEach(data => {
                fechas.push(data["country"] + "-" + data.year);
                llegadas.push(data.numberofarrivals*10);
                salidas.push(data.numberofdepartures*1000);
                gastos.push(data.expendituresbillion*1000)
            });
        }else{
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/registrations-vehicles`;
        }

        Highcharts.chart('container', {
    chart: {
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            viewDistance: 25,
            depth: 40
        }
    },

    title: {
        text: 'International tourisms'
    },

    xAxis: {
        labels: {
            skew3d: true,
            style: {
                fontSize: '16px'
            }
        }
    },

    yAxis: {
        allowDecimals: false,
        min: 0,
        title: {
            text: 'Number of fruits',
            skew3d: true
        }
    },

    tooltip: {
        headerFormat: '<b>{point.key}</b><br>',
        pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
    },

    plotOptions: {
        column: {
            stacking: 'normal',
            depth: 40
        }
    },

    series: [{
        name: 'Llegadas',
        data: llegadas,
    }, {
        name: 'Salidas',
        data: salidas,
    }, {
        name: 'Gastos',
        data: gastos,
    }]
});
}
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>        

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