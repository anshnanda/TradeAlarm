import React, {useState, useEffect} from 'react';
import './assets/App.css';


function Quote() {
    const [quote, setQuote] = useState(0);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('AAPL');
    const [indicator, setIndicator] = useState('c');

    //YOUR KEY HERE
    const key = "KEY";
    const req = `https://finnhub.io/api/v1/quote?symbol=${query}&token=${key}`;

  const getQuote = async () => {
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

  useEffect(() => {
   getQuote();
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value.trim());
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  const updateIndicator = e => {
    setIndicator(e.target.value);
    console.log(indicator);
  }

    return (
    <div className="quote">
    <form className="quote-form" onSubmit={getSearch}> 
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
        </div>
      </div>
      <button type="submit" className="quote-submit"> 
      Submit! 
      </button>
    </form>
    <h1 id="quote"> {query} : {quote} </h1>
    </div>
    );
}

export async function getQuote(req, indicator) {
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
  return dataSymbols[indicator];
}

export default Quote;