import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// components
import Loading from '@/components/ui/Loading';
import PopUp from '@/components/global/PopUp';
import InputPrompt from '@/components/ui/InputPrompt';
import UIInput from '@/components/ui/UIInput';

// @mui
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import Button from '@mui/material/Button';

// utils
// import { getCookie, setCookie } from '@/utils/cookie';

// icon
import Logo from '@/assets/images/icon-logo.svg';

// redux
import { useDispatch } from 'react-redux';
import { login } from '@/store/userSlice';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Properly define navigate here
    const location = useLocation(); // This gives the current location
    const { openLoading, closeLoading } = Loading();
    const { openPopUp, closePopUp } = PopUp();
    const [canClick, setCanClick] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('template@gmail.com'); // 默認值
    const [userInfo, setUserInfo] = useState({
        account: '',
        password: ''
    });

    const openForgetPopUp = () => {
        openPopUp({
            component: (
                <InputPrompt
                    title="忘記密碼"
                    constent={['請輸入註冊時使用的電子信箱，稍後您將會收到密碼重設信件。']}
                    value={email}
                    component={<UIInput type="email" name="email" id="email" placeholder="電子信箱" required />}
                    onClick={val => resetPassword(val)}
                />
            )
        });
    };

    const resetPassword = val => {
        console.log('send email:', val);
        // call API
        openLoading('login...');
        setTimeout(() => {
            closeLoading();
        }, 1000);
    };

    const handleLogin = () => {
        console.log('login:', userInfo);
        openLoading('login...');

        // call API
        dispatch(login({ name: 'Admin', role: 'Administrator' })); // 傳入用戶資料
        setTimeout(() => {
            navigate({
                ...location,
                pathname: `/main`
            });
            closeLoading();
        }, 1000);
    };

    useEffect(() => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(userInfo.account) && userInfo.account != '' && userInfo.password != '') {
            setCanClick(true);
        } else {
            setCanClick(false);
        }
    }, [userInfo.account, userInfo.password]);

    return (
        <div className={cx('login')}>
            <img src={Logo} alt="logo" className={cx('logo')} />

            <div className={cx('login_form')}>
                <h1>用戶登入</h1>
                <div>
                    <div className={cx('form-group')}>
                        <label htmlFor="account">帳號</label>
                        <UIInput
                            type="text"
                            name="account"
                            id="account"
                            placeholder="請輸入用戶名稱"
                            required
                            onChange={e => setUserInfo({ ...userInfo, account: e.target.value })}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <div className={cx('form-group-password-label')}>
                            <label htmlFor="password">密碼</label>
                            <p className={cx('forget')} onClick={() => openForgetPopUp()}>
                                忘記密碼
                            </p>
                        </div>
                        <div className={cx('form-group-password')}>
                            <UIInput
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="請輸入用戶密碼"
                                required
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
                        onClick={() => canClick && handleLogin()}
                    >
                        登入
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
