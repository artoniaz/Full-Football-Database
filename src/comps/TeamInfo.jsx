import React, { Component } from 'react';
import ClubDetails from './ClubDetails';
import PlayerBar from './PlayerBar';

class TeamInfo extends Component {

    state = {
        teamID: this.props.match.params.team,
        teamInfo: "",
        players: "",
    }



    render() {
        const { players } = this.state;
        const goalkeepers = [...players].filter(el => (
            el.position === "G"
        ));
        const defenders = [...players].filter(el => (
            el.position === "D"
        ));
        const midfielders = [...players].filter(el => (
            el.position === "M"
        ));
        const stricers = [...players].filter(el => (
            el.position === "A"
        ));

        const goalkeeper = goalkeepers.map(el => (
            <PlayerBar key={el.player_id} playerInfo = {el}/>
        ));
        const defender = defenders.map(el => (
            <PlayerBar key={el.player_id} playerInfo = {el}/>
        ));
        const midfielder = midfielders.map(el => (
            <PlayerBar key={el.player_id} playerInfo = {el}/>
        ));
        const stricer = stricers.map(el => (
            <PlayerBar key={el.player_id} playerInfo = {el}/>
        ));

        return (
            <main className="main main--teamInfo">
                <ClubDetails teamInfo={this.state.teamInfo} />
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
            </main>
        )
    }

    componentDidMount() {

        const { teamID } = this.state;
        let teamInfo;

        const unirest = require('unirest');
        unirest.get(`https://api-football-v1.p.rapidapi.com/v2/teams/team/${teamID}`)
            .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447")
            .end((result) => {
                teamInfo = result.body.api.teams[0];
            });

        unirest.get(`https://api-football-v1.p.rapidapi.com/v2/players/team/${teamID}`)
            .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447")
            .end((result) => {
                this.setState({
                    teamInfo,
                    players: result.body.api.players,
                })
            });
    }
}

export default TeamInfo;