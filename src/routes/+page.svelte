<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from '$lib/3d/components/Scene.svelte'
	import { Terrain, type GeoPosition } from '$lib/3d/terrain'

  const geo: GeoPosition = { lat: 45, lon: 45 }
  const terrain = new Terrain()
</script>

<Canvas>
  <Scene {terrain} />
</Canvas>