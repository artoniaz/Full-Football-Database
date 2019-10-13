import React, { Component } from "react";
import { Link } from "react-router-dom";

import Country from "./Country";
import Search from "./Search";
import Bear from "./Bear";
import Spinner from "./Loader";
import FootballAPI from "./FootballAPI";

class Main extends Component {
  state = {
    currentCountry: 0,
    currentLeague: 0,
    currentCountryDetails: ""
  };

  leaguesData = [
    {
      country: "England",
      leaguesIDs: [2, 3]
    },
    {
      country: "France",
      leaguesIDs: [4, 5]
    },
    {
      country: "Germany",
      leaguesIDs: [8, 9]
    },
    {
      country: "Italy",
      leaguesIDs: [28, 29]
    },
    {
      country: "Poland",
      leaguesIDs: [16, 456]
    },
    {
      country: "Spain",
      leaguesIDs: [30, 33]
    }
  ];

  bearSentence =
    "Hey! I'm Bear and I'm here to help you. Just choose the country you are interested in and then, the league you wish. Accept with the 'choose' button.";

  fetchAPI = async (currentCountryName, currentCountry, currentLeague) => {
    const result = await FootballAPI(
      `leagues/country/${currentCountryName}/{season}`
    );
    const currentCountryDetails =
      result.body.api.leagues[
        this.leaguesData[currentCountry].leaguesIDs[currentLeague]
      ];

    this.setState({ currentCountry, currentLeague, currentCountryDetails });
  };

  changeCountryOrLeague = e => {
    let { currentCountry, currentLeague } = this.state;
    const { classList } = e.target;

    if ([...classList].indexOf("leagueChange") !== -1) {
      if ([...classList].indexOf("fa-chevron-left") !== -1) {
        currentLeague--;
        if (currentLeague < 0) {
          currentLeague =
            this.leaguesData[currentCountry].leaguesIDs.length - 1;
        }
      } else {
        currentLeague++;
        if (
          currentLeague >
          this.leaguesData[currentCountry].leaguesIDs.length - 1
        ) {
          currentLeague = 0;
        }
      }
    } else {
      if ([...classList].indexOf("fa-chevron-left") !== -1) {
        currentCountry--;
        if (currentCountry < 0) {
          currentCountry = this.leaguesData.length - 1;
        }
      } else {
        currentCountry++;
        if (currentCountry > this.leaguesData.length - 1) {
          currentCountry = 0;
        }
      }
      currentLeague = 0;
    }
    const currentCountryName = this.leaguesData[currentCountry].country;

    this.fetchAPI(currentCountryName, currentCountry, currentLeague);
  };

  handleKeyPress = e => {
    let { currentCountry } = this.state;
    const currentLeague = 0;
    if (e.keyCode === 37) {
      currentCountry--;
      if (currentCountry < 0) {
        currentCountry = this.leaguesData.length - 1;
      }
    } else if (e.keyCode === 39) {
      currentCountry++;
      if (currentCountry > this.leaguesData.length - 1) {
        currentCountry = 0;
      }
    } else if (e.keyCode === 13) {
      const currentLeagueID = this.leaguesData[this.state.currentCountry]
        .leaguesIDs[this.state.currentLeague];
      const currentPath = `/league/${currentLeagueID}`;
      this.props.history.push(currentPath);
      return;
    }
    const currentCountryName = this.leaguesData[currentCountry].country;

    this.fetchAPI(currentCountryName, currentCountry, currentLeague);
  };

  componentDidMount() {
    const currentCountryName = this.leaguesData[this.state.currentCountry]
      .country;
    const currentCountry = this.state.currentCountry;
    const currentLeague = this.state.currentLeague;

    this.fetchAPI(currentCountryName, currentCountry, currentLeague);

    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    const currentLeagueID = this.leaguesData[this.state.currentCountry]
      .leaguesIDs[this.state.currentLeague];
    const currentPath = `/league/${currentLeagueID}`;
    return (
      <main className="main">
        <Search />
        <article className="main__article">
          <h2 className="main__header">select the leauge</h2>
          {this.state.currentCountryDetails.length === 0 ? (
            <Spinner />
          ) : (
            <form className="main__form--result">
              <Country
                countryDetails={this.state.currentCountryDetails}
                changeCountry={this.changeCountryOrLeague}
              />
              <Link to={currentPath} className="main__button">
                choose
              </Link>
            </form>
          )}
        </article>
        {window.innerWidth >= 992 && (
          <Bear
            flag={this.state.currentCountryDetails.flag}
            sentence={this.bearSentence}
          />
        )}
      </main>
    );
  }
}

export default Main;
