import React, { Component } from 'react';

class GeneralInfo extends Component {
    render() {

        const { name, flag, country, logo } = this.props.leagueDetails;

        return (
            <div className="generalInfo">
                <div className="generalInfo__headers">
                    <h1>{name}</h1>
                    <h3>{country}</h3>
                </div>
                <div className="generalInfo__imgContainer generalInfo__imgContainer--right">
                    <img src={flag} alt="map of the choosen country" />
                </div>
                <div className="generalInfo__imgContainer generalInfo__imgContainer--left">
                    <img src={logo} alt="logo of a league" />
                </div>
            </div>
        );
    }
};

export default GeneralInfo;