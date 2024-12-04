import React, { useState, useEffect, useRef } from 'react';
// import { withRouter, Link, Redirect } from 'react-router-dom';

//翻譯
import { useTranslation } from 'react-i18next';

// echarts
import * as echarts from 'echarts';

// components
import BorderLinearProgress from '@/components/ui/BorderLinearProgress';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const PieChart = ({ type = '', value = 100.0, total = 200.0, compareValue = 0 }) => {
    const { t, i18n } = useTranslation();
    const chartDOM = useRef();

    const initChart = () => {
        const Health = '#20A2A0'; // 未超標顏色
        const Warning = '#ff6700'; // 超標顏色
        const Danger = '#ff0000'; // 超標顏色
        let chartLine = echarts.init(chartDOM.current);
        chartLine.clear();

        // 未使用用電量
        const emptyValue = () => {
            const targetNumber = total * (120 / 100); // 目標的120%
            if (value >= targetNumber) return 0;
            return targetNumber - value; // 目標的120% - 累積用電量
        };

        // 未使用用電量
        const emptyDangerValue = () => {
            const dangerVal = value - total;
            if (dangerVal < 0) return 0;
            return total - dangerVal; // 目標的120% - 累積用電量
        };

        const option = {
            // animation: false, // 關閉整體動畫
            // selectedMode: false,
            series: [
                // 外圈 - 未過100%的部分
                {
                    type: 'pie',
                    radius: ['98%', '78%'], // 外圈的半徑範圍
                    data: [
                        // ...seriesData,
                        {
                            value: 10,
                            name: 'usedValue',
                            itemStyle: {
                                color: Health, // 有參數則為 20A2A0，沒參數則為 #EBEEFA
                                borderRadius: 20,
                                // borderColor: '#20A2A0',
                                borderWidth: 0
                            }
                        },
                        {
                            value: 20,
                            name: 'warningValue',
                            itemStyle: {
                                color: Warning, // 有參數則為 20A2A0，沒參數則為 #EBEEFA
                                borderRadius: 20,
                                // borderColor: '#20A2A0',
                                borderWidth: 0
                            }
                        },
                        {
                            value: emptyValue(), // 未使用用電量
                            name: 'empty',
                            itemStyle: {
                                color: '#EBEEFA',
                                borderWidth: 0
                            }
                        }
                    ],
                    label: {
                        show: false
                    },
                    itemStyle: {
                        borderRadius: 20,
                        borderWidth: 0
                        // borderColor: '#20A2A0',
                        // borderWidth: 1
                    },
                    emphasis: {
                        scale: false,
                        itemStyle: {
                            color: 'inherit', // 繼承原色，防止變色
                            shadowBlur: 0, // 去掉陰影模糊
                            shadowOffsetX: 0, // 去掉陰影 X 偏移
                            shadowOffsetY: 0, // 去掉陰影 Y 偏移
                            borderColor: 'inherit', // 防止邊框顏色變化
                            borderWidth: 0 // 去掉邊框寬度
                        }
                    }
                }
            ]
        };

        chartLine.setOption(option);
    };

    useEffect(() => {
        initChart();
    }, []);

    return (
        <div className={cx('pie')}>
            <div className={cx('pieBox')}>
                {/* 圓餅圖 */}
                <div id={cx('pieChart')} ref={chartDOM} />
                {/* 目標度數 */}
                <div className={cx('chartDesc')}>
                    <div className={cx('result')}>上週總用電量度數</div>
                    <div className={cx('chartNumber')}>
                        <span>{value}</span>
                        {t("kwh")}
                    </div>
                </div>
            </div>
            {/* 使用電器度數 */}
            <div className={cx('progress')}>
                <BorderLinearProgress name={'電視'} value={20} />
                <BorderLinearProgress name={'冰箱'} value={90} color="#ff6700" />
                <BorderLinearProgress name={'冰箱'} value={90} color="#ff6700" />
                <BorderLinearProgress name={'冰箱'} value={90} color="#ff6700" />
                <BorderLinearProgress name={'冰箱'} value={90} color="#ff6700" />
                <BorderLinearProgress name={'冰箱'} value={90} color="#ff6700" />
            </div>
        </div>
    );
};

export default PieChart;
