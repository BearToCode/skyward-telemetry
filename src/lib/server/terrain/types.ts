import type { Vector2, Vector3 } from 'three'

export type GeoPosition = {
	lat: number
	lon: number
}

export type SerializableVector3 = {
	x: number
	y: number
	z: number
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

export type SerializableTriangle3D = {
	a: SerializableVector3
	b: SerializableVector3
	c: SerializableVector3
}

export type Terrain = {
	triangles: SerializableTriangle3D[]
	referenceAltitude: number
	geo: GeoPosition
}
