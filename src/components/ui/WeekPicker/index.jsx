import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

//翻譯
import { useTranslation } from 'react-i18next';

// css
import 'react-calendar/dist/Calendar.css';
import './style.scss';

const date = [
    {
        year: '2024',
        month: '09',
        weekRangeStart: '09/02',
        weekRangeEnd: '09/08'
    },
    {
        year: '2024',
        month: '09',
        weekRangeStart: '09/09',
        weekRangeEnd: '09/15'
    },
    {
        year: '2024',
        month: '09',
        weekRangeStart: '09/16',
        weekRangeEnd: '09/22'
    },
    {
        year: '2024',
        month: '09',
        weekRangeStart: '09/23',
        weekRangeEnd: '09/29'
    },
    {
        year: '2024',
        month: '09',
        weekRangeStart: '09/30',
        weekRangeEnd: '10/06'
    },
    {
        year: '2024',
        month: '10',
        weekRangeStart: '10/07',
        weekRangeEnd: '10/13'
    },
    {
        year: '2024',
        month: '10',
        weekRangeStart: '10/14',
        weekRangeEnd: '10/20'
    },
    {
        year: '2024',
        month: '10',
        weekRangeStart: '10/21',
        weekRangeEnd: '10/27'
    },
    {
        year: '2024',
        month: '10',
        weekRangeStart: '10/28',
        weekRangeEnd: '11/03'
    },
    {
        year: '2024',
        month: '11',
        weekRangeStart: '11/04',
        weekRangeEnd: '11/10'
    },
    {
        year: '2024',
        month: '11',
        weekRangeStart: '11/11',
        weekRangeEnd: '11/17'
    },
    {
        year: '2024',
        month: '11',
        weekRangeStart: '11/25',
        weekRangeEnd: '12/01'
    },
    {
        year: '2024',
        month: '12',
        weekRangeStart: '11/25',
        weekRangeEnd: '12/01'
    }
];

/**
 * npm install react-calendar
 */
function WeekPicker({ onClick = () => {} }) {
    const { t, i18n } = useTranslation();
    const [allowedRanges, setAllowedRanges] = useState([]); // 存儲允許的日期範圍
    const [weekRange, setWeekRange] = useState([]); // 存儲當前選中的周範圍
    // 計算本週的開始和結束日期
    const startOfWeek = moment().startOf('week'); // 本週的星期日
    const endOfWeek = moment().endOf('week'); // 本週的星期六

    // 額外禁用的日期範圍
    const disabledRanges = [
        { start: moment('2024-12-02'), end: moment('2024-12-08') },
        { start: moment('2024-12-23'), end: moment('2024-12-29') }
    ];

    // 檢查日期是否在禁用範圍內
    const isDateDisabled = date => {
        const currentMoment = moment(date);

        // 檢查是否屬於本週及之後的日期
        if (currentMoment.isSameOrAfter(startOfWeek)) {
            return true;
        }

        // 檢查是否屬於額外的禁用範圍
        return disabledRanges.some(range => currentMoment.isBetween(range.start, range.end, 'day', '[]'));
    };

    // 判斷日期是否允許被點擊
    const isDateAllowed = date => {
        const currentMoment = moment(date);
        return allowedRanges.some(range => currentMoment.isBetween(range.start, range.end, 'day', '[]'));
    };

    // 計算指定日期所在周的開始 (星期一) 和結束 (星期日)
    const getWeekRange = date => {
        const startOfWeek = moment(date).startOf('isoWeek'); // 取得星期一
        const endOfWeek = moment(date).endOf('isoWeek'); // 取得星期日

        return [startOfWeek.toDate(), endOfWeek.toDate()];
    };

    // 當點擊某天時，設定整周範圍
    const handleDayClick = date => {
        const range = getWeekRange(date);
        setWeekRange([...range]);
        onClick(range);
    };

    // 模擬 API 回傳資料
    const fetchAllowedDates = async () => {
        // 將資料轉換為 Moment 範圍
        const ranges = date.map(item => {
            const start = moment(`${item.year}-${item.weekRangeStart}`, 'YYYY-MM/DD');
            const end = moment(`${item.year}-${item.weekRangeEnd}`, 'YYYY-MM/DD');
            return { start, end };
        });

        setAllowedRanges(ranges);
    };

    // 設置默認值：當前週
    useEffect(() => {
        // const currentDate = new Date();
        // const range = getWeekRange(currentDate);
        // setWeekRange([...range]);
    }, []);

    useEffect(() => {
        fetchAllowedDates();
    }, []);

    return (
        <div className="weekPicker">
            <Calendar
                locale={i18n.language} // 傳入 i18n 當前語言
                onClickDay={handleDayClick} // 點擊日期時觸發
                tileDisabled={({ date, view }) => {
                    // 檢查日期是否在禁用範圍內
                    if (view === 'month') {
                        return !isDateAllowed(date); // 禁用不在允許範圍內的日期
                    }
                    return false;
                }}
                tileClassName={({ date, view }) => {
                    if (view === 'month') {
                        const [start, end] = weekRange;

                        if (start && end) {
                            const isInRange = moment(date).isBetween(moment(start), moment(end), 'day', '[]'); // 判斷日期是否在範圍內
                            const isFirstDay = moment(date).isSame(moment(start), 'day'); // 週一
                            const isLastDay = moment(date).isSame(moment(end), 'day'); // 週日

                            if (isInRange) {
                                if (isFirstDay) return 'highlighted-week first-day'; // 週一 css樣式
                                if (isLastDay) return 'highlighted-week last-day'; // 週日 css樣式
                                return 'highlighted-week'; // 其他日期 css樣式
                            }
                        }
                    }
                    return null;
                }}
            />
        </div>
    );
}

export default WeekPicker;
