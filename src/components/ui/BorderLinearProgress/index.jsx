import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { styled, createTheme } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const BorderLinearProgress = ({ name, value, color = '#20A2A0' }) => {
    const BorderLinearProgressUI = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[200],
            ...theme.applyStyles('dark', {
                backgroundColor: theme.palette.grey[800]
            })
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: color,
            ...theme.applyStyles('dark', {
                backgroundColor: color
            })
        }
    }));

    return (
        <div className={cx('borderLinearProgressUI')}>
            <h5>{name}</h5>
            <BorderLinearProgressUI variant="determinate" value={value} />
        </div>
    );
};

export default BorderLinearProgress;
