import React, {useContext} from 'react';
import {AlarmContext} from './AlarmContext';
import {getQuote} from './Quote';

function Alerts() {
    const [alarms, setAlarms] = useContext(AlarmContext);
    setInterval(() => checkStocks(alarms), 60000);
    return (
        <h5 id="hidden">Check </h5> 
    );
}

export async function checkStocks(alarms) {
    // INSERT KEY HERE
    const key = "KEY";
    for (let i = 0; i < alarms.length; i++) {
        let alarm = alarms[i];
        let query = alarm.symbol;
        let req = `https://finnhub.io/api/v1/quote?symbol=${query}&token=${key}`;
        let result = await getQuote(req, alarm.indicator);
        console.log(alarm.level);
        console.log(result);
        if ((result > alarm.level && alarm.curr) || (result < alarm.level 
            && !alarm.curr)) {
            sendAlert(alarm, result);
        }
    }
}

export function sendAlert(alarm, value) {
    var dataSymbols = {
        "o": "Opening Price",
        "c": "Current Price",
        "pc": "Closing Price",
        "per": "Percent Change" 
      };
    
    var direction = (alarm.curr) ? "above" : "below";
    return (
        alert(
            `${alarm.symbol} has ${dataSymbols[alarm.indicator]} 
            ${direction} ${alarm.level}`
        )
    );
}

export default Alerts;

