import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// components
import NewsReport from '@/components/ui/NewsReport';
import Progress from '@/components/ui/Progress';
import LineChart from '@/components/ui/LineChart';

// mui UI
import Button from '@mui/material/Button';

// icon
import VerticalAlignBottomTwoToneIcon from '@mui/icons-material/VerticalAlignBottomTwoTone';
import EnergySavingsLeafTwoToneIcon from '@mui/icons-material/EnergySavingsLeafTwoTone';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const Monthly = () => {
    const { closeNewsReport } = NewsReport();
    return (
        <div className={cx('monthly')}>
            <div className={cx('header')}>
                <div className={cx('title')}>
                    <h2>月報</h2>
                </div>
                <div className={cx('cancel')} onClick={() => closeNewsReport()}>
                    <VerticalAlignBottomTwoToneIcon fontSize="medium" />
                </div>
            </div>

            <div className={cx('tag')}>
                <div className={cx('tag_item')}>
                    <h4>家庭能源報告</h4>
                </div>
                <div className={cx('tag_item')}>
                    <h4>2024/10</h4>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('left')}>
                    <div className={cx('block')}>
                        <h5>同儕用電比較</h5>
                        <Progress
                            title="本戶"
                            kwh={289} //
                            percent={40}
                            overPercent={0}
                            bgColor="#478cd1"
                        />
                        <Progress
                            title="近似本戶"
                            kwh={278} //
                            percent={36}
                            overPercent={0}
                            bgColor="#69c8be"
                        />
                        <Progress
                            title="低耗能本戶"
                            kwh={228} //
                            percent={28}
                            overPercent={0}
                            bgColor="#26bbbb"
                        />
                    </div>
                    <div className={cx('block', 'chart')}>
                        <h5>近一年用電量比較</h5>
                        <LineChart />
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('block')}>
                        <h5>用電總結</h5>
                        <div className={cx('electric_total')}>
                            <div className={cx('electric_item')}>
                                <div className={cx('electric_icon')}>
                                    <EnergySavingsLeafTwoToneIcon fontSize="100px" />
                                </div>
                                <div className={cx('electric_value')}>
                                    <div className="">用電度數</div>
                                    <div className={cx('electric_number')}>
                                        <p>274</p>度
                                    </div>
                                </div>
                            </div>
                            <div className={cx('electric_item')}>
                                <div className={cx('electric_icon')}>
                                    CO
                                    <span>2</span>
                                </div>
                                <div className={cx('electric_value')}>
                                    <div className="">排碳量</div>
                                    <div className={cx('electric_number')}>
                                        <p>135</p>公斤
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('block')}>
                        <h5>節電表現</h5>
                        <ul>
                            <li>1. 非常棒!您上月的用電量比低耗能用戶少 27%。</li>
                            <li>
                                2. 建議下月目標為 550 度 是否設定以此度數為下月目標？
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

export default Monthly;
