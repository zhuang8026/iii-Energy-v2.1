import React, { useState, useEffect } from 'react';

// @mui
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Button from '@mui/material/Button';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

// components ui
import UITable from '@/components/ui/UITable';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const GREEN = '#20a2a0';
const NA2 = '#d6d6d6';

const rows_schedule = [
    { id: 1, active: true, time: '13:15', frequency: '單次', weekend: '', action: '開啟', edit: true },
    { id: 2, active: false, time: '13:12', frequency: '每週', weekend: '日、一、二、三、四、五、六', action: '關閉', edit: true  },
    { id: 3, active: true, time: '12:12', frequency: '單次', weekend: '', action: '開啟', edit: true  },
    { id: 4, active: false, time: '16:41', frequency: '每週', weekend: '日、一、二、三、四、五、六', action: '關閉', edit: true  },
    { id: 5, active: true, time: '21:07', frequency: '單次', weekend: '', action: '開啟', edit: true  },
    { id: 6, active: false, time: '09:12', frequency: '每週', weekend: '日、一、二、三、四、五、六', action: '關閉', edit: true  },
    { id: 7, active: true, time: '13:59', frequency: '單次', weekend: '', action: '開啟', edit: true  },
    { id: 8, active: false, time: '01:12', frequency: '每週', weekend: '日、一、二、三、四、五、六', action: '關閉', edit: true  },
    { id: 9, active: true, time: '00:12', frequency: '單次', weekend: '', action: '開啟', edit: true  }
];

const rows_history = [
    { id: 1, date: '2023/12/13', time: '13:15', weekend: '日', action: '開啟', status: '成功' },
    { id: 2, date: '2023/11/13', time: '13:12', weekend: '二', action: '開啟', status: '失敗' },
    { id: 3, date: '2023/08/28', time: '12:12', weekend: '四', action: '開啟', status: '成功' },
    { id: 4, date: '2023/09/11', time: '16:41', weekend: '五', action: '開啟', status: '失敗' },
    { id: 5, date: '2024/04/06', time: '13:15', weekend: '三', action: '開啟', status: '成功' },
    { id: 6, date: '2022/01/01', time: '13:15', weekend: '六', action: '開啟', status: '失敗' },
    { id: 7, date: '2011/02/13', time: '13:59', weekend: '一', action: '開啟', status: '成功' },
    { id: 8, date: '2009/11/05', time: '00:12', weekend: '二', action: '開啟', status: '失敗' },
    { id: 9, date: '2011/08/21', time: '13:15', weekend: '五', action: '開啟', status: '成功' },
    { id: 10, date: '2007/12/13', time: '01:12', weekend: '三', action: '開啟', status: '失敗' }
];

const RemoteWindows = ({ title = '', closePopUp = () => {} }) => {
    const [rows, setRows] = useState([]);
    const [rowType, setRowType] = useState('schedule');

    const getRows = type => {
        if (type === 'schedule') {
            setRowType('schedule'); // 切換顯示類別
            setRows([...rows_schedule]); // 更新 rows
        } else if (type === 'history') {
            setRowType('history'); // 切換顯示類別
            setRows([...rows_history]); // 更新 rows
        }
    };

    useEffect(() => {
        getRows('schedule');
    }, []);
    return (
        <div className={cx('remote-windows')}>
            <div className={cx('close-btn')} onClick={() => closePopUp()}>
                <CloseTwoToneIcon />
            </div>
            <h3>{title}排程管理</h3>
            <div className={cx('remote-btn')}>
                <Button
                    variant="contained"
                    sx={{background: rowType === 'schedule' ? GREEN : NA2}}
                    onClick={() => getRows('schedule')}
                >
                    排程列表
                </Button>
                <Button
                    variant="contained"
                    sx={{background: rowType === 'history' ? GREEN : NA2}}
                    onClick={() => getRows('history')}
                >
                    歷史列表
                </Button>
            </div>

            <div className={cx('remote-table')}>
                <UITable rows={rows} />
            </div>

            <div className={cx('remote-btn', 'remote-add-btn')}>
                <Button
                    variant="contained"
                    sx={{ background: GREEN }}
                    startIcon={<AddCircleTwoToneIcon />}
                    onClick={() => {}}
                >
                    新增排程
                </Button>
            </div>
        </div>
    );
};

export default RemoteWindows;
