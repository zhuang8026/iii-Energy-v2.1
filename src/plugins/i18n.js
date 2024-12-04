import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from '@/assets/i18n/zh-TW.json';
import en from '@/assets/i18n/en-US.json';

// 用戶自定義的 Cookie 方法
import { COOKIE_NAME } from '@/assets/enum/enum';
import { getCookie, setCookie } from '@/utils/cookie';

const LANG = getCookie(COOKIE_NAME.LANG) || 'en-US'; // 默認語言

i18n.use(initReactI18next) // 使用 react-i18next 的初始化插件
    .init({
        resources: {
            'zh-TW': { translation: zh },
            'en-US': { translation: en }
        },
        lng: LANG, // 預設語言
        fallbackLng: 'en-US', // 回退語言 (默認語言)
        interpolation: {
            escapeValue: false // React 已經處理 XSS
        }
    });

export default i18n;
