import React, { Component } from "react";

import PlayerBio from "./PlayerBio";
import PlayerStats from "./PlayerStats";
import Search from "./Search";
import Loop from "./Loop";
import Bear from "./Bear";
import Game from "./Game";
import Spinner from "./Loader";
import FootballAPI from "./FootballAPI";

class Player extends Component {
  state = {
    playerID: this.props.match.params.player,
    playerInfo: "",
    teamID: "",
    teamLogo: "",
    nationalTeamName: "",
    activeSearch: false,
    showBearArrow: true
  };

  bearSentence =
    "Hey! Here you have details about the player. Click FUUL FOOTBALL DATABASE to return to the main menu or look for another league using SEARCH panel above me. Most important, please check my LINKEDIN and GITHUB using links below. Yours, Artur ;))";

  toggleActiveSearch = () => {
    this.setState({ activeSearch: !this.state.activeSearch });
  };

  fetchFootballAPI = async () => {
    const { playerID } = this.state;

    const result = await FootballAPI(`v2/players/player/${playerID}/2019-2020`);
    const playerInfo = result.body.api.players[0];
    const teamID = result.body.api.players[0].team_id;

    this.setState({ playerInfo, teamID });
  };

  componentDidMount() {
    this.fetchFootballAPI();
  }

  async componentDidUpdate() {
    if (!this.state.teamLogo) {
      const { teamID } = this.state;
      const result = await FootballAPI(`v2/teams/team/${teamID}`);
      const teamLogo = result.body.api.teams[0].logo;

      this.setState({ teamLogo });
    }
  }

  content = () => {
    const { playerInfo, teamLogo } = this.state;
    return (
      <>
        <main className="main">
          {window.innerWidth >= 992 ? (
            <>
              {" "}
              <Search />{" "}
              <PlayerBio playerInfo={playerInfo} teamLogo={teamLogo} />{" "}
            </>
          ) : this.state.activeSearch ? (
            <Search />
          ) : (
            <PlayerBio playerInfo={playerInfo} teamLogo={teamLogo} />
          )}
          {this.state.playerInfo && <PlayerStats playerInfo={playerInfo} />}
          {window.innerWidth >= 992 && (
            <Bear
              sentence={this.bearSentence}
              flag={this.state.teamLogo}
              showArrow={this.state.showBearArrow}
            />
          )}
        </main>
        <Loop toggleActiveSearch={this.toggleActiveSearch} />
      </>
    );
  };

  render() {
    return (
      <>
        {this.state.teamLogo === "" ? <Spinner /> : this.content()}
        {window.innerWidth >= 992 && <Game />}
      </>
    );
  }
}

export default Player;
