import React from 'react';
import './Game.css';

const CELL_SIZE = 15;
const GRID_WIDTH = 900;
const GRID_HEIGHT = 900;

class Game extends React.Component {
    render() {
        return ( 
            <div> <div id="grid"
            style={
                {
                    width: GRID_WIDTH,
                    height: GRID_HEIGHT,
                    backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`
                }
            }></div> </div> );
    }
}

export default Game;