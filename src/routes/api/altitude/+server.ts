import type { GeoPosition } from '$lib/3d/terrain/types.js'

export async function POST(event) {
	const positions: GeoPosition[] = await event.request.json()

	const params = positions.map((geo) => `${geo.lat},${geo.lon}`).join('|')
	const response = await fetch(`https://api.opentopodata.org/v1/eudem25m?locations=${params}`)

	const json = await response.json()
	return new Response(JSON.stringify(json))
}
