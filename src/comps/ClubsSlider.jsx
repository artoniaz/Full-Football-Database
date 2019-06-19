import React from 'react';
import {
    Link
} from 'react-router-dom';

const ClubsSlider = props => {

    let activeClubIndex = props.activeClub;
    let activeClubLogo = "";
    let activeClubName = "";
    const clubs = props.clubs;
    let minorClub1Index = "";
    let minorClub2Index = "";
    let minorClub1Logo = "";
    let minorClub1Name = "";
    let minorClub2Logo = "";
    let minorClub2Name = "";
    let path = "";


    if ([...clubs].length !== 0) {
        activeClubLogo = clubs[activeClubIndex].logo;
        activeClubName = clubs[activeClubIndex].name;
        minorClub1Index = activeClubIndex - 1;
        if (minorClub1Index < 0) {
            minorClub1Index = clubs.length - 1;
        }
        minorClub2Index = activeClubIndex + 1;
        if (minorClub2Index > clubs.length - 1) {
            minorClub2Index = 0;
        }

        minorClub1Logo = clubs[minorClub1Index].logo;
        minorClub1Name = clubs[minorClub1Index].name;
        minorClub2Logo = clubs[minorClub2Index].logo;
        minorClub2Name = clubs[minorClub2Index].name;
        path = `/team/${clubs[activeClubIndex].team_id}`;


    };




    return (
        <div className="clubsSlider">
            <div className="clubsSlider__minorClub clubsSlider__minorClub--left" onClick={props.left}>
                <img src={minorClub1Logo} alt="" />
                {/* <h2>{minorClub1Name}</h2> */}
            </div>
            <div className="clubsSlider__activeClub">
                <img src={activeClubLogo} alt="" />
                <h2>{activeClubName}</h2>
            </div>
            <div className="clubsSlider__minorClub clubsSlider__minorClub--right" onClick={props.right}>
                <img src={minorClub2Logo} alt="" />
                {/* <h2>{minorClub2Name}</h2> */}
            </div>
            <Link to={path} className="clubsSlider__button">choose</Link>
        </div>
    )
}

export default ClubsSlider;