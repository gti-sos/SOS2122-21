<script>
    import { onMount } from "svelte";
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let govs = [];
    let province = [];
    let cases = [];
    let casePreviousDayChange = [];
    let casesPerHundredThousand = [];
    //cargar datos
    async function getGov() {
        console.log("Fetching stats...."); 
            const res = await fetch(
                "https://disease.sh/v2/gov/Germany"
            );
            if (res.ok) {
                const data = await res.json();
                govs = data;
                console.log("Estadísticas recibidas: " + govs.length);
                govs.forEach((gov) => {
                    province.push(gov.province);
                    cases.push(gov["cases"]);
                    casePreviousDayChange.push(gov["casePreviousDayChange"]);
                    casesPerHundredThousand.push(gov["casesPerHundredThousand"]);
                });
                await delay(500);
                loadGraph();
            } else {
                console.log("Error cargando los datos");
            }
        }
    
        //gráfico
    async function loadGraph() {
        Highcharts.chart("container", {
            chart: {
                type: "pie",
            },
            title: {
                text: "Casos,casos previos y casos por 100 mil ",
            },
            subtitle: {
                text: "API externa 1",
            },
            yAxis: {
                title: {
                    text: "Valor",
                },
            },
            xAxis: {
                title: {
                    text: "País-Año",
                },
                categories: province,
            },
            plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: ' {point.percentage:.1f} %'
            }
        }
    },
            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
            },
            series: [
                {
                    name: "Casos",
                    data: cases,
                    sliced: true,
                },
                {
                    name: "Casos Previos",
                    data: casePreviousDayChange,
                },
                {
                    name: "Casos por 100 mil",
                    data: casesPerHundredThousand,
                },
            ],
            responsive: {
                rules: [
                    {
                        condition: {
                            maxWidth: 500,
                        },
                        chartOptions: {
                            legend: {
                                layout: "horizontal",
                                align: "center",
                                verticalAlign: "bottom",
                            },
                        },
                    },
                ],
            },
        });
    }
    onMount(getGov);
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
        <h5>Esta gráfica nos muestra los casos,casos por mil y los casos previos por covid del gobierno de Alemania</h5>
        <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
        <br>
    </figure>
</main>