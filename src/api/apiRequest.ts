import axios from 'axios';
import { ENV } from '@/assets/enum/enum';

// API初始化設定
const apiEnv = import.meta.env.VITE_NODE_ENV; // 當前環境

const apiConfig = {
    SERVER_JAVA: 'https://www.energy-active.org.tw/api/',
    SERVER_PYTHON: 'https://poc.energy-active.org.tw/',
    SERVER_MOCK: `${window.location.origin}/mock/`
};

/**
 * desc: 設定 call API 前期作業 (setting token)
 * method: GET, POST, PATCH, PULL
 * url: '/main/login'
 * params: payload data
 * contentType: application/json
 * auth: has token ?
 * isPythonVersion: java server or python server
 * */
export const apiRequest = async (
    method, // GET, POST, PUT, DELETE
    url, // link
    params, // basic
    contentType, // 類型
    auth = false, // token
    isPythonVersion = 'python' // api 版本
) => {
    // API初始化設定
    let apiClient: any = axios.create({}); // axios 初始化
    // const apiEnv = process.env.VITE_NODE_ENV; // 當前環境
    // const apiBaseUrl = process.env.VITE_API_BASE_URL; // API 根網址

    // console.log('當前環境:', apiEnv);
    // console.log('API Base URL:', apiBaseUrl);

    const headers = {};
    const HeaderseType = {
        UTF8_Type: 'application/x-www-form-urlencoded;charset=utf-8',
        Json_Type: 'application/json'
    };
    headers['Content-Type'] = HeaderseType[contentType];
    if (auth) {
        const energyData = JSON.parse(localStorage.getItem('ENERGY') || '{}');
        headers['Authorization'] = `Bearer ${energyData.token || ''}`;
    }

    try {
        apiClient = await axios({
            headers,
            method,
            url:
                (apiEnv === ENV.MOCK
                    ? apiConfig.SERVER_MOCK : isPythonVersion == 'python'
                    ? apiConfig.SERVER_PYTHON : apiConfig.SERVER_JAVA) 
                    + url,
            // url: (isPythonVersion ? apiConfig.SERVER_PYTHON : apiConfig.SERVER_JAVA) + url,
            data: params
        });

        const { status, data } = apiClient;
        if (status === 200) {
            return {
                code: data.code,
                data: data,
                message: data.message || ''
            };
        } else {
            console.log(`API ERROR: ${data.message}`);
        }
    } catch (error: any) {
        console.log(`API ERROR:`, error);

        let status = {
            code: error.response.status, // API ERROR
            data: error.message // API ERROR Data
        };
        return status;
    }
};
