import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import LineChart from '@/components/ui/LineChart';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const LineChartWindows = ({ closePopUp }) => {
    return (
        <div className={cx('lineChart-windows')}>
            <h3>近期用電趨勢</h3>
            <LineChart />

            <div className={cx('close-btn')} onClick={() => closePopUp()}>
                <CloseTwoToneIcon />
            </div>
        </div>
    );
};

export default LineChartWindows;
