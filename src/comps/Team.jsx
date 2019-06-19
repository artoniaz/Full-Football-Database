import React from 'react';
import {
    Link
} from 'react-router-dom';

const Team = props => {

    const { logo, name,team_id } = props.details;
    const path = `/team/${team_id}`

    return (
        <Link to={path} className="team">
            <div className="team__imgContainer">
                <img src={logo} alt="logo of a team" />
            </div>
            <p className="team__name">{name}</p>
        </Link>
    );
};

export default Team;