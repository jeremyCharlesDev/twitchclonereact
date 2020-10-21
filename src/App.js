import React from 'react';
import './App.css';
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import Games from './Components/Games/Games'
import TopStreams from './Components/TopStreams/TopStreams'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Live from './Components/Live/Live'
import GameStreams from './Components/GameStreams/GameStreams'
import Resultats from './Components/Resultats/Resultats'
import Error from './Components/Error/Error'

function App() {
  return (
    <Router forceRefresh={true}>
    
      <div className="App">
        <Header/>
        <Sidebar/>
        <Switch>
          <Route exact path="/" component={Games}/>
          <Route exact path="/top-streams" component={TopStreams}/>
          <Route exact path="/live/:slug" component={Live}/>
          <Route exact path="/game/:slug" component={GameStreams}/>
          <Route exact path="/resultats/:slug" component={Resultats}/>
          <Route exact path="/resultats/" component={Error}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
