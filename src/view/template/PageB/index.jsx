import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import './style_module.scss';

const PageB = () => {
    return (
        <div className="home2">
            <h1>PageB Page</h1>
        </div>
    );
};

export default PageB;
