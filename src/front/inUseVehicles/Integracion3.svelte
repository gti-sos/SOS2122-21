<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import {Button, Icon} from "sveltestrap";

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let apiData = [];
    let apiData2 = [];

    onMount(getData);

    let etiquetas = [];
    let estadisticas = [];
    let estadisticas2 = [];


    async function getData() {
        console.log("Fetching data....");
        const res = await fetch("/remoteAPI3");
        if (res.ok) {
            const json = await res.json();
            apiData = json;

            apiData.forEach((e) => {
                etiquetas.push(e.country+"-"+e.year);
                estadisticas.push(e["production"]);
            });
        } else {
            console.log("Error in request");
        }

        const res2 = await fetch("https://sos2122-21.herokuapp.com/api/v1/in-use-vehicles");
        if(res.ok){
            const json = await res2.json();
            apiData2 = json;

            apiData2.forEach((e) => {
                etiquetas.push(e.country+"-"+e.year);
                estadisticas2.push(e["veh_use_per_1000"]);
            })
        }

        
        await delay(500);
        loadGraph();
    }

    function loadGraph() {
        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Estadísticas sobre la producción de cereal y vehiculos en uso por 1000 habitantes'
            },
            yAxis: {
                title: {
                    text: 'Valor'
                }
            },
            xAxis: {
                title: {
                    text: "País-Año",
                },
                categories: etiquetas,
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            
            series: [
                {
                name: 'Producción de cereal',
                data: estadisticas,
                color: '#ff7700'
                },
                {
                name: 'Vehículos en uso por cada 1000 habitantes',
                data: estadisticas2,
                color: '#0008ff'
                },
            ],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <br />
    </figure>
    <Button color="info" on:click="{pop}"> <Icon name="arrow-return-left"/> Volver atrás</Button>
</main>
