import React, {
  Component
} from 'react';
import './css/App.css';
import Header from './comps/Header';
import Main from './comps/Main';
import Footer from './comps/Footer';
import League from './comps/League';
import TeamInfo from './comps/TeamInfo';
import Player from './comps/Player';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';




class App extends Component {

  render() {
    return (
      <Router>
        <div className="contener" >
          <Header />
          <Route exact path="/" component={Main} />
          <Route path="/league/:league" component={League}/>
          <Route path="/team/:team" component={TeamInfo}/>
          <Route path="/player/:player" component={Player}/>
        <Footer />
        </div>
      </Router >
    )
  }
}

export default App;