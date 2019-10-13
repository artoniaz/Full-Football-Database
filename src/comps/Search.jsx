import React, { Component } from "react";
import { Link } from "react-router-dom";

import FootballAPI from "./FootballAPI";

class Search extends Component {
  state = {
    path: null,
    enableErrorMessage: false
  };

  handleInput = async e => {
    const userValue = e.target.value;
    if (userValue.length <= 2) return;
    const result = await FootballAPI(`v2/leagues/country/${userValue}/2018`);
    let league_id;

    if (result.body.api.results === 0) {
      this.setState({ path: null });
    } else if (result.body.api.results > 0) {
      league_id = result.body.api.leagues[0].league_id;
      if (result.body.api.leagues[0].type === "Cup") {
        league_id = result.body.api.leagues[1].league_id;
      }
      this.setState({
        path: `/league/${league_id}`,
      });
    }
  };

  render() {
    return (
      <aside className="main__search">
        <h2 className="main__header">quick search</h2>
        <p className="main__text">Which country are you looking for?</p>
        <input
          className="main__input"
          type="text"
          placeholder="country name"
          onChange={this.handleInput}
          defaultValue=""
        />
        {this.state.path !== null ? <Link to={this.state.path} className="main__button">search</Link> : <span className="main__button main__button--noActive">search</span>}
      </aside>
    );
  }
}

export default Search;
