import React, { useRef, useState, useEffect } from 'react';

import * as echarts from 'echarts';

//翻譯
import { useTranslation } from 'react-i18next';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const LineChart = ({ chartData = [] }) => {
    const { t, i18n } = useTranslation();
    const chartDOM = useRef();
    const markPoints = [];
    const [options, setOptions] = useState({
        legend: {
            data: ['2023', '2024'],
            // orient: 'vertical', // 垂直排列
            // right: 50, // 靠右側距離
            bottom: 0, // 距離頂部的距離
            icon: 'rect',
            itemHeight: 5
        },
        tooltip: {
            trigger: 'axis',
            formatter(params) {
                let htmlBody = params.map(
                    (item, index) => `
                        <div style='color: ${item.color};' key=${index}>
                            <span style='font-weight: 600; margin-right: 20px'>${item.seriesName}用電量</span>
                            ${item.value[1]}
                        </div>
                    `
                );
                const html = `
                            <div style='font-weight: bold; text-align: left;'>
                                ${params[0].value[0]}<br/>
                                ${htmlBody.join(' ')}
                            </div>
                            `;

                return html;
            }
        },
        // 折線圖的絕對位置
        grid: {
            left: '7%',
            right: '7%',
            top: '13%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            name: '日期',
            type: 'category',
            nameGap: 40,
            boundaryGap: false,
            splitLine: {
                show: true // 每條X軸的線
            },
            axisTick: {
                show: true // 刻度線
            },
            nameTextStyle: {
                color: '#9193B4', // "月份" 文字顏色
                fontFamily: 'Noto Sans CJK TC,sans-serif',
                fontSize: 14,
                fontWeight: '400',
                padding: [0, 48, 0, -12]
            }
        },
        yAxis: {
            name: '度/kwh',
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            },
            splitLine: {
                // 網格線
                lineStyle: {
                    type: 'solid', // 網格線類型 dotted：虛線，solid:實線
                    width: 0.5,
                    color: '#EBEBEB'
                }
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#B5B5B5',
                    width: 1
                }
            },
            nameTextStyle: {
                color: '#9193B4', // "月份" 文字顏色
                fontFamily: 'Noto Sans CJK TC,sans-serif',
                fontSize: 14,
                fontWeight: '400',
                padding: [0, 48, 0, 15]
            }
        },
        // animation: false, // 關閉整體動畫
        // selectedMode: false,
        series: [
            {
                name: '2023',
                type: 'line',
                itemStyle: {
                    color: '#2FCBBB'
                },
                data: [1, 2, 3, 1, 2, 3, 1, 2, 3, 4, 7, 8]
            },
            {
                name: '2024',
                type: 'line',
                itemStyle: {
                    color: '#ff7c32'
                },
                data: [4, 7, 8, 4, 7, 8, 4, 7, 21, 2, 3, 1]
            }
        ]
    });

    const initChart = () => {
        const chartLine = echarts.init(chartDOM.current);
        chartLine.clear();
        options && chartLine.setOption(options);
    };

    const resizeLineChart = () => {
        const chartLine = echarts.init(chartDOM.current);
        chartLine.setOption(options);

        const handleResize = () => {
            chartLine.resize();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            // 當resize事件發生時會呼叫它chart.resize()
            window.removeEventListener('resize', handleResize);
            chartLine.dispose();
        };
    };

    useEffect(() => {
        setTimeout(() => {
            initChart();
        }, 100);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            resizeLineChart();
        }, 100);
    }, [chartData]);

    return <div id={cx('lineChart')} className={cx('lineChart')} ref={chartDOM} />;
};

export default LineChart;
