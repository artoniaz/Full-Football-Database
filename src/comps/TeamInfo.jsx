
import React, { Component } from 'react';
import ClubDetails from './ClubDetails';
import PlayerBar from './PlayerBar';
import Search from './Search';
import Loop from './Loop';

class TeamInfo extends Component {

    state = {
        teamID: this.props.match.params.team,
        teamInfo: "",
        players: "",
        activeSearch: false
    }

    toggleActiveSearch = () => {
        this.setState({ activeSearch: !this.state.activeSearch })
    };

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

        unirest.get(`https://api-football-v1.p.rapidapi.com/v2/players/squad/${teamID}/2019-2020`)
            .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447")
            .end((result) => {
                this.setState({
                    teamInfo,
                    players: result.body.api.players,
                })
            });
    }

    render() {
        const { players } = this.state;
        const goalkeepers = [...players].filter(el => (
            el.position === "Goalkeeper"
        ));
        const defenders = [...players].filter(el => (
            el.position === "Defender"
        ));
        const midfielders = [...players].filter(el => (
            el.position === "Midfielder"
        ));
        const stricers = [...players].filter(el => (
            el.position === "Attacker"
        ));

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
            <main className="main main--teamInfo">
                {window.innerWidth >= 992 ? <><Search /> <ClubDetails teamInfo={this.state.teamInfo}/> </> : this.state.activeSearch ? <Search /> : <ClubDetails teamInfo={this.state.teamInfo}/>}
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
                <Loop toggleActiveSearch={this.toggleActiveSearch} />
            </main>
        )
    }
}

export default TeamInfo;
