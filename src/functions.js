import params from "./params";

const createBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, i) => {
        return Array(columns).fill(0).map((_, j) => {
            return {
                row: i,
                column: j,
                mined: false,
                opened: false,
                exploded: false,
                flagged: false
            }
        })
    })
}

const spreadMines = (board, minesAmount) => {
    let minesPlanted = 0
    const rows = board.length
    const columns = board[0].length

    while (minesPlanted < minesAmount) {
        const rowSel = parseInt(Math.random() * rows, 10)
        const colSel = parseInt(Math.random() * columns, 10)
        
        if (!board[rowSel][colSel].mined) {
            board[rowSel][colSel].mined = true
            minesPlanted++;
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns);
    spreadMines(board, minesAmount);
    return board;
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field }
        })
    })
}

const getNeighbours = (board, row, col) => {
    const neighbours = []
    const rows = [row - 1, row, row + 1]
    const cols = [col -1, col, col + 1]
    rows.forEach(r => {
        cols.forEach(c => {
            const different = r != row || c != col
            const validRow = r >= 0 && r < board.length
            const validCol = c >= 0 && c < board[0].length
            if (different && validRow && validCol){
                neighbours.push(board[r][c])
            }
        })
    })

    return neighbours
}

const safeNeighbourhood = (board, row, col) => {
    const safes = (result, neighbour) => result && !neighbour.mined
    return getNeighbours(board, row, col).reduce(safes, true)
}

const openField = (board, row, col) => {
    const field = board[row][col]
    if (!field.opened){
        field.flagged = false
        field.opened = true
        if (field.mined){
            field.exploded = true
        } else if (safeNeighbourhood(board, row, col)){
            const neig = getNeighbours(board, row, col)
            neig.forEach(n => openField(board, n.row, n.column))
        } else {
            const neig = getNeighbours(board, row, col)
            field.nearMines = neig.filter(n => n.mined).length
        }
    }
}

const field = board => [].concat(...board)

const showMines = board => {
    field(board).filter(i => i.mined).forEach(f => f.opened = true)
}

const hadExplosion = board => {
    const fields = field(board)
    return fields.filter(f => f.exploded).length > 0
}

const invertFlag = (board, row, col) => {
    const field = board[row][col]
    field.flagged = !field.flagged
}

const pendding = field => (field.mined && !field.flagged)|| (!field.mined && !field.opened)

const wonGame = board => field(board).filter(pendding).length === 0

const flagsUsed = board => field(board).filter(f => f.flagged).length

export { flagsUsed, wonGame, invertFlag, showMines, hadExplosion, createMinedBoard, cloneBoard, openField }