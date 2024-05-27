import { wait } from '$lib/utils/promise'
import type { GeoPosition } from './types'

type OpenTopoDataResponse = SuccessfulOpenTopoDataResponse | ErrorOpenTopoDataResponse

type SuccessfulOpenTopoDataResponse = {
	results: {
		dataset: string
		elevation: number
		location: GeoPosition
	}[]
	status: 'OK'
}

type ErrorOpenTopoDataResponse = {
	status: 'INVALID_REQUEST'
	error: string
}

let lastFetch = 0
const maxFetchRate = 1000
/**
 * Fetches the altitudes of  given geo positions from the OpenTopo API
 * @param geo The geo positions to fetch the altitude for
 * @returns The altitude at the given positions
 */
export async function fetchAltitudes(positions: GeoPosition[]) {
	const now = Date.now()
	if (now - lastFetch < maxFetchRate) {
		await wait(maxFetchRate - (now - lastFetch)) // Avoid rate limiting
	}
	lastFetch = Date.now()

	const response = await fetch(`/api/altitude`, {
		method: 'POST',
		body: JSON.stringify(positions)
	})

	const data: OpenTopoDataResponse = await response.json()
	if (data.status !== 'OK') throw new Error(data.error)
	return data.results.map((res) => res.elevation)
}
