<script>
    import Router from 'svelte-spa-router';
    import Home from './Home.svelte';
    import Info from './Info.svelte';
    import HomeV2 from "./HomeV2.svelte";
    import Charts from "./Charts.svelte";
    import Integrations from "./Integrations.svelte";
    import About from "./About.svelte";

    import CommonGraph from "./CommonGraph.svelte";

    //ANTONIO
    import IUV from './inUseVehicles/IUV.svelte';
    import IUVnewData from './inUseVehicles/IUVnewData.svelte';
    import IUVTable from './inUseVehicles/IUVTable.svelte';
    import IuvGraph from './inUseVehicles/IUVGraph.svelte';
    import I1 from "./inUseVehicles/Integracion1.svelte";
    import I2 from "./inUseVehicles/Integracion2.svelte";
    import I3 from "./inUseVehicles/Integracion3.svelte";
    import I4 from "./inUseVehicles/Integracion4.svelte";


    //MARIA
    import PV from './productionsVehicles/PV.svelte';
    import PVnewData from './productionsVehicles/PVnewData.svelte';
    import PVTable from './productionsVehicles/PvTable.svelte';
    import PVGraph from './productionsVehicles/PVGraph.svelte';
    import PvGraphamCharts from './productionsVehicles/PVGraphamCharts.svelte';
    import Integracion1PV from './productionsVehicles/Integracion1PV.svelte';
    import Integracion2PV from './productionsVehicles/Integracion2PV.svelte';
    import Uso1 from './productionsVehicles/Uso1.svelte';
    import Uso2 from './productionsVehicles/Uso2.svelte';




    //JAVI
    import RV from './registrationsVehicles/RV.svelte';
    import RVnewData from './registrationsVehicles/RVnewData.svelte';
    import RvTable from './registrationsVehicles/RvTable.svelte';
    import RVGraph from './registrationsVehicles/RVGraph.svelte';
    import RVGraphCanvaJs from './registrationsVehicles/RVGraphCanvaJS.svelte';
    import Integracion1 from './registrationsVehicles/Integracion1.svelte';
    import Javrodmor1 from './registrationsVehicles/javrodmor1.svelte';
    import Integracion2 from './registrationsVehicles/Integracion2.svelte';
    import Integracion3 from './registrationsVehicles/Integracion3.svelte';
    import Integracion4 from './registrationsVehicles/Integracion4.svelte';

    const routes = {
        "/": Home,
        "/info":Info,
        "/in-use-vehicles": IUV,
        "/in-use-vehicles/data": IUVTable,      
        "/in-use-vehicles/:country/:year": IUVnewData,
        "/in-use-vehicles/graph": IuvGraph,
        "/productions-vehicles": PV,
        "/productions-vehicles/data":PVTable,
        "/productions-vehicles/:country/:year": PVnewData,
        "/productions-vehicles/graph": PVGraph,
        "/productions-vehicles/graph2" :PvGraphamCharts,
        "/productions-vehicles/graph3":Integracion1PV,
        "/productions-vehicles/graph4":Integracion2PV,
        "/productions-vehicles/graph5":Uso1,
        "/productions-vehicles/graph6":Uso2,
        "/registrations-vehicles": RV,
        "/registrations-vehicles/data":RvTable,
        "/registrations-vehicles/:country/:year": RVnewData,
        "/registrations-vehicles/graph": RVGraph,
        "/registrations-vehicles/graphCanvasJS": RVGraphCanvaJs,
        "/registrations-vehicles/integracion1" : Integracion1,
        "/registrations-vehicles/javrodmor1" : Javrodmor1,
        "/registrations-vehicles/integracion2" : Integracion2,
        "/registrations-vehicles/integracion3" : Integracion3,
        "/registrations-vehicles/integracion4" : Integracion4,
        "/analytics": CommonGraph,
        "/in-use-vehicles/integracion1": I1,
        "/in-use-vehicles/integracion2": I2,
        "/in-use-vehicles/integracion3": I3,
        "/in-use-vehicles/integracion4": I4,
        "/home": HomeV2,
        "/charts": Charts,
        "/integrations": Integrations,
        "/about": About

    }

</script>

<main>
    <Router {routes}/>
</main>
