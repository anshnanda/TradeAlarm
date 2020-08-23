import React from 'react';
import './assets/App.css';
import {Link} from 'react-router-dom';

function Nav() {
    return (
    <nav className="menu-nav"> 
        <header> TradeAlarm</header> 
        <Link to='/'>
            Alarms
        </Link>
        <Link to='/quotes'> 
            Quotes
        </Link>
    </nav> 
    );
}

export default Nav;