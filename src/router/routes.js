import React, { lazy } from 'react';
// import { getBooleanFromENV } from 'components/utils';

import Home from '@/view/Home';
import EnergyReport from '@/view/EnergyReport';
import EnergyMangement from '@/view/EnergyMangement';
import BindDevice from '@/view/BindDevice';
import PageA from '@/view/PageA';
import PageB from '@/view/PageB';

const routes = [
    {
        main: 'overall',
        path: '/main',
        title: 'daily_usage_tracking',
        component: Home,
        exact: true,
        authRequired: false,
        layouts: ['menu', 'footer', 'header']
    },
    {
        main: 'overall',
        path: '/main/energy_report',
        title: 'energy_report',
        component: EnergyReport,
        exact: true,
        authRequired: false,
        layouts: ['menu', 'header']
    },
    {
        main: 'overall',
        path: '/main/energy_mangement',
        title: 'energy_mangement',
        component: EnergyMangement,
        exact: true,
        authRequired: false,
        layouts: ['menu', 'footer', 'header']
    },
    {
        main: 'member_management',
        path: '/member/bind_device',
        title: 'bind_device',
        component: BindDevice,
        exact: true,
        authRequired: false,
        layouts: ['menu', 'footer', 'header']
    },
    {
        main: 'member_management',
        path: '/member/data_modification',
        title: 'data_modification',
        component: PageA,
        exact: true,
        authRequired: false,
        layouts: ['menu', 'footer', 'header']
    },
    {
        main: 'member_management',
        path: '/member/password_change',
        title: 'password_change',
        component: PageB,
        exact: true,
        authRequired: false,
        layouts: ['menu', 'header']
    }
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
