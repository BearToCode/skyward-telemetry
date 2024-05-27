<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from '$lib/3d/components/Scene.svelte'
	import type { GeoPosition } from '$lib/3d/terrain/types'
	import { fetchTerrain } from '$lib/3d/terrain/terrain'

	const geo: GeoPosition = {
		lat: 41.80871914,
		lon: 14.05457824
	}
</script>

{#await fetchTerrain(geo)}
	<!-- TODO: loading -->
{:then terrain}
	<Canvas>
		<Scene {terrain} />
	</Canvas>
{:catch error}
	<!-- TODO: error -->
{/await}
