import React, { useState, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

//翻譯
import { useTranslation } from 'react-i18next';

// @mui
import WarningTwoToneIcon from '@mui/icons-material/WarningTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import ErrorOutlineTwoToneIcon from '@mui/icons-material/ErrorOutlineTwoTone'; // 提示
import GppGoodTwoToneIcon from '@mui/icons-material/GppGoodTwoTone';
import LinkOffTwoToneIcon from '@mui/icons-material/LinkOffTwoTone';

// components
import Loading from '@/components/ui/Loading';
import DoughnutChart from '@/components/ui/DoughnutChart';
import LineChart from '@/components/ui/LineChart';
import LineChartWindows from '@/components/ui/LineChartWindows';
import usePopUp from '@/components/global/PopUp';
import EditTrack from '@/components/ui/EditTrack';
import NormalPrompt from '@/components/ui/NormalPrompt';
import Progress from '@/components/ui/Progress';

import { iconMap } from './private-module';

// api
import {
    getAdvice,
    getAPINilm09Appliance,
    getAdvWar,
    postAdvWar,
    Nilm09APIGetAdvWar,
    Nilm09APIPostAdvWar,
    getCurrentMon,
    Nilm09APIGetBeyesterday,
    Nilm09APIGetttlWar
} from '@/api/api';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Home = ({}) => {
    const { t, i18n } = useTranslation();
    const { openPopUp, closePopUp } = usePopUp();
    const { openLoading, closeLoading } = Loading();

    const [isLoading, setIsLoading] = useState(false); // api 加載
    const [electricItems, setElectricItems] = useState([]); //
    const [target, setTarget] = useState(0); // 總用電數度
    const [accumKwh, setAccumKwh] = useState(0); // 本月累積
    const [preYearKwh, setPreYearKwh] = useState(0); // 較去年同月比較度數
    const [yesterday, setyesterday] = useState(0); // 昨日用電量
    const [beforeYesterday, setBeforeYesterday] = useState(0); // 前日用電量

    const isFirstRender = useRef(true); // 👈 用來避免多次呼叫

    const openEditPopUp = target => {
        openPopUp({ component: <EditTrack target={target} closePopUp={closePopUp} /> });
    };

    const openLineChartPopUp = () => {
        openPopUp({ component: <LineChartWindows closePopUp={closePopUp} /> });
    };

    // 節電建議
    const openMondayPrompt = constent => {
        openPopUp({
            component: <NormalPrompt title="節電建議" constent={constent} />
        });
    };

    // 節電小秘訣
    const openElectricPrompt = async constent => {
        let closebtn = await getAdvWarAPI(constent.advice); // 判斷是否已經送出資料
        openPopUp({
            component: (
                <NormalPrompt
                    title="用電提醒" // ex: "用電提醒"
                    subtitle={constent.advice} // ex: "電視昨天用電較過往高"
                    constent={['節電小秘訣', constent.advice2]} // ex: '電視不使用時拔除插頭，完全關閉電源，減少待機電力消耗。'
                    closebtn={closebtn}
                    onClick={() => postAdvWarAPI('1', constent.advice)}
                    onCloseClick={() => postAdvWarAPI('0', constent.advice)}
                />
            )
        });
    };

    // 設備狀態
    const openElectricStatusPrompt = constent => {
        openPopUp({
            component: <NormalPrompt title="設備狀態" constent={constent} />
        });
    };

    // 自訂判斷 warning 的布林邏輯
    const isValidWarning = warning => {
        return ![0, '0', null, 'null', undefined].includes(warning);
    };

    // ----------- API -----------
    // 「取得」用電異常
    const getAdvWarAPI = async advice => {
        const store = JSON.parse(localStorage.getItem('ENERGY') || '{}');
        const userId = store.userInfo.user_id;
        if (!userId) {
            console.warn('User ID 不存在，無法取得異常資訊');
            return;
        }

        // 判斷：If the version2 API connection fails, we will connect to the version1 API
        try {
            let res = await Nilm09APIGetAdvWar(userId, advice); // version 2
            if (res.code !== 200) {
                console.warn('Version2 API 失敗，嘗試使用 Version1');
                res = await getAdvWar(userId, advice); // version 1
            }

            if (res.code === 200) {
                // 處理資料
                console.log('✅ API Nilm09APIGetAdvWar connect ok');
                let val = isValidWarning(res.data.response);
                return val;
            } else {
                console.warn('⚠️ API warning fetching:', res);
            }
        } catch (error) {
            console.error('❌ API error fetching:', error);
        }
    };

    // 「送出」用電異常
    const postAdvWarAPI = async (tick, advice) => {
        const store = JSON.parse(localStorage.getItem('ENERGY') || '{}');
        const userId = store.userInfo.user_id;
        if (!userId) {
            console.warn('User ID 不存在，無法取得異常資訊');
            return;
        }

        const data = {
            userId,
            advice,
            tick
        };

        // 判斷：If the version2 API connection fails, we will connect to the version1 API
        try {
            let res = await Nilm09APIPostAdvWar(data); // Version2 API
            if (res.code !== 200) {
                console.warn('Version2 API 失敗，嘗試 Version1');
                res = await postAdvWar(data); // Version1 API
            }

            if (res.code === 200) {
                console.log('✅ API Nilm09APIPostAdvWar connect ok');
            } else {
                console.warn('⚠️ API warning fetching:', res);
            }
        } catch (error) {
            console.error('❌ API error fetching:', error);
        }
    };

    // 取得設備資料
    const getElectricItemsAPI = async () => {
        try {
            const { code, data: apiData } = await getAPINilm09Appliance();
            if (code === 200) {
                console.log('✅ API getAPINilm09Appliance connect ok');
                const electrics = apiData.data.result.map(item => {
                    const { name: itemName, value, warning, advice, advice2 } = item;
                    const { name, icon, background } = iconMap[itemName] || {};
                    return {
                        name: name || itemName,
                        icon: icon || null,
                        background: background || null,
                        value,
                        warning: isValidWarning(warning),
                        warningContent: {
                            advice: advice || '',
                            advice2: advice2 || ''
                        }
                    };
                });

                setElectricItems(electrics);
            }
        } catch (error) {
            console.error('Error fetching electric items:', error);
        }
    };

    // 取得節電建議（每週一次）
    const getAdviceAPI = async () => {
        try {
            const { code, data: apiData } = await getAdvice();
            if (code === 200) {
                let val = apiData.data;
                const result = [val.advice, val.advice2, val.performance]
                    .filter(advice => advice && advice !== 'none')
                    .map((msg, index) => `${index + 1}. ${msg}`);

                if (result.length) {
                    openMondayPrompt(result);
                }
            }
        } catch (error) {
            console.error('❌ API error fetching:', error);
        }
    };

    // 取得本月 (用電目標 & 預測 & 累積)
    const getCurrentMonAPI = async () => {
        const store = JSON.parse(localStorage.getItem('ENERGY') || '{}');
        const userId = store.userInfo.user_id;
        if (!userId) {
            console.warn('User ID 不存在，無法取得異常資訊');
            return;
        }
        try {
            const { code, data: apiData } = await getCurrentMon(userId);
            if (code === 200) {
                console.log('✅ API getCurrentMonAPI connect ok');
                let val = apiData.data;
                setTarget(val.target);
                setAccumKwh(val.accumKwh);
            }
        } catch (error) {
            console.error('❌ API error fetching:', error);
        }
    };

    // 取得本月 (用電目標 & 預測 & 累積)
    const getNilm09APIGetBeyesterdayAPI = async () => {
        const store = JSON.parse(localStorage.getItem('ENERGY') || '{}');
        const userId = store.userInfo.user_id;
        if (!userId) {
            console.warn('User ID 不存在，無法取得異常資訊');
            return;
        }
        try {
            const { code, data: apiData } = await Nilm09APIGetBeyesterday(userId);
            if (code === 200) {
                console.log('✅ API getNilm09APIGetBeyesterdayAPI connect ok');
                let val = apiData.data;
                setPreYearKwh(val.previous_year_date); // 較去年同月比較度數
                setyesterday(val.yesterday); // 昨日用電量
                setBeforeYesterday(val.before_yesterday); // 前日用電量
                console.log('getNilm09APIGetBeyesterdayAPI', val);
            }
        } catch (error) {
            console.error('❌ API error fetching:', error);
        }
    };

    // 取得本月 (用電目標 & 預測 & 累積)
    const getNilm09APIGetttlWarAPI = async () => {
        const store = JSON.parse(localStorage.getItem('ENERGY') || '{}');
        const userId = store.userInfo.user_id;
        if (!userId) {
            console.warn('User ID 不存在，無法取得異常資訊');
            return;
        }
        try {
            const { code, data: apiData } = await Nilm09APIGetttlWar(userId);
            if (code === 200) {
                console.log('✅ API getNilm09APIGetttlWarAPI connect ok');
                console.log('getNilm09APIGetttlWarAPI', apiData);
            }
        } catch (error) {
            console.error('❌ API error fetching:', error);
        }
    };

    const loadingAPIList = async () => {
        setIsLoading(true);
        try {
            await getAdviceAPI();
            await getElectricItemsAPI();
            await getCurrentMonAPI();
            await getNilm09APIGetBeyesterdayAPI();
            await getNilm09APIGetttlWarAPI();
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loadingAPIList();
        }

        // 添加 passive 事件監聽器
        const wheelHandler = event => {
            // event handler code...
        };

        document.addEventListener('mousewheel', wheelHandler, { passive: true });

        return () => {
            document.removeEventListener('mousewheel', wheelHandler);
        };
    }, []);

    useEffect(() => {
        if (isLoading) {
            openLoading('loading...');
        } else {
            closeLoading();
        }
    }, [isLoading]);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className={cx('home')}>
            <h3>{t('home.power_usage_tracking')}</h3>
            <div className={cx('block')}>
                {/* 目標 */}
                <div className={cx('target-left')}>
                    {/* 設定目標 */}
                    <div className={cx('target-box', 'green')}>
                        {t('home.set_goals')}
                        <div className={cx('target')}>
                            <div className={cx('target-item-number')}>
                                <span>{target}</span> {t('kwh')}
                                {/* 1KWH = 1000W = 1度電 */}
                            </div>
                        </div>
                        <span>* {t('home.public_electricity_desc')} *</span>
                        <button type="button" onClick={() => openEditPopUp(target)}>
                            <BorderColorTwoToneIcon style={{ fill: '#fff' }} />
                        </button>
                    </div>

                    {/* 近期用電趨勢 */}
                    <div className={cx('target-box')}>
                        {t('home.recent_electricity')}
                        <LineChart />
                        <button type="button" onClick={() => openLineChartPopUp()}>
                            <WarningTwoToneIcon />
                        </button>
                    </div>
                </div>

                {/* 本月用電量 */}
                <div className={cx('target-box')}>
                    {t('home.month_electricity')}
                    <div className={cx('target')}>
                        <DoughnutChart
                            type="month"
                            value={accumKwh} // 本月累積用電數度
                            total={target} // 總用電數度
                            compareValue={preYearKwh} // 比較數度
                        />
                    </div>
                    <button type="button">
                        <ErrorOutlineTwoToneIcon />
                    </button>
                </div>
                {/* 用電量累計 */}
                <div className={cx('target-box')}>
                    {t('home.electricity_records')}
                    {/* 昨日用電量 */}
                    <Progress
                        title={t('home.yesterday_electricity')}
                        kwh={yesterday}
                        percent={Math.min((yesterday / target) * 100, 100).toFixed(1)}
                        overPercent={yesterday > target ? ((yesterday - target) / target) * 100 : 0}
                    />
                    {/* 前日用電量 */}
                    <Progress
                        title={t('home.before_yesterday_electricity')}
                        kwh={beforeYesterday}
                        percent={Math.min((beforeYesterday / target) * 100, 100).toFixed(1)}
                        overPercent={beforeYesterday > target ? ((beforeYesterday - target) / target) * 100 : 0}
                    />
                    {/* 本月累積 */}
                    <Progress
                        title={t('home.all_month_electricity')}
                        kwh={accumKwh}
                        percent={Math.min((accumKwh / target) * 100, 100).toFixed(1)}
                        overPercent={accumKwh > target ? ((accumKwh - target) / target) * 100 : 0}
                    />
                </div>
            </div>

            <h3>{t('home.household_electricity_consumption_direction')}</h3>
            <div className={cx('block')}>
                {electricItems.map((item, index) => (
                    <div
                        className={cx('target-box', 'machine_card', { machine_card_useless: item.value <= 0 })}
                        key={index}
                    >
                        <div className={cx('icon')}>
                            <img src={item.icon} alt="icon" />
                        </div>
                        <div className={cx('inner')}>
                            <>
                                {t(`machine.${item.name}`)}
                                <>
                                    <button type="button">
                                        {item.value <= 0 ? (
                                            // 未連結
                                            <LinkOffTwoToneIcon
                                                style={{ fill: '#a5a5a5' }}
                                                onClick={() => openElectricStatusPrompt(['設備未連結'])}
                                            />
                                        ) : item.warning ? (
                                            // 有異常
                                            <ErrorOutlineTwoToneIcon
                                                style={{ fill: '#ff6700' }}
                                                onClick={() => openElectricPrompt(item.warningContent)}
                                            />
                                        ) : (
                                            // 健康
                                            <GppGoodTwoToneIcon
                                                style={{ fill: '#20a2a0' }}
                                                onClick={() => openElectricStatusPrompt(['用電流向正常'])}
                                            />
                                        )}
                                    </button>
                                    <div className={cx('target')}>
                                        <div className={cx('target-item-number')}>
                                            <span>{item.value}</span>
                                            {t('kwh')}
                                            {/* 1KWH = 1000W = 1度電 */}
                                        </div>
                                    </div>
                                </>
                            </>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
