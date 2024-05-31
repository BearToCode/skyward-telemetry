import { writable } from 'svelte/store'

export const loading = writable<boolean>(false)
export const taskName = writable<string | null>(null)
export const taskProgress = writable<number | null>(null)

export function registerTask(name: string) {
	taskName.set(name)
	taskProgress.set(null)
	return {
		setProgress(progress: number) {
			taskProgress.set(progress)
		}
	}
}
