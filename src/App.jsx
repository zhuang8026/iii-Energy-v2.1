import React, { useState, Suspense, useEffect, useContext, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

// mui icon
import ElectricalServicesTwoToneIcon from '@mui/icons-material/ElectricalServicesTwoTone';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';

// 翻譯
import { useTranslation } from 'react-i18next'; // 翻譯

import { getCookie, setCookie } from '@/utils/cookie';

// config
import routes from '@/router/routes';
import globalRoutes from '@/router/global_routes';

// components
import NoMatch from '@/components/global/NoMatch';
import Menu from '@/components/global/Menu';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';

// global
import { FullWindowAnimateProvider, FullPopWindow, useFullWindowAnimate } from '@/components/global/FullWindow';

import '@/assets/scss/_all.scss';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

function App() {
    const navigate = useNavigate(); // Properly define navigate here
    const location = useLocation(); // This gives the current location

    const { t, i18n } = useTranslation(); // t: 用來翻譯
    // i18n: 翻譯管理，可轉換語系

    const [layouts, setLayouts] = useState([]);
    const [auth, setAuth] = useState(true);
    const [menuList, setMenuList] = useState([
        {
            main: 'menu.overall',
            children: [
                {
                    name: 'menu.daily_usage_tracking',
                    path: '/main',
                    icon: <ElectricalServicesTwoToneIcon />
                },
                {
                    name: 'menu.energy_report',
                    path: '/main/energy_report',
                    icon: <LeaderboardTwoToneIcon />
                },
                {
                    name: 'menu.energy_mangement',
                    path: '/main/energy_mangement',
                    icon: <LeaderboardTwoToneIcon />
                }
            ]
        },
        {
            main: 'menu.member_management',
            children: [
                {
                    name: 'menu.bind_device',
                    path: '/member/bind_device',
                    icon: <BorderColorTwoToneIcon />
                },
                {
                    name: 'menu.data_modification',
                    path: '/member/data_modification',
                    icon: <BorderColorTwoToneIcon />
                },
                {
                    name: 'menu.password_change',
                    path: '/member/password_change',
                    icon: <VpnKeyTwoToneIcon />
                }
            ]
        }
    ]);

    const { pathname } = useLocation(); // Move useLocation here

    // menu (layout & url)
    const getLayouts = () => {
        console.log(`畫面區塊異動中, auth:${auth}, path-name:${pathname}`);
        if (auth) {
            const layoutPath = location.pathname.split('/')[1].toUpperCase();

            // master router (not included: globalRoutes)
            const matchedRoute = routes.find(route => route.path.split('/')[1].toUpperCase() === layoutPath);

            if (matchedRoute) {
                setLayouts(matchedRoute.layouts); // 更新 layouts
            } else {
                setLayouts([]); // 没有匹配的 route 时，清空 layouts
            }
        } else {
            // no auth (token error)
            setLayouts([]);
        }
    };

    useEffect(() => {
        let token = getCookie('token');
        if (!token) {
            navigate({
                ...location,
                pathname: `/login`
            });
        }
    }, [pathname]);

    useEffect(() => {
        getLayouts();
    }, [pathname]); // pathname 变化时也调用 getLayouts

    useEffect(() => {
        // 查找当前路径的路由
        const currentRoute = routes.find(route => route.path === pathname) || {};
        // console.log(currentRoute);
        // 如果当前路径的路由有 `title` 属性，设置为页面标题
        if (currentRoute.title) {
            document.title = t(`menu.${currentRoute.title}`);
        } else {
            document.title = t('title.default'); // 设置默认标题
        }
    }, [pathname, t]);

    return (
        <div id={cx('app')}>
            {/* menu */}
            {layouts.indexOf('menu') >= 0 && (
                <Suspense fallback={<></>}>
                    <Menu menuList={menuList} />
                </Suspense>
            )}
            <div className={cx(layouts.indexOf('menu') >= 0 ? 'main' : 'full')}>
                {/* header */}
                {layouts.indexOf('header') >= 0 ? (
                    <Suspense fallback={<></>}>
                        <Header />
                    </Suspense>
                ) : null}

                {/* main */}
                <Suspense fallback={<></>}>
                    <Routes location={location}>
                        {/* <Navigate> 不能直接放置在 <Routes> 的頂層下，它必須作為一個 <Route> 的 element 來使用。 */}
                        <Route path="/" element={<Navigate to="/main" replace />} />

                        {/* global routes */}
                        {globalRoutes.map((route, key) => {
                            return (
                                <Route
                                    key={`route_${key}`}
                                    exact={route.exact}
                                    path={route.path}
                                    element={<route.component routeData={route} />}
                                    sensitive
                                />
                            );
                        })}

                        {/* private routes */}
                        {routes.map((route, key) => {
                            return (
                                <Route
                                    key={`route_${key}`}
                                    exact={route.exact}
                                    path={route.path}
                                    element={<route.component routeData={route} />}
                                    sensitive
                                />
                            );
                        })}
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                </Suspense>

                {/* footer */}
                {layouts.indexOf('footer') >= 0 ? (
                    <Suspense fallback={<></>}>
                        <Footer />
                    </Suspense>
                ) : null}
            </div>
        </div>
    );
}

function AppWrapper() {
    return (
        <BrowserRouter>
            <FullWindowAnimateProvider>
                <App />
                <FullPopWindow />
            </FullWindowAnimateProvider>
        </BrowserRouter>
    );
}

export default AppWrapper;
