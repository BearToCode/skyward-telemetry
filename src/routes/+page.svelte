<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from '$lib/3d/components/Scene.svelte'
	import type { GeoPosition, Terrain } from '$lib/3d/terrain/types'
	import { fetchTerrain } from '$lib/3d/terrain/terrain'
	import { loading, taskName, taskProgress } from '$lib/2d/loading/stores'
	import { onMount } from 'svelte'
	import LoadingPanel from '$lib/2d/components/LoadingPanel.svelte'
	import UI from '$lib/2d/components/UI.svelte'

	const geo: GeoPosition = {
		lat: 41.80871914,
		lon: 14.05457824
	}

	let terrain: Terrain

	$loading = true
	onMount(async () => {
		terrain = await fetchTerrain(geo)
		$loading = false
	})
</script>

<svelte:head>
	<title>Skyward Telemetry</title>
</svelte:head>

{#if $loading}
	<LoadingPanel taskName={$taskName} taskProgress={$taskProgress} />
{:else}
	<Canvas>
		<Scene {terrain} />
	</Canvas>
	<UI {geo} />
{/if}
