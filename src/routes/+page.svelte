<script lang="ts">
	import { Canvas } from '@threlte/core'
	import Scene from '$lib/3d/components/Scene.svelte'
	import UI from '$lib/2d/components/UI.svelte'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<svelte:head>
	<title>Skyward Telemetry</title>
</svelte:head>

<Canvas>
	<Scene terrain={data.terrain} />
</Canvas>
<UI geo={data.geo} />
