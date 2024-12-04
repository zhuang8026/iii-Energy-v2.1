// Home.js
import React from 'react';
import { useLocation } from 'react-router-dom';

import './style_module.scss';

const ErrorPage = () => {
    // let location = useLocation();
    // console.log('Home:', location);
    return (
        <div className="home">
            <h1>Error Page</h1>
        </div>
    );
};

export default ErrorPage;
