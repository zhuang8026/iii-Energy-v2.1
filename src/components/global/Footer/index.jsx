import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Footer = () => {
    return (
        <div className={cx('footer')}>
            <div className={cx('left')}>
                <p>版權所有 ©2025財團法人資訊工業策進會，未經允許，請勿轉載</p>
                <p>聯絡信箱：vickyli@iii.org.tw；聯繫電話：(02)66073757</p>
            </div>
            <div className={cx('right')}>
                <p>隱私權及資訊宣告</p>
                <p>v3.0.1</p>
            </div>
        </div>
    );
};

export default Footer;
