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
        const res = await fetch("/remoteAPIRV1");
        if(res.ok){
            datos = await res.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2))
            datos.forEach(data => {
                fechas.push(data["country"] + "-" + data.year);
                dat1.push(data.public_expenditure*10);
                dat2.push(data.pe_to_gdp *10 );
                dat3.push(data.pe_on_defence*10)
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
        align: 'left',
        text: 'Integración de mi API con integración de Roque Fernández'
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
            data: dat1
        },
        {
            name: "VEhivulos por 1000",
            colorByPoint: true,
            data: dat2
        },
        {
            name: "VAriacion (x10.000)",
            colorByPoint: true,
            data: dat3
        },
        {
            name: "hola anuelaes",
            colorByPoint: true,
            data: ventaAnualVehículos
        },
        {
            name: "cara por 1000",
            colorByPoint: true,
            data: ventaAnualVehículosPor1000
        },
        {
            name: "cola (x10.000)",
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