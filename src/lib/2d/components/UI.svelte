<script lang="ts">
	import ConfigPanel from './ConfigPanel.svelte'
	import MotorPanel from './MotorPanel.svelte'
	import GSEPanel from './GSEPanel.svelte'
	import RocketFlightPanel from './RocketFlightPanel.svelte'
	import PayloadFlightPanel from './PayloadFlightPanel.svelte'
	import RocketStatsPanel from './RocketStatsPanel.svelte'
	import PayloadStatsPanel from './PayloadStatsPanel.svelte'
	import ConrigPanel from './ConrigPanel.svelte'
	import type { GeoPosition } from '$lib/3d/terrain/types'

	let motorPanel = false
	let gsePanel = false
	let rocketFlightPanel = false
	let payloadFlightPanel = false
	let rocketStatsPanel = false
	let payloadStatsPanel = false
	let conrigPanel = false

	export let geo: GeoPosition
</script>

<ConfigPanel
	bind:motorPanel
	bind:gsePanel
	bind:rocketFlightPanel
	bind:payloadFlightPanel
	bind:rocketStatsPanel
	bind:payloadStatsPanel
	bind:conrigPanel
	{geo}
/>

{#if motorPanel}
	<MotorPanel />
{/if}

{#if gsePanel}
	<GSEPanel />
{/if}

{#if rocketFlightPanel}
	<RocketFlightPanel />
{/if}

{#if payloadFlightPanel}
	<PayloadFlightPanel />
{/if}

{#if rocketStatsPanel}
	<RocketStatsPanel />
{/if}

{#if payloadStatsPanel}
	<PayloadStatsPanel />
{/if}

{#if conrigPanel}
	<ConrigPanel />
{/if}
