<script lang="ts">
	import type { MotorTelemetry } from '$lib/server/remote/types'
	import { telemetry } from '$lib/sse'
	import { Monitor, Pane, Separator, ThemeUtils } from 'svelte-tweakpane-ui'

	let latestTelemetry: MotorTelemetry | null = null

	telemetry('MOTOR_TM').subscribe((data) => {
		if (data) {
			latestTelemetry = data
		}
	})
</script>

<Pane theme={ThemeUtils.presets.light} position="draggable" title="Motor" localStoreId="motor">
	<Monitor value={latestTelemetry?.top_tank_pressure ?? NaN} label="TopTankPressure" graph />
	<Monitor value={latestTelemetry?.bottom_tank_pressure ?? NaN} label="BottomTankPressure" graph />
	<Monitor
		value={latestTelemetry?.combustion_chamber_pressure ?? NaN}
		label="CombustionChamberPressure"
		graph
	/>
	<Monitor value={latestTelemetry?.tank_temperature ?? NaN} label="TankTemperature" graph />
	<Separator />
	<Monitor value={latestTelemetry?.main_valve_state == 0} label="MainValve" />
	<Monitor value={latestTelemetry?.venting_valve_state == 0} label="VentingValve" />
	<Separator />
	<Monitor value={latestTelemetry?.battery_voltage ?? NaN} label="Voltage" />
	<Monitor value={latestTelemetry?.current_consumption ?? NaN} label="Consumption" />
</Pane>
