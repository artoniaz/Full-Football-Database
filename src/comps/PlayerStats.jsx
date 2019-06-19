import React from 'react';

const PlayerStats = props => {

    let { games, goals, penalty, passes, shots, tackles, position, cards, fouls, captain } = props.playerInfo;
    let right;

    let positionCords = {
        "goalkeeper": {
            "right": "0px",
        },
        "defender": {
            "right": '25px'
        },
        "midfielder": {
            "right": "70px",
        },
        "stricker": {
            "right": "110px",
        }
    }

    if (position === "G") {
        position = "Goalkeeper";
        right = positionCords.goalkeeper.right;
    } else if (position === "D") {
        position = "Defender";
        right = positionCords.defender.right;
    } else if (position === "M") {
        position = "Midfielder";
        right = positionCords.midfielder.right;
    } else {
        position = "Stricker";
        right = positionCords.stricker.right;


    }

    return (
        <div className="playerStats">
            <h2>Player statistics</h2>
            {captain > 0 && <p>Captain: {captain}</p>}
            <p>Games played: {games.appearences}</p>
            <p>Lineup appearences: {games.lineups}</p>
            {position === "Goalkeeper" && <p>Goals conceded: {goals.conceded}</p>}
            {position === "Goalkeeper" && <p>Penalty saved: {penalty.saved}</p>}
            <p>Goals: {goals.total}</p>
            <p>Penalty: {penalty.success}</p>
            <p>Shots: {shots.total}</p>
            <p>Shots on target: {shots.on}</p>
            <p>Assists: {goals.assists}</p>
            <p>Passes: {passes.total}</p>
            <p>Passes accuracy: {passes.accuracy}%</p>
            <p>Tackles: {tackles.total}</p>
            <p>Blocks: {tackles.blocks}</p>
            <p>Interceptions: {tackles.interceptions}</p>
            <p>Drawn fouls: {fouls.drawn}</p>
            <p>Commited fouls: {fouls.committed}</p>
            <p>Yellow cards: {cards.yellow}</p>
            <p>Red cards: {cards.red}</p>
            <div className="playerStats__footballPitch">
                <div className="playerStats__positionMarker" style={{right: right }}></div>
                <h3>{position}</h3>
            </div>
        </div>
    )
}

export default PlayerStats;