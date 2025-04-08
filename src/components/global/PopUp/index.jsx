import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { useFullWindowAnimate } from '@/components/global/FullWindow';

// css
// import classes from './style.module.scss';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(classes);

const PopUp = () => {
    const { openAnimate, closeAnimate } = useFullWindowAnimate();
    const popupId = 'normal-popup';

    const openPopUp = ({ component = null }) => {
        openAnimate({ id: popupId, component: component });
        document.body.style.overflow = 'hidden'; // 禁用捲動
    };

    const closePopUp = () => {
        closeAnimate(popupId); // 只關掉 popup，不會動 loading
        document.body.style.overflow = ''; // 恢復捲動
    };

    return { openPopUp, closePopUp };

    // return <div className={cx('popUp')}>{component}</div>;
};

export default PopUp;
