import React from 'react';

const Country = props => {

    let { flag, country, logo, name } = props.countryDetails;
    const { changeCountry } = props;

    if (country === "Poland" && name === "I Liga") {
        logo = "http://kobiecapilka.pl/icons/1liga_logo.jpg";

    }

    return (
        <>
            <section className="main__section">
                <div className="main__imageContainer">
                    <div className="imgContainer">
                        <img src={flag} alt="map of the choosen country" />
                    </div>
                    <i className="fas fa-chevron-left" onClick={changeCountry}></i>
                    <i className="fas fa-chevron-right" onClick={changeCountry}></i>
                </div>
                <h3>{country}</h3>
            </section>
            <section className="main__section">
                <div className="main__imageContainer">
                    <div className="imgContainer">
                        <img src={logo} alt="logo of the choosen league" />

                    </div>
                    <i className="fas fa-chevron-left leagueChange" onClick={changeCountry}></i>
                    <i className="fas fa-chevron-right leagueChange" onClick={changeCountry}></i>
                </div>
                <h3>{name}</h3>
            </section>
        </>
    )
};

export default Country;