import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

//翻譯
import { useTranslation } from 'react-i18next';

// mui
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

// mui icon
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';

// components
import Loading from '@/components/ui/Loading';
// import PopUp from '@/components/global/PopUp';
import WeekPicker from '@/components/ui/WeekPicker';
import MonthCard from '@/components/ui/MonthCard';
import NewsReport from '@/components/ui/NewsReport';

// page
import Monthly from '@/view/News/Monthly';
import Weekly from '@/view/News/Weekly';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const EnergyReport = () => {
    const { t, i18n } = useTranslation();
    // const { openPopUp, closePopUp } = PopUp();
    const { openLoading, closeLoading } = Loading();
    const { openNewsReport } = NewsReport();

    // 開啟月報
    const openMonthlyReport = month => {
        openNewsReport({ component: <Monthly /> });
        document.body.style.overflow = 'hidden'; // 禁用捲動
    };

    // 開啟月報
    const openWeeklyReport = week => {
        openNewsReport({ component: <Weekly /> });
        document.body.style.overflow = 'hidden'; // 禁用捲動
    };

    // useEffect(() => {
    //     openLoading('loading...');
    //     setTimeout(() => {
    //         closeLoading();
    //     }, 1500);
    // }, []);

    return (
        <div className={cx('report')}>
            <div>
                <div className={cx('year_control')}>
                    <h3>{t('energyReport.month_report')}</h3>

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel
                            id="year-select"
                            sx={{
                                '&.Mui-focused': {
                                    color: '#20A2A0' // 当输入框聚焦时的颜色
                                }
                            }}
                        >
                            {t('energyReport.year_select')}
                        </InputLabel>
                        <Select
                            labelId="year-select"
                            id="year-select-helper"
                            value={2024}
                            label="Year"
                            sx={{
                                width: 150, // 设置 Select 宽度
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderRadius: '30px'
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#20A2A0' // hover 时的边框颜色
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#20A2A0' // 焦点状态下的边框颜色
                                }
                            }}
                            // onChange={handleChange}
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value={2022}>2022</MenuItem>
                            <MenuItem value={2023}>2023</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                        </Select>
                        {/* <FormHelperText>With label + helper text</FormHelperText> */}
                    </FormControl>
                </div>
                <div className={cx('block')}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => (
                        <MonthCard data={item} key={index} onClick={month => openMonthlyReport(month)} />
                    ))}
                </div>
            </div>

            <div>
                <h3>{t('energyReport.week_report')}</h3>
                <div className={cx('block', 'block_repeat')}>
                    <div className={cx('weekend_datePicker')}>
                        <WeekPicker onClick={week => openWeeklyReport(week)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnergyReport;
