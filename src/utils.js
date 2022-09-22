export function randomChoice(list) {
	return list[randomNumberLessThan(list.length)]
}

export function randomNumberLessThan(n) {
	return Math.floor(Math.random() * n)
}

export function rotateRight(shape) {
	const centre = round(getCentre(shape))
	console.log("centre", centre)

	return shape.map((block) => 
		plus(rotate90DegAboutOrigin(minus(block, centre)), centre)
	)
}

export function getCentre(shape) {
	const xs = shape.map((block) => block.x)
	const ys = shape.map((block) => block.y)
	const minX = Math.min(...xs)
	const maxX = Math.max(...xs)
	const minY = Math.min(...ys)
	const maxY = Math.max(...ys)
	return {
		x: (minX + maxX) / 2,
		y: (minY + maxY) / 2
	}
}

function minus(a, b) {
	return {
		...a,
		x: a.x - b.x,
		y: a.y - b.y
	}
}

function plus(a, b) {
	return {
		...a,
		x: a.x + b.x,
		y: a.y + b.y
	}
}

function rotate90DegAboutOrigin(block) {
	return {
		...block,
		x: block.y,
		y: -block.x
	}
}

function round(block) {
	return {
		...block,
		x: Math.round(block.x),
		y: Math.round(block.y)
	}
}