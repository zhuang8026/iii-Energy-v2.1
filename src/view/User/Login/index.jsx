import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// components
import Loading from '@/components/ui/Loading';
import PopUp from '@/components/global/PopUp';
import InputPrompt from '@/components/ui/InputPrompt';
import NormalPrompt from '@/components/ui/NormalPrompt';
import UIInput from '@/components/ui/UIInput';

// @mui
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import Button from '@mui/material/Button';

// utils
// import { getCookie, setCookie } from '@/utils/cookie';

// icon
import Logo from '@/assets/images/icon-logo.svg';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '@/store/userSlice';

// api
import { userPasswordForget } from '@/api/api';

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

    const openErrorHint = (title, constent) => {
        openPopUp({
            component: <NormalPrompt title={title} subtitle="" constent={[`${constent}`]} />
        });
    };

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

    const resetPassword = async val => {
        console.log('send email:', val);
        // call API
        openLoading('login...');
        const res = await userPasswordForget(val);
        alert(`status: ${res.code}`);
        closeLoading();
    };

    const handleLogin = async () => {
        openLoading('登入中...');

        try {
            // dispatch 登入操作
            const result = await dispatch(loginAsync(userInfo));
            // 確保登入成功後，關閉 loading 並導航
            if (result.type === 'user/login/fulfilled') {
                closeLoading(); // 關閉 loading
                navigate('/main'); // 導向到 /main
            }
        } catch (error) {
            closeLoading(); // 出錯時也要關閉 loading
            console.log('登入錯誤:', error);
            openErrorHint('登入問題', error);
        }
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
