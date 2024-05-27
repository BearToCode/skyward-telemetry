import { Vector2, Matrix3 } from 'three'
import type { Triangle2D } from './types'

const patchesCount = 3
const patchesSubdivisions = 12
const patchesSegmentationFactor = 3

export class Tesselation {
	private segmentLength = 1
	private edgeSegments = 1
	private cursor: Vector2 = new Vector2(0, 0)
	private cursorFlip: 'up' | 'down' = 'down'
	private cursorDirection = 0

	public readonly triangles: Triangle2D[] = []

	constructor() {
		this.generate()
	}

	private generate() {
		for (let patch = 0; patch < patchesCount; patch++) {
			this.startPatch()
			for (let subdivision = 0; subdivision < patchesSubdivisions; subdivision++) {
				this.extendPatch()
			}
			this.endPatch()
		}
	}

	private extendPatch() {
		this.cursorDirection = 0
		while (this.cursorDirection < 360) {
			this.generateEdge()
			this.rotateCursor()
		}
		this.edgeSegments += 2
		// Move the cursor up left
		this.cursor.add(
			new Vector2(
				-this.segmentLength * Math.sin(Math.PI / 6),
				this.segmentLength * Math.cos(Math.PI / 6)
			)
		)
	}

	private startPatch() {
		this.cursorDirection = 0
		this.cursorFlip = 'down'
	}

	private endPatch() {
		const currentSegments = (this.edgeSegments - 1) / 2
		const f = patchesSegmentationFactor * 2 + 1
		this.edgeSegments = f
		this.segmentLength = (this.segmentLength * currentSegments) / patchesSegmentationFactor
	}

	/**
	 * Generates an edge of the patch
	 */
	private generateEdge() {
		this.cursorFlip = 'down' as 'up' | 'down'
		for (let segment = 0; segment < this.edgeSegments; segment++) {
			switch (this.cursorFlip) {
				case 'up': {
					const position = this.cursor.clone()

					// Move the position segmentLength/2 forward, segmentLength * cos(30) up
					const translation = new Vector2(
						this.segmentLength / 2,
						this.segmentLength * Math.cos(Math.PI / 6)
					)
					// Rotate the translation
					translation.applyMatrix3(this.getRotationMatrix(-this.cursorDirection))

					position.add(translation)

					// Generate the flipped triangle
					this.generateTriangle(position, this.cursorDirection + 180)
					break
				}
				case 'down': {
					this.generateTriangle(this.cursor, this.cursorDirection)
					break
				}
			}
			this.advanceCursor()
		}
	}

	/**
	 * Advances the cursor along the edge
	 */
	private advanceCursor() {
		if (this.cursorFlip == 'down') {
			this.cursorFlip = 'up'
		} else if (this.cursorFlip == 'up') {
			this.cursorFlip = 'down'
			const mat = this.getRotationMatrix(-this.cursorDirection)
			const dir = new Vector2(this.segmentLength, 0).applyMatrix3(mat)
			this.cursor.add(dir)
		}
	}

	/**
	 * Rotates the cursor by 60 degrees
	 */
	private rotateCursor() {
		this.cursorDirection += 60
	}

	/**
	 * Generates a rotation matrix for a given angle in degrees
	 * @param deg Degrees to rotate by
	 * @returns The rotation matrix
	 */
	private getRotationMatrix(deg: number) {
		const rad = deg * (Math.PI / 180)
		// prettier-ignore
		return new Matrix3(
			Math.cos(rad), -Math.sin(rad), 0,
			Math.sin(rad),  Math.cos(rad), 0,
			0, 							0, 						 1)
	}

	/**
	 * Generates a triangle at a given position and rotation
	 * @param pos The position of the triangle
	 * @param deg The rotation of the triangle in degrees
	 */
	private generateTriangle(pos: Vector2, deg: number) {
		const mat = this.getRotationMatrix(-deg)

		const base: Triangle2D = {
			a: new Vector2(0, 0),
			b: new Vector2(-Math.sin(Math.PI / 6), Math.cos(Math.PI / 6)),
			c: new Vector2(Math.sin(Math.PI / 6), Math.cos(Math.PI / 6))
		}

		// Rotate the triangle
		const rotated: Triangle2D = {
			a: base.a.applyMatrix3(mat),
			b: base.b.applyMatrix3(mat),
			c: base.c.applyMatrix3(mat)
		}
		// Scale the triangle
		const scaled: Triangle2D = {
			a: new Vector2(rotated.a.x * this.segmentLength, rotated.a.y * this.segmentLength),
			b: new Vector2(rotated.b.x * this.segmentLength, rotated.b.y * this.segmentLength),
			c: new Vector2(rotated.c.x * this.segmentLength, rotated.c.y * this.segmentLength)
		}

		// Move the triangle
		const moved: Triangle2D = {
			a: new Vector2(scaled.a.x + pos.x, scaled.a.y + pos.y),
			b: new Vector2(scaled.b.x + pos.x, scaled.b.y + pos.y),
			c: new Vector2(scaled.c.x + pos.x, scaled.c.y + pos.y)
		}

		this.triangles.push(moved)
	}
}
