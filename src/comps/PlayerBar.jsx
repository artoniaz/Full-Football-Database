import React, { Component } from "react";
import { Link } from "react-router-dom";
import FootballAPI from "./FootballAPI";

class PlayerBar extends Component {
  state = {
    playerFlag: ""
  };

  fetchFootballAPI = async () => {
    const result = await FootballAPI(
      `v2/leagues/country/${this.props.playerInfo.nationality}/2019`
    );
    if (result.body.api.leagues[0] !== undefined) {
      const playerFlag = result.body.api.leagues[0].flag;
      this.setState({ playerFlag });
    }
  };

  componentDidMount() {
    this.fetchFootballAPI();
  }

  render() {
    let { player_name, player_id } = this.props.playerInfo;
    let path = `/player/${player_id}`;

    return (
      <Link to={path} className="playerBar">
        <div
          className="playerBar__flag"
          style={{ backgroundImage: `url(${this.state.playerFlag})` }}
        ></div>
        <p className="playerBar__name">{player_name}</p>
      </Link>
    );
  }
}

export default PlayerBar;
