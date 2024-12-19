import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

//翻譯
import { useTranslation } from 'react-i18next';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const MonthCard = ({ data, onClick = () => {} }) => {
    const { t } = useTranslation();

    const clickMonthCard = () => {
        onClick(data);
    };

    return (
        <div className={cx('month-card')} onClick={() => clickMonthCard()}>
            2024 {t('energyReport.year')}
            <div className={cx('report')}>
                <div className={cx('report-item-number')}>
                    <span>{t(`energyReport.${data}`)}</span>
                </div>
            </div>
        </div>
    );
};

export default MonthCard;
