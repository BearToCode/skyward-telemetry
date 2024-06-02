import { source } from 'sveltekit-sse'
import type { RemoteData, TelemetryType } from './server/remote/types'

export function telemetry<T extends TelemetryType>(message: T) {
	return source('/sse', {
		close({ connect }) {
			console.log(`Lost connection for ${message}, reconnecting...`)
			connect()
		}
	})
		.select(message)
		.transform((data) => {
			if (data) {
				return JSON.parse(data) as RemoteData[T][number]
			}
			return null
		})
}

export function ping() {
	return source('/sse', {
		close({ connect }) {
			console.log('Lost connection for ping, reconnecting...')
			connect()
		}
	})
		.select('PING')
		.transform<Date | null>((msg) => {
			if (msg) {
				return new Date(JSON.parse(msg).timestamp)
			}
			return null
		})
}
