import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div></div>
            <header className="header">
                <Link to="/main" className="header__title">
                    Full Football Database
                </Link>
            </header>
        </>
    )
};

export default Header;