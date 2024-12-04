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

    const [options, setOptions] = useState({
        legend: {
            // data: ['2023', '2024'],
            // orient: 'vertical', // 垂直排列
            // right: 50, // 靠右側距離
            bottom: 0, // 距離頂部的距離
            icon: 'rect',
            itemHeight: 5
        },
        // 折線圖的絕對位置
        grid: {
            top: '13%',
            left: '1%',
            right: '4%',
            bottom: '1%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            nameGap: 40,
            boundaryGap: false,
            splitLine: {
                show: true // 每條X軸的線
            },
            axisTick: {
                show: true // 刻度線
            }
        },
        yAxis: {
            type: 'value',
            // name: '度/kwh',
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
            }
        },
        // animation: false, // 關閉整體動畫
        // selectedMode: false,
        series: [
            {
                type: 'line',
                itemStyle: {
                    color: '#2FCBBB'
                },
                data: [1, 2, 3, 1, 2, 3, 1, 2, 3, 4, 7, 8]
            },
            {
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
