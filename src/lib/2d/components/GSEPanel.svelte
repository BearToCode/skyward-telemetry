<script lang="ts">
	import type { GSETelemetry } from '$lib/server/remote/types'
	import { telemetry } from '$lib/sse'
	import { Folder, Monitor, Pane, ThemeUtils } from 'svelte-tweakpane-ui'

	let latestTelemetry: GSETelemetry | null = null

	telemetry('GSE_TM').subscribe((data) => {
		if (data) {
			latestTelemetry = data
		}
	})
</script>

<Pane theme={ThemeUtils.presets.light} position="draggable" title="GSE" localStoreId="gse">
	<Folder title="Sensors" expanded={false}>
		<Monitor value={latestTelemetry?.loadcell_rocket ?? NaN} label="LoadCellRocket" />
		<Monitor value={latestTelemetry?.loadcell_vessel ?? NaN} label="LoadCellVessel" />
		<Monitor value={latestTelemetry?.filling_pressure ?? NaN} label="FillingPressure" />
		<Monitor value={latestTelemetry?.vessel_pressure ?? NaN} label="VesselPressure" />
	</Folder>
	<Folder title="Valves" expanded={false}>
		<Monitor value={latestTelemetry?.filling_valve_state == 0} label="FillingValve" />
		<Monitor value={latestTelemetry?.venting_valve_state == 0} label="VentingValve" />
		<Monitor value={latestTelemetry?.release_valve_state == 0} label="ReleaseValve" />
		<Monitor value={latestTelemetry?.main_valve_state == 0} label="MainValve" />
		<Monitor value={latestTelemetry?.nitrogen_valve_state == 0} label="NitrogenValve" />
	</Folder>
	<Folder title="States" expanded={false}>
		<Monitor value={latestTelemetry?.arming_state ?? NaN} label="Arm" />
		<Monitor value={latestTelemetry?.gmm_state ?? NaN} label="GMMState" />
		<Monitor value={latestTelemetry?.tars_state ?? NaN} label="TARSState" />
		<Monitor value={latestTelemetry?.main_board_status ?? NaN} label="MainBoardStatus" />
		<Monitor value={latestTelemetry?.payload_board_status ?? NaN} label="PayloadBoardStatus" />
		<Monitor value={latestTelemetry?.motor_board_status ?? NaN} label="MotorBoardStatus" />
	</Folder>
	<Folder title="Misc" expanded={false}>
		<Monitor value={latestTelemetry?.battery_voltage ?? NaN} label="Voltage" />
		<Monitor value={latestTelemetry?.current_consumption ?? NaN} label="Consumption" />
	</Folder>
</Pane>
