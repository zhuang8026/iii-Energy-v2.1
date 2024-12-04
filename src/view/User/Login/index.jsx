import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// components
import Loading from '@/components/ui/Loading';

// @mui
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import Button from '@mui/material/Button';

// utils
import { getCookie, setCookie } from '@/utils/cookie';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Login = () => {
    const navigate = useNavigate(); // Properly define navigate here
    const location = useLocation(); // This gives the current location
    const { openLoading, closeLoading } = Loading();
    const [canClick, setCanClick] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [userInfo, setUserInfo] = useState({
        account: '',
        password: ''
    });

    const login = () => {
        console.log('login:', userInfo);
        openLoading('login...');

        // setCookie('token', '1234567890');
        // setTimeout(() => {
        //     navigate({
        //         ...location,
        //         pathname: `/main`
        //     });
        //     closeLoading();
        // }, 3000);
    };

    useEffect(() => {
        if (userInfo.account != '' && userInfo.password != '') {
            setCanClick(true);
        } else {
            setCanClick(false);
        }
    }, [userInfo.account, userInfo.password]);

    return (
        <div className={cx('login')}>
            <div className={cx('login_form')}>
                <h1>用戶登入</h1>
                <div>
                    <div className={cx('form-group')}>
                        <label htmlFor="account">帳號</label>
                        <input
                            type="text"
                            name="account"
                            id="account"
                            placeholder="請輸入用戶名稱"
                            required="required"
                            onChange={e => setUserInfo({ ...userInfo, account: e.target.value })}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-group-password-label')}>
                            <label htmlFor="password">密碼</label>
                            <p className={cx('forget')}>忘記密碼</p>
                        </div>
                        <div className={cx('form-group-password')}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                className={cx('password')}
                                placeholder="請輸入用戶密碼"
                                required="required"
                                onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
                            />
                            <RemoveRedEyeTwoToneIcon
                                sx={{
                                    position: 'absolute',
                                    right: '20px',
                                    top: 'calc(50% - 12px)',
                                    cursor: 'pointer',
                                    color: '#a5a5a5'
                                }}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>

                    <Button
                        variant="contained"
                        sx={{
                            width: '100%',
                            fontSize: '20px',
                            backgroundColor: '#20a2a0',
                            borderRadius: '100px',
                            padding: '14px 0',
                            marginTop: '20px'
                        }}
                        disabled={!canClick}
                        onClick={() => canClick && login()}
                    >
                        登入
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
