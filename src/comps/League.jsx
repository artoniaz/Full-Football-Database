import React, { Component } from 'react';
import GeneralInfo from './GeneralInfo';
import ClubsSlider from './ClubsSlider';
import Team from './Team';

class League extends Component {

    state = {
        leagueID: this.props.match.params.league,
        leagueDetails: "",
        teams: "",
        activeClub: 0,
    }

    turnClubLeft = () => {
        let activeClub = this.state.activeClub;
        const {teams} = this.state
        
        activeClub--;
        if(activeClub < 0){
            activeClub = teams.length - 1;
        }
        
        this.setState({
            activeClub,
        })
    }

    turnClubRight = () => {
        let activeClub = this.state.activeClub;
        const {teams} = this.state
        
        activeClub++;
        if(activeClub > teams.length - 1){
            activeClub = 0;
        }
        
        this.setState({
            activeClub,
        })
    }

    render() {
        let { teams } = this.state;

//sortowanie alfabetyczne zespołów
        teams = [...teams].sort(function (a, b) {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        });
        


        // const team = [...teams].map(el => (
        //     <Team key={el.team_id} details={el} />
        // ))

        return (
            
            <main className="main" >
                <GeneralInfo leagueDetails={this.state.leagueDetails} />
                <ClubsSlider clubs={teams} activeClub={this.state.activeClub} left={this.turnClubLeft} right={this.turnClubRight}/>
                {/* <ul className="teams">
                    {team}
                </ul> */}
            </main>
        );
    };

    componentDidMount() {
        const { leagueID } = this.state;
        let leagueDetails = "";
        let teams = "";

        const unirest = require('unirest');
        unirest.get(`https://api-football-v1.p.rapidapi.com/v2/leagues/league/${leagueID}`)
            .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447")
            .end((result) => {
                leagueDetails = result.body.api.leagues[0]
                // this.setState({
                //     leagueDetails: result.body.api.leagues[0],
                // })
            });

        unirest.get(`https://api-football-v1.p.rapidapi.com/v2/teams/league/${leagueID}`)
            .header("X-RapidAPI-Host", "api-football-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447")
            .end((result) => {
                teams = result.body.api.teams;

                this.setState({
                    leagueDetails,
                    teams,
                })
            });


    }
};

export default League;