import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import AppWrapper from './App.jsx';
import store from '@/store/store.js'; // redux
import '@/plugins/i18n'; // 引入 i18n 配置

import '@/assets/scss/_reset.scss';
import '@/assets/scss/_window.scss';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    </StrictMode>
);
