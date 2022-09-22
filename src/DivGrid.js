export class DivGrid {
	constructor(width, height, rootId, deathZoneHeight) {
		this.squares = []
		this.width = width
		this.height = height

		const root = document.getElementById(rootId)
		for (let i = 0; i < height; i++) {
			const row = document.createElement("div")
			row.classList.add("row")
			if (i == deathZoneHeight) {
				console.log("hello?")
				row.classList.add("death-zone-boundary")
			}
			this.squares.push([])
			for (let j = 0; j < width; j++) {
				const square = document.createElement("div")
				square.classList.add("square")
				this.squares[this.squares.length - 1].push(square)
				row.appendChild(square)
			}
			root.appendChild(row)
		}
	}

	setSquareColor({x, y, color}) {
		const square = this.squares[y]?.[x]
		if (square) square.style.backgroundColor = color
	}

	setAllSquaresColor(color) {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				this.setSquareColor({x, y, color})
			}
		}
	}
}