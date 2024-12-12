import React, { useState, Suspense, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

// utils
import { getCookie, setCookie, eraseCookie } from '@/utils/cookie';

// @mui - icon
// import logo from '@/assets/images/icon-logo.png';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';

// components
import Loading from '@/components/ui/Loading';

// redux
import { useDispatch } from 'react-redux';
import { logout } from '@/store/userSlice';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Menu = ({ menuList, openMenu, onToggleMenu }) => {
    const dispatch = useDispatch();
    const cardRef = useRef(null); // 用來綁定卡片 DOM 節點
    const { t, i18n } = useTranslation();
    const navigate = useNavigate(); // Properly define navigate here
    const location = useLocation(); // This gives the current location
    const { openLoading, closeLoading } = Loading();

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

    // 點擊外部區域的處理函數
    const handleClickOutside = event => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
            onToggleMenu(false); // 點擊外部時隱藏卡片
        }
    };

    const handleLogout = () => {
        openLoading('logout...');

        setTimeout(() => {
            dispatch(logout()); // 觸發登出動作
            closeLoading();
            navigate('/login');
        }, 1000);
    };

    useEffect(() => {
        // 監聽 document 的點擊事件
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // 清理事件監聽器
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setCurrentPath(location.pathname);
        onToggleMenu(false); // 點擊外部時隱藏卡片
    }, [location]);

    return (
        <nav
            ref={cardRef} // 綁定 DOM 節點
            className={cx('nav-menu', openMenu ? 'fade-in' : 'fade-out')}
        >
            <div className={cx('menu', 'menu-root')}>
                {/* company logo */}
                {/* <div className={cx('logo')}>
                    <img src={logo} alt="logo" />
                </div>
                <hr /> */}

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
                        <li>
                            <div className={cx('menu-link')} onClick={() => handleLogout()}>
                                <ExitToAppTwoToneIcon />
                                <span>登出</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <hr />

                {/* user control */}
                <div className={cx('menu-user')}>
                    <div className={cx('user-avatar')}>
                        <div className={cx('avatar')}></div>
                    </div>
                    <div className={cx('user')}>
                        <div className={cx('name')}>William.Chuang</div>
                        <div className={cx('account')}>William_Chuang@iii.org.tw</div>
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
