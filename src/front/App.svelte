<script>
    import Router from 'svelte-spa-router';
    import Home from './Home.svelte';

    import Iuv from './Iuv.svelte';

    //MARIA
    import PV from './productionsVehicles/PV.svelte';
   
    const routes = {
        "/": Home,
        "/in-use-vehicles-frontend": Iuv,
        "/api/v1/productions-vehicles/frontend": PV         
    }

</script>

<main>
    <Router {routes}/>
</main>