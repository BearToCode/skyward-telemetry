import { Vector2 } from 'three'
import { Tesselation } from './tesselation'
import { type Terrain, type GeoPosition, type SerializableTriangle3D } from './types'
import { fetchAltitudes } from './altitude'

export const terrainScale = 10

const earthRadius = 6371 * 1000

function project2DToGeo(geo: GeoPosition, pos: Vector2) {
	return {
		lat: geo.lat + Math.atan((pos.y * terrainScale) / earthRadius) * (180 / Math.PI),
		lon: geo.lon + Math.atan((pos.x * terrainScale) / earthRadius) * (180 / Math.PI)
	}
}

function altitudeToZ(altitude: number, referenceAltitude: number) {
	return (altitude - referenceAltitude) / terrainScale
}

export async function fetchTerrain(geo: GeoPosition): Promise<Terrain> {
	const tesselation = new Tesselation()

	const triangles: SerializableTriangle3D[] = []
	let referenceAltitude: number | undefined

	const geoPositions = new Map<string, GeoPosition>()
	const altitudes = new Map<string, number>()

	const posToKey = (pos: Vector2) => {
		const rounded = new Vector2(Math.round(pos.x * 500) / 500, Math.round(pos.y * 500) / 500)
		return `${rounded.x},${rounded.y}`
	}

	const addPosition = (pos: Vector2) => {
		const key = posToKey(pos)
		geoPositions.set(key, project2DToGeo(geo, pos))
	}

	for (const triangle of tesselation.triangles) {
		addPosition(triangle.a)
		addPosition(triangle.b)
		addPosition(triangle.c)
	}

	// Split the positions into chunks of 100
	const chunkSize = 100
	const keys = Array.from(geoPositions.keys())
	const chunks = Array.from({ length: Math.ceil(keys.length / chunkSize) }, (_, i) =>
		keys.slice(i * chunkSize, i * chunkSize + chunkSize)
	)

	console.log(`Fetching altitudes for ${keys.length} positions`)
	for (const chunk of chunks) {
		const chunkAltitudes = await fetchAltitudes(chunk.map((key) => geoPositions.get(key)!))
		for (const [index, key] of chunk.entries()) {
			const altitude = chunkAltitudes[index]
			if (referenceAltitude === undefined) {
				referenceAltitude = altitude
			}
			altitudes.set(key, altitude)
		}
	}

	for (const triangle2D of tesselation.triangles) {
		const triangle3D = {
			a: {
				x: triangle2D.a.x,
				y: triangle2D.a.y,
				z: altitudeToZ(altitudes.get(posToKey(triangle2D.a))!, referenceAltitude!)
			},
			b: {
				x: triangle2D.b.x,
				y: triangle2D.b.y,
				z: altitudeToZ(altitudes.get(posToKey(triangle2D.b))!, referenceAltitude!)
			},
			c: {
				x: triangle2D.c.x,
				y: triangle2D.c.y,
				z: altitudeToZ(altitudes.get(posToKey(triangle2D.c))!, referenceAltitude!)
			}
		}

		triangles.push(triangle3D)
	}

	return {
		triangles,
		referenceAltitude: referenceAltitude!,
		geo
	}
}
