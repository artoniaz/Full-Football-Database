
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ErrorMessage from './ErrorMessage';

class Search extends Component {

    state = {
        userValue: "",
        path: "",
        enableErrorMessage: false
    };

    // handleInput = e => {
    //     const userValue = e.target.value;
    //     const unirest = require("unirest");
    //     const req = unirest("GET", `https://api-football-v1.p.rapidapi.com/v2/leagues/country/${userValue}/2019`);
    //     req.headers({
    //         "x-main__searchActivedapi-host": "api-football-v1.p.rapidapi.com",
    //         "x-rapidapi-key": "1346a6a8d4mshc714b2d3f021692p18d59ejsn2cb7d0c03447"
    //     });

    //     req.end((res) => {
    //         if (res.body.api.results > 0) {
    //             const league_id = res.body.api.leagues[0].league_id;
    //             this.path = `/league/${league_id}`;
    //         }
    //     });
    //     console.log(this.path);
    // };

    // toggleErrorMessage = e => {
    //     e.preventDefault();
    //     this.state.userValue === "" && this.setState({ enableErrorMessage: !this.state.enableErrorMessage });
    //     if (this.state.userValue !== "" && this.path === "") this.setState({
    //         enableErrorMessage: !this.state.enableErrorMessage,
    //         userValue: ""
    //     });
    // };

    render() {
        return (
            <aside className="main__search">
                <h2 className="main__header">quick search</h2>
                <p className="main__text">Which country are you looking for?</p>
                <input className="main__input" type="text" placeholder="country name" onChange={this.handleInput} value={this.state.userValue} />
                <Link to={this.state.path} className="main__button">search</Link>
                {this.state.enableErrorMessage && <ErrorMessage userValue={this.state.userValue} closeErrorMessage={this.closeErrorMessage} userValue={this.state.userValue} />}
            </aside>
        );
    }

};

export default Search;