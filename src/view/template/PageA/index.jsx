import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './style_module.scss';

const PageA = () => {
    return (
        <div className="home1">
            <h1>PageA Page</h1>
        </div>
    );
};

export default PageA;
