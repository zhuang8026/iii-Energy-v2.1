import React, { useState, Suspense, useEffect } from 'react';
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
import PopUp from '@/components/global/PopUp';
import EditTrack from '@/components/ui/EditTrack';
import NormalPrompt from '@/components/ui/NormalPrompt';

// images
import IconTV from '@/assets/images/icon-television.svg';
import BgTV from '@/assets/images/icon_bg/tv.svg'; // no use
import IconRefrigerator from '@/assets/images/icon-refrigerator.svg';
import BgRefrigerator from '@/assets/images/icon_bg/dehumidifier.svg'; // no use
import IconAirConditioner from '@/assets/images/icon-airConditioner.svg';
import BgAC from '@/assets/images/icon_bg/ac.svg'; // no use
import IconDrinkMachine from '@/assets/images/icon-drinkMachine.svg';
import BgDrinkMachine from '@/assets/images/icon_bg/drinkMachine.svg'; // no use
import IconWashMachine from '@/assets/images/icon-washMachine.svg';
import BgWashMachine from '@/assets/images/icon_bg/washMachine.svg'; // no use
import IconFan from '@/assets/images/icon-fan.svg';
import BgFan from '@/assets/images/icon_bg/Fan.svg'; // no use
import IconComputer from '@/assets/images/icon-computer.svg';
import BgPC from '@/assets/images/icon_bg/computer.svg'; // no use
import IconPot from '@/assets/images/icon-electricPot.svg';
import BgPot from '@/assets/images/icon_bg/electricPot.svg'; // no use
import IconDehumidifier from '@/assets/images/icon-dehumidifier.svg';
import BgDehumidifier from '@/assets/images/icon_bg/dehumidifier.svg'; // no use
import IconOther from '@/assets/images/icon-other.svg';
import BgOther from '@/assets/images/icon_bg/other.svg'; // no use

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Home = ({}) => {
    const { t, i18n } = useTranslation();
    const { openPopUp, closePopUp } = PopUp();
    const { openLoading, closeLoading } = Loading();
    const [electricItems, setElectricItems] = useState([]);

    const openEditPopUp = () => {
        openPopUp({ component: <EditTrack closePopUp={closePopUp} /> });
    };

    const openLineChartPopUp = () => {
        openPopUp({ component: <LineChartWindows closePopUp={closePopUp} /> });
    };

    const openMondayPrompt = (title, constent) => {
        openPopUp({
            component: (
                <NormalPrompt
                    title="節電建議"
                    constent={[
                        '1. 非常棒!您上週比低耗能用戶少用了54% 的電量，請繼續保持。',
                        '2. 冰箱背面、左右兩側離牆至少10公分以上距離，頂部須留有30 公分以上，以保持良好通風散熱。'
                    ]}
                />
            )
        });
    };

    const openElectricPrompt = (title, constent) => {
        openPopUp({
            component: (
                <NormalPrompt
                    title="用電提醒"
                    subtitle="電視昨天用電較過往高"
                    constent={['節電小秘訣', '電視不使用時拔除插頭，完全關閉電源，減少待機電力消耗。']}
                />
            )
        });
    };

    // api block
    const getElectricItemsAPI = () => {
        let res = [
            {
                name: 'television',
                icon: IconTV,
                background: BgTV, // no use
                value: 61
            },
            {
                name: 'refrigerator',
                icon: IconRefrigerator,
                background: BgRefrigerator, // no use
                value: 19
            },
            {
                name: 'airConditioner',
                icon: IconAirConditioner,
                background: BgAC, // no use
                value: 78
            },
            {
                name: 'drinkMachine',
                icon: IconDrinkMachine,
                background: BgDrinkMachine, // no use
                value: 97
            },
            {
                name: 'washMachine',
                icon: IconWashMachine,
                background: BgWashMachine, // no use
                value: 34
            },
            {
                name: 'fan',
                icon: IconFan,
                background: BgFan, // no use
                value: 76
            },
            {
                name: 'computer',
                icon: IconComputer,
                background: BgPC, // no use
                value: 83
            },
            {
                name: 'electricPot',
                icon: IconPot,
                background: BgPot, // no use
                value: 5
            },
            {
                name: 'dehumidifier',
                icon: IconDehumidifier,
                background: BgDehumidifier, // no use
                value: 82
            },
            {
                name: 'otherMachine',
                icon: IconOther,
                background: BgOther, // no use
                value: 99
            }
        ];
        setElectricItems([...res]);
    };

    useEffect(() => {
        getElectricItemsAPI();
        openLoading('loading...');
        setTimeout(() => {
            closeLoading();
            openMondayPrompt();
        }, 3000);
    }, []);

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
                                <span>1,000</span> {t('kwh')}
                                {/* 1KWH = 1000W = 1度電 */}
                            </div>
                        </div>
                        <span>* {t('home.public_electricity_desc')} *</span>
                        <button type="button" onClick={() => openEditPopUp()}>
                            <BorderColorTwoToneIcon sx={{ fill: '#fff' }} />
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
                            value={419.0} // 用電數度
                            total={340.0} // 總用電數度
                            compareValue={-2.0} // 比較數度
                        />
                    </div>
                    <button type="button">
                        <ErrorOutlineTwoToneIcon />
                    </button>
                </div>
                {/* 用電量累計 */}
                <div className={cx('target-box')}>
                    {t('home.electricity_records')}
                    <>
                        <div className={cx('target')}>
                            {t('home.yesterday_electricity')}
                            <div className={cx('progress-number')}>15 度</div>
                        </div>
                        <div className={cx('progress')}>
                            <div className={cx('progress-bar')}>
                                <div className={cx('bar-mian')}>
                                    <div className={cx('bar-current')} style={{ width: '10%' }} />
                                    <div className={cx('bar-number')}>10%</div>
                                </div>
                            </div>
                        </div>
                    </>
                    <>
                        <div className={cx('target')}>
                            {t('home.before_yesterday_electricity')}
                            <div className={cx('progress-number')}>22 度</div>
                        </div>
                        <div className={cx('progress')}>
                            <div className={cx('progress-bar')}>
                                <div className={cx('bar-mian')}>
                                    <div className={cx('bar-current')} style={{ width: '15%' }} />
                                    <div className={cx('bar-number')}>15%</div>
                                </div>
                            </div>
                        </div>
                    </>
                    <>
                        <div className={cx('target')}>
                            {t('home.all_month_electricity')}
                            <div className={cx('progress-number')}>479 度</div>
                        </div>
                        <div className={cx('progress')}>
                            <div className={cx('progress-bar')}>
                                <div className={cx('bar-mian')}>
                                    <div className={cx('bar-current')} style={{ width: '100%' }} />
                                    <div className={cx('bar-number')}>100%</div>
                                </div>
                                <div className={cx('bar-mian')}>
                                    <div className={cx('bar-current', 'warning')} style={{ width: '20%' }} />
                                    <div className={cx('bar-number')}>20%</div>
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>

            <h3>{t('home.household_electricity_consumption_direction')}</h3>
            <div className={cx('block')}>
                {electricItems.map((item, index) => (
                    <div
                        className={cx('target-box', 'machine_card', { machine_card_useless: index % 2 !== 0 })}
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
                                        {index % 2 !== 0 ? (
                                            // 未連結
                                            <LinkOffTwoToneIcon style={{ fill: '#a5a5a5' }} />
                                        ) : index === 0 ? (
                                            // 有異常
                                            <ErrorOutlineTwoToneIcon
                                                style={{ fill: '#ff6700' }}
                                                onClick={() => openElectricPrompt()}
                                            />
                                        ) : (
                                            // 健康
                                            <GppGoodTwoToneIcon style={{ fill: '#20a2a0' }} />
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
