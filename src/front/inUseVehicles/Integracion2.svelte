<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import {Button, Icon} from "sveltestrap";

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let apiData = [];

    onMount(getData);

    let etiquetas = [];
    let estadisticas = [];


    async function getData() {
        console.log("Fetching data....");
        const aux = await fetch("/remoteAPI2/loadInitialData");
        if (aux.ok) {
            const res = await fetch("/remoteAPI2");
            if (res.ok) {
                const json = await res.json();
                apiData = json;

                apiData.forEach((e) => {
                    etiquetas.push(e.country+"-"+e.year);
                    estadisticas.push(e["public_expenditure"]);
                });

                await delay(1000);
                loadGraph();
            } else {
                console.log("Error in request");
            }
        }
    }

    function loadGraph() {
        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Public expenditure stats by country and year'
            },
            subtitle: {
                text: 'Source: https://datosmacro.expansion.com/estado/gasto'
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
                name: 'Public expenditure',
                data: estadisticas
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
