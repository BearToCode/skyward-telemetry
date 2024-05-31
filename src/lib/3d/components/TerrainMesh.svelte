<script lang="ts">
	import * as THREE from 'three'
	import { T } from '@threlte/core'
	import type { Terrain } from '../terrain/types'

	export let terrain: Terrain
</script>

<T.Mesh>
	<T.BufferGeometry
		attributes={{
			position: new THREE.BufferAttribute(
				// prettier-ignore
				new Float32Array(
					terrain.triangles
						.map((triangle) => [
							triangle.a.x, triangle.a.z, triangle.a.y,
							triangle.b.x, triangle.b.z, triangle.b.y,
							triangle.c.x, triangle.c.z, triangle.c.y
						])
						.flat()
				),
				3
			)
		}}
	/>
	<T.MeshBasicMaterial wireframe color="#b8bdc2" />
</T.Mesh>
