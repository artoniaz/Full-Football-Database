import React, { Component } from 'react';
import Country from './Country';
import Search from './Search';

import {
    Link
} from 'react-router-dom';

class Main extends Component {

    state = {
        currentCountry: 0,
        currentLeague: 0,  // 0 or 1
        currentCountryDetails: "",
    };

    leaguesData = [
        {
            country: "England",
            leaguesIDs: [2, 3],
        },
        {
            country: "France",
            leaguesIDs: [4, 5],
        },
        {
            country: "Germany",
            leaguesIDs: [8, 9],
        },
        {
            country: "Italy",
            leaguesIDs: [28, 29],
        },
        {
            country: "Poland",
            leaguesIDs: [16, 456],
        },
        {
            country: "Spain",
            leaguesIDs: [30, 33],
        },
    ]

    changeCountryOrLeague = e => {
        let { currentCountry, currentLeague } = this.state;
        const { classList } = e.target

        if ([...classList].indexOf("leagueChange") !== -1) {
            if ([...classList].indexOf("fa-chevron-left") !== -1) {
                currentLeague--;
                if (currentLeague < 0) {
                    currentLeague = this.leaguesData[currentCountry].leaguesIDs.length - 1;
                }
            } else {
                currentLeague++;
                if (currentLeague > this.leaguesData[currentCountry].leaguesIDs.length - 1) {
                    currentLeague = 0;
                }
            };

        } else {
            //check if e.target is left
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
        //name of current country
        const currentCountryName = this.leaguesData[currentCountry].country;

        const unirest = require('unirest');
        unirest.get(`https://api-football-v1.p.rapidapi.com/leagues/country/${currentCountryName}/{season}`)
            .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447")
            .end((result) => {
                this.setState({
                    currentCountry,
                    currentLeague,
                    currentCountryDetails: result.body.api.leagues[this.leaguesData[currentCountry].leaguesIDs[currentLeague]]
                })
            });
    }

    render() {
        
        const currentLeagueID = this.leaguesData[this.state.currentCountry].leaguesIDs[this.state.currentLeague];
        const currentPath = `/league/${currentLeagueID}`;
        
        return (
            <main className="main">
                <Search />
                <article className="main__article">
                    <h2 className="main__header">selet the leauge</h2>
                    <form className="main__form--result">
                        <Country countryDetails={this.state.currentCountryDetails} changeCountry={this.changeCountryOrLeague} />
                        <Link to={currentPath} className="main__button">choose</Link>
                    </form>
                </article>
            </main>
        )
    };

    componentDidMount() {
        //name of current country
        const currentCountryName = this.leaguesData[this.state.currentCountry].country;

        const unirest = require('unirest');
        unirest.get(`https://api-football-v1.p.rapidapi.com/leagues/country/${currentCountryName}/{season}`)
            .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447")
            .end((result) => {
                this.setState({
                    currentCountryDetails: result.body.api.leagues[this.leaguesData[this.state.currentCountry].leaguesIDs[this.state.currentLeague]]
                })
            });
    };

}

export default Main;