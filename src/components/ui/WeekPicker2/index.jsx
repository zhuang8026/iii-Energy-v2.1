import React, { useState, Suspense, useEffect } from 'react';

import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw'; // 引入繁體中文語系

// utils 工具
import { getCookie } from '@/utils/cookie';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: prop => prop !== 'isSelected' && prop !== 'isHovered'
})(({ theme, isSelected, isHovered, day }) => ({
    borderRadius: 0,
    ...(isSelected && {
        backgroundColor: '#20A2A0',
        color: theme.palette.primary.contrastText,
        '&:hover, &:focus': {
            backgroundColor: '#20A2A0'
        }
    }),
    ...(isHovered && {
        backgroundColor: '#30c0be81',
        '&:hover, &:focus': {
            backgroundColor: '#30c0be81'
        },
        ...theme.applyStyles('dark', {
            backgroundColor: '#20A2A0',
            '&:hover, &:focus': {
                backgroundColor: '#20A2A0'
            }
        })
    }),
    ...(day.day() === 0 && {
        borderTopLeftRadius: '100px',
        borderBottomLeftRadius: '100px'
    }),
    ...(day.day() === 6 && {
        borderTopRightRadius: '100px',
        borderBottomRightRadius: '100px'
    })
}));

const isInSameWeek = (dayA, dayB) => {
    if (dayB == null) {
        return false;
    }

    return dayA.isSame(dayB, 'week');
};

function Day(props) {
    const { day, selectedDay, hoveredDay, ...other } = props;

    return (
        <CustomPickersDay
            {...other}
            day={day}
            sx={{ px: 2.5 }}
            disableMargin
            selected={false}
            isSelected={isInSameWeek(day, selectedDay)}
            isHovered={isInSameWeek(day, hoveredDay)}
        />
    );
}

const WeekPicker = () => {
    const [hoveredDay, setHoveredDay] = useState(null);
    const [value, setValue] = useState(dayjs('2024-04-17'));
    let lang = getCookie('WILLIAMS_LANG') || 'en-us';

    useEffect(() => {
        // 設定 dayjs 語系
        dayjs.locale(lang);
    }, [lang]);

    return (
        <div className={cx('weekPicker')}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={lang}>
                <DateCalendar
                    value={value}
                    minDate={dayjs('2020-01-01')} // Replace the string with a dayjs object
                    maxDate={dayjs('2024-12-31')} // Use dayjs for maxDate as well
                    onChange={newValue => setValue(newValue)}
                    showDaysOutsideCurrentMonth
                    displayWeekNumber
                    slots={{ day: Day }}
                    slotProps={{
                        day: ownerState => ({
                            selectedDay: value,
                            hoveredDay,
                            onPointerEnter: () => setHoveredDay(ownerState.day),
                            onPointerLeave: () => setHoveredDay(null)
                        })
                    }}
                    sx={{
                        width: '100%',
                        height: '70vh',
                        maxHeight: '100%',
                        '.MuiDayCalendar-root': {
                            maxHeight: '100%'
                        },
                        '.MuiPickersSlideTransition-root': {
                            minHeight: '70vh'
                        },
                        '.MuiTypography-root': {
                            fontSize: '20px',
                            width: '12.5%', // 調整每個日期格的寬度
                            height: '12.5%', // 調整每個日期格的高度
                            aspectRatio: '1 / 1' // 確保寬高比為1:1，這樣每個日期格都是正方形
                        },
                        '.MuiPickersDay-root': {
                            fontSize: '20px',
                            width: '12.5%', // 寬度為父容器的12.5%
                            height: '12.5%', // 調整每個日期格的高度
                            aspectRatio: '1 / 1' // 確保寬高比為1:1，這樣每個日期格都是正方形
                        },
                        '.MuiYearCalendar-root': {
                            width: '100%',
                            height: '70vh',
                            maxHeight: 'none'
                        },
                        '.MuiPickersYear-root': {
                            flexBasis: '25%',
                            '.MuiPickersYear-yearButton': {
                                '&:hover': {
                                    width: '100%',
                                    height: '100%'
                                }
                            },
                            '.Mui-selected': {
                                width: '100%',
                                height: '100%'
                            }
                        }
                    }}
                />
            </LocalizationProvider>
        </div>
    );
};

export default WeekPicker;
