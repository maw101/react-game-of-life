import React from 'react';
import './Game.css';

const CELL_SIZE = 15;
const GRID_WIDTH = 900;
const GRID_HEIGHT = 900;

class Game extends React.Component {

    constructor() {
        super();
        this.rowCount = GRID_HEIGHT / CELL_SIZE;
        this.columnCount = GRID_WIDTH / CELL_SIZE;
        this.grid = this.makeEmptyGrid();
    }

    state = {
        cells: [],
        isRunning: false,
        refreshInterval: 50,
    }

    makeEmptyGrid() {
        let grid = [];
        for (let row = 0; row < this.rowCount; row++) {
            grid[row] = []; // create an array for each row
            for (let column = 0; column < this.columnCount; column++) {
                grid[row][column] = false; // set to default value - inactive
            }
        }
        return grid;
    }

    makeCellsArray() {
        let cells = [];
        for (let row = 0; row < this.rowCount; row++) {
            for (let column = 0; column < this.columnCount; column++) {
                if (this.grid[row][column])
                    cells.push({column, row}); // if active in grid, add to the cells array
            }
        }
        return cells;
    }

    getElementOffset() {
        // get size of element and position relative to viewpoint
        const rect = this.gridLocation.getBoundingClientRect(); 
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    handleGridClick = (event) => {
        const elementOffset = this.getElementOffset();
        const offsetX = event.clientX - elementOffset.x;
        const offsetY = event.clientY - elementOffset.y;
        
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if ((x >= 0 && x <= this.columnCount) && (y >= 0 && y <= this.rowCount)) {
            this.grid[y][x] = !this.grid[y][x]; // 
        }

        this.setGridState({ cells: this.makeCellsArray() });
    }

    render() {
        return ( 
            <div> <div id="grid"
            style={
                {
                    width: GRID_WIDTH,
                    height: GRID_HEIGHT,
                    backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
                }
            } 
            onClick={this.handleGridClick} 
            ref={(loc) => { this.gridLocation = loc; }}>
            </div> </div> );
    }
}

class GridCell extends React.Component {

    render() {
        const {x, y} = this.props; // takes value of spread attribute to make the passing of properties easier
        return (
            <div id="cell" style={{
                left: `${CELL_SIZE * x + 1}px`,
                top: `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
            }} />
        );
    }

}

export default Game;