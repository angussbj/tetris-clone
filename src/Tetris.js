import { DivGrid } from "./DivGrid"
import { ShapeGenerator } from "./ShapeGenerator"
import { rotateRight } from "./utils"

const INITIAL_STEP_INTERVAL_MILLIS = 300
const GRID_DEFAULT_COLOR = "#000000"
const DEATH_ZONE_HEIGHT = 2

export class Tetris {
	constructor(height, width, ) {
		this.height = height
		this.width = width
		this.stepIntervalMillis = INITIAL_STEP_INTERVAL_MILLIS
		this.divGrid = new DivGrid(width, height, "grid", DEATH_ZONE_HEIGHT)
		this.frozen = []
		this.moving = [{x: 2, y: 2, color: "red"}]
		this.shapeGenerator = new ShapeGenerator()
		this.score = 0
		this.scoreElement = document.getElementById("score")
		this.scoreElement.innerHTML = this.score
		this.lost = false

		document.addEventListener("keydown", (e) => this.onKeyPress(e))
	}

	start() {
		this.moving = this.shapeGenerator.next({ gridWidth: this.width })
		this.startStepping()
	}

	onKeyPress(event) {
		if (event.key === "ArrowLeft") return this.goLeft()
		if (event.key === "ArrowRight") return this.goRight()
		if (event.key === "ArrowDown") return this.tryStep()
		if (event.key === "ArrowUp") return this.rotateRight()
		if (event.key === " ") return this.drop()
	}

	render() {
		this.divGrid.setAllSquaresColor(GRID_DEFAULT_COLOR)

		for (const square of this.frozen) {
			this.divGrid.setSquareColor(square)
		}

		for (const square of this.moving) {
			this.divGrid.setSquareColor(square)
		}

		this.scoreElement.innerHTML = this.score
	}

	startStepping() {
		this.tryStep()
		setTimeout(() => this.startStepping(), this.stepIntervalMillis)
	}

	tryStep() {
		if (this.canGo({dx: 0, dy: 1})) this.step()
		else {
			this.freeze()
		}
	}

	canGo({dx, dy}) {
		if (this.lost) return false
		for (const square of this.moving) {
			if (square.y + dy >= this.height) return false
			if (square.x + dx >= this.width) return false
			if (square.x + dx < 0) return false
			if (this.frozen.some(
					(block) => block.x === square.x + dx
							&& block.y === square.y + dy
			)) {
				return false
			}
		}
		return true
	}

	step() {
		for (const square of this.moving) {
			square.y += 1
		}
		this.render()
	}

	freeze() {
		this.frozen.push(...this.moving)
		this.moving = this.shapeGenerator.next({ gridWidth: this.width })
		this.clearLines()
		this.checkForLoss()
	}

	checkForLoss() {
		if (this.frozen.some((block) => block.y < DEATH_ZONE_HEIGHT)) {
			this.lost = true
			document.getElementById("loss-message").innerHTML = "You lose!"
		}
	}

	// This is inefficient and ugly because of the 'frozen' data structure. Consider storing by location 
	clearLines() {
		const countsByRow = {}
		for (const block of this.frozen) {
			if (countsByRow[block.y]) countsByRow[block.y] += 1
			else countsByRow[block.y] = 1
		}

		let deleted = 0
		for (let i = this.height - 1; i >= 0; i--) {
			if (countsByRow[i] && countsByRow[i] >= this.width) {
				this.frozen = this.frozen.filter((block) => block.y != i + deleted)
				for (const block of this.frozen) {
					if ((block.y) < i + deleted) {
						block.y += 1
					}
				}
				deleted += 1
				this.stepIntervalMillis /= 1.08
			}
		}
		this.score += deleted
	}

	goLeft() {
		if (this.canGo({dx: -1, dy: 0})) {
			for (const square of this.moving) {
				square.x -= 1
			}
			this.render()
		}
	}

	goRight() {
		if (this.canGo({dx: 1, dy: 0})) {
			for (const square of this.moving) {
				square.x += 1
			}
			this.render()
		}
	}

	rotateRight() {
		const newMoving = rotateRight(this.moving)
		for (let block of newMoving) {
			if (block.x >= this.width) return
			if (block.x < 0) return
			if (this.frozen.some(
						(otherBlock) => otherBlock.x === block.x
								&& otherBlock.y === block.y
				)) return
		}
		this.moving = newMoving
		this.render()
	}



	drop() {
		while (this.canGo({dx: 0, dy: 1})) {
			this.tryStep()
		}
	}
}