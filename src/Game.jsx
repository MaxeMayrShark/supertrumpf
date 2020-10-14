import * as React from 'react';
import * as PropTypes from 'prop-types';
import update from 'immutability-helper';

import './Game.css';
import Card from './Card';
import Car from './Car';

export default class Game extends React.Component {
    static defaultProps = {
        title: 'Supertrumpf',
    };

    static propTypes = {
        title: PropTypes.string,
    }

    /* v State-Deklarierung direkt in der Klassenkomponente v */

    state = {
        kiUncovered: false,
        selectedProperty: '',
        playersTurn: true,
        player: [new Car('BMW M3', 'placeholder.png', 4.49, 1535, 3246, 510, 280),
                new Car('Porsche 911', 'placeholder3.png', 4.50, 1670, 3800, 521, 310),],
        ki: [new Car('Audi RS6', 'placeholder2.png', 4.99, 2150, 3996, 600, 250),
            new Car('Ferrari 488', 'placeholder4.png', 4.56, 1475, 3902, 670, 330),],
    };

      /* ^ ------------------------------------------- ^ */

    getSelectPropertyHandler() {
        return property => this.play(property);
    }

    compare(property) {
        let playersTurn = this.state.playersTurn;

        const firstPlayer = this.state.player[0];
        let player = update(this.state.player, { $splice: [[0, 1]] });
        const firstKi = this.state.ki[0];
        let ki = update(this.state.ki, { $splice: [[0, 1]] });

        if(firstPlayer[property] > firstKi[property]) {
            playersTurn = true;
            player = update(player, { $push: [firstPlayer, firstKi] });
            if (ki.length === 0) {
                alert('Du hast gewonnen! PogU');
                return;
            }
        } else if (firstPlayer[property] < firstKi[property]) {
            playersTurn = false;
            ki = update(ki, { $push: [firstPlayer, firstKi] });
            if (player.length === 0) {
                alert("Du hast verloren! pepeHands");
                return;
            }
        } else {
            player = update(player, { $push: [firstPlayer] });
            ki = update(ki, { $push: [firstKi] });
        }
        this.setState(
            state =>
            update(state, {
                $set: {
                    kiUncovered: false,
                    selectedProperty: '',
                    playersTurn,
                    player,
                    ki,
                },
            }),
            () => {
                if (!playersTurn) {
                    setTimeout(() => {
                        const property = this.selectRandomProperty();
                        this.play(property);
                    }, 1000);
                }
            },
        );

        }
        play(property) {
            this.setState(
                state => 
                update(this.state, {
                    selectedProperty: { $set: property },
                    kiUncovered: { $set: true },
                }),
                () => {
                    setTimeout(() => {
                        this.compare(property);
                    }, 1000);
                },
            );
        }

        selectRandomProperty() {
            const properties = Object.keys(Car.properties);
            const index = Math.floor(Math.random() * properties.length);
            return properties[index];
        }

    /* v State-Deklarierung anhand eines Konstruktors v 
    
        constructor(props) {
            super(props);
            this.state = {
                playersTurn: true,
                player: [new Car('BMW M3', 'placeholder.png', 4.49, 1535, 3246, 510, 280)],
                ki: [new Car('Audi RS6', 'placeholder2.png', 4.99, 2150, 3996, 600, 250),],
            };
        }
    
     /* ^ ------------------------------------------- ^ */

    render() {

        const { playersTurn, player, ki, selectedProperty, kiUncovered } = this.state;

        return (
            <div>
                <h1>{this.props.title}</h1>
                <div className="info">
                    {playersTurn ? 'Du bist' : 'Der Computer ist'} an der Reihe
                </div>
                <div className="cards">
                    <Card
                    car={player[0]} uncovered={true}
                    selectedProperty={selectedProperty}
                    onSelectProperty={this.getSelectPropertyHandler()}/>
                    <Card
                    car={ki[0]} uncovered={kiUncovered}
                    selectedProperty={selectedProperty}/>
                </div>
            </div>
        );
    }
}