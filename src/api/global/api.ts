// enum 映射
import { ENV } from '@/assets/enum/enum';
import { apiRequest } from '@/api/apiRequest';

// API初始化設定
const apiEnv = import.meta.env.VITE_NODE_ENV; // 當前環境

/**
 * 登入
 * api working - 2023/william.C
 */
const userLogin = async payload => {
    const url = apiEnv === ENV.MOCK ? `apiLogin.json` : `/main/login`;
    const res = await apiRequest('POST', url, payload, 'UTF8_Type', false, 'java');
    return res;
};

/**
 * 登出
 * api working - 2023/william.C
 */
const userLogout = async () => {
    const url = apiEnv === ENV.MOCK ? `apiLogout.json` : `/main/logout`;
    const res = await apiRequest('GET', url, {}, 'UTF8_Type', false, 'java');
    return res;
};

/**
 * 忘記密碼 - 發送要求
 * api working - 2023/william.C
 */
const passwordForget = async userId => {
    const payload = {
        userId: userId
    };
    const url = apiEnv === ENV.MOCK ? `apiLogin.json` : `/main/password-forget`;
    const res = await apiRequest('POST', url, payload, 'UTF8_Type', false, 'java');
    return res;
};

export { userLogin, userLogout, passwordForget };
