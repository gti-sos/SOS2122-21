<script>
    import { onMount } from "svelte";
    import {Col, Container, Row} from "sveltestrap";


    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let apiData = [];

    let IUVdataComm = [];
    let IUVdataPass = [];
    let IUVdataPer1000 = [];

    let PVdataComm = [];

    let totalData = [];

    const date = new Date();
    let minY = date.getFullYear();
    let maxY = 0;

    let mapDataIUVper1000 = new Map();
    let mapDataIUVcomm = new Map();
    let mapDataIUVpass = new Map();
    let mapDataPVcomm = new Map();



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
        const res2 = await fetch("/api/v1/productions-vehicles");
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
                if (mapDataIUVper1000.has(e.country)) {
                    mapDataIUVper1000.get(e.country).push(e.veh_use_per_1000*10000);
                } else {
                    mapDataIUVper1000.set(e.country, [e.veh_use_per_1000*10000]);
                }

                if (mapDataIUVcomm.has(e.country)) {
                    mapDataIUVcomm.get(e.country).push(e.veh_use_comm);
                } else {
                    mapDataIUVcomm.set(e.country, [e.veh_use_comm]);
                }

                if (mapDataIUVpass.has(e.country)) {
                    mapDataIUVpass.get(e.country).push(e.veh_use_pass);
                } else {
                    mapDataIUVpass.set(e.country, [e.veh_use_pass]);
                }

                if (e.year < minY) {
                    minY = e.year;
                }
                if (e.year > maxY) {
                    maxY = e.year;
                }
            });


            IUVdataPer1000 = crearData(mapDataIUVper1000,sortedS, "Vehículos en uso por cada 1000 personas(*1000): ");
            IUVdataComm = crearData(mapDataIUVcomm, sortedS, "Vehículos comerciales en uso: ");
            IUVdataPass = crearData(mapDataIUVpass, sortedS, "Vehículos de pasajeros en uso: ");

            //DATOS A MOSTRAR EN LA GRÁFICA
            IUVdataComm.forEach((e) => {
                totalData.push(e);
            });

            /*IUVdataPass.forEach((e) => {
                totalData.push(e);
            });*/

            /*IUVdataPer1000.forEach((e) => {
                totalData.push(e);
            });*/

        } else {
            console.log("Error in request");
        }

        if (res2.ok) {
            let s = new Set();
            const json = await res2.json();
            apiData = json;
            apiData.forEach((e) => {
                s.add(e.year);
            });

            let sortedS = sortSet(s);
            sortedS.forEach((e) => {
                years.push(e);
            });

            apiData.forEach((e) => {
                if (mapDataPVcomm.has(e.country)) {
                    mapDataPVcomm.get(e.country).push(e.veh_comm*10);
                } else {
                    mapDataPVcomm.set(e.country, [e.veh_comm*10]);
                }

                if (e.year < minY) {
                    minY = e.year;
                }
                if (e.year > maxY) {
                    maxY = e.year;
                }
            });


            PVdataComm = crearData(mapDataPVcomm,sortedS, "Producción de vehículos (*10): ");

            //DATOS A MOSTRAR EN LA GRÁFICA
            PVdataComm.forEach((e) => {
                totalData.push(e);
            });

            /*IUVdataPass.forEach((e) => {
                totalData.push(e);
            });

            IUVdataPer1000.forEach((e) => {
                totalData.push(e);
            });*/

        } else {
            console.log("Error in request");
        }
        await delay(1000);
        loadGraph();
    }


    function crearData(mapDataIUVper1000, sortedS, clase) {
        let aux = [];
        const iterator = mapDataIUVper1000[Symbol.iterator]();
        for (let e of iterator) {
            let valores = e[1];
            if (e[1].length != sortedS.size) {
                for (let i = 0; i < sortedS.size - e[1].length + 2; i++) {
                    valores.unshift(null);
                }
            }
            let string = clase + e[0];
            let json = {
                name: string,
                data: valores,
            };
            aux.push(json);
        }
        return aux;
    }


    async function loadGraph() {

        Highcharts.chart("container", {
            title: {
                text: `Gráfica común de producción y uso de vehículos, ${minY}-${maxY}`,
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
            series: totalData,
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
        <p>(Algunos datos se han tenido que multiplicar por 10 para que la gráfica sea más visual)</p>
    </figure>
</main>

