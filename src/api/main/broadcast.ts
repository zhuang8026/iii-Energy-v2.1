// enum 映射
import { ENV } from '@/assets/enum/enum';
import { apiRequest } from '@/api/apiRequest';

// API初始化設定
const apiEnv = import.meta.env.VITE_NODE_ENV; // 當前環境

/**
 * 登入
 * api working - 2023/william.C
 */
const broadcastNewAdvice = async () => {
    const url = apiEnv === ENV.MOCK ? `newAdvice.json` : `main/e-weekly/new-advice`;
    const res = await apiRequest('GET', url, null, 'UTF8_Type', true, 'java');
    return res;
};

export { broadcastNewAdvice };
