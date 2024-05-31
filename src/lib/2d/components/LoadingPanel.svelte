<script lang="ts">
	import { fade } from 'svelte/transition'

	export let taskName: string | null
	export let taskProgress: number | null
</script>

<div
	transition:fade={{ duration: 1000 }}
	class="w-screen h-screen flex justify-center items-center"
>
	{#if taskName}
		<div transition:fade class="px-6 py-4 w-80 border rounded-md space-y-4 border-neutral-200">
			<div class="flex space-x-2 items-center">
				<iconify-icon class="text-blue-300 text-xl h-fit w-fit animate-spin" icon="gg:spinner" />
				<span class="text-xl font-medium">{taskName}</span>
			</div>
			<div
				class="h-2 rounded-full bg-blue-300 transition-all"
				style="width: {(taskProgress ?? 0) * 100}%;"
			/>
		</div>
	{/if}
</div>
