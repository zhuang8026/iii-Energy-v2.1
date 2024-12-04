import React, { createContext, useState, useContext } from 'react';
import classes from './styles.module.scss';

// Context
const FullWindowAnimateContext = createContext();

// Provider Component using Hooks
export const FullWindowAnimateProvider = ({ children }) => {
    const [animateObj, setAnimateObj] = useState(null);

    const openAnimate = obj => {
        setAnimateObj(obj);
    };

    const closeAnimate = () => {
        setAnimateObj(null);
    };

    const fullWindowData = {
        animateObj,
        openAnimate,
        closeAnimate
    };

    return <FullWindowAnimateContext.Provider value={fullWindowData}>{children}</FullWindowAnimateContext.Provider>;
};

// Custom Hook for accessing the context
export const useFullWindowAnimate = () => {
    const context = useContext(FullWindowAnimateContext);
    if (!context) {
        throw new Error('useFullWindowAnimate must be used within a FullWindowAnimateProvider');
    }
    return context;
};

// Pop Window Component
export const FullPopWindow = () => {
    const { animateObj } = useFullWindowAnimate();

    if (animateObj) {
        return <div className={classes.popAnimateContainer}>{animateObj.component}</div>;
    }

    return null;
};
