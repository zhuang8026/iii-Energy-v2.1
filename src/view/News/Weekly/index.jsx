import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// components
import NewsReport from '@/components/ui/NewsReport';
import Progress from '@/components/ui/Progress';
import LineChart from '@/components/ui/LineChart';
import PieChart from '@/components/ui/PieChart';

// mui UI
import Button from '@mui/material/Button';

// icon
import EnergySavingsLeafTwoToneIcon from '@mui/icons-material/EnergySavingsLeafTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';

// css
import classes from '../style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Healthy = '#20a2a0';
const Warning = '#ff6700';

const Weekly = () => {
    const { closeNewsReport } = NewsReport();
    return (
        <div className={cx('weekly')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    <h2>週報</h2>
                </div>
                <div className={cx('cancel')} onClick={() => closeNewsReport()}>
                    <LogoutTwoToneIcon fontSize="medium" />
                </div>
            </div>

            <div className={cx('tag')}>
                <div className={cx('tag_item')}>
                    <h4>家庭能源報告</h4>
                </div>
                <div className={cx('tag_item')}>
                    <h4>2024</h4>
                </div>
                <div className={cx('tag_item')}>
                    <h4>12/9 ~ 12/15</h4>
                </div>
            </div>

            <div className={cx('content', 'content_weekly')}>
                <div className={cx('left')}>
                    <div className={cx('block')}>
                        <h5>同儕用電比較</h5>
                        <Progress
                            title="本戶"
                            kwh={100} //
                            percent={40}
                            overPercent={0}
                            bgColor={Healthy}
                        />
                        <Progress
                            title="近似本戶"
                            kwh={200} //
                            percent={70}
                            overPercent={0}
                            bgColor={Healthy}
                        />
                        <Progress
                            title="低耗能本戶"
                            kwh={300} //
                            percent={90}
                            overPercent={0}
                            bgColor={Warning}
                        />
                    </div>
                    <div className={cx('block', 'chart')}>
                        <h5>近期用電量比較</h5>
                        <LineChart />
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('block', 'weekly_block')}>
                        <h5>電器用電佔比</h5>
                        <div className={cx('electric_total')}>
                            <PieChart />
                        </div>
                    </div>
                    <div className={cx('block')}>
                        <h5>節電建議</h5>
                        <ul>
                            <li>1. 非常棒!您上週比低耗能用戶少用了46% 的電量，請繼續保持。</li>
                            <li>2. 冰箱中不要塞過多食材，以8分滿為宜可正常對流，來減輕冰箱的負荷約5%。</li>
                            <li>
                                上述建議是否對您有幫助？
                                <div className={cx('btn')}>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            backgroundColor: '#fff',
                                            color: '#478cd1'
                                        }}
                                    >
                                        否
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            backgroundColor: '#478cd1',
                                            color: '#fff'
                                        }}
                                    >
                                        是
                                    </Button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weekly;
