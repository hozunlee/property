<script>
  import "../app.css";
</script>


<div class="app">
	<!-- <Ga /> -->
	<header>
		<!-- <Header /> -->
	</header>

	<!-- <main> -->
	<slot />
	<!-- </main> -->

	<footer>
    <p><a href="https://hololog.dev">Visit hololog </a> by hojunLee</p>
	</footer>
</div>



<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
    color: blue;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>