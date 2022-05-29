
<script>
    import Button from "sveltestrap/src/Button.svelte"; import { pop } from "svelte-spa-router";
     //función donde se cargan los datos de la API
    async function loadGraph() {
        //todos los datos de la API
         let MyData = [];
         //todos los datos que queremos para el gráfico
         let MyDataGraph = [];
         const resData = await fetch("/api/v1/productions-vehicles");
         MyData = await resData.json();
         //con la x los vamos identificando
         MyData.forEach((x) => {
             //filtramos por año
             if (x.year == 2020) {
                 //los parámetros que quieroson el país y la producción anual de vehículos
                 MyDataGraph.push({country: x.country, veh_annprod: [parseInt(x.veh_annprod)]});
             }
         });
         //funcion de la librería amChart para el gráfico
         am4core.ready(function() {
             am4core.useTheme(am4themes_kelly);
             var chart = am4core.create("chartdiv", am4charts.PieChart);
             chart.data = MyDataGraph;
             chart.innerRadius = am4core.percent(35);
             var pieSeries = chart.series.push(new am4charts.PieSeries());
             pieSeries.dataFields.value = "veh_annprod";
             pieSeries.dataFields.category = "country";
             pieSeries.slices.template.stroke = am4core.color("#fff");
             pieSeries.slices.template.strokeWidth = 2;
             pieSeries.slices.template.strokeOpacity = 1;
             pieSeries.hiddenState.properties.opacity = 1;
             pieSeries.hiddenState.properties.endAngle = -90;
             pieSeries.hiddenState.properties.startAngle = -90;
             });
     }
     
     loadGraph();
 </script>
 
 <svelte:head>
     
         <script src="https://www.amcharts.com/lib/4/core.js"></script>
         <script src="https://www.amcharts.com/lib/4/charts.js"></script>
         <script src="https://www.amcharts.com/lib/4/themes/kelly.js"></script>
         <script src="https://www.amcharts.com/lib/4/themes/animated.js" on:load="{loadGraph}"></script>
 
 </svelte:head>
 
 <main>
     <h3 style="text-align: center;"> <i class="fas fa-bicycle"></i> Producción anual de vehículos en 2020</h3>	
     <div id="chartdiv"></div>
     <p class="highcharts-description">
         <br>
         <i>La gráfica representa el porcenaje de la producción anual de vehículos por países
             en 2020.
            <br>
             Nota: Italy y United Kingdom los cuenta como cero por ciento ya que son float
         </i>
     </p>
     <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
     <br>
 </main>
 
 <style>
      #chartdiv {
       width: 100%;
       height: 500px;
     }
 </style>