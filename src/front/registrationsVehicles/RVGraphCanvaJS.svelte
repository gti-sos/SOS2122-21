<script>
    import {onMount} from 'svelte';
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    let datos = [];
    let fechas = [];
    let ventaAnualVehículos = [];
    let ventaAnualVehículosPor1000 = [];
    let variación = [];
    onMount(loadGraph);
    async function loadGraph(){
        const res = await fetch("/api/v1/registrations-vehicles");
        if(res.ok){
            datos = await res.json();
            console.log(datos);
            console.log(JSON.stringify(datos, null, 2))
            datos.forEach(data => {
                fechas.push(data["country"] + "-" + data.year);
                ventaAnualVehículos.push(data.veh_sale);
                ventaAnualVehículosPor1000.push(data.veh_per_1000);
                variación.push(data.variation*1000)
            });
        }else{
            window.alert("No hay datos para este pais");
            console.log("INTERNAL FATAL ERROR");
            window.location.href = `/#/registrations-vehicles`;
        }
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Porcentaje de vehículos nuevos matriculados"
            },
            subtitles: [{
                text: "",
                fontSize: 16
            }],
            axisY: {
                prefix: "",
                scaleBreaks: {
                    customBreaks: [{
                        startValue: 10000,
                        endValue: 35000
                    }]
                }
            },
            data: [{
                type: "column",
                 yValueFormatString: "Porcentaje de vehículos nuevos: #,##0.00",
                
                dataPoints: [                
                    { label: fechas[0], y: variación[0]},
                    { label: fechas[1], y: variación[1]},
                    { label: fechas[2], y: variación[2]},
                    { label: fechas[3], y: variación[3]},
                    { label: fechas[4], y: variación[4]},
                    { label: fechas[5], y: variación[5]},
                    { label: fechas[6], y: variación[6]},
                    { label: fechas[7], y: variación[7]},
                    { label: fechas[8], y: variación[8]},                    
                ]
            }]
        });
        chart.render();
    
    }
</script>

<svelte:head>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"on:load="{loadGraph}"></script>
</svelte:head>

<main> 
    <div id="chartContainer" style="height: 300px; width: 100%;"></div>
    <Button id="back" outline color="secondary" on:click="{pop}"> Atrás</Button>
</main>