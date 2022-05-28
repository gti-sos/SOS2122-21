<script>
    import { onMount } from "svelte";
    import {Col, Container, Row} from "sveltestrap";
    import App from "../App.svelte";
    import Home from "../Home.svelte";

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

    let yK = [];
    let lab = [];

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
        const res = await fetch("/api/v1/registrations-vehicles");
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
                if (m.has(e.year)) {
                    let lAux =  [e.country, e.variation];
                    m.get(e.year).push(lAux);
                } else {
                    let lAux = [e.country, e.variation];
                    m.set(e.year, [lAux]);
                }

                if (m2.has(e.country)) {
                    m2.get(e.country).push(e.veh_sale);
                } else {
                    m2.set(e.country, [e.veh_sale]);
                }

                if (m3.has(e.country)) {
                    m3.get(e.country).push(e.veh_per_1000);
                } else {
                    m3.set(e.country, [e.veh_per_1000]);
                }

                if (e.year < minY) {
                    minY = e.year;
                }
                if (e.year > maxY) {
                    maxY = e.year;
                }
            });


            dataPer1000 = crearDataMorris(m);
            dataComm = crearData(m2, sortedS);
            dataPass = crearData(m3, sortedS);

            await delay(1000);
            loadGraph();
        } else {
            console.log("Error in request");
        }
    }


    function crearDataMorris(m){
        const iterator = m[Symbol.iterator]();
        let array = [];
            for(let e of iterator){
                let json = {};
                json["year"] = e[0];
                let datos = e[1].sort((a, b) => b[1] - a[1]);
                for(let i = 0 ; i < datos.length ; i++){
                    let pais = datos[i][0];
                    let dato = datos[i][1];
                    json[pais] = dato;
                
                    if(!yK.includes(pais)){
                        yK.push(pais);
                    }
                    if(!lab.includes(pais)){
                        lab.push(pais);
                    }
                }
                array.push(json);
            }
        return array;
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
                text: `Registros de vehículos, ${minY}-${maxY}`,
            },
            subtitle: {
                text: "Fuente: datosmacro.com",
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

        new Morris.Bar({
            element: "container3",
            data: dataPer1000,
            xkey: 'year',
            ykeys: yK,
            labels: lab,
            fillOpacity: 0.6,
            hideHover: 'auto',
            behaveLikeLine: true,
            resize: true,
            stacked: true,
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
        <Row>
            <h5 class="text-center">Registro de vehículos por cada 1000 personas (Gráfico CanvasJS)</h5>
        </Row>
        <div id="container3" />
        <br />
    </figure>
</main>

