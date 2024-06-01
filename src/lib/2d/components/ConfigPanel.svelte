<script lang="ts">
	import { Checkbox, Pane, ThemeUtils, Monitor, Separator } from 'svelte-tweakpane-ui'
	import type { GeoPosition } from '$lib/server/terrain/types'
	import type {
		GSETelemetry,
		MotorTelemetry,
		RocketFlightTelemetry
	} from '$lib/server/remote/types'
	import { onMount } from 'svelte'
	import { source } from 'sveltekit-sse'

	let latencies = new Array(10).fill(0)
	let time = Date.now()
	let serverTime = NaN
	let rocketTime = NaN
	let payloadTime = NaN
	let gseTime = NaN
	let motorTime = NaN

	onMount(() => {
		setInterval(() => {
			time = Date.now()
			const latency = Math.max(0, time - serverTime) // could be lower than 0 if clocks are not in sync
			latencies.push(latency)
			latencies.shift()
			latencies = [...latencies]
		}, 100)
	})

	source('/sse')
		.select('PING')
		.transform<Date | null>((msg: any) => {
			if (msg) {
				return new Date(JSON.parse(msg).timestamp)
			}
			return null
		})
		.subscribe((msg) => {
			if (msg) {
				serverTime = msg.getTime()
			}
		})

	source('/sse')
		.select('ROCKET_FLIGHT_TM')
		.transform<RocketFlightTelemetry | null>((data) => {
			if (data) {
				return JSON.parse(data)
			}
			return null
		})
		.subscribe((data) => {
			if (data) {
				rocketTime = data.timestamp
			}
		})

	source('/sse')
		.select('PAYLOAD_FLIGHT_TM')
		.transform<RocketFlightTelemetry | null>((data) => {
			if (data) {
				return JSON.parse(data)
			}
			return null
		})
		.subscribe((data) => {
			if (data) {
				gseTime = data.timestamp
			}
		})

	source('/sse')
		.select('GSE_TM')
		.transform<GSETelemetry | null>((data) => {
			if (data) {
				return JSON.parse(data)
			}
			return null
		})
		.subscribe((data) => {
			if (data) {
				payloadTime = data.timestamp
			}
		})

	source('/sse')
		.select('MOTOR_TM')
		.transform<MotorTelemetry | null>((data) => {
			if (data) {
				return JSON.parse(data)
			}
			return null
		})
		.subscribe((data) => {
			if (data) {
				motorTime = data.timestamp
			}
		})

	export let motorPanel = false
	export let gsePanel = false
	export let rocketFlightPanel = false
	export let payloadFlightPanel = false
	export let rocketStatsPanel = false
	export let payloadStatsPanel = false
	export let conrigPanel = false

	export let geo: GeoPosition
</script>

<Pane theme={ThemeUtils.presets.light} position="draggable" title="Config">
	<Checkbox bind:value={motorPanel} label="MotorPanel" />
	<Checkbox bind:value={gsePanel} label="GSEPanel" />
	<Checkbox bind:value={rocketFlightPanel} label="RocketFlightPanel" />
	<Checkbox bind:value={payloadFlightPanel} label="PayloadFlightPanel" />
	<Checkbox bind:value={rocketStatsPanel} label="RocketStatsPanel" />
	<Checkbox bind:value={payloadStatsPanel} label="PayloadStatsPanel" />
	<Checkbox bind:value={conrigPanel} label="ConrigPanel" />

	<Separator />

	<Monitor
		value={latencies.reduce((a, b) => a + b) / latencies.length}
		label="Latency"
		max={10000}
		graph
	/>
	<Monitor value={time} label="Time" format={(n) => n.toFixed(0).toString()} />
	<Monitor value={serverTime} label="ServerTime" format={(n) => n.toFixed(0).toString()} />
	<Monitor value={rocketTime} label="RocketTime" format={(n) => n.toFixed(0).toString()} />
	<Monitor value={payloadTime} label="PayloadTime" format={(n) => n.toFixed(0).toString()} />
	<Monitor value={gseTime} label="GSETime" format={(n) => n.toFixed(0).toString()} />
	<Monitor value={motorTime} label="MotorTime" format={(n) => n.toFixed(0).toString()} />

	<Separator />

	<Monitor value={geo.lon} label="Longitude" format={(n) => n.toString()} />
	<Monitor value={geo.lat} label="Latitude" format={(n) => n.toString()} />
</Pane>
