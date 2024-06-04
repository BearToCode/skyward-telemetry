<script lang="ts">
	import type { PayloadStatsTelemetry } from '$lib/server/remote/types'
	import { telemetry } from '$lib/sse'
	import { Folder, Monitor, Pane, ThemeUtils } from 'svelte-tweakpane-ui'

	let latestTelemetry: PayloadStatsTelemetry | null = null

	telemetry('PAYLOAD_STATS_TM').subscribe((data) => {
		if (data) {
			latestTelemetry = data
		}
	})
</script>

<Pane
	theme={ThemeUtils.presets.light}
	position="draggable"
	title="PayloadStats"
	localStoreId="payload-stats"
>
	<Folder title="Liftoff" expanded={false}>
		<Monitor value={latestTelemetry?.liftoff_max_acc ?? NaN} label="MaxAcc" />
		<Monitor
			value={latestTelemetry?.liftoff_max_acc_ts ?? NaN}
			label="MaxAccTimestamp"
			format={(n) => n.toFixed().toString()}
		/>
	</Folder>
	<Folder title="Deployment" expanded={false}>
		<Monitor value={latestTelemetry?.dpl_max_acc ?? NaN} label="MaxAcc" />
		<Monitor
			value={latestTelemetry?.dpl_ts ?? NaN}
			label="Timestamp"
			format={(n) => n.toFixed().toString()}
		/>
	</Folder>
	<Folder title="Speed" expanded={false}>
		<Monitor value={latestTelemetry?.max_z_speed ?? NaN} label="MaxZSpeed" />
		<Monitor value={latestTelemetry?.max_z_speed_ts ?? NaN} label="MaxZSpeedTimestamp" />
		<Monitor value={latestTelemetry?.max_airspeed_pitot ?? NaN} label="MaxAirspeedPitot" />
		<Monitor value={latestTelemetry?.max_speed_altitude ?? NaN} label="MaxSpeedAltitude" />
	</Folder>
	<Folder title="Apogee" expanded={false}>
		<Monitor
			value={latestTelemetry?.apogee_ts ?? NaN}
			label="Timestamp"
			format={(n) => n.toFixed().toString()}
		/>
		<Monitor
			value={latestTelemetry?.apogee_lat ?? NaN}
			label="Latitude"
			format={(n) => n.toString()}
		/>
		<Monitor
			value={latestTelemetry?.apogee_lon ?? NaN}
			label="Longitude"
			format={(n) => n.toString()}
		/>
		<Monitor value={latestTelemetry?.apogee_alt ?? NaN} label="Altitude" />
	</Folder>
	<Folder title="Pressure" expanded={false}>
		<Monitor value={latestTelemetry?.min_pressure ?? NaN} label="MinPressure" />
	</Folder>
	<Folder title="System" expanded={false}>
		<Monitor value={latestTelemetry?.cpu_load ?? NaN} label="CPULoad" />
		<Monitor value={latestTelemetry?.free_heap ?? NaN} label="FreeHeap" />
	</Folder>
</Pane>
