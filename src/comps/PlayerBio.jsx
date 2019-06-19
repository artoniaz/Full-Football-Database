import React from 'react';
import {
    Link
} from 'react-router-dom';

const PlayerBio = props => {

    let { player_name, team_name, team_id, age, rating, position, number } = props.playerInfo;
    const { teamLogo } = props;
    const {nationality} = props;
    
    const teamPath = `/team/${team_id}`
    rating = Number(rating).toFixed(2);
    if (rating == 0){
        rating = "no games played";
    }
    if(!number){
        number = "nn";
    };
    if (position === "G") {
        position = "Goalkeeper";
    } else if (position === "D") {
        position = "Defender";
    } else if (position === "M") {
        position = "Midfielder";
    } else {
        position = "Stricker";
    }

    return (
        <div className="playerBio">
            <h1 className="playerBio__name">{player_name}</h1>
            <p>Team: <Link to={teamPath} className="playerBio__teamLink">{team_name}</Link></p>
            {nationality && <p>National team: <Link to="" className="playerBio__teamLink">{nationality}</Link></p>}
            <p>Age: {age}</p>
            <p>Position: {position}</p>
            <p>Number: {number}</p>
            <p>Season rating: {rating}</p>
            <div className="playerBio__imgContainer">
                <img src={teamLogo} alt="logo of a team" />
            </div>

        </div>
    )
}

export default PlayerBio;