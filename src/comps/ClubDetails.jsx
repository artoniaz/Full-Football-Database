import React from 'react';

const ClubDetails = props => {

    const {logo, name,venue_city, founded, venue_capacity, venue_name} = props.teamInfo;

    return (
        <div className="teamInfo__info">
            <div className="teamInfo__imgContainer">
                <img src={logo} alt="logo of a team" className="teamInfo__img"/>
            </div>
            <div className="teamInfo__text">
                <h2>{name}</h2>
                <p>city: {venue_city}</p>
                <p>stadium: {venue_name}</p>
                <p>stadium capacity: {venue_capacity}</p>
                <p>founded: {founded}</p>
            </div>
        </div>
    )
}

export default ClubDetails;
