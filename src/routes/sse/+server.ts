import type {
	GSETelemetry,
	MotorTelemetry,
	PayloadFlightTelemetry,
	RemoteData,
	RocketFlightTelemetry
} from '$lib/server/remote/types'
import { wait } from '$lib/utils/promise'
import { produce } from 'sveltekit-sse'

let latestMotorTimestamp = 0
let latestGSETimestamp = 0
let latestRocketFlightTimestamp = 0
let latestPayloadFlightTimestamp = 0

const filterMotorTelemetry = (messages: MotorTelemetry[]) => {
	const newMessages = messages.filter((m) => m.timestamp > latestMotorTimestamp)
	newMessages.sort((a, b) => a.timestamp - b.timestamp)
	const latestMessage = newMessages.at(-1)
	if (latestMessage) latestMotorTimestamp = latestMessage.timestamp
	return newMessages
}

const filterGSETelemetry = (messages: GSETelemetry[]) => {
	const newMessages = messages.filter((m) => m.timestamp > latestGSETimestamp)
	newMessages.sort((a, b) => a.timestamp - b.timestamp)
	const latestMessage = newMessages.at(-1)
	if (latestMessage) latestGSETimestamp = latestMessage.timestamp
	return newMessages
}

const filterRocketFlightTelemetry = (messages: RocketFlightTelemetry[]) => {
	const newMessages = messages.filter((m) => m.timestamp > latestRocketFlightTimestamp)
	newMessages.sort((a, b) => a.timestamp - b.timestamp)
	const latestMessage = newMessages.at(-1)
	if (latestMessage) latestRocketFlightTimestamp = latestMessage.timestamp
	return newMessages
}

const filterPayloadFlightTelemetry = (messages: PayloadFlightTelemetry[]) => {
	const newMessages = messages.filter((m) => m.timestamp > latestPayloadFlightTimestamp)
	newMessages.sort((a, b) => a.timestamp - b.timestamp)
	const latestMessage = newMessages.at(-1)
	if (latestMessage) latestPayloadFlightTimestamp = latestMessage.timestamp
	return newMessages
}

export function POST() {
	return produce(async ({ emit }) => {
		// eslint-disable-next-line no-constant-condition
		while (true) {
			await wait(500)
			const response = await fetch(`https://remote.ett.re`)
			const data: RemoteData = await response.json()

			// Only send new telemetry
			const latestMotorTelemetry = filterMotorTelemetry(data.MOTOR_TM)
			const latestGSETelemetry = filterGSETelemetry(data.GSE_TM)
			const latestRocketFlightTelemetry = filterRocketFlightTelemetry(data.ROCKET_FLIGHT_TM)
			const latestPayloadFlightTelemetry = filterPayloadFlightTelemetry(data.PAYLOAD_FLIGHT_TM)

			// Always send the latest telemetry
			const latestRocketStatsTelemetry = data.ROCKET_STATS_TM.at(0)
			const latestPayloadStatsTelemetry = data.PAYLOAD_STATS_TM.at(0)
			const latestConrigTelemetry = data.CONRIG_STATE_TC.at(0)

			if (latestMotorTelemetry) {
				for (const message of latestMotorTelemetry) {
					emit('MOTOR_TM', JSON.stringify(message))
				}
			}
			if (latestGSETelemetry) {
				for (const message of latestGSETelemetry) {
					emit('GSE_TM', JSON.stringify(message))
				}
			}
			if (latestRocketFlightTelemetry) {
				for (const message of latestRocketFlightTelemetry) {
					emit('ROCKET_FLIGHT_TM', JSON.stringify(message))
				}
			}
			if (latestPayloadFlightTelemetry) {
				for (const message of latestPayloadFlightTelemetry) {
					emit('PAYLOAD_FLIGHT_TM', JSON.stringify(message))
				}
			}

			if (latestRocketStatsTelemetry) {
				emit('ROCKET_STATS_TM', JSON.stringify(latestRocketStatsTelemetry))
			}
			if (latestPayloadStatsTelemetry) {
				emit('PAYLOAD_STATS_TM', JSON.stringify(latestPayloadStatsTelemetry))
			}
			if (latestConrigTelemetry) {
				emit('CONRIG_STATE_TC', JSON.stringify(latestConrigTelemetry))
			}

			emit('PING', JSON.stringify({ timestamp: Date.now() }))
		}
	})
}
