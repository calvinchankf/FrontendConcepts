/*
    Demo: https://stackblitz.com/edit/vitejs-vite-wgqsvkzq?file=mine_sweepr.js

    The player is shown a 2-dimensional grid of empty squares 'Hidden' in the grid are X number of Mines.
    The goal for the player is to 'Explore' all of the squares except for the ones hiding Mines.

    When a player clicks on a square, one of three things can happen:

    * If the player selects a Mine, it is shown, and the game ends in a Loss for the player.
    * If the player selects a square immediately adjacent (includes diagonals) to any number of Mines,
    the number of adjacent Mines is shown.
    * If the player selects a square with zero adjacent Mines, the square is 'Explored',
    and the game automatically Explores all adjacent squares for the player as a convenience.

    Please create one or more classes to support the game initialization,
    as well as supporting a “Click” method that handles game logic.
    The player is asked to enter a gameboard height and width, plus the number of mines to randomly scatter.
*/
class MineSweeper {
    /*
    hidden_board
        -1: mine
        0: empty, nothing nearby
        1 -> 9: mine-adjacent

    display_board
        U: unrevealed / unknown
        M: mine
        E: empty (explored)
        "1" -> "9": mine-adjacent
    */
    constructor(R, C, X) {
        this.R = R
        this.C = C
        this.X = X
        this.hidden_board = []
        this.display_board = []
        for (let i = 0; i < R; i++) {
            this.hidden_board.push(Array(C).fill(0))
            this.display_board.push(Array(C).fill('U'))
        }
        const reservoir = []
        let scope = 1
        for (let i = 0; i < R; i++) {
            for (let j = 0; j < C; j++) {
                if (reservoir.length < X) {
                    reservoir.push(`${i},${j}`)
                } else {
                    const r = Math.floor(Math.random() * scope)
                    if (r < X) {
                        reservoir[r] = `${i},${j}`
                    }
                }
                scope += 1
            }
        }

        const incrementNeighbours = (i, j) => {
            if (i >= 0 && i < R && j >= 0 && j < C && this.hidden_board[i][j] != -1) {
                this.hidden_board[i][j] += 1
            }
        }

        const reservoirSet = new Set(reservoir)
        for (let i = 0; i < R; i++) {
            for (let j = 0; j < C; j++) {
                if (reservoirSet.has(`${i},${j}`)) {
                    this.hidden_board[i][j] = -1

                    incrementNeighbours(i-1, j-1)
                    incrementNeighbours(i-1, j)
                    incrementNeighbours(i-1, j+1)

                    incrementNeighbours(i, j-1)
                    incrementNeighbours(i, j+1)

                    incrementNeighbours(i+1, j-1)
                    incrementNeighbours(i+1, j)
                    incrementNeighbours(i+1, j+1)
                }
            }
        }
    }
    click(i, j) {
        if (i < 0 || i >= this.R || j < 0 || j >= this.C) {
            return this.display_board
        } else if (this.display_board[i][j] != 'U') {
            return this.display_board
        } else if (this.hidden_board[i][j] == 0) {
            // BFS
            const q = [[i, j]]
            const seen = new Set()
            while (q.length > 0) {
                const [i, j] = q.shift()
                if (i < 0 || i >= this.R || j < 0 || j >= this.C) {
                    continue
                }
                const key = `${i},${j}`
                if (seen.has(key)) {
                    continue
                }
                seen.add(key)
                if (this.hidden_board[i][j] == 0) {
                    this.display_board[i][j] = 'E'
                    q.push([i-1, j-1])
                    q.push([i-1, j])
                    q.push([i-1, j+1])

                    q.push([i, j-1])
                    q.push([i, j+1])

                    q.push([i+1, j-1])
                    q.push([i+1, j])
                    q.push([i+1, j+1])
                } else if (this.hidden_board[i][j] >= 1 && this.hidden_board[i][j] <= 9) {
                    this.display_board[i][j] = `${this.hidden_board[i][j]}`
                }
            }
            return this.display_board
        } else if (this.hidden_board[i][j] == -1) {
            // display all mines
            for (let i = 0; i < this.R; i++) {
                for (let j = 0; j < this.C; j++) {
                    if (this.hidden_board[i][j] == -1) {
                        this.display_board[i][j] = 'M'
                    }
                }
            }
            return this.display_board
        } else {
            // display the number on that cell
            this.display_board[i][j] = `${this.hidden_board[i][j]}`
            return this.display_board
        }
    }
}