<script lang="ts">
	import { telemetry } from '$lib/sse'
	import { Monitor, Pane, ThemeUtils } from 'svelte-tweakpane-ui'

	let ignition = false
	let fillingValve = false
	let ventingValve = false
	let releasePressure = false
	let quickConnector = false
	let startTars = false
	let arm = false

	telemetry('CONRIG_STATE_TC').subscribe((data) => {
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

<Pane theme={ThemeUtils.presets.light} position="draggable" title="Conrig" localStoreId="conrig">
	<Monitor value={ignition} label="Ignition" />
	<Monitor value={fillingValve} label="FillingValve" />
	<Monitor value={ventingValve} label="VentingValve" />
	<Monitor value={releasePressure} label="ReleasePressure" />
	<Monitor value={quickConnector} label="QuickConnector" />
	<Monitor value={startTars} label="StartTARS" />
	<Monitor value={arm} label="Arm" />
</Pane>
