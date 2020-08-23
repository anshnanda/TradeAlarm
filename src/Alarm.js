import React from 'react';
import './assets/App.css';

function Alarm(props) {

    return (
        <h1> {props.symbol}, {props.level} </h1>
    );
}

export default Alarm;
