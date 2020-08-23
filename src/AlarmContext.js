import React, {useState, createContext} from 'react';
import './assets/App.css';

export const AlarmContext = createContext();

export const AlarmProvider = props => {
    const [alarms, setAlarms] = useState([]);
    return (
        <AlarmContext.Provider value={[alarms, setAlarms]}>
            {props.children}
        </AlarmContext.Provider>
    );
};