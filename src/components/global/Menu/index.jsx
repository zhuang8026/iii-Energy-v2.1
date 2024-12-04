import React, { useState, Suspense, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

// utils
// import { getCookie, setCookie } from '@/utils/cookie';

// icon
// import logo from '@/assets/images/icon-logo.svg';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Menu = ({ menuList }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate(); // Properly define navigate here
    const location = useLocation(); // This gives the current location

    const [currentPath, setCurrentPath] = useState('/main');

    /**
     * Handles the click event of a menu item.
     * @param {string} key The key of the menu item.
     * @param {string} path The path of the menu item.
     */
    const clickMenu = (key, path) => {
        console.log(key, path);
        setCurrentPath(path);
        navigate({
            ...location,
            pathname: `${path}`
        });
    };

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    return (
        <nav className={cx('nav-menu')}>
            <div className={cx('menu', 'menu-root')}>
                {/* company logo */}
                <div className={cx('logo')}>
                    {/* <img src={logo} alt="logo" /> */}
                    logo
                </div>
                <hr />

                {/* menu list */}
                <div className={cx('menu-body')}>
                    <ul>
                        {menuList.map((item, index) => (
                            <li key={index}>
                                <p className={cx('menu-name')}>{t(item.main)}</p>
                                {item.children.map((item, idx) => (
                                    <div
                                        className={cx('menu-link', currentPath === item.path && 'menu_active')}
                                        onClick={() => clickMenu(index, item.path)}
                                        key={idx}
                                    >
                                        {item.icon}
                                        <span>{t(item.name)}</span>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
                <hr />

                {/* user control */}
                <div className={cx('menu-user')}>
                    <div className={cx('user-avatar')}>
                        <div className={cx('avatar')}></div>
                    </div>
                    <div className={cx('user')}>
                        <div className={cx('name')}  onClick={() => navigate('/login')}>William.Chuang</div>
                        <div className={cx('account')} >William_Chuang@iii.org.tw</div>
                        {/* <div className={cx('logout')} onClick={() => navigate('/login')}>
                            <span>Logout</span>
                            <ExitToAppIcon />
                        </div> */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Menu;
