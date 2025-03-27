import React, { useState, Suspense, useEffect, useContext, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

// mui icon
import ElectricalServicesTwoToneIcon from '@mui/icons-material/ElectricalServicesTwoTone';
import LeaderboardTwoToneIcon from '@mui/icons-material/LeaderboardTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import ElectricBoltTwoToneIcon from '@mui/icons-material/ElectricBoltTwoTone';
import PhonelinkTwoToneIcon from '@mui/icons-material/PhonelinkTwoTone';

// 翻譯
import { useTranslation } from 'react-i18next'; // 翻譯

import { getCookie, setCookie } from '@/utils/cookie';

// config
import routes from '@/router/routes';
import globalRoutes from '@/router/global_routes';

// main components
import Menu from '@/components/global/Menu';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import NoMatch from '@/components/global/NoMatch';

// components
import PopUp from '@/components/global/PopUp';
import Survey from '@/view/Survey';

// global
import { FullWindowAnimateProvider, FullPopWindow, useFullWindowAnimate } from '@/components/global/FullWindow';
import { SlideUpWindowAnimateProvider, SlideUpWindow, useSlideUpWindowAnimate } from '@/components/global/SlideUp';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

function App() {
    const navigate = useNavigate(); // Properly define navigate here
    const location = useLocation(); // This gives the current location

    const { openPopUp, closePopUp } = PopUp();

    const { t, i18n } = useTranslation(); // t: 用來翻譯
    // i18n: 翻譯管理，可轉換語系

    const [layouts, setLayouts] = useState([]);
    const [auth, setAuth] = useState(false); // token status
    const [authInitialized, setAuthInitialized] = useState(false); // token 保護性路由元件
    const [openMenu, setOpenMenu] = useState(false);
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
                    path: '/main/news',
                    icon: <LeaderboardTwoToneIcon />
                },
                {
                    name: 'menu.energy_mangement',
                    path: '/main/remote',
                    icon: <ElectricBoltTwoToneIcon />
                }
            ]
        },
        {
            main: 'menu.member_management',
            children: [
                {
                    name: 'menu.bind_device',
                    path: '/manage/bind_device',
                    icon: <PhonelinkTwoToneIcon />
                },
                {
                    name: 'menu.data_modification',
                    path: '/manage/survey',
                    icon: <BorderColorTwoToneIcon />
                },
                {
                    name: 'menu.password_change',
                    path: '/member/password',
                    icon: <VpnKeyTwoToneIcon />
                }
            ]
        }
    ]);

    const { pathname } = useLocation(); // Move useLocation here

    const openEditPopUp = () => {
        openPopUp({
            component: (
                <div>
                    <Survey closePopUp={closePopUp} />
                </div>
            )
        });
    };
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

    // 生成路由
    const GenerateRoutes = routes => {
        return routes.map((route, key) => (
            <Route
                key={`route_${key}`}
                path={route.path}
                exact={route.exact}
                element={<route.component routeData={route} />}
                sensitive
            />
        ));
    };

    useEffect(() => {
        // openEditPopUp();
    }, []);

    useEffect(() => {
        if (auth) {
            getLayouts();
        } else {
            setLayouts([]);
        }
    }, [auth, pathname]); // 合并更新 layouts 的逻辑

    useEffect(() => {
        // const token = getCookie('iii_token');
        const token = localStorage.getItem('ENERGY');
        const isAuthenticated = !!token;
        setAuth(isAuthenticated);
        setAuthInitialized(true); // 初始化完成
        if (!isAuthenticated) {
            navigate('/login', { replace: true });
        }

        // 查找当前路径的路由
        const currentRoute =
            routes.find(route => route.path === pathname) || globalRoutes.find(route => route.path === pathname);
        // 如果当前路径的路由有 `title` 属性，设置为页面标题
        if (currentRoute?.title) {
            document.title = t(`menu.${currentRoute.title}`);
        } else {
            document.title = t('title.default'); // 设置默认标题
        }
    }, [pathname, t]);

    // 保護性路由
    if (!authInitialized) {
        return <div>loading...</div>; // 或其他載入提示
    }

    return (
        <div id={cx('app')}>
            {/* menu */}
            {layouts.includes('menu') && (
                <Suspense fallback={<></>}>
                    <Menu menuList={menuList} openMenu={openMenu} onToggleMenu={isOpen => setOpenMenu(isOpen)} />
                </Suspense>
            )}
            <div
                // className={cx('main', 'full')}
                className={cx('full', layouts.includes('menu') ? 'main' : '')}
            >
                {/* header */}
                {layouts.indexOf('header') >= 0 ? (
                    <Suspense fallback={<></>}>
                        <Header setOpenMenu={setOpenMenu} />
                    </Suspense>
                ) : null}

                {/* main */}
                <Suspense fallback={<></>}>
                    <Routes>
                        {auth ? (
                            <>
                                {/* private routes */}
                                {GenerateRoutes(routes)}
                                <Route path="*" element={<Navigate to="/main" replace />} />
                            </>
                        ) : (
                            <>
                                {/* global routes */}
                                {GenerateRoutes(globalRoutes)}
                                <Route path="*" element={<Navigate to="/login" replace />} />
                            </>
                        )}

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
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <FullWindowAnimateProvider>
                <SlideUpWindowAnimateProvider>
                    <App />
                    <SlideUpWindow />
                    <FullPopWindow />
                </SlideUpWindowAnimateProvider>
            </FullWindowAnimateProvider>
        </BrowserRouter>
    );
}

export default AppWrapper;
