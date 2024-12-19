import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// components
import NewsReport from '@/components/ui/NewsReport';
import Progress from '@/components/ui/Progress';
import LineChart from '@/components/ui/LineChart';

// icon
import VerticalAlignBottomTwoToneIcon from '@mui/icons-material/VerticalAlignBottomTwoTone';
import EnergySavingsLeafTwoToneIcon from '@mui/icons-material/EnergySavingsLeafTwoTone';
import './style_module.scss';

const Monthly = () => {
    const { closeNewsReport } = NewsReport();
    return (
        <div className="monthly">
            <div className="header">
                <div className="title">
                    <h2>月報</h2>
                </div>
                <div className="cancel" onClick={() => closeNewsReport()}>
                    <VerticalAlignBottomTwoToneIcon fontSize="medium" />
                </div>
            </div>

            <div className="tag">
                <div className="tag_item">
                    <h4>家庭能源報告</h4>
                </div>
                <div className="tag_item">
                    <h4>2024/10</h4>
                </div>
            </div>

            <div className="content">
                <div className="left">
                    <div className="block">
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
                    <div className="block chart">
                        <h5>近一年用電量比較</h5>
                        <LineChart />
                    </div>
                </div>
                <div className="right">
                    <div className="block">
                        <h5>用電總結</h5>
                        <div className="electric_total">
                            <div className="electric_item">
                                <div className="electric_icon">
                                    <EnergySavingsLeafTwoToneIcon fontSize="100px" />
                                </div>
                                <div className="electric_value">
                                    <div className="">用電度數</div>
                                    <div className="electric_number">
                                        <p>274</p>度
                                    </div>
                                </div>
                            </div>
                            <div className="electric_item">
                                <div className="electric_icon">
                                    CO
                                    <span>2</span>
                                </div>
                                <div className="electric_value">
                                    <div className="">排碳量</div>
                                    <div className="electric_number">
                                        <p>135</p>公斤
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="block">
                        <h5>節電表現</h5>
                        1. 非常棒!您上月的用電量比低耗能用戶少 27%。 2. 建議下月目標為 550 度
                        是否設定以此度數為下月目標？ 是 否
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Monthly;
