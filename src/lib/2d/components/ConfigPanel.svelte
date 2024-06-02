<script lang="ts">
	import { Checkbox, Pane, ThemeUtils, Monitor, Separator } from 'svelte-tweakpane-ui'
	import type { GeoPosition } from '$lib/server/terrain/types'
	import { onMount } from 'svelte'
	import { ping, telemetry } from '$lib/sse'

	let latencies = new Array(10).fill(0)
	let latestResponse = Date.now()
	let time = Date.now()
	let serverTime = NaN
	let rocketTime = NaN
	let payloadTime = NaN
	let gseTime = NaN
	let motorTime = NaN

	onMount(() => {
		setInterval(() => {
			time = Date.now()
			const latency = time - latestResponse
			latencies.push(latency)
			latencies.shift()
			latencies = [...latencies]
		}, 100)
	})

	ping().subscribe((msg) => {
		if (msg) {
			serverTime = msg.getTime()
			latestResponse = Date.now()
		}
	})

	telemetry('ROCKET_FLIGHT_TM').subscribe((data) => {
		if (data) {
			rocketTime = data.timestamp
		}
	})

	telemetry('PAYLOAD_FLIGHT_TM').subscribe((data) => {
		if (data) {
			gseTime = data.timestamp
		}
	})

	telemetry('GSE_TM').subscribe((data) => {
		if (data) {
			payloadTime = data.timestamp
		}
	})

	telemetry('MOTOR_TM').subscribe((data) => {
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
