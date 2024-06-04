<script lang="ts">
	import type { PayloadFlightTelemetry } from '$lib/server/remote/types'
	import { telemetry } from '$lib/sse'
	import { Monitor, Pane, ThemeUtils, Folder } from 'svelte-tweakpane-ui'

	let latestTelemetry: PayloadFlightTelemetry | null = null

	telemetry('PAYLOAD_FLIGHT_TM').subscribe((data) => {
		if (data) {
			latestTelemetry = data
		}
	})
</script>

<Pane
	theme={ThemeUtils.presets.light}
	position="draggable"
	title="PayloadFlight"
	localStoreId="payload-flight"
>
	<Folder title="States" expanded={false}>
		<Monitor value={latestTelemetry?.fmm_state ?? NaN} label="FMMState" />
		<Monitor value={latestTelemetry?.wes_state ?? NaN} label="WESState" />
	</Folder>
	<Folder title="Sensors" expanded={false}>
		<Monitor value={latestTelemetry?.pressure_digi ?? NaN} label="PressureDIGI" graph />
		<Monitor value={latestTelemetry?.pressure_static ?? NaN} label="PressureStatic" graph />
		<Monitor value={latestTelemetry?.airspeed_pitot ?? NaN} label="AirspeedPitot" graph />
		<Monitor value={latestTelemetry?.altitude_agl ?? NaN} label="AltitudeAGL" graph />
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
