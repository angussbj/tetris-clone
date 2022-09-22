import { randomChoice, getCentre } from "./utils"

const SHAPES = [
	[
		{x: 0, y: 0},
		{x: 1, y: 0},
		{x: 0, y: 1},
		{x: 1, y: 1}
	],
	[
		{x: 0, y: 0},
		{x: 1, y: 0},
		{x: 2, y: 0},
		{x: 3, y: 0}
	],
	[
		{x: 0, y: 0},
		{x: 1, y: 0},
		{x: 1, y: 1},
		{x: 2, y: 1}
	],
	[
		{x: 0, y: 1},
		{x: 1, y: 1},
		{x: 1, y: 0},
		{x: 2, y: 0}
	],
	[
		{x: 0, y: 0},
		{x: 1, y: 0},
		{x: 2, y: 0},
		{x: 2, y: 1}
	],
	[
		{x: 0, y: 1},
		{x: 1, y: 1},
		{x: 2, y: 1},
		{x: 2, y: 0}
	],
]

const COLORS = ["red", "#00DD00", "blue", "yellow", "cyan", "magenta"]

export class ShapeGenerator {
	constructor() {}

	next({ gridWidth }) {
		const color = randomChoice(COLORS)
		const shape = randomChoice(SHAPES)
		const next = shape.map((block) => ({ ...block, color }))
		const centre = getCentre(next)
		return next.map(
			(block) => ({...block, x: block.x - Math.floor(centre.x) + Math.floor(gridWidth / 2) })
		)
	}
}