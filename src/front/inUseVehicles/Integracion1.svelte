<script>
    import { onMount } from "svelte";

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    onMount(getData);
    let dataGraph = [];

    async function getData() {
        console.log("Fetching data....");
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "countries-population.p.rapidapi.com",
                "X-RapidAPI-Key":
                    "c70ce6ea89msh8767c3249b8f1fep1a1020jsn0e167cead932",
            },
        };

        const res = await fetch(
            "https://countries-population.p.rapidapi.com/top-populated-countries",
            options
        );
        if (res.ok) {
            const data = await res.json();
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    let num = parseInt(data[key].replace(",",""));
                    dataGraph.push([key,num]);
                }
            }
            console.log(data);
            console.log(dataGraph);
            await delay(1000);
            loadGraph();
        }

        function loadGraph() {
            Highcharts.chart("container", {
                chart: {
                    type: "column",
                },
                title: {
                    text: "World's largest cities per 2017",
                },
                subtitle: {
                    text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>',
                },
                xAxis: {
                    type: "category",
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: "13px",
                            fontFamily: "Verdana, sans-serif",
                        },
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Population (millions)",
                    },
                },
                legend: {
                    enabled: false,
                },
                tooltip: {
                    pointFormat:
                        "Population in 2017: <b>{point.y:.1f} millions</b>",
                },
                series: [
                    {
                        name: "Population",
                        data: dataGraph,
                        dataLabels: {
                            //enabled: true,
                            rotation: -90,
                            color: "#FFFFFF",
                            align: "right",
                            y: 10, // 10 pixels down from the top
                            style: {
                                fontSize: "13px",
                                fontFamily: "Verdana, sans-serif",
                            },
                        },
                    },
                ],
            });
        }
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
    <h1>hola</h1>
    <figure class="highcharts-figure">
        <div id="container" />
        <br />
    </figure>
</main>
