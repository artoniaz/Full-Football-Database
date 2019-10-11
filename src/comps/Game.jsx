
import React from 'react';

const Game = () => {
    return (
        <div className="game__wrapper">
            <div className="game__frame"></div>
            <div className="game__pitch">
                <div className="game__ball"></div>
                <div className="game__team game__team--first">
                    <div className="game__player game__player--first"><p className="player__numer">1</p></div>
                    <div className="game__player game__player--first"><p className="player__numer">2</p></div>
                    <div className="game__player game__player--first"><p className="player__numer">3</p></div>
                </div>
                <div className="game__team game__team--second">
                    <div className="game__player game__player--second"><p className="player__numer">1</p></div>
                    <div className="game__player game__player--second"><p className="player__numer">2</p></div>
                    <div className="game__player game__player--second"><p className="player__numer">3</p></div>
                </div>
            </div>
        </div>
    )
};

export default Game;
