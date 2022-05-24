<script>
    import Router from 'svelte-spa-router';
    import Home from './Home.svelte';
    import Info from './Info.svelte';
    import HomeV2 from "./HomeV2.svelte";
    import Charts from "./Charts.svelte";
    import Integrations from "./Integrations.svelte";

    import CommonGraph from "./CommonGraph.svelte";

    //ANTONIO
    import IUV from './inUseVehicles/IUV.svelte';
    import IUVnewData from './inUseVehicles/IUVnewData.svelte';
    import IUVTable from './inUseVehicles/IUVTable.svelte';
    import IuvGraph from './inUseVehicles/IUVGraph.svelte';
    import I1 from "./inUseVehicles/Integracion1.svelte";
    import I2 from "./inUseVehicles/Integracion2.svelte";
    import I3 from "./inUseVehicles/Integracion3.svelte";

    //MARIA
    import PV from './productionsVehicles/PV.svelte';
    import PVnewData from './productionsVehicles/PVnewData.svelte';
    import PVTable from './productionsVehicles/PvTable.svelte';
    import PVGraph from './productionsVehicles/PVGraph.svelte';

    //JAVI
    import RV from './registrationsVehicles/RV.svelte';
    import RVnewData from './registrationsVehicles/RVnewData.svelte';
    import RvTable from './registrationsVehicles/RvTable.svelte';
    import RVGraph from './registrationsVehicles/RVGraph.svelte';

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
        "/registrations-vehicles": RV,
        "/registrations-vehicles/data":RvTable,
        "/registrations-vehicles/:country/:year": RVnewData,
        "/registrations-vehicles/graph": RVGraph,
        "/analytics": CommonGraph,
        "/in-use-vehicles/integracion1": I1,
        "/in-use-vehicles/integracion2": I2,
        "/in-use-vehicles/integracion3": I3,
        "/home": HomeV2,
        "/charts": Charts,
        "/integrations": Integrations,

    }

</script>

<main>
    <Router {routes}/>
</main>
