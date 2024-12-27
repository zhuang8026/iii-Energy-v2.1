import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// components
import PopUp from '@/components/global/PopUp';
// import UIInput from '@/components/ui/UIInput';

// @mui
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Button from '@mui/material/Button';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const NormalPrompt = ({
    title = '', // 標題
    subtitle = '', // 副標題
    constent = [], // 內容
    value = '', // 預設值
    onClick = () => {} // 確定按鈕
}) => {
    const { closePopUp } = PopUp();
    const [val, setVal] = useState(value); // 輸入的值

    return (
        <div className={cx('windows')}>
            <div className={cx('close-btn')} onClick={() => closePopUp()}>
                <CloseTwoToneIcon />
            </div>

            <h3>{title}</h3>
            <h4>{subtitle}</h4>

            <div className={cx('windows-prompt')}>
                {constent &&
                    constent.map((str, index) => (
                        <p className={cx('windows-content')} key={index}>
                            {str}
                        </p>
                    ))}
            </div>
            <div className={cx('windows-btn')}>
                <Button
                    variant="contained"
                    sx={{ width: '50%', height: '100%', backgroundColor: '#20a2a0', borderRadius: '100px' }}
                    onClick={() => closePopUp()}
                >
                    否
                </Button>
                <Button
                    variant="contained"
                    sx={{ width: '50%', height: '100%', borderRadius: '100px' }}
                    onClick={() => {
                        onClick(val);
                        closePopUp();
                    }}
                >
                    是
                </Button>
            </div>
        </div>
    );
};

export default NormalPrompt;
