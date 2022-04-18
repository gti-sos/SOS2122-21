<script>
    import Router from 'svelte-spa-router';
    import Home from './Home.svelte';

    //ANTONIO
    import IUV from './inUseVehicles/IUV.svelte';
    import IUVTable from './inUseVehicles/IUVTable.svelte';

    //MARIA
    import PV from './productionsVehicles/PV.svelte';
    import PvTable from './productionsVehicles/PvTable.svelte';

    //JAVI
    import RV from './registrationsVehicles/RV.svelte';
   
    const routes = {
        "/": Home,
        "/in-use-vehicles/frontend": IUV,
        "/in-use-vehicles/data": IUVTable,      
        "/productions-vehicles": PV
    }

</script>

<main>
    <Router {routes}/>
</main>
