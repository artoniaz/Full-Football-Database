import React from 'react';
import {
    Link
} from 'react-router-dom';

const PlayerBar = props => {
    
    let { number, player_name, player_id } = props.playerInfo;
    let path = `/player/${player_id}`;

    if (!number){
        number = "nn"
    }

    return (
        <Link to={path} className="playerBar">
            {number < 10 ? <span className="playerBar__number">&nbsp;&nbsp;{number}</span> : <span className="playerBar__number">{number}</span>}
            <p className="playerBar__name">{player_name}</p>
        </Link>
    )
}

export default PlayerBar;