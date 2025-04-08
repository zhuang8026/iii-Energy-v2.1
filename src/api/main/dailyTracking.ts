// enum 映射
import { ENV } from '@/assets/enum/enum';
import { apiRequest } from '@/api/apiRequest';

// API初始化設定
const apiEnv = import.meta.env.VITE_NODE_ENV; // 當前環境

/*
 * 用電流向（設備列表資料）
 * api working - 2024/william.C
 */
const dailyTraceAppliance2 = async () => {
    const url = apiEnv === ENV.MOCK ? `traceAppliance2.json` : `nilm09/main/trace/appliance2`;
    const res = await apiRequest('GET', url, null, 'UTF8_Type', true, 'java');
    return res;
};

/**
 * 取得用電異常 填寫
 * api working - 2023/william.C
 */
const getAdvWar = async (userId, advice) => {
    const url = apiEnv === ENV.MOCK ? `Nilm09APIGetAdvWar.json` : `/adv_war?user_id=${userId}&advice=${advice}`;
    const res = await apiRequest('GET', url, null, 'UTF8_Type', true, 'java');
    return res;
};

/**
 * 送出用電異常 填寫
 * api working - 2023/william.C
 */
const postAdvWar = async ({ userId, advice, tick }) => {
    const payload = {
        user_id: userId,
        advice,
        tick
    };
    const url = apiEnv === ENV.MOCK ? `nilm09APIPostAdvWar.json` : '/adv_war';
    const res = await apiRequest('POST', url, payload, 'application/json', true, 'java');
    return res;
};

/**
 * 取得用電異常 填寫
 * api working - 2023/william.C
 */
const Nilm09APIGetAdvWar = async (userId, advice) => {
    const url = apiEnv === ENV.MOCK ? `nilm09APIGetAdvWar.json` : `/nilm09/adv_war?user_id=${userId}&advice=${advice}`;
    const res = await apiRequest('GET', url, null, 'UTF8_Type', true, 'java');
    return res;
};

/**
 * 送出用電異常 填寫
 * api working - 2023/william.C
 */
const Nilm09APIPostAdvWar = async ({ userId, advice, tick }) => {
    const payload = {
        user_id: userId,
        advice,
        tick
    };
    const url = apiEnv === ENV.MOCK ? `nilm09APIPostAdvWar.json` : `/nilm09/adv_war`;
    const res = await apiRequest('POST', url, payload, 'application/json', true, 'java');
    return res;
};

export { dailyTraceAppliance2, getAdvWar, postAdvWar, Nilm09APIGetAdvWar, Nilm09APIPostAdvWar };
