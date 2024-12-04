import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const EditTrack = ({ closePopUp }) => {
    return (
        <div className={cx('edit-popUp')}>
            <h3>本月用電目標額度設定</h3>
            <div className={cx('edit-input')}>
                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined">目標額度</InputLabel>
                    <OutlinedInput
                        id="outlined"
                        type="number"
                        label="Helper text"
                        variant="standard"
                        defaultValue="1000"
                        endAdornment={<InputAdornment position="end">KWH</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight'
                        }}
                        sx={{ fontSize: '20px' }}
                    />
                </FormControl>
            </div>

            <div className={cx('edit-btn')}>
                <Button
                    variant="contained"
                    sx={{ width: '47%', backgroundColor: '#20a2a0' }}
                    onClick={() => closePopUp()}
                >
                    確定
                </Button>
                <Button
                    variant="outlined"
                    sx={{ width: '47%', borderColor: '#20a2a0', color: '#20a2a0' }}
                    onClick={() => closePopUp()}
                >
                    取消
                </Button>
            </div>
        </div>
    );
};

export default EditTrack;
