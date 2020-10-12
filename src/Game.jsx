import * as React from 'react';

import './Game.css';
import Card from './Card';
import Car from './Car';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersTurn: true,
            player: [new Car('BMW M3', 'placeholder.png', 4.49, 1535, 3246, 510, 280)],
            ki: [
                new Car('Audi RS6', 'placeholder2.png', 4.99, 2150, 3996, 600, 250),
            ],
        };
    }


    render() {
        const { playersTurn, player, ki } = this.state;

        return (
            <div>
                <div className="info">
                    {playersTurn ? 'Du bist' : 'Der Computer ist'} an der Reihe
                </div>
                <div className="cards">
                    <Card car={player[0]} uncovered={playersTurn} />
                    <Card car={ki[0]} uncovered={!playersTurn} />
                </div>
            </div>
        );
    }
}