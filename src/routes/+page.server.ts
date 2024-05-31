import { cacheTerrain, getCachedTerrain } from '$lib/server/terrain/cache'
import { fetchTerrain } from '$lib/server/terrain/terrain'
import type { GeoPosition, Terrain } from '$lib/server/terrain/types'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const geo: GeoPosition = {
		lat: 41.80871915,
		lon: 14.05457824
	}

	let terrain: Terrain
	const cachedTerrain = await getCachedTerrain(geo)
	if (cachedTerrain) {
		console.log('Using cached terrain')
		terrain = cachedTerrain
	} else {
		terrain = await fetchTerrain(geo)
		cacheTerrain(geo, terrain)
	}

	return {
		geo,
		terrain
	}
}
