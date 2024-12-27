import React, { useState, useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';

// mui icon
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const columns = [
    {   
        flex: 2,
        field: 'active',
        headerName: '開關',
        minWidth: 80,
        sortable: false, // 禁用排序
        description: '',
        renderCell: params => {
            // Render a Switch component for the 'active' column
            return (
                <Switch
                    checked={Boolean(params.row.active)} // 確保是布林值
                    onChange={event => console.log('Switch changed: ', params, event.target.checked)}
                />
            );
        }
    },
    { flex: 1,field: 'date',      headerName: '日期',    sortable: true,  description: '日期', minWidth: 120 },
    { flex: 2,field: 'time',      headerName: '時間',    sortable: true,  description: '時間', minWidth: 80 },
    { flex: 1,field: 'frequency', headerName: '頻率',    sortable: false, description: '頻率', minWidth: 80 },
    { flex: 7,field: 'weekend',   headerName: '週期',    sortable: false, description: '週期', minWidth: 120 },
    { flex: 1,field: 'action',    headerName: '動作',    sortable: false, description: '動作', minWidth: 80 },
    { flex: 1,field: 'status',    headerName: '執行狀態', sortable: false, description: '執行狀態', minWidth: 120 },
    { flex: 3,field: 'edit',      headerName: '編輯',    sortable: false, description: '編輯', minWidth: 100,
        renderCell: params => {
            // Render a Switch component for the 'active' column
            return (
                <div className={cx('ui-table-btns')}>
                    <BorderColorTwoToneIcon onClick={() => alert('編輯')} />
                    <DeleteTwoToneIcon onClick={() => alert('刪除')} />
                </div>
            );
        }
    }
];

const paginationModel = { page: 0, pageSize: 5 };

const UITable = ({ rows = [] }) => {
    const [filteredColumns, setFilteredColumns] = useState([]);

    // 動態過濾 columns，僅顯示 rows 中存在的字段
    useEffect(() => {
        if (rows.length > 0) {
            const rowFields = Object.keys(rows[0]);
            const filtered = columns.filter(column => rowFields.includes(column.field));

            if (filtered.length < 6) {
                filtered.map(column => column['flex'] = 1)
            } else {
                filtered.find(column => column.field === 'active').flex = 2;
                filtered.find(column => column.field === 'time').flex = 2;
                filtered.find(column => column.field === 'weekend').flex = 7;
                filtered.find(column => column.field === 'edit').flex = 3;
            }
            setFilteredColumns(filtered);
        } else {
            setFilteredColumns([]);
        }
    }, [rows]);
    if (rows.length === 0) return null;
    return (
        <Paper classes={{ root: cx('ui-table') }} sx={{ height: 'auto', width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={filteredColumns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                disableColumnMenu // 禁用每列的三點菜單
                disableRowSelectionOnClick // 禁用行點擊時選中功能
                sx={{ border: 0 }}
            />
        </Paper>
    );
};

export default UITable;
