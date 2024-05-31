<script lang="ts">
	import { T } from '@threlte/core'
	import { OrbitControls, Gizmo } from '@threlte/extras'
	import type { Terrain } from '../terrain/types'
	import TerrainMesh from './TerrainMesh.svelte'

	export let terrain: Terrain

	let autoRotate: boolean = false
	let enableDamping: boolean = true
	let rotateSpeed: number = 1
	let zoomToCursor: boolean = false
	let zoomSpeed: number = 1
	let minPolarAngle: number = 0
	let maxPolarAngle: number = 1.45
	let enableZoom: boolean = true
</script>

<T.AmbientLight intensity={0.3} />

<T.PerspectiveCamera
	makeDefault
	position={[10, 3, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0)
	}}
>
	<OrbitControls
		{enableDamping}
		{autoRotate}
		{rotateSpeed}
		{zoomToCursor}
		{zoomSpeed}
		{minPolarAngle}
		{maxPolarAngle}
		{enableZoom}
	/>
</T.PerspectiveCamera>

<TerrainMesh {terrain} />

<Gizmo paddingX={10} paddingY={10} />
