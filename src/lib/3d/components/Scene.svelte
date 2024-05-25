<script lang="ts">
	import { T } from '@threlte/core'
	import { Edges } from '@threlte/extras'
	import * as THREE from 'three'
	import type { Terrain } from '../terrain'
	import TerrainMesh from './TerrainMesh.svelte'

	export let terrain: Terrain
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0)
	}}
/>

<T.Mesh position.y={1}>
	<T.BoxGeometry args={[1, 2, 1]} />
	<T.MeshBasicMaterial color="hotpink" />
</T.Mesh>

<T.Mesh position.x={2}>
	<T.BufferGeometry
		attributes={{
			position: new THREE.BufferAttribute(
				new Float32Array([
					-1.0,
					-1.0,
					1.0, // v0
					1.0,
					-1.0,
					1.0, // v1
					1.0,
					1.0,
					1.0, // v2

					1.0,
					1.0,
					1.0, // v3
					-1.0,
					1.0,
					1.0, // v4
					-1.0,
					-1.0,
					1.0 // v5
				]),
				3
			)
		}}
	/>
	<T.MeshBasicMaterial color="orange" />
	<Edges color="black" />
</T.Mesh>

<TerrainMesh {terrain} />
