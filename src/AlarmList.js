import React, {useContext} from 'react';
import './assets/App.css';
import {AlarmContext} from './AlarmContext';
import Alarm from './Alarm';

function AlarmList() {
    const [alarms, setAlarms] = useContext(AlarmContext);

    return (
    <div>
        <h1>Active Alarms: </h1> 
        {alarms.map(alarm => (
            <Alarm symbol={alarm.symbol} 
            indicator={alarm.indicator} level={alarm.level} />
        ))} 
    </div> 
    );
}

export default AlarmList;