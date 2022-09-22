import { randomChoice } from "./utils"
import { Tetris } from "./Tetris"

const DISPLAY_HEIGHT = 24
const WIDTH = 10

const game = new Tetris(DISPLAY_HEIGHT, WIDTH)
game.start()
