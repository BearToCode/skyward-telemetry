import { Vector2, Matrix3 } from 'three'

const patchesCount = 1
const patchesSubdivisions = 4
const patchesSegmentReduction = 1 / 3

export type GeoPosition = {
	lat: number
	lon: number
}

export type Triangle2D = {
	a: Vector2
	b: Vector2
	c: Vector2
}

export class Terrain {
	private segmentLength = 1
	private edgeSegments = 1
	private triangles: Triangle2D[] = []
	private cursor: Vector2 = new Vector2(0, 0)
	private cursorFlip: 'up' | 'down' = 'down'
	private cursorDirection = 0

	constructor() {
		this.generate()
		console.log(this.triangles)
	}

	private generate() {
		for (let patch = 0; patch < patchesCount; patch++) {
			this.startPatch()
			for (let subdivision = 0; subdivision < patchesSubdivisions; subdivision++) {
				this.extendPatch()
			}
		}
	}

	private extendPatch() {
		this.cursorDirection = 0
		while (this.cursorDirection < 360) {
			this.generateEdge()
			this.rotateCursor()
		}
		this.edgeSegments += 2
	}

	private startPatch() {
		this.cursorDirection = 0
		this.cursorFlip = 'down'
		this.segmentLength = this.edgeSegments * this.segmentLength * patchesSegmentReduction
		this.edgeSegments *= patchesSegmentReduction
	}

	private generateEdge() {
		for (let segment = 0; segment < this.edgeSegments; segment++) {
			if (this.cursorFlip == 'up') {
				const position = this.cursor

				// Advance by edgeLength / 2 along the edge
				const edgeMat = this.getRotationMatrix(this.cursorDirection)
				position.add(new Vector2(this.segmentLength / 2, 0).applyMatrix3(edgeMat))

				// Advance by edge * sin(60deg) along the perpendicular to the edge
				const perpendicularMat = this.getRotationMatrix(this.cursorDirection - 90)
				position.add(
					new Vector2(this.segmentLength * Math.sin(Math.PI / 3), 0).applyMatrix3(perpendicularMat)
				)

				// Generate the flipped triangle
				this.generateTriangle(position, this.cursorDirection + 180)
			} else if (this.cursorFlip == 'down') {
				this.generateTriangle(this.cursor, this.cursorDirection)
			}
			this.advanceCursor()
		}
	}

	private advanceCursor() {
		if (this.cursorFlip == 'up') {
			this.cursorFlip = 'down'
		} else if (this.cursorFlip == 'down') {
			this.cursorFlip = 'up'
			const mat = this.getRotationMatrix(this.cursorDirection)
			const dir = new Vector2(this.segmentLength, 0).applyMatrix3(mat)
			this.cursor.add(dir)
		}
	}

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
		const mat = this.getRotationMatrix(deg)

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
