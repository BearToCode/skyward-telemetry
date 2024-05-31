import { kv } from '@vercel/kv'
import type { GeoPosition, Terrain } from './types'

export const getCachedTerrain = async (geo: GeoPosition) =>
	await kv.get<Terrain>(`terrain-${geo.lat}-${geo.lon}`)

export const cacheTerrain = async (geo: GeoPosition, terrain: Terrain) => {
	console.log(`Caching terrain for ${geo.lat}, ${geo.lon}`)
	return await kv.set(`terrain-${geo.lat}-${geo.lon}`, terrain)
}
