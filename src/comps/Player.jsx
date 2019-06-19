import React, { Component } from 'react';
import PlayerBio from './PlayerBio';
import PlayerStats from './PlayerStats';


class Player extends Component {

    state = {
        playerID: this.props.match.params.player,
        playerInfo: "",
        teamID: "",
        teamLogo: "",
        national: "",
        nationalTeamName: "",
    }

    render() {
        const { playerInfo, teamLogo, nationalTeamName } = this.state;
        return (
            <main className="main">
                <PlayerBio playerInfo={playerInfo} teamLogo={teamLogo} nationality={nationalTeamName} />
                {this.state.playerInfo && <PlayerStats playerInfo={playerInfo}/>}
            </main>
        )
    }
    componentDidMount() {

        const { playerID } = this.state;

        const unirest = require('unirest');
        unirest.get(`https://api-football-v1.p.rapidapi.com/v2/players/player/${playerID}`)
            .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447")
            .end((result) => {
                let num = 0;
                let national = -1;
                const data = result.body.api.players;

                if (data.length > 1) {
                    if (data[1].team_id > data[0].team_id) {
                        num = 1;
                        national = data[0].team_id;
                    } else {
                        national = data[1].team_id;
                    };
                };
                if (national >= 0) {
                    this.setState({
                        playerInfo: result.body.api.players[num],
                        teamID: result.body.api.players[num].team_id,
                        national,
                    })
                } else {
                    this.setState({
                        playerInfo: result.body.api.players[num],
                        teamID: result.body.api.players[num].team_id,
                    })
                }
            });
    }

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
        if (!this.state.nationalTeamName && this.state.national) {
            const { national } = this.state;
            const unirest = require('unirest');
            unirest.get(`https://api-football-v1.p.rapidapi.com/v2/teams/team/${national}`)
                .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
                .header("X-RapidAPI-Key", "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447")
                .end((result) => {
                    this.setState({
                        nationalTeamName: result.body.api.teams[0].name,
                    })
                });
        }
    }
}

export default Player;