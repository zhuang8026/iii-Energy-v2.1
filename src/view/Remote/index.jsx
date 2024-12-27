import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// mui UI
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

// global
import PopUp from '@/components/global/PopUp';

// components
import RemoteWindows from '@/components/ui/RemoteWindows';

// mui icon
import WifiOffTwoToneIcon from '@mui/icons-material/WifiOffTwoTone';
import BoltTwoToneIcon from '@mui/icons-material/BoltTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';

// electric icon
import IconTV from '@/assets/images/icon-television.svg';
import IconRefrigerator from '@/assets/images/icon-refrigerator.svg';
import IconAirConditioner from '@/assets/images/icon-airConditioner.svg';
import IconDrinkMachine from '@/assets/images/icon-drinkMachine.svg';
import IconWashMachine from '@/assets/images/icon-washMachine.svg';
import IconFan from '@/assets/images/icon-fan.svg';
import IconComputer from '@/assets/images/icon-computer.svg';
import IconPot from '@/assets/images/icon-electricPot.svg';
import IconDehumidifier from '@/assets/images/icon-dehumidifier.svg';
import IconOther from '@/assets/images/icon-other.svg';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Remote = () => {
    const { openPopUp, closePopUp } = PopUp();
    const [electricList, setElectricList] = useState([
        {
            type: '電視',
            icon: IconTV,
            number: '4C11AEAF3338',
            wifi_status: 'unconnected', // connected, unconnected
            use_status: 'unconnected',
            electric_checked: false,
            power: '999',
            schedule: '99'
        },
        {
            type: '冰箱',
            icon: IconRefrigerator,
            number: '4C11AEAF3338',
            wifi_status: 'connected', // connected, unconnected
            use_status: 'connected',
            electric_checked: true,
            power: '999',
            schedule: '99'
        },
        {
            type: '冷氣',
            icon: IconAirConditioner,
            number: '4C11AEAF3338',
            wifi_status: 'connected', // connected, unconnected
            use_status: 'connected',
            electric_checked: false,
            power: '999',
            schedule: '99'
        },
        {
            type: '開飲機',
            icon: IconDrinkMachine,
            number: '4C11AEAF3338',
            wifi_status: 'unconnected', // connected, unconnected
            use_status: 'unconnected',
            electric_checked: false,
            power: '999',
            schedule: '99'
        },
        {
            type: '洗衣機',
            icon: IconWashMachine,
            number: '4C11AEAF3338',
            wifi_status: 'unconnected', // connected, unconnected
            use_status: 'unconnected',
            electric_checked: false,
            power: '999',
            schedule: '99'
        },
        {
            type: '電風扇',
            icon: IconFan,
            number: '4C11AEAF3338',
            wifi_status: 'connected', // connected, unconnected
            use_status: 'connected',
            electric_checked: false,
            power: '999',
            schedule: '99'
        },
        {
            type: '電腦',
            icon: IconComputer,
            number: '4C11AEAF3338',
            wifi_status: 'connected', // connected, unconnected
            use_status: 'connected',
            electric_checked: true,
            power: '999',
            schedule: '99'
        },
        {
            type: '電鍋',
            icon: IconPot,
            number: '4C11AEAF3338',
            wifi_status: 'unconnected', // connected, unconnected
            use_status: 'unconnected',
            power: '999',
            schedule: '99'
        },
        {
            type: '除濕機',
            icon: IconDehumidifier,
            number: '4C11AEAF3338',
            wifi_status: 'connected', // connected, unconnected
            use_status: 'connected',
            electric_checked: true,
            power: '999',
            schedule: '99'
        },
        {
            type: '其他',
            icon: IconOther,
            number: '4C11AEAF3338',
            wifi_status: 'connected', // connected, unconnected
            use_status: 'connected',
            electric_checked: true,
            power: '999',
            schedule: '99'
        }
    ]);

    const opensScheduleManagement = title => {
        openPopUp({ component: <RemoteWindows title={title} closePopUp={() => closePopUp()} /> });
    };

    return (
        <div className={cx('energy_mangement')}>
            <h3>雲端遙控</h3>
            <div className={cx('energy_item')}>
                <div className={cx('energy_control')}>
                    {electricList.map((item, index) => (
                        <div
                            className={cx('block', item.wifi_status === 'connected' ? 'connected' : 'unconnected')}
                            key={index}
                        >
                            <div className={cx('target_title')}>
                                <>
                                    <div className={cx('type_name')}>{item.type}</div>
                                    <div className={cx('type_number')}>{item.number}</div>
                                </>
                            </div>
                            <div className={cx('target_box', 'target_info')}>
                                <div className={cx('info_box')}>
                                    <div className={cx('status')}>
                                        <WifiOffTwoToneIcon />
                                        <p>{item.use_status}</p>
                                    </div>
                                    <div className={cx('status')}>
                                        <BoltTwoToneIcon />
                                        <p>{item.power}W</p>
                                    </div>
                                    <div className={cx('status')}>
                                        <AccessTimeTwoToneIcon />
                                        <p>{item.schedule}項排程執行中</p>
                                    </div>
                                </div>
                                <div className={cx('icon')}>
                                    <img src={item.icon} alt="target" />
                                </div>
                            </div>
                            <div className={cx('target_box', 'target_control')}>
                                <div className={cx('inner')}>
                                    <Button
                                        variant="outlined"
                                        disabled={item.use_status === 'connected' ? false : true}
                                        sx={{
                                            borderRadius: '30px',
                                            borderColor: '#fff', // 使用自訂義背景顏色
                                            color: '#fff' // 文字顏色
                                        }}
                                        onClick={() => opensScheduleManagement(item.type)}
                                    >
                                        排程管理
                                    </Button>
                                </div>
                                <div className={cx('inner')}>
                                    <Switch
                                        inputProps={{ 'aria-label': 'Switch demo' }}
                                        defaultChecked={item.electric_checked}
                                        disabled={item.use_status === 'connected' ? false : true}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: '#fde663', // 自訂打開時的顏色
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 87, 34, 0.1)' // hover 狀態
                                                }
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: '#fde663' // 自訂打開時的軌道顏色
                                            },
                                            '& .MuiSwitch-track': {
                                                backgroundColor: '#9e9e9e' // 自訂關閉時的軌道顏色
                                            }
                                        }}
                                        onClick={() => {
                                            item.electric_checked = !item.electric_checked;
                                            setElectricList([...electricList]);
                                        }}
                                    />
                                    {item.electric_checked ? '開啟' : '關閉'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Remote;
