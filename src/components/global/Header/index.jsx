import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

// enum 映射
import { COOKIE_NAME } from '@/assets/enum/enum';
import { getCookie, setCookie } from '@/utils/cookie';

// images
import logo from '@/assets/images/icon-logo.svg';
import taiwan from '@/assets/images/icon-taiwan.svg';
import english from '@/assets/images/icon-english.svg';

// config
import routes from '@/router/routes';

// components
// import Menu from '@/components/global/Menu';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const LANG_ICON = {
    'en-US': english,
    'zh-TW': taiwan
};

const LANG_LIST = [
    {
        name: 'English',
        icon: english,
        type: 'en-US'
    },
    {
        name: '繁體中文',
        icon: taiwan,
        type: 'zh-TW'
    }
];

const Header = ({ setOpenMenu }) => {
    const { t, i18n } = useTranslation();
    const { pathname } = useLocation(); // Move useLocation here

    const [visible, setVisible] = useState(false);
    const [languageIcon, setLanguageIcon] = useState(taiwan); // 默認為 繁體中文(一)
    const [head, setHead] = useState({
        main: '',
        child: ''
    });
    const [isScrolled, setIsScrolled] = useState(false); // State for scroll detection

    // 切換語言並存入 cookie
    const changeLanguage = lng => {
        setVisible(!visible);
        i18n.changeLanguage(lng);
        setCookie(COOKIE_NAME.LANG, lng);
        setLanguageIcon(LANG_ICON[lng]);
    };

    // Add scroll event listener to change header background on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 5) {
                // You can adjust the threshold
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // 設定語言
        let langIconName = getCookie(COOKIE_NAME.LANG) || 'zh-TW'; // 默認為 繁體中文(一)
        setLanguageIcon(LANG_ICON[langIconName]);

        if (!pathname.includes('login')) {
            const pathObj = routes.find(item => item.path === pathname);
            setHead({
                main: `menu.${pathObj.main}`,
                child: `menu.${pathObj.title}`
            });
        }
    }, [pathname]);

    return (
        <div className={cx('header', isScrolled && 'scrolled')}>
            <div className={cx('title')}>
                <img alt="" src={logo} />
                <p>
                    <HomeTwoToneIcon fontSize="small" /> / {t(head.main)} / {t(head.child)}
                </p>
                {/* {t(head.child)} */}
            </div>
            <div className={cx('setting')}>
                {/* 顯示語言選單 */}
                <div className={cx('button', 'language')}>
                    <img alt="" src={languageIcon} onClick={() => setVisible(!visible)} />
                    {visible && (
                        <ul className={cx('language_list')}>
                            {LANG_LIST.map((item, index) => (
                                <li key={index} className={cx(item.type === i18n.language && 'active')} onClick={() => changeLanguage(item.type)}>
                                    <img alt="" src={item.icon} />
                                    {item.name}
                                    <CheckCircleTwoToneIcon
                                        fontSize="small"
                                        style={{ fill: item.type !== i18n.language && 'transparent' }} //
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={cx('button')} onClick={() => setOpenMenu(true)}>
                    <AccountCircleTwoToneIcon />
                </div>
                {/* <div className={cx('button')}>
                    <CircleNotificationsTwoToneIcon />
                </div> */}
            </div>
        </div>
    );
};

export default Header;
