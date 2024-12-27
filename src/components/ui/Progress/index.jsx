import React, { useState, useEffect } from 'react';

//翻譯
import { useTranslation } from 'react-i18next';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Progress = ({ title = '', kwh = 0, percent = 0, overPercent = 0, bgColor = '' }) => {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <div className={cx('target')}>
                {title}
                <div className={cx('progress-number')}>
                    {kwh} {t('kwh')}
                </div>
            </div>
            <div className={cx('progress')}>
                <div className={cx('progress-bar')}>
                    <div className={cx('bar-mian')}>
                        <div className={cx('bar-current')} style={{ width: `${percent}%`, backgroundColor: bgColor }} />
                        <div className={cx('bar-number')}>{percent}%</div>
                    </div>
                    {overPercent > 0 && (
                        <div className={cx('bar-mian')}>
                            <div className={cx('bar-current', 'warning')} style={{ width: `${overPercent}%` }} />
                            <div className={cx('bar-number')}>{overPercent}%</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Progress;
