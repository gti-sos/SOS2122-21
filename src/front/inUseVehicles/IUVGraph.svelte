<script>
    import { onMount } from "svelte";

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let apiData = [];

    let dataComm = [];
    let dataPass = [];
    let dataPer1000 = [];

    const date = new Date();
    let minY = date.getFullYear();
    let maxY = 0;

    let m = new Map();
    let m2 = new Map();
    let m3 = new Map();

    let years = [];

    function sortSet(set) {
        const entries = [];
        for (const member of set) {
            entries.push(member);
        }
        set.clear();
        for (const entry of entries.sort()) {
            set.add(entry);
        }
        return set;
    }

    async function getData() {
        const res = await fetch("/api/v1/in-use-vehicles");
        if (res.ok) {
            let s = new Set();
            const json = await res.json();
            apiData = json;
            apiData.forEach((e) => {
                s.add(e.year);
            });

            let sortedS = sortSet(s);
            sortedS.forEach((e) => {
                years.push(e);
            });

            apiData.forEach((e) => {
                if (m.has(e.country)) {
                    m.get(e.country).push(e.veh_use_per_1000);
                } else {
                    m.set(e.country, [e.veh_use_per_1000]);
                }

                if (m2.has(e.country)) {
                    m2.get(e.country).push(e.veh_use_comm);
                } else {
                    m2.set(e.country, [e.veh_use_comm]);
                }

                if (m3.has(e.country)) {
                    m3.get(e.country).push(e.veh_use_pass);
                } else {
                    m3.set(e.country, [e.veh_use_pass]);
                }

                if (e.year < minY) {
                    minY = e.year;
                }
                if (e.year > maxY) {
                    maxY = e.year;
                }
            });

            dataPer1000 = crearData(m, sortedS);
            dataComm = crearData(m2, sortedS);
            dataPass = crearData(m3, sortedS);

            await delay(1000);
            loadGraph();
        } else {
            console.log("Error in request");
        }
    }

    function crearData(m, sortedS) {
        let aux = [];
        const iterator = m[Symbol.iterator]();
        for (let e of iterator) {
            let valores = e[1];
            if (e[1].length != sortedS.size) {
                for (let i = 0; i < sortedS.size - e[1].length + 2; i++) {
                    valores.unshift(null);
                }
            }
            let json = {
                name: e[0],
                data: valores,
            };
            aux.push(json);
        }
        return aux;
    }

    async function loadGraph() {
        Highcharts.chart("container", {
            title: {
                text: `Vehículos comerciales en uso, ${minY}-${maxY}`,
            },
            subtitle: {
                text: "Fuente: datosmacro.com",
            },

            xAxis: {
                allowDecimals: false,
                accessibility: {
                    rangeDescription: `Rango: ${minY} a ${maxY}`,
                },
            },
            yAxis: {
                title: {
                    text: "Número de vehículos",
                },
            },
            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "middle",
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false,
                    },
                    pointStart: minY,
                },
            },
            series: dataComm,
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

        Highcharts.chart("container2", {
            chart: {
                type: "column",
            },
            title: {
                text: `Vehículos de pasajeros en uso, ${minY}-${maxY}`,
            },
            subtitle: {
                text: "Fuenta: datosmacro.com",
            },

            xAxis: {
                categories: years,
                crosshair: true,
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Número de vehículos",
                },
            },
            tooltip: {
                headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} vehículos</b></td></tr>',
                footerFormat: "</table>",
                shared: true,
                useHTML: true,
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: dataPass,
        });

        new Morris.Area({
            element: "container3",
            data: [
                { year: "2008", value: 20,a: 12 },
                { year: "2009", value: 10, a:15 },
                { year: "2010", value: 5, a: 22},
                { year: "2011", value: 5,a:30},
                { year: "2012", value: 20,a: 17},
            ],
            xkey: "year",
            ykeys: ["value", "a"],
            labels: ["Value", "a"],
        });
    }
    onMount(getData);
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css"/>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <br />
    </figure>

    <figure class="highcharts-figure">
        <div id="container2" />
        <br />
    </figure>

    <figure class="highcharts-figure">
        <div id="container3" />
        <br />
    </figure>
</main>
