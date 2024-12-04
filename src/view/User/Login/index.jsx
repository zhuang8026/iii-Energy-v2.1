import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// components
import Loading from '@/components/ui/Loading';

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

    const login = () => {
        console.log('login');
        openLoading('login...');

        setCookie('token', '1234567890');
        setTimeout(() => {
            navigate({
                ...location,
                pathname: `/main`
            });
            closeLoading();
        }, 3000);
    };
    return (
        <div className={cx('login')}>
            <div className={cx('login_form')}>
                <h1>Login</h1>
                <div>
                    <input type="text" name="u" placeholder="Username" required="required" />
                    <input type="password" name="p" placeholder="Password" required="required" />
                    <button
                        type="button"
                        className={cx('btn', 'btn-primary', 'btn-block', 'btn-large')}
                        onClick={() => login()}
                    >
                        Let me in.
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
