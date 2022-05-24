<script>
	import { push } from "svelte-spa-router";
	import Button from "sveltestrap/src/Button.svelte";
</script>

<main>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>SOS2122-21</title>
	</head>
		<div class="container">
			<div class="text-center">
				<h1>SOS2122-21</h1>
				<p class="lead">
					Bienvenido a la página principal del proyecto SOS2122-21.
				</p>
				<Button color= "primary" on:click={()=>push("#/home")}>Información</Button>
				

			</div>
		</div>	
	<style>
		.text-center {
			text-align: center;
			margin-top: 10em;
			margin-bottom: 23.1em;
		}
	</style>
</main>