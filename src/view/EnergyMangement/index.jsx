import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// mui UI
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

// mui icon
import WifiOffTwoToneIcon from '@mui/icons-material/WifiOffTwoTone';
import BoltTwoToneIcon from '@mui/icons-material/BoltTwoTone';
import AccessTimeTwoToneIcon from '@mui/icons-material/AccessTimeTwoTone';
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import WifiTwoToneIcon from '@mui/icons-material/WifiTwoTone';
import LinkOffTwoToneIcon from '@mui/icons-material/LinkOffTwoTone';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const EnergyMangement = () => {
    return (
        <div className={cx('energy_mangement')}>
            <h3>雲端遙控</h3>
            <div className={cx('energy_item')}>
                <div className={cx('energy_control')}>
                    {/* demo unlinked wifi unconnected */}
                    <div className={cx('block')}>
                        <div className={cx('target_title')}>
                            <>
                                <div className={cx('type_name')}>電腦</div>
                                <div className={cx('type_number')}>4C11AEAF3338</div>
                            </>
                            {/* <img src={ICON_COMPUTER} alt="target" /> */}
                        </div>
                        <div className={cx('target_box', 'target_info')}>
                            <div className={cx('info_box')}>
                                <div className={cx('status')}>
                                    <WifiOffTwoToneIcon />
                                    <p>斷線中</p>
                                </div>
                                <div className={cx('status')}>
                                    <BoltTwoToneIcon />
                                    <p>999W</p>
                                </div>
                                <div className={cx('status')}>
                                    <AccessTimeTwoToneIcon />
                                    <p>99項排程執行中</p>
                                </div>
                            </div>
                            <div className={cx('icon')}>
                                <LinkOffTwoToneIcon
                                    fontSize="large"
                                    sx={{
                                        fontSize: '60px',
                                        color: '#fc3a3a'
                                    }}
                                />
                            </div>
                        </div>
                        <div className={cx('target_box', 'target_control', 'disable')}>
                            <div className={cx('inner')}>
                                <Button
                                    variant="outlined"
                                    disabled={true}
                                    sx={{
                                        borderRadius: '30px',
                                        borderColor: '#6f7883', // 使用自訂義背景顏色
                                        color: '#6f7883' // 文字顏色
                                        // '&:hover': {
                                        //     backgroundColor: '#bf2055' // 滑鼠懸停時的背景顏色
                                        // }
                                    }}
                                >
                                    排程管理
                                </Button>
                            </div>
                            <div className={cx('inner')}>
                                <Switch
                                    inputProps={{ 'aria-label': 'Switch demo' }}
                                    defaultChecked={false}
                                    disabled={true}
                                />
                                關閉中
                            </div>
                        </div>
                    </div>

                    {/* demo linked wifi connected */}
                    <div className={cx('block')}>
                        <div className={cx('target_title')}>
                            <>
                                <div className={cx('type_name')}>電腦</div>
                                <div className={cx('type_number')}>4C11AEAF3338</div>
                            </>
                            {/* <img src={ICON_COMPUTER} alt="target" /> */}
                        </div>
                        <div className={cx('target_box', 'target_info')}>
                            <div className={cx('info_box')}>
                                <div className={cx('status')}>
                                    <WifiTwoToneIcon />
                                    <p>連線中</p>
                                </div>
                                <div className={cx('status')}>
                                    <BoltTwoToneIcon />
                                    <p>999W</p>
                                </div>
                                <div className={cx('status')}>
                                    <AccessTimeTwoToneIcon />
                                    <p>99項排程執行中</p>
                                </div>
                            </div>
                            <div className={cx('icon')}>
                                <PowerSettingsNewTwoToneIcon
                                    fontSize="large"
                                    sx={{
                                        fontSize: '60px',
                                        color: '#9193b4'
                                    }}
                                />
                            </div>
                        </div>
                        <div className={cx('target_box', 'target_control')}>
                            <div className={cx('inner')}>
                                <Button
                                    variant="outlined"
                                    // size="small"
                                    sx={{
                                        borderRadius: '30px',
                                        borderColor: '#6f7883', // 使用自訂義背景顏色
                                        color: '#6f7883' // 文字顏色
                                        // '&:hover': {
                                        //     backgroundColor: '#bf2055' // 滑鼠懸停時的背景顏色
                                        // }
                                    }}
                                >
                                    排程管理
                                </Button>
                            </div>
                            <div className={cx('inner')}>
                                <Switch inputProps={{ 'aria-label': 'Switch demo' }} defaultChecked={false} />
                                關閉中
                            </div>
                        </div>
                    </div>

                    {/* demo linked */}
                    {[1, 2, 3, 4].map(() => (
                        <div className={cx('block')}>
                            <div className={cx('target_title')}>
                                <>
                                    <div className={cx('type_name')}>電鍋</div>
                                    <div className={cx('type_number')}>4C11AEAF7104</div>
                                </>
                                {/* <img src={ICON_COMPUTER} alt="target" /> */}
                            </div>
                            <div className={cx('target_box', 'target_info')}>
                                <div className={cx('info_box')}>
                                    <div className={cx('status')}>
                                        <WifiTwoToneIcon />
                                        <p>連線中</p>
                                    </div>
                                    <div className={cx('status')}>
                                        <BoltTwoToneIcon />
                                        <p>999W</p>
                                    </div>
                                    <div className={cx('status')}>
                                        <AccessTimeTwoToneIcon />
                                        <p>99項排程執行中</p>
                                    </div>
                                </div>
                                <div className={cx('icon')}>
                                    <PowerSettingsNewTwoToneIcon
                                        fontSize="large"
                                        sx={{
                                            fontSize: '60px',
                                            color: '#39b54a'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={cx('target_box', 'target_control')}>
                                <div className={cx('inner')}>
                                    <Button
                                        variant="outlined"
                                        // size="small"
                                        sx={{
                                            borderRadius: '30px',
                                            borderColor: '#6f7883', // 使用自訂義背景顏色
                                            color: '#6f7883' // 文字顏色
                                            // '&:hover': {
                                            //     backgroundColor: '#bf2055' // 滑鼠懸停時的背景顏色
                                            // }
                                        }}
                                    >
                                        排程管理
                                    </Button>
                                </div>
                                <div className={cx('inner')}>
                                    <Switch inputProps={{ 'aria-label': 'Switch demo' }} defaultChecked={true} />
                                    使用中
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EnergyMangement;
