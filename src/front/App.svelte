<script>
    import Router from 'svelte-spa-router';
    import Home from './Home.svelte';

    //ANTONIO
    import IUV from './inUseVehicles/IUV.svelte';
    import IUVnewData from './inUseVehicles/IUVnewData.svelte';
    import IUVTable from './inUseVehicles/IUVTable.svelte';

    //MARIA
    import PV from './productionsVehicles/PV.svelte';
    import PVTable from './productionsVehicles/PVTable.svelte';

    //JAVI
    import RV from './registrationsVehicles/RV.svelte';
   
    const routes = {
        "/": Home,
        "/in-use-vehicles": IUV,
        "/in-use-vehicles/data": IUVTable,      
        "/in-use-vehicles/:country/:year": IUVnewData,
        "/productions-vehicles": PV,
        "/productions-vehicles/data":PVTable,
        "/registrations-vehicles": RV
    }

</script>

<main>
    <Router {routes}/>
</main>
