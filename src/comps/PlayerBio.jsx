
import React from 'react';
import { Link } from 'react-router-dom';

const PlayerBio = props => {

    let { player_name, team_name, team_id, age, rating, position, nationality } = props.playerInfo;
    const { teamLogo } = props;

    const teamPath = `/team/${team_id}`
    rating = Number(rating).toFixed(2);
    if (rating == 0){
        rating = "no games played";
    }

    return (
        <div className="playerBio">
            <h1 className="playerBio__name">{player_name}</h1>
            <p>Team: <Link to={teamPath} className="playerBio__teamLink">{team_name}</Link></p>
            <p>Nationality: {nationality}</p>
            <p>Age: {age}</p>
            <p>Position: {position}</p>
            <p>Season rating: {rating}</p>
            <div className="playerBio__imgContainer">
                <img src={teamLogo} alt="logo of a team" />
            </div>

        </div>
    )
}

export default PlayerBio;
