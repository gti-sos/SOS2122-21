<script>

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let PVData = [];
    let graphDatavehusecomm = [];
    //funcion para que se cargue el gráfico
    async function loadGraph(){  
        const res = await fetch("/api/v1/productions-vehicles");
        if(res.ok){
            PVData = await res.json();
            console.log(JSON.stringify(PVData, null, 2))
            PVData.forEach(data => {
                let comm = data["veh_comm"]
                graphDatavehusecomm.push([comm])
               
            });
        } else {
            console.log("Error al cargar los vehiculos");
        }
        console.log("Gargando gráfica:")
  
var chart = new Taucharts.Chart({
  data: graphDatavehusecomm,
  type: 'bar',
  plugins: [Taucharts.api.plugins.get('legend')()]
})
chart.renderTo('#bar');
}

loadGraph();

</script>

<svelte:head>
    
    <script src="https://cdn.jsdelivr.net/npm/d3@4.13.0/build/d3.min.js" charset="utf-8"></script>
    <script src="https://cdn.jsdelivr.net/npm/taucharts@2/dist/taucharts.min.js" type="text/javascript"></script>

</svelte:head>

<main>
   
        <div id="bar"></div>
     
</main>