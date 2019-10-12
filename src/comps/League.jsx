import React, { Component } from "react";

import GeneralInfo from "./GeneralInfo";
import ClubsSlider from "./ClubsSlider";
import Search from "./Search";
import Loop from "./Loop";
import Bear from "./Bear";
import Game from "./Game";
import Spinner from "./Loader";
import FootballAPI from "./FootballAPI";
import { async } from "q";

class League extends Component {
  state = {
    leagueDetails: "",
    teams: "",
    activeClub: 0,
    activeSearch: false
  };

  bearSentence =
    "Hey! Choose the club you want to see ;)) You can also look for a league you want. Just put the country name in the SEARCH panel above me.";

  turnClubLeft = () => {
    let activeClub = this.state.activeClub;
    const { teams } = this.state;

    activeClub--;
    if (activeClub < 0) {
      activeClub = teams.length - 1;
    }

    this.setState({
      activeClub
    });
  };

  turnClubRight = () => {
    let activeClub = this.state.activeClub;
    const { teams } = this.state;

    activeClub++;
    if (activeClub > teams.length - 1) {
      activeClub = 0;
    }

    this.setState({
      activeClub
    });
  };

  handleKeyDown = e => {
    if (e.keyCode === 37) this.turnClubLeft();
    else if (e.keyCode === 39) this.turnClubRight();
    else return;
  };

  toggleActiveSearch = () => {
    this.setState({ activeSearch: !this.state.activeSearch });
  };

  componentDidMount() {
    this.fetchLeague();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.league !== this.props.match.params.league) {
      this.fetchLeague();
    }
  }

  fetchLeague = async () => {
    const leagueID = this.props.match.params.league;

    FootballAPI(`leagues/league/${leagueID}`).then(result => {
      this.setState({ leagueDetails: result.body.api.leagues[0] });
    });

    const result = await FootballAPI(`teams/league/${leagueID}`);
    const teams = result.body.api.teams;
    this.setState({ teams });
    document.addEventListener("keydown", this.handleKeyDown);
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  content = () => {
    let { teams } = this.state;
    teams = [...teams].sort(function(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    return (
      <>
        <main className="main">
          {window.innerWidth >= 992 ? (
            <>
              {" "}
              <Search />
              <GeneralInfo leagueDetails={this.state.leagueDetails} />{" "}
            </>
          ) : this.state.activeSearch ? (
            <Search />
          ) : (
            <GeneralInfo leagueDetails={this.state.leagueDetails} />
          )}
          <ClubsSlider
            clubs={teams}
            activeClub={this.state.activeClub}
            left={this.turnClubLeft}
            right={this.turnClubRight}
          />
          {window.innerWidth >= 992 && (
            <>
              <Bear
                sentence={this.bearSentence}
                flag={this.state.leagueDetails.flag}
              />
            </>
          )}
        </main>
        <Loop toggleActiveSearch={this.toggleActiveSearch} />
      </>
    );
  };

  render() {
    let { teams, leagueDetails } = this.state;
    return (
      <>
        {[...teams].length === 0 || leagueDetails.length === 0 ? (
          <Spinner />
        ) : (
          this.content()
        )}
        {window.innerWidth >= 992 && <Game />}
      </>
    );
  }
}

export default League;
