import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./comps/Header";
import WelcomeScreen from "./comps/WelcomeScreen";
import Main from "./comps/Main";
import Footer from "./comps/Footer";
import League from "./comps/League";
import TeamInfo from "./comps/TeamInfo";
import Player from "./comps/Player";

import "./css/App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="contener">
          <Header />
          <Route exact path="/" component={WelcomeScreen} />
          <Route path="/main" component={Main} />
          <Route path="/league/:league" component={League} />
          <Route path="/team/:team" component={TeamInfo} />
          <Route path="/player/:player" component={Player} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
