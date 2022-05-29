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
        const res = await fetch("http://sos2122-30.herokuapp.com/api/v2/technology_devices_stats");
        if(res.ok){
            datos = await res.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2))
            datos.forEach(data => {
                fechas.push(data["country"] + "-" + data.year);
                dat1.push(data.tdwasted*1000);
                dat2.push(data.mpdisuse*100000);
                dat3.push(data.mpreused*100000)
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

        const chart = Highcharts.chart('container', {
    title: {
        text: 'Integración de mi API con API de Jaime Quintero'
    },
    subtitle: {
        text: 'Plain'
    },
    xAxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    },
    series: [
        {
            name: "dat1API",
            colorByPoint: true,
            data: dat1
        },
        {
            name: "dat2API",
            colorByPoint: true,
            data: dat2
        },
        {
            name: "dat3API",
            colorByPoint: true,
            data: dat3
        },
        {
            name: "ventaAnualVehículos",
            colorByPoint: true,
            data: ventaAnualVehículos
        },
        {
            name: "ventaAnualVehículosPor1000",
            colorByPoint: true,
            data: ventaAnualVehículosPor1000
        },
        {
            name: "variación",
            colorByPoint: true,
            data: variación
        }
    ]
});

document.getElementById('plain').addEventListener('click', () => {
    chart.update({
        chart: {
            inverted: false,
            polar: false
        },
        subtitle: {
            text: 'Plain'
        }
    });
});

document.getElementById('inverted').addEventListener('click', () => {
    chart.update({
        chart: {
            inverted: true,
            polar: false
        },
        subtitle: {
            text: 'Inverted'
        }
    });
});

document.getElementById('polar').addEventListener('click', () => {
    chart.update({
        chart: {
            inverted: false,
            polar: true
        },
        subtitle: {
            text: 'Polar'
        }
    });
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