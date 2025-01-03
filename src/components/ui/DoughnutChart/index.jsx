import React, { useState, useEffect, useRef } from 'react';
// import { withRouter, Link, Redirect } from 'react-router-dom';

//翻譯
import { useTranslation } from 'react-i18next';

// echarts
import * as echarts from 'echarts';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const DoughnutChart = ({ type = '', value = 100.0, total = 200.0, compareValue = 0 }) => {
    const { t, i18n } = useTranslation();
    const chartDOM = useRef();

    const initChart = () => {
        const Health = '#20A2A0'; // 未超標顏色
        const Warning = '#ff6700'; // 超標顏色
        const Danger = '#ff0000'; // 超標顏色
        const chartDom = chartDOM.current;
        // 獲取或初始化圖表實例
        let chartLine = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);

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
            tooltip: {
                trigger: 'item', // 确保触发 tooltip
                // formatter: '{b}: {c}度 ({d}%)', // 显示项名称、值和百分比
                formatter: params => {
                    // 动态设置 tooltip 的背景色
                    const tooltipDom = document.querySelector('.echarts-tooltip');
                    if (tooltipDom) {
                        tooltipDom.style.backgroundColor = params.color;
                    }
                    return `${params.name}: ${params.value}度 (${params.percent}%)`;
                },
                textStyle: {
                    fontSize: 16
                }
            },
            dataZoom: {
                type: 'slider', // 可選：禁用滾動
                show: false // 隱藏滾動縮放
            },
            series: [
                // 外圈 - 未過100%的部分
                {
                    type: 'pie',
                    radius: ['98%', '78%'], // 外圈的半徑範圍
                    data: [
                        // ...seriesData,
                        {
                            value: value >= total ? total : value,
                            name: '本月用電量',
                            itemStyle: {
                                color: Health, // 有參數則為 20A2A0，沒參數則為 #EBEEFA
                                borderRadius: 20,
                                // borderColor: '#20A2A0',
                                borderWidth: 0
                            }
                        },
                        {
                            value: value >= total * 1.2 ? total * 0.2 : value - total,
                            name: '超出用電量',
                            itemStyle: {
                                color: Warning, // 有參數則為 20A2A0，沒參數則為 #EBEEFA
                                borderRadius: 20,
                                // borderColor: '#20A2A0',
                                borderWidth: 0
                            }
                        },
                        {
                            value: emptyValue(), // 未使用用電量
                            name: '未使用電量',
                            itemStyle: {
                                color: '#EBEEFA',
                                borderRadius: 20,
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
                        scale: false, // hover 時會放大效果
                        itemStyle: {
                            color: 'inherit', // 繼承原色，防止變色
                            shadowBlur: 0, // 去掉陰影模糊
                            shadowOffsetX: 0, // 去掉陰影 X 偏移
                            shadowOffsetY: 0, // 去掉陰影 Y 偏移
                            borderColor: 'inherit', // 防止邊框顏色變化
                            borderWidth: 0 // 去掉邊框寬度
                        }
                    }
                },

                // [danger] 內圈 - 超過100%的部分
                value - total * (120 / 100) > 0 && {
                    type: 'pie',
                    radius: ['60%', '74%'], // 內圈的半徑範圍
                    data: [
                        {
                            value: value - total * (120 / 100),
                            name: '超出用電量',
                            itemStyle: {
                                color: Danger, // 有參數則為 20A2A0，沒參數則為 #EBEEFA
                                borderRadius: 20,
                                // borderColor: '#20A2A0',
                                borderWidth: 0
                            }
                        },
                        {
                            value: emptyDangerValue(), // 未使用用電量
                            name: '未使用電量',
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

        // Add passive event listener for mousewheel
        chartDOM.current.addEventListener('mousewheel', (event) => {
            event.preventDefault();
        }, { passive: true });
    }, []);

    return (
        <div className={cx('chart')}>
            <div className={cx('chartBox')}>
                {/* 圓餅圖 */}
                <div id={cx('doughnutChart')} ref={chartDOM} />
                {/* 100%關鍵點 */}
                <div className={cx('chartDot')} />
                {/* 目標度數 */}
                <div className={cx('chartDesc')}>
                    <div className={cx('chartNumber')}>
                        <span>{value}</span>
                        {t('kwh')}
                    </div>
                </div>
            </div>
            {compareValue > 0 ? (
                <div className={cx('result')}>* {t('home.comparison_more', { value: compareValue })}</div>
            ) : (
                compareValue !== 0 && (
                    <div className={cx('result')}>* {t('home.comparison_last', { value: Math.abs(compareValue) })}</div>
                )
            )}
            {type === 'month' && value - total > 0 && (
                <div className={cx('result')}>* {t('home.exceeded_target_by_degrees', { value: value - total })}</div>
            )}
        </div>
    );
};

export default DoughnutChart;
