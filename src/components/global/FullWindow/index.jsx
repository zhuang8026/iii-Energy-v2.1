import React, { createContext, useState, useContext } from 'react';
import classes from './styles.module.scss';

const FullWindowAnimateContext = createContext();

// Provider
export const FullWindowAnimateProvider = ({ children }) => {
    const [animateStack, setAnimateStack] = useState([]);

    const openAnimate = ({ id, component }) => {
        setAnimateStack(prev => {
            // 若有相同 ID，先移除再加進來（避免重複）
            const filtered = prev.filter(item => item.id !== id);
            return [...filtered, { id, component }];
        });
    };

    const closeAnimate = (id = null) => {
        setAnimateStack(prev => {
            if (!id) return prev.slice(0, -1); // 若沒給 id，移除最後一個
            return prev.filter(item => item.id !== id); // 否則移除指定 id
        });
    };

    const fullWindowData = {
        animateStack,
        openAnimate,
        closeAnimate
    };

    return <FullWindowAnimateContext.Provider value={fullWindowData}>{children}</FullWindowAnimateContext.Provider>;
};

// Hook
export const useFullWindowAnimate = () => {
    const context = useContext(FullWindowAnimateContext);
    if (!context) {
        throw new Error('useFullWindowAnimate must be used within a FullWindowAnimateProvider');
    }
    return context;
};

// UI Component (可以只渲染最上層一個，也可以改為全部)
export const FullPopWindow = () => {
    const { animateStack } = useFullWindowAnimate();

    if (animateStack.length === 0) return null;

    const top = animateStack[animateStack.length - 1];

    return <div className={classes.popAnimateContainer}>{top.component}</div>;
};
