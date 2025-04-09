import React, { useState, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// uuid 唯一碼生成
import { v4 as uuidv4 } from 'uuid';

import { useFullWindowAnimate } from '@/components/global/FullWindow';

// css
// import classes from './style.module.scss';
// import classNames from 'classnames/bind';
// const cx = classNames.bind(classes);

const usePopUp = () => {
    const { openAnimate, closeAnimate } = useFullWindowAnimate();

    const popupIdRef = useRef(uuidv4()); // ✅ UUID 只生成一次
    // const popupId = popupIdRef.current;
    const popupId = 'normal-popup'; // 生成唯一 ID

    const openPopUp = ({ component = null }) => {
        openAnimate({ id: popupId, component: component });
        document.body.style.overflow = 'hidden'; // 禁用捲動
    };

    const closePopUp = () => {
        closeAnimate(popupId); // 只關掉 popup，不會動 loading
        document.body.style.overflow = ''; // 恢復捲動
    };

    return { openPopUp, closePopUp, popupId };

    // return <div className={cx('popUp')}>{component}</div>;
};

export default usePopUp;
