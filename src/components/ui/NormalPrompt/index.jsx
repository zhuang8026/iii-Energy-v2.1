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
    closebtn = false,
    onClick = null, // 確定按鈕
    onCloseClick = null // 取消按鈕
}) => {
    const { closePopUp } = PopUp();
    const [val, setVal] = useState(value); // 輸入的值

    const handleClick = () => {
        console.log(typeof onClick === 'function');
        if (typeof onClick === 'function') {
            onClick(val); // 調用 onClick 傳遞輸入值
        }
        closePopUp(); // 如果需要在任何情況下關閉彈窗，可以保留
    };

    const handleCloseClick = () => {
        console.log(typeof onCloseClick === 'function');
        if (typeof onCloseClick === 'function') {
            onCloseClick(val); // 調用 onClick 傳遞輸入值
        }
        closePopUp(); // 如果需要在任何情況下關閉彈窗，可以保留
    };

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
            <div className={cx('windows-btn', closebtn && 'windows-close')}>
                {closebtn ? (
                    <Button
                        variant="contained"
                        sx={{ width: '100%', height: '100%', borderRadius: '100px' }}
                        onClick={() => closePopUp()}
                    >
                        已回覆
                    </Button>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            sx={{ width: '50%', height: '100%', backgroundColor: '#20a2a0', borderRadius: '100px' }}
                            onClick={() => handleCloseClick()}
                        >
                            否
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ width: '50%', height: '100%', borderRadius: '100px' }}
                            onClick={() => handleClick()}
                        >
                            是
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default NormalPrompt;
