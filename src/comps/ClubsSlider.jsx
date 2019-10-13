import React, { Component } from "react";
import { Link } from "react-router-dom";

class ClubsSlider extends Component {
  render() {
    let activeClubIndex = this.props.activeClub;
    let activeClubLogo = "";
    let activeClubName = "";
    const clubs = this.props.clubs;
    let minorClub1Index = "";
    let minorClub2Index = "";
    let minorClub1Logo = "";
    let minorClub2Logo = "";
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
      minorClub2Logo = clubs[minorClub2Index].logo;
      path = `/team/${clubs[activeClubIndex].team_id}`;
      console.log(path);
    }

    return (
      <div className="clubsSlider">
        <div
          className="clubsSlider__minorClub clubsSlider__minorClub--left"
          onClick={this.props.left}
        >
          <img src={minorClub1Logo} alt="" />
        </div>
        <div className="clubsSlider__activeClub">
          <img src={activeClubLogo} alt="" />
          <h2>{activeClubName}</h2>
        </div>
        <div
          className="clubsSlider__minorClub clubsSlider__minorClub--right"
          onClick={this.props.right}
        >
          <img src={minorClub2Logo} alt="" />
        </div>
        <Link to={path} className="clubsSlider__button">
          choose
        </Link>
      </div>
    );
  }
}

export default ClubsSlider;
