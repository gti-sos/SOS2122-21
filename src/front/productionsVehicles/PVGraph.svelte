
<script>
    import {onMount} from "svelte";
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let PVData = [];
    let countries = []
    let graphDatavehusecomm = [];
    let graphDatavehusepass = [];
    let graphDatavehuseper1000 = []
    //funcion para que se cargue el gráfico
    async function loadGraph(){  
        const res = await fetch("/api/v1/productions-vehicles");
        if(res.ok){
            PVData = await res.json();
            console.log(JSON.stringify(PVData, null, 2))
            PVData.forEach(data => {
                let country_year = data.country + "-" + data.year;
                let comm = data["veh_comm"];
                let pass = data["veh_pass"];
                let per= data["veh_annprod"]
                graphDatavehusecomm.push([country_year, comm])
                graphDatavehusepass.push([country_year, pass])
                graphDatavehuseper1000.push([country_year, per])
            });
        } else {
            console.log("Error loading fires");
        }
        console.log("Generando grafo con los siguientes datos:")
        //el gráfico
        Highcharts.chart('container', {
            chart: {
                type: 'area',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 30,
                    depth: 200
                }
               
            },
            title: {
                text: "Estadísticas de vehículos comerciales,pasajeros y la produción anual de vehículos"
            },
            yAxis: {
                
                title: {
                    text:
                     'Número de unidades',
                    x:5
                    
                },
                
                labels: {
                    format: '{value:,.0f} unidades'
                },
                gridLineDashStyle: 'Dash'
            },
            xAxis: [{
                labels: {
                    enabled: true,
                    formatter: function() { return countries[this.value][0]},
                 },
                visible: false
            }, {
                visible: false
            }, {
                visible: false
            }],
            
            plotOptions: {
                area: {
                    depth: 100,
                    marker: {
                        enabled: false
                    },
                    states: {
                        inactive: {
                            enabled: false
                        }
                    }
                }
            },
            tooltip: {
                valueSuffix: ' unidades'
            },
            series: [{
                name: "Vehiculos comerciales",
                lineColor: 'rgb(180,90,50)',
                color: 'rgb(201,110,50)',
                fillColor: 'rgb(200,110,50)',
                data:graphDatavehusecomm 
            }, {
                name: "Vehículos pasajeros",
                lineColor: 'rgb(230,90,50)',
                color: 'rgb(230,90,50)',
                fillColor: 'rgb(230,90,50)',
                data: graphDatavehusepass
            }, {
                name: "Producción anual de vehículos",
                lineColor: 'rgb(87,213,29)',
                color: 'rgb(80,200,20)',
                fillColor: 'rgb(80,200,20)',
                data:  graphDatavehuseper1000
            }]
        });
    }

  
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load="{loadGraph}"></script>
    <script src="https://code.highcharts.com/highcharts-3d.js"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>  
</main>