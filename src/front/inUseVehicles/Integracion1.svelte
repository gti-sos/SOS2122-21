<script>
    import { onMount } from "svelte";
    import {Col, Container, Row, Button, Icon} from "sveltestrap";
    import { pop } from "svelte-spa-router";

    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    onMount(getData);
    let apiData = [];
    let dataGraph = [];
    async function getData() {
        console.log("Fetching data....");
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
                "X-RapidAPI-Key":
                    "c70ce6ea89msh8767c3249b8f1fep1a1020jsn0e167cead932",
            },
            
        };

        const res = await fetch("/remoteAPI1?key=c3a33a6df14945009b29b1936f5dfd43", options)
        if(res.ok){
            const json = await res.json();
            apiData = json.filters.years;
            
            for (let i=apiData.length - 1; i >= 0; i--) {
                dataGraph.push({y:`${apiData[i].from}-${apiData[i].to}`,a:apiData[i].count})
            }

            console.log(apiData);
            await delay(500);
            loadGraph();
        }
    }

    function loadGraph(){
        new Morris.Bar({
            element: "container",
            data: dataGraph,
            xkey: 'y',
            ykeys: ['a'],
            labels: ["Total de videojuegos desarrollados"],
            fillOpacity: 0.6,
            hideHover: 'auto'
        });
    }
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
        <Row>
            <h5 class="text-center">
                Número de videojuegos desarrollados cada década
            </h5>
            <h6 class="text-center">Biblioteca: Morris.js</h6>
        </Row>
        <div id="container" />
        <br />
    </figure>
    <Button color="info" on:click="{pop}"> <Icon name="arrow-return-left"/> Volver atrás</Button>
</main>
