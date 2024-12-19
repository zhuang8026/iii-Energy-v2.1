import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { useSlideUpWindowAnimate } from '@/components/global/SlideUp';

import './style_module.scss';

const NewsReport = () => {
    const { openSlideUp, closeSlideUp } = useSlideUpWindowAnimate();

    const openNewsReport = ({ component = null }) => {
        openSlideUp({ component: component });
    };

    const closeNewsReport = () => {
        closeSlideUp();
    };

    return { openNewsReport, closeNewsReport };
};

export default NewsReport;
