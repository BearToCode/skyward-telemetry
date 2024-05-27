<script lang="ts">
	import { T } from '@threlte/core'
	import { OrbitControls } from '@threlte/extras'
	import TerrainMesh from './TerrainMesh.svelte'
	import type { Terrain } from '../terrain/types'

	export let terrain: Terrain

	let autoRotate: boolean = false
	let enableDamping: boolean = true
	let rotateSpeed: number = 1
	let zoomToCursor: boolean = false
	let zoomSpeed: number = 1
	let minPolarAngle: number = 0
	let maxPolarAngle: number = Math.PI
	let enableZoom: boolean = true
</script>

<T.DirectionalLight position={[0, 10, 10]} />

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
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
