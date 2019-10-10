
import React from 'react';

const ErrorMessage = props => {
    return (
        <>
            <div className="errorBackground"></div>
            <div className="errorMessage">
                <h1>error</h1>
                {props.userValue === "" ? <p>Country name filed can't be empty.</p> : <p>We can't find country named <strong>{props.userValue}</strong>. Please type the country name again.</p>}
                <button onClick={props.closeErrorMessage}>close</button>
            </div>
        </>
    );
};

export default ErrorMessage;
