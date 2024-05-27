import type { Vector2, Vector3 } from 'three'

export type GeoPosition = {
	lat: number
	lon: number
}

export type Triangle2D = {
	a: Vector2
	b: Vector2
	c: Vector2
}

export type Triangle3D = {
	a: Vector3
	b: Vector3
	c: Vector3
}

export type Terrain = {
	triangles: Triangle3D[]
	referenceAltitude: number
	geo: GeoPosition
}