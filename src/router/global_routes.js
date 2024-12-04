import React, { lazy } from 'react';
// import { getBooleanFromENV } from 'components/utils';

import Login from '@/view/User/Login';

const routes = [
    {
        main: '',
        path: '/login',
        title: 'Login',
        component: Login,
        exact: true,
        authRequired: false,
        layouts: ['menu', 'footer']
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
