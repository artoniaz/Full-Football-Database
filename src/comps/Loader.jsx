
import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () => {
    return (
        <Loader
            type="Oval"
            height={80}
            width={80}
            color="#bada55"
            className="loader"
        />
    )
}

export default Spinner;
