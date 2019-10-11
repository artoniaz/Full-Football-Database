
import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeScreen = () => {
    return (
        <>
            <div className="welcomeScreen">
                <div className="welcomeScreen__background">
                    <h1 className="weclomeScreen__title">full football database</h1>
                    <h2 className="welcomeScreen__subTitle">Welcome in <span className="weclomeScreen__title">Full Football Database</span></h2>
                    <p className="welcomeScreen__text">Your personal football guidebook</p>
                    <Link className="welcomeScreen__button" to="/main">start</Link>
                </div>
            </div>
        </>
    )
};

export default WelcomeScreen;
