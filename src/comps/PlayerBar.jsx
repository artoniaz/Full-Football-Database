
import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';

class PlayerBar extends Component {

    state = {
        playerFlag: ""
    };

    componentDidMount() {
        var unirest = require("unirest");
        var req = unirest("GET", `https://api-football-v1.p.rapidapi.com/v2/leagues/country/${this.props.playerInfo.nationality}/2019`);
        req.headers({
            "x-main__searchActivedapi-host": "api-football-v1.p.rapidapi.com",
            "x-rapidapi-key": "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447"
        });

        req.end((res) => {
            if (res.error) throw new Error(res.error);
            if (res.body.api.leagues[0] !== undefined) {
                this.setState({ playerFlag: res.body.api.leagues[0].flag});
            }
        });
    };

    render() {
        let { player_name, player_id } = this.props.playerInfo;
        let path = `/player/${player_id}`;

        return (
            <Link to={path} className="playerBar">
                <div className="playerBar__flag" style={{backgroundImage: `url(${this.state.playerFlag})`}}></div>
                <p className="playerBar__name">{player_name}</p>
            </Link>
        )
    }
};

export default PlayerBar;
