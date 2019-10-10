
import React, { Component } from 'react';

import PlayerBio from './PlayerBio';
import PlayerStats from './PlayerStats';
import Search from './Search';
import Loop from './Loop';

class Player extends Component {

    state = {
        playerID: this.props.match.params.player,
        playerInfo: "",
        teamID: "",
        teamLogo: "",
        nationalTeamName: "",
        activeSearch: false
    }

    toggleActiveSearch = () => {
        this.setState({ activeSearch: !this.state.activeSearch })
    };

    componentDidMount() {

        const { playerID } = this.state;

        const unirest = require("unirest");
        const req = unirest("GET", `https://api-football-v1.p.rapidapi.com/v2/players/player/${playerID}/2019-2020`);
        req.headers({
            "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447"
        });
        req.end((res) => {
            if (res.error) throw new Error(res.error);
            this.setState({
                playerInfo: res.body.api.players[0],
                teamID: res.body.api.players[0].team_id,
            })
        });
    };

    componentDidUpdate() {
        if (!this.state.teamLogo) {
            const { teamID } = this.state;
            const unirest = require('unirest');
            unirest.get(`https://api-football-v1.p.rapidapi.com/v2/teams/team/${teamID}`)
                .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
                .header("X-RapidAPI-Key", "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447")
                .end((result) => {
                    this.setState({
                        teamLogo: result.body.api.teams[0].logo,
                    })
                });
        }
    }

    render() {
        const { playerInfo, teamLogo } = this.state;
        return (
            <main className="main">
                {window.innerWidth >= 992 ? <> <Search /> <PlayerBio playerInfo={playerInfo} teamLogo={teamLogo} /> </> :
                this.state.activeSearch ? <Search /> : <PlayerBio playerInfo={playerInfo} teamLogo={teamLogo} />}
                {this.state.playerInfo && <PlayerStats playerInfo={playerInfo} />}
                <Loop toggleActiveSearch={this.toggleActiveSearch} />
            </main>
        )
    }
}



export default Player;