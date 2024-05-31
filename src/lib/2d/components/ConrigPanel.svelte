<script lang="ts">
	import type { ConrigStateTelemetry } from '$lib/server/remote/types'
	import { Monitor, Pane, ThemeUtils } from 'svelte-tweakpane-ui'
	import { source } from 'sveltekit-sse'

	let ignition = false
	let fillingValve = false
	let ventingValve = false
	let releasePressure = false
	let quickConnector = false
	let startTars = false
	let arm = false

	source('/sse')
		.select('MOTOR_TM')
		.transform<ConrigStateTelemetry | null>((data) => {
			if (data) {
				return JSON.parse(data)
			}
			return null
		})
		.subscribe((data) => {
			if (data) {
				ignition = data.ignition_btn == 0
				fillingValve = data.filling_valve_btn == 0
				ventingValve = data.venting_valve_btn == 0
				releasePressure = data.release_pressure_btn == 0
				quickConnector = data.quick_connector_btn == 0
				startTars = data.start_tars_btn == 0
				arm = data.arm_switch == 0
			}
		})
</script>

<Pane theme={ThemeUtils.presets.light} position="draggable" title="Conrig">
	<Monitor value={ignition} label="Ignition" />
	<Monitor value={fillingValve} label="FillingValve" />
	<Monitor value={ventingValve} label="VentingValve" />
	<Monitor value={releasePressure} label="ReleasePressure" />
	<Monitor value={quickConnector} label="QuickConnector" />
	<Monitor value={startTars} label="StartTARS" />
	<Monitor value={arm} label="Arm" />
</Pane>
