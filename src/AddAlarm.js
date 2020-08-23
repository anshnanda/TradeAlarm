import React, {useState, useEffect, useContext} from 'react';
import './assets/App.css';
import {AlarmContext} from './AlarmContext';
import {StockContext} from './StockListContext';
import {getQuote} from './Quote';

function AddAlarm() {
    const [quote, setQuote] = useState(0);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('AAPL');
    const [indicator, setIndicator] = useState('c');
    const [level, setLevel] = useState(0);
    const [alarms, setAlarms] = useContext(AlarmContext);
    const [stocks, setStocks] = useContext(StockContext);

    const key = "br7ebinrh5r8je2grdug";
    const req = `https://finnhub.io/api/v1/quote?symbol=${query}&token=${key}`;

  useEffect(() => {
   pullQuote();
  }, [query]);

  const pullQuote = async () => {
    const response = await fetch(req);
    const data = await response.json();
    var dataSymbols = {
      "o": data.o,
      "c": data.c,
      "pc": data.pc,
      "l": data.l, 
      "h": data.h,
      "per": Math.round((data.c - data.pc) / data.pc * 100 * 100) / 100 + "%" 
    };
    setQuote(dataSymbols[indicator]);
  }

  const updateSearch = e => {
    setSearch(e.target.value.trim());
  }

  const updateAlarm = e => {
      e.preventDefault();
      setQuery(search);
      var curr = (quote < level) ? true : false;
      console.log(curr);
      setAlarms(prevAlarms => [...prevAlarms, {symbol: search, indicator: indicator,
        level: level, curr: curr }]);
      setSearch('');
  }

  const updateIndicator = e => {
    setIndicator(e.target.value);
    console.log(indicator);
  }

  const updateLevel = e => {
    setLevel(e.target.value.trim());
  }

  const tiempo = () => {
    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var fixTimes = () => {
      hour = (hour + 3) % 24;
      
    }
    fixTimes();
    document.getElementById('clock').innerText = hour + ':' + minutes + ':' + seconds;
  }

  const updateTime = () => {
    var time = setTimeout(() => tiempo(), 1000);
  }

  updateTime();

    return (
    <div className="alarms-page"> 
    <div id="clock"></div>
    <div className="quote">
    <form className="quote-form" onSubmit={updateAlarm}> 
      <input type="text" id="quote-input" placeholder="Enter Stock Symbol" 
      value={search} onChange={updateSearch}
      /> 
      <div className="dropdown">
        <button id="drop_button" type="button"> Info </button> 
        <div className="dropdown-content"> 
          <button className="drop-options" id="open-option" value="o" type="button" onClick={updateIndicator}> Opening Price </button>
          <button className="drop-options" id="curr-option" value="c" type="button" onClick={updateIndicator}> Current Price </button>
          <button className="drop-options" id="close-option" value="pc" type="button" onClick={updateIndicator}> Previous Closing Price </button>
          <button className="drop-options" id="low-option" value="l" type="button" onClick={updateIndicator}> Low Price </button>
          <button className="drop-options" id="high-option" value="h" type="button" onClick={updateIndicator}> High Price </button>
          <button className="drop-options" id="pc-option" value="per" type="button" onClick={updateIndicator}> Percent Change </button>
        </div>
      </div>
      <input type="number" id="alarm-level" placeholder="Enter Indicator Level (ie. 2% change)" 
      value={level} onChange={updateLevel} /> 
      <button type="submit" className="quote-submit"> 
      Submit! 
      </button>
    </form>
    <h1 id="quote"> {query} : {quote} </h1>
    </div>
    </div>
    );
}

export default AddAlarm;