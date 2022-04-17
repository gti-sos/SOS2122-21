<script>
    import Router from 'svelte-spa-router';
    import Home from "./Home.svelte";
   
    //MARIA
    import PV from './productionsVehicles/PV.svelte';
   
    const routes = {
        "/": Home,
        "/productions-vehicles": PV,
           
    }
</script>

<main>
    <Router {routes}/>
</main>
