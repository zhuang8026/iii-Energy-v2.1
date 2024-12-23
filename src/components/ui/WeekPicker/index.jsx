import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

//翻譯
import { useTranslation } from 'react-i18next';

// css
import 'react-calendar/dist/Calendar.css';
import './style.scss';

/**
 * npm install react-calendar
 *
 */
function WeekPicker({ onClick = () => {} }) {
    const { t, i18n } = useTranslation();
    const [weekRange, setWeekRange] = useState([]); // 存儲當前選中的周範圍

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

    // 設置默認值：當前週
    useEffect(() => {
        const currentDate = new Date();
        const range = getWeekRange(currentDate);
        setWeekRange([...range]);
    }, []);

    return (
        <div className="weekPicker">
            <Calendar
                locale={i18n.language} // 傳入 i18n 當前語言
                onClickDay={handleDayClick} // 點擊日期時觸發
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
