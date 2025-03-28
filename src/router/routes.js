import React, { lazy } from 'react';
// import { getBooleanFromENV } from 'components/utils';

// import Home from '@/view/Home';
// import EnergyReport from '@/view/EnergyReport';
// import EnergyMangement from '@/view/EnergyMangement';
// import BindDevice from '@/view/BindDevice';
// import PageA from '@/view/PageA';
// import PageB from '@/view/PageB';

const routes = [
    {
        main: 'overall',
        path: '/main',
        title: 'daily_usage_tracking',
        // component: Home,
        component: lazy(() => import('@/view/Home')),
        exact: true,
        authRequired: false,
        layouts: ['menu', 'footer', 'header']
    },
    {
        main: 'overall',
        path: '/main/news',
        title: 'energy_report',
        component: lazy(() => import('@/view/EnergyReport')),
        exact: true,
        authRequired: false,
        layouts: ['menu', 'header']
    },
    {
        main: 'overall',
        path: '/main/remote',
        title: 'energy_mangement',
        component: lazy(() => import('@/view/Remote')),
        exact: true,
        authRequired: false,
        layouts: ['menu', 'footer', 'header']
    },
    {
        main: 'member_management',
        path: '/manage/bind_device',
        title: 'bind_device',
        component: lazy(() => import('@/view/BindElectric')),
        exact: true,
        authRequired: false,
        layouts: ['menu', 'header']
    },
    {
        main: 'member_management',
        path: '/manage/survey',
        title: 'data_modification',
        component: lazy(() => import('@/view/Survey')),
        exact: true,
        authRequired: false,
        layouts: ['menu', 'header']
    },
    {
        main: 'member_management',
        path: '/member/password',
        title: 'password_change',
        component: lazy(() => import('@/view/User/SetPassword')),
        exact: true,
        authRequired: false,
        layouts: ['menu', 'header']
    }

    // {
    //     main: 'manage',
    //     path: '/member/data_modification',
    //     title: 'data_modification',
    //     component: PageA,
    //     exact: true,
    //     authRequired: false,
    //     layouts: ['menu', 'footer', 'header']
    // },
    // {
    //     main: 'manage',
    //     path: '/member/password_change',
    //     title: 'password_change',
    //     component: PageB,
    //     exact: true,
    //     authRequired: false,
    //     layouts: ['menu', 'header']
    // }
];

// //------- BEGIN: 藉由feature flag開關routes----------
// if (getBooleanFromENV('REACT_APP_IS_JAVA_OPEN', false)) {
//     routes.push({
//         path: '/animate/:param?',
//         title: 'Animate',
//         component: Animate,
//         exact: true,
//         authRequired: false,
//         layouts: ['NavLeft'],
//     });
// }

export default routes;
