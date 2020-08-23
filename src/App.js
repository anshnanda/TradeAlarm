import React, { useEffect, useState, useContext } from 'react';
import './assets/App.css';
import AlarmList from './AlarmList';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Quote from './Quote';
import Nav from './Nav';
import {AlarmContext, AlarmProvider} from './AlarmContext';
import {StockProvider} from './StockListContext';
import AddAlarm from './AddAlarm';
import Alerts from './Alerts';
import {checkStocks, sendAlert} from './Alerts';
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
   
  return (
    <AlarmProvider>
      <StockProvider>
        <Router>
          <div className="App"> 
            <Nav />
            <Switch>
              <Route path='/quotes' component={Quote}/>
              <Route path="/" exact component={Home} /> 
            </Switch>
          </div>
        </Router>
      </StockProvider>
    </AlarmProvider>
  );
}

const Home = () => {
  return (
    <div class="home-page"> 
      <AddAlarm />
      <AlarmList />
      <Alerts />
    </div>
  );
}

export default App;
