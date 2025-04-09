// enum 映射
import { ENV } from '@/assets/enum/enum';
import { apiRequest } from '@/api/apiRequest';

// API初始化設定
const apiEnv = import.meta.env.VITE_NODE_ENV; // 當前環境

/*
 * 用電流向（設備列表資料）
 * api working - 2024/william.C
 */
const getAPINilm09Appliance = async () => {
    const url = apiEnv === ENV.MOCK ? `traceAppliance2.json` : `nilm09/main/trace/appliance2`;
    const auth = true;
    const res = await apiRequest('GET', url, null, 'UTF8_Type', auth, 'java');
    return res;
};

/**
 * 取得用電異常 填寫
 * api working - 2023/william.C
 */
const getAdvWar = async (userId, advice) => {
    const url = apiEnv === ENV.MOCK ? `Nilm09APIGetAdvWar.json` : `adv_war?user_id=${userId}&advice=${advice}`;
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
    const url = apiEnv === ENV.MOCK ? `nilm09APIPostAdvWar.json` : 'adv_war';
    const auth = true;
    const res = await apiRequest('POST', url, payload, 'application/json', auth, 'java');
    return res;
};

/**
 * 取得用電異常 填寫
 * api working - 2023/william.C
 */
const Nilm09APIGetAdvWar = async (userId, advice) => {
    const url = apiEnv === ENV.MOCK ? `nilm09APIGetAdvWar.json` : `nilm09/adv_war?user_id=${userId}&advice=${advice}`;
    const auth = true;
    const res = await apiRequest('GET', url, null, 'UTF8_Type', auth, 'java');
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
    const url = apiEnv === ENV.MOCK ? `nilm09APIPostAdvWar.json` : `nilm09/adv_war`;
    const auth = true;
    const res = await apiRequest('POST', url, payload, 'application/json', auth, 'java');
    return res;
};

/*
 * 取得本月 (用電目標 & 預測 & 累積)
 * api working - 2023/william.C
 */
const getCurrentMon = async userId => {
    const url = apiEnv === ENV.MOCK ? `getCurrentMon.json` : `main/trace/current-mon?user_id=${userId}`;
    const auth = true;
    const res = await apiRequest('GET', url, null, 'UTF8_Type', auth, 'java');
    return res;
};

/*
 * 取得昨日用電量-new
 * api working - 2023/william.C
 */
const Nilm09APIGetBeyesterday = async userId => {
    const url = apiEnv === ENV.MOCK ? `nilm09APIGetBeyesterday.json` : `nilm09/beyesterday?user_id=${userId}`;
    const auth = true;
    const res = await apiRequest('GET', url, null, 'UTF8_Type', auth, 'java');

    return res;
};

/**
 * 取得用電異常 近期趨勢圖表90天
 * api working - 2023/william.C
 */
const Nilm09APIGetttlWar = async userId => {
    const url = apiEnv === ENV.MOCK ? `nilm09APIGetttlWar.json` : `nilm09/ttl_war?user_id=${userId}`;
    const auth = true;
    const res = await apiRequest('GET', url, null, 'UTF8_Type', auth, 'java');

    return res;
};

export {
    getAPINilm09Appliance,
    getAdvWar,
    postAdvWar,
    Nilm09APIGetAdvWar,
    Nilm09APIPostAdvWar,
    getCurrentMon,
    Nilm09APIGetBeyesterday,
    Nilm09APIGetttlWar
};
