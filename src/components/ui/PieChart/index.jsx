import React, { useState, useEffect, useRef } from 'react';
// import { withRouter, Link, Redirect } from 'react-router-dom';

//翻譯
import { useTranslation } from 'react-i18next';

// echarts
import * as echarts from 'echarts';

// components
import BorderLinearProgress from '@/components/ui/BorderLinearProgress';
import Progress from '@/components/ui/Progress';

// untils
import { generateGradientColors } from '@/utils/generateGradientColors';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const PieChart = ({ type = '', value = 1000.0, total = 200.0, compareValue = 0 }) => {
    const { t, i18n } = useTranslation();
    const chartDOM = useRef();
    const [list, setList] = useState([
        { electricName: '電視', value: 10 },
        { electricName: '冰箱', value: 20 },
        { electricName: '冷氣', value: 30 },
        { electricName: '開飲機', value: 40 },
        { electricName: '洗衣機', value: 50 },
        { electricName: '電風扇', value: 60 },
        { electricName: '電腦', value: 80 },
        { electricName: '電鍋', value: 90 },
        { electricName: '除濕機', value: 60 },
        { electricName: '其他', value: 40 }
    ]);

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

        const seriesData = list.map(item => {
            return {
                value: item.value,
                name: item.electricName,
                itemStyle: {
                    color: item.color,
                    borderRadius: 0,
                    borderWidth: 0
                }
            };
        });
        const option = {
            // animation: false, // 關閉整體動畫
            // selectedMode: false,
            series: [
                // 外圈 - 未過100%的部分
                {
                    type: 'pie',
                    radius: ['98%', '78%'], // 外圈的半徑範圍
                    data: [...seriesData],
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

        generateGradientColors(list.length).map((color, index) => {
            console.log(color);
            list[index].color = color;
        });
        setList([...list]);
    }, []);

    return (
        <div className={cx('pieUI')}>
            <div className={cx('pieBox')}>
                {/* 圓餅圖 */}
                <div id={cx('pieChart')} ref={chartDOM} />
                {/* 目標度數 */}
                <div className={cx('chartDesc')}>
                    <div className={cx('result')}>上週總用電量度數</div>
                    <div className={cx('chartNumber')}>
                        <span>{value}</span>
                        {t('kwh')}
                    </div>
                </div>
            </div>
            {/* 使用電器度數 */}
            <div className={cx('progress')}>
                {list.map((item, index) => (
                    <Progress
                        title={item.electricName}
                        kwh={item.value}
                        percent={item.value}
                        overPercent={0}
                        bgColor={item.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default PieChart;
