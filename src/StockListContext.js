import React, {useState, createContext} from 'react';
import './assets/App.css';


export const StockContext = createContext();

export const StockProvider = props => {
    const [stocks, setStocks] = useState([]);
    return (
        <StockContext.Provider value={[stocks, setStocks]}>
            {props.children}
        </StockContext.Provider>
    );
};