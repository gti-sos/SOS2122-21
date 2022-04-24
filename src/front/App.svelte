<script>
    import Router from 'svelte-spa-router';
    import Home from './Home.svelte';
    import Info from './Info.svelte';

    //ANTONIO
    import IUV from './inUseVehicles/IUV.svelte';
    import IUVnewData from './inUseVehicles/IUVnewData.svelte';
    import IUVTable from './inUseVehicles/IUVTable.svelte';

    //MARIA
    import PV from './productionsVehicles/PV.svelte';
    import PVnewData from './productionsVehicles/PVnewData.svelte';
    import PVTable from './productionsVehicles/PvTable.svelte';

    //JAVI
    import RV from './registrationsVehicles/RV.svelte';
   
    const routes = {
        "/": Home,
        "/info":Info,
        "/in-use-vehicles": IUV,
        "/in-use-vehicles/data": IUVTable,      
        "/in-use-vehicles/:country/:year": IUVnewData,
        "/productions-vehicles": PV,
        "/productions-vehicles/data":PVTable,
        "/productions-vehicles/:country/:year": PVnewData,
        "/registrations-vehicles": RV
    }

</script>

<main>
    <Router {routes}/>
</main>
