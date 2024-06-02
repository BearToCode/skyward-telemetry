<script lang="ts">
	import type { RocketFlightTelemetry } from '$lib/server/remote/types'
	import { telemetry } from '$lib/sse'
	import { Monitor, Pane, ThemeUtils, Folder } from 'svelte-tweakpane-ui'

	let latestTelemetry: RocketFlightTelemetry | null = null

	telemetry('ROCKET_FLIGHT_TM').subscribe((data) => {
		if (data) {
			latestTelemetry = data
		}
	})
</script>

<Pane theme={ThemeUtils.presets.light} position="draggable" title="RocketFlight">
	<Folder title="States" expanded={false}>
		<Monitor value={latestTelemetry?.ada_state ?? NaN} label="ADAState" />
		<Monitor value={latestTelemetry?.fmm_state ?? NaN} label="FMMState" />
		<Monitor value={latestTelemetry?.dp_state ?? NaN} label="DPState" />
		<Monitor value={latestTelemetry?.abk_state ?? NaN} label="ABKState" />
		<Monitor value={latestTelemetry?.nas_state ?? NaN} label="NASState" />
		<Monitor value={latestTelemetry?.mea_state ?? NaN} label="MEAState" />
	</Folder>
	<Folder title="Pressure" expanded={false}>
		<Monitor value={latestTelemetry?.pressure_ada ?? NaN} label="PressureADA" graph />
		<Monitor value={latestTelemetry?.pressure_digi ?? NaN} label="PressureDIGI" graph />
		<Monitor value={latestTelemetry?.pressure_dpl ?? NaN} label="PressureDPL" graph />
	</Folder>
	<Folder title="Acceleration" expanded={false}>
		<Monitor value={latestTelemetry?.acc_x ?? NaN} label="AccX" graph />
		<Monitor value={latestTelemetry?.acc_y ?? NaN} label="AccY" graph />
		<Monitor value={latestTelemetry?.acc_z ?? NaN} label="AccZ" graph />
	</Folder>
	<Folder title="Angular Velocity" expanded={false}>
		<Monitor value={latestTelemetry?.gyro_x ?? NaN} label="GyroX" graph />
		<Monitor value={latestTelemetry?.gyro_y ?? NaN} label="GyroY" graph />
		<Monitor value={latestTelemetry?.gyro_z ?? NaN} label="GyroZ" graph />
	</Folder>
	<Folder title="Magnetometer" expanded={false}>
		<Monitor value={latestTelemetry?.mag_x ?? NaN} label="MagX" graph />
		<Monitor value={latestTelemetry?.mag_y ?? NaN} label="MagY" graph />
		<Monitor value={latestTelemetry?.mag_z ?? NaN} label="MagZ" graph />
	</Folder>
	<Folder title="NAS" expanded={false}>
		<Monitor value={latestTelemetry?.nas_n ?? NaN} label="North" />
		<Monitor value={latestTelemetry?.nas_e ?? NaN} label="East" />
		<Monitor value={latestTelemetry?.nas_d ?? NaN} label="Down" />

		<Monitor value={latestTelemetry?.nas_vn ?? NaN} label="VelocityNorth" graph />
		<Monitor value={latestTelemetry?.nas_ve ?? NaN} label="VelocityEast" graph />
		<Monitor value={latestTelemetry?.nas_vd ?? NaN} label="VelocityDown" graph />

		<Monitor value={latestTelemetry?.nas_qx ?? NaN} label="QuatX" />
		<Monitor value={latestTelemetry?.nas_qy ?? NaN} label="QuatY" />
		<Monitor value={latestTelemetry?.nas_qz ?? NaN} label="QuatZ" />
	</Folder>
	<Folder title="Misc" expanded={false}>
		<Monitor value={latestTelemetry?.temperature ?? NaN} label="Temperature" />
		<Monitor value={latestTelemetry?.battery_voltage ?? NaN} label="Voltage" />
		<Monitor value={latestTelemetry?.cam_battery_voltage ?? NaN} label="CamVoltage" />
		<Monitor value={latestTelemetry?.logger_error ?? NaN} label="LoggerError" />
	</Folder>
</Pane>
