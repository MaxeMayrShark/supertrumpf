import * as React from 'react';
import PropTypes from 'prop-types';

import './Card.css';
import Car from './Car';

const uncovered = false;

export default function Card({ car, uncovered, onSelectProperty, selectedProperty }) {

    function handleClick(event, prop) {
        console.log(`${prop} clicked, ${event}`);
    }

    Card.PropTypes = {
        uncovered: PropTypes.bool.isRequired,
        car: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }

    const bmw = new Car(
        'BMW M3', 'placeholder.png', '4.49', '1535', '3246', '510', '280'
    );
    const front = (
        <div className="card">
            <h1>{car.name ? car.name : 'Unbekannt' }</h1>
            {car.image && (
                <img alt={car.name} height="200" width="200" src={`${process.env.PUBLIC_URL}/${car.image}`} />
            )}
            <table>
                <tbody>
                    {Object.keys(Car.properties).map(property => {
                        const carProperty = Car.properties[property];
                        return (
                            <tr key={property} 
                            className = {selectedProperty === property ? 'active' : ''}
                            onClick = {() => onSelectProperty(property)}>
                                <td>{carProperty.label}</td>
                                <td>
                                    {car[property]}&nbsp;
                                    {carProperty.unit}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
    const back = <div className="card back" />;

    if (uncovered) {
        return front;
    } else {
        return back;
    }

    Card.propTypes = {
        uncovered: PropTypes.bool.isRequired,
        car: PropTypes.instanceOf(Car).isRequired,
        onSelectProperty: PropTypes.func,
        selectedProperty: PropTypes.string,
    };
}