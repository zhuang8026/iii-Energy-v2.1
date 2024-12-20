import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

// Context
const SlideUpWindowAnimateContext = createContext();

// Provider Component using Hooks
export const SlideUpWindowAnimateProvider = ({ children }) => {
    const [animateObj, setAnimateObj] = useState(null);

    const openSlideUp = obj => {
        setAnimateObj(obj);
        document.body.style.overflow = 'hidden'; // 禁用捲動
    };

    const closeSlideUp = () => {
        setAnimateObj(null);
        document.body.style.overflow = ''; // 恢復捲動
    };

    const slideUpWindowData = {
        animateObj,
        openSlideUp,
        closeSlideUp
    };

    return (
        <SlideUpWindowAnimateContext.Provider value={slideUpWindowData}>
            {children}
        </SlideUpWindowAnimateContext.Provider>
    );
};

// Custom Hook for accessing the context
export const useSlideUpWindowAnimate = () => {
    const context = useContext(SlideUpWindowAnimateContext);
    if (!context) {
        throw new Error('useSlideUpWindowAnimate must be used within a SlideUpWindowAnimateProvider');
    }
    return context;
};

// Pop Window Component
export const SlideUpWindow = () => {
    const windowRef = useRef(null); // 用來綁定 DOM 節點
    const { animateObj, closeSlideUp } = useSlideUpWindowAnimate();

    // 點擊外部區域的處理函數
    const handleClickOutside = event => {
        if (windowRef.current && !windowRef.current.contains(event.target)) {
            closeSlideUp(); // 关闭对话框
        }
    };

    // 點擊外部區域的處理函數
    useEffect(() => {
        // 監聽 document 的點擊事件
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // 清理事件監聽器
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 添加键盘事件监听
    useEffect(() => {
        const handleKeyDown = event => {
            if (event.key === 'Escape') {
                console.log('Escape');
                closeSlideUp(); // 关闭对话框
            }
        };

        if (animateObj) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [animateObj]);

    return (
        <div
            ref={windowRef} // 綁定 DOM 節點
            className={cx('silderUpContainer', animateObj && 'slide_up_window')}
        >
            {animateObj?.component}
        </div>
    );

    // return null;
};
