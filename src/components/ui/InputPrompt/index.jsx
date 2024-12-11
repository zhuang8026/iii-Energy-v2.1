import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// components
import PopUp from '@/components/global/PopUp';
import UIInput from '@/components/ui/UIInput';

// @mui
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Button from '@mui/material/Button';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const InputPrompt = ({
    title = '', // 標題
    constent = [], // 內容
    value = '', // 預設值
    component = null, // 傳入的元件，必須是輸入類型元件
    onClick = () => {} // 確定按鈕
}) => {
    const { closePopUp } = PopUp();
    const [inputVal, setInputVal] = useState(value); // 輸入的值

    return (
        <div className={cx('windows')}>
            <div className={cx('close-btn')} onClick={() => closePopUp()}>
                <CloseTwoToneIcon />
            </div>

            <h3>{title}</h3>
            {constent &&
                constent.map((str, index) => (
                    <p className={cx('windows-content')} key={index}>
                        {str}
                    </p>
                ))}

            {component &&
                React.cloneElement(component, {
                    value: inputVal,
                    onChange: e => setInputVal(e.target.value) // 處理輸入變化
                })}

            <div className={cx('windows-btn')}>
                <Button
                    variant="contained"
                    sx={{ width: '50%', height: '100%', backgroundColor: '#20a2a0', borderRadius: '100px' }}
                    onClick={() => closePopUp()}
                >
                    取消
                </Button>
                <Button
                    variant="contained"
                    sx={{ width: '50%', height: '100%', borderRadius: '100px' }}
                    onClick={() => onClick(inputVal)}
                    disabled={component && !inputVal}
                >
                    確定
                </Button>
            </div>
        </div>
    );
};

export default InputPrompt;
