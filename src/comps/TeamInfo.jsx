import React, { Component } from "react";
import ClubDetails from "./ClubDetails";
import PlayerBar from "./PlayerBar";
import Search from "./Search";
import Loop from "./Loop";
import Bear from "./Bear";
import Game from "./Game";
import Spinner from "./Loader";
import FootballAPI from "./FootballAPI";

class TeamInfo extends Component {
  state = {
    teamID: this.props.match.params.team,
    teamInfo: "",
    players: "",
    activeSearch: false
  };

  bearSentence =
    "Hey! Here you have the full squad of the team for the 2019/2020 season. Just click on the name of the player that you're interested in to see more details. You can always change the league using the SEARCH panel above me.";

  toggleActiveSearch = () => {
    this.setState({ activeSearch: !this.state.activeSearch });
  };

  fetchFootballAPI = async () => {
    const { teamID } = this.state;

    const resultTeamInfo = await FootballAPI(`v2/teams/team/${teamID}`);
    const teamInfo = resultTeamInfo.body.api.teams[0];

    const resultPlayersInfo = await FootballAPI(`v2/players/squad/${teamID}/2019-2020`);
    const players = resultPlayersInfo.body.api.players;

    this.setState({ teamInfo, players });
  }

  componentDidMount() {
    this.fetchFootballAPI();
  }

  content = () => {
    const { players } = this.state;
    const goalkeepers = [...players].filter(el => el.position === "Goalkeeper");
    const defenders = [...players].filter(el => el.position === "Defender");
    const midfielders = [...players].filter(el => el.position === "Midfielder");
    const stricers = [...players].filter(el => el.position === "Attacker");

    const goalkeeper = goalkeepers.map(el => (
      <PlayerBar key={el.player_id} playerInfo={el} />
    ));
    const defender = defenders.map(el => (
      <PlayerBar key={el.player_id} playerInfo={el} />
    ));
    const midfielder = midfielders.map(el => (
      <PlayerBar key={el.player_id} playerInfo={el} />
    ));
    const stricer = stricers.map(el => (
      <PlayerBar key={el.player_id} playerInfo={el} />
    ));

    return (
      <>
        <main className="main main--teamInfo">
          {window.innerWidth >= 992 ? (
            <>
              <Search /> <ClubDetails teamInfo={this.state.teamInfo} />{" "}
            </>
          ) : this.state.activeSearch ? (
            <Search />
          ) : (
            <ClubDetails teamInfo={this.state.teamInfo} />
          )}
          <div className="teamInfo__players">
            <p>Goalkeepers</p>
            {goalkeeper}
            <p>defenders</p>
            {defender}
            <p>midfielders</p>
            {midfielder}
            <p>strickers</p>
            {stricer}
          </div>
          {window.innerWidth >= 992 && (
            <Bear
              sentence={this.bearSentence}
              flag={this.state.teamInfo.logo}
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
        {this.state.teamInfo === undefined ||
        this.state.players === undefined ? (
          <Spinner />
        ) : (
          this.content()
        )}
        {window.innerWidth >= 992 && <Game />}
      </>
    );
  }
}

export default TeamInfo;
