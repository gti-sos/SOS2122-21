<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import {Button, Icon} from "sveltestrap";

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let apiData = [];

    onMount(getData);
    var totalData = {};
    let totalDataA = {};

    async function getData() {
        console.log("Fetching data....");

        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "f1-live-motorsport-data.p.rapidapi.com",
                "X-RapidAPI-Key":
                    "90e8831e21msh6e05c3f0ed22914p1a282djsn9e71a533665e",
            },
        };

        let res = await fetch(
            `/remoteAPI4/2021`,
            options
        );
        let res2 = await fetch(
            `/remoteAPI4/2020`,
            options
        );
        let res3 = await fetch(
            `/remoteAPI4/2019`,
            options
        );
        let res4 = await fetch(
            `/remoteAPI4/2018`,
            options
        );

        let res5 = await fetch(
            `/remoteAPI4/2017`,
            options
        );

        if(res.ok){
            let y = 2021;
            const json = await res.json();
            apiData = json.results;
            let aux = [];
            apiData.forEach((e) => {
                aux.push([e.team_name, parseInt(e.points)]);
            });
            totalData[y]=aux;
            totalDataA[y]=aux;
        } else {
            console.log("Error in request");
        }

        if(res2.ok){
            let y = 2020;
            const json = await res2.json();
            apiData = json.results;
            let aux = [];
            apiData.forEach((e) => {
                aux.push([e.team_name, parseInt(e.points)]);
            });
            totalData[y]=aux;
            totalDataA[y]=aux;
        } else {
            console.log("Error in request");
        }

        if(res3.ok){
            let y = 2019;
            const json = await res3.json();
            apiData = json.results;
            let aux = [];
            apiData.forEach((e) => {
                aux.push([e.team_name, parseInt(e.points)]);
            });
            totalData[y]=aux;
            totalDataA[y]=aux;
        } else {
            console.log("Error in request");
        }

        if(res4.ok){
            let y = 2018;
            const json = await res4.json();
            apiData = json.results;
            let aux = [];
            apiData.forEach((e) => {
                aux.push([e.team_name, parseInt(e.points)]);
            });
            totalData[y]=aux;
            totalDataA[y]=aux;
        } else {
            console.log("Error in request");
        }


        console.log(totalDataA);
        var count = Object.keys(totalData).length;
        console.log(count);

        await delay(500);
        loadGraph();
    }

    function loadGraph() {
        const getDataC = (data) =>
            data.map((country) => ({
                name: country[0],
                y: country[1],
            }));

        const chart = Highcharts.chart("container", {
            chart: {
                type: "column",
            },
            title: {
                text: "Fórmula 1: Campeonato de constructores año 2021",
                align: "left",
            },
            plotOptions: {
                series: {
                    grouping: false,
                    borderWidth: 0,
                },
            },
            legend: {
                enabled: false,
            },
            tooltip: {
                shared: true,
                headerFormat:
                    '<span style="font-size: 15px">{point.point.name}</span><br/>',
                pointFormat:
                    '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} puntos</b><br/>',
            },
            xAxis: {
                type: "category",
                accessibility: {
                    description: "Equipos",
                },
                max: 9,
            },
            yAxis: [
                {
                    title: {
                        text: "Numero de puntos",
                    },
                    showFirstLabel: false,
                },
            ],
            series: [
                {
                    color: "rgb(158, 159, 163)",
                    pointPlacement: -0.2,
                    linkedTo: "main",
                    data: totalDataA[2020].slice(),
                    name: "2020",
                },
                {
                    name: "2021",
                    id: "main",
                    dataSorting: {
                        enabled: true,
                        matchByName: true,
                    },
                    dataLabels: [
                        {
                            enabled: true,
                            inside: true,
                            style: {
                                fontSize: "16px",
                            },
                        },
                    ],
                    data: getDataC(totalData[2021]).slice(),
                },
            ],
            exporting: {
                allowHTML: true,
            },
        });

        const ye = [2021, 2020, 2019, 2018];

        ye.forEach((year) => {
            const btn = document.getElementById(year);

            btn.addEventListener("click", () => {
                document
                    .querySelectorAll(".buttons button.active")
                    .forEach((active) => {
                        active.className = "";
                    });
                btn.className = "active";

                chart.update(
                    {
                        title: {
                            text: `Fórmula 1: Campeonato de constructores año ${year} `,
                        },
                        subtitle: {
                            text: `Comparando resultados del año  ${year} con los del ${year-1}`,
                        },
                        series: [
                            {
                                name: year-1,
                                data: totalDataA[year-1].slice(),
                            },
                            {
                                name: year,
                                data: getDataC(totalData[year]).slice(),
                            },
                        ],
                    },
                    true,
                    false,
                    {
                        duration: 800,
                    }
                );
            });
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
    <div class='buttons'>
        <button id='2019'>
          2019
        </button>
        <button id='2020'>
          2020
        </button>
        <button id='2021' class='active'>
          2021
        </button>
      </div>
      <div id="container"></div>

      <Button color="info" on:click="{pop}"> <Icon name="arrow-return-left"/> Volver atrás</Button>
</main>

<style>
.buttons {
    text-align: center;
    margin-bottom: 1.5rem;
}

.buttons button {
    cursor: pointer;
    border: 1px solid silver;
    border-right-width: 0;
    background-color: #f8f8f8;
    font-size: 1rem;
    padding: 0.5rem;
    transition-duration: 0.3s;
    margin: 0;
}

.buttons button:first-child {
    border-top-left-radius: 0.3em;
    border-bottom-left-radius: 0.3em;
}

.buttons button:last-child {
    border-top-right-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
    border-right-width: 1px;
}

.buttons button:hover {
    color: white;
    background-color: rgb(158 159 163);
    outline: none;
}

.buttons button.active {
    background-color: #0051b4;
    color: white;
}


</style>