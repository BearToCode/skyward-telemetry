<script lang="ts">
	import type { MotorTelemetry } from '$lib/server/remote/types'
	import { Monitor, Pane, Separator, ThemeUtils } from 'svelte-tweakpane-ui'
	import { source } from 'sveltekit-sse'

	let latestTelemetry: MotorTelemetry | null = null

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
				latestTelemetry = data
			}
		})
</script>

<Pane theme={ThemeUtils.presets.light} position="draggable" title="Motor">
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
