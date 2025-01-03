import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// components
import Loading from '@/components/ui/Loading';
import PopUp from '@/components/global/PopUp';
import InputPrompt from '@/components/ui/InputPrompt';
import UIInput from '@/components/ui/UIInput';

// mui components
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// @mui
import Button from '@mui/material/Button';

// utils
// import { getCookie, setCookie } from '@/utils/cookie';

// redux
import { useDispatch } from 'react-redux';
import { login } from '@/store/userSlice';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
import { borderRadius } from '@mui/system';
const cx = classNames.bind(classes);

const BindElectric = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Properly define navigate here
    const location = useLocation(); // This gives the current location
    const { openLoading, closeLoading } = Loading();
    const { openPopUp, closePopUp } = PopUp();
    const [canClick, setCanClick] = useState(false);
    const [email, setEmail] = useState('template@gmail.com'); // 默認值
    const [userInfo, setUserInfo] = useState({
        account: '',
        password: ''
    });
    return (
        <div className={cx('bind')}>
            <div className={cx('bind_form')}>
                <h1>綁定電器</h1>
                <div className={cx('bind_group')}>
                    <div className={cx('form_group')}>
                        <label htmlFor="account">綁定電器</label>
                        {/* <input
                            type="text"
                            name="account"
                            id="account"
                            placeholder="請輸入用戶名稱"
                            required="required"
                            onChange={e => setUserInfo({ ...userInfo, account: e.target.value })}
                        /> */}
                        <div className={cx('form_select')}>
                            <div className={cx('select')}>
                                <Select
                                    fullWidth
                                    labelId=""
                                    id=""
                                    sx={{
                                        borderRadius: '100px',
                                        background: '#f7f7f7'
                                    }}
                                    value={1}
                                    // label="Age"
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={1}>電視</MenuItem>
                                    <MenuItem value={2}>開飲機</MenuItem>
                                    <MenuItem value={3}>洗衣機</MenuItem>
                                </Select>
                            </div>
                            <div className={cx('select')}>
                                <Select
                                    fullWidth
                                    labelId=""
                                    id=""
                                    fontSize="20px"
                                    sx={{
                                        borderRadius: '100px',
                                        background: '#f7f7f7'
                                    }}
                                    value={2}
                                    // label="Age"
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={1}>電視</MenuItem>
                                    <MenuItem value={2}>開飲機</MenuItem>
                                    <MenuItem value={3}>洗衣機</MenuItem>
                                </Select>
                            </div>
                            <div className={cx('select')}>
                                <Select
                                    fullWidth
                                    labelId=""
                                    id=""
                                    sx={{
                                        borderRadius: '100px',
                                        background: '#f7f7f7'
                                    }}
                                    value={3}
                                    // label="Age"
                                    // onChange={handleChange}
                                >
                                    <MenuItem value={1}>電視</MenuItem>
                                    <MenuItem value={2}>開飲機</MenuItem>
                                    <MenuItem value={3}>洗衣機</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className={cx('form_group')}>
                        <label htmlFor="password">對應插座ID</label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            className={cx('password')}
                            placeholder=""
                            required="required"
                            value={'F008D1BDC41C'}
                            onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
                        />
                        <input
                            type="text"
                            name="password"
                            id="password"
                            className={cx('password')}
                            placeholder=""
                            required="required"
                            value={'F008D1BDC41C'}
                            onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
                        />
                        <input
                            type="text"
                            name="password"
                            id="password"
                            className={cx('password')}
                            placeholder=""
                            required="required"
                            value={'F008D1BDC41C'}
                            onChange={e => setUserInfo({ ...userInfo, password: e.target.value })}
                        />
                    </div>
                </div>
                <Button
                    variant="contained"
                    sx={{
                        width: '100%',
                        fontSize: '20px',
                        backgroundColor: '#20a2a0',
                        borderRadius: '100px',
                        padding: '14px 0'
                    }}
                    // disabled={!canClick}
                    // onClick={() => canClick && handleLogin()}
                >
                    確認
                </Button>
            </div>
        </div>
    );
};

export default BindElectric;
