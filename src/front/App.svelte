<script>
    import Router from 'svelte-spa-router';
    import Home from "./Home.svelte";
   
    //MARIA
    import PV from './productionsVehicles/PV.svelte';
   
    const routes = {
        "/": Home,
        "/api/v1/productions-vehicles/frontend": PV,
           
    }
</script>

<main>
    <Router {routes}/>
</main>