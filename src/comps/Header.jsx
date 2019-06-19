import React from 'react';
import Loop from './Loop';

const Header = () => {
    return (
        <>
            <div></div>
            <header className="header">
                <h1 className="header__title">Full Football Database</h1>
                <Loop/>
            </header>
        </>
    )
};

export default Header;