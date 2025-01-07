import React, { useState, useRef, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// components
import Loading from '@/components/ui/Loading';
import Roles from '@/components/ui/Roles';
// import PopUp from '@/components/global/PopUp';
// import InputPrompt from '@/components/ui/InputPrompt';
import UIInput from '@/components/ui/UIInput';

// @mui
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone'; // 顯示密碼
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'; // 不顯示密碼
import Button from '@mui/material/Button';

// utils
// import { getCookie, setCookie } from '@/utils/cookie';

// redux
// import { useDispatch } from 'react-redux';
// import { login } from '@/store/userSlice';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

// 抽離樣式
const iconStyle = {
    position: 'absolute',
    right: '20px',
    top: 'calc(50% - 12px)',
    cursor: 'pointer',
    color: '#a5a5a5'
};

const SetPassword = () => {
    const containerRef = useRef(null); // 用於引用容器
    const [showPwd, setShowPwd] = useState({
        showOldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false
    }); // 用於切換顯示密碼
    const [isButtonEnabled, setIsButtonEnabled] = useState(false); // 用於控制按鈕是否可用
    const [formValues, setFormValues] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const { openLoading, closeLoading } = Loading();
    // const { openPopUp, closePopUp } = PopUp();

    // 更新表單輸入值
    const handleInputChange = e => {
        const { name, value } = e.target;

        // 更新值
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));

        // 實時驗證
        validateField(name, value);
    };

    // 單一欄位驗證
    const validateField = (fieldName, value) => {
        let error = '';

        if (fieldName === 'oldPassword') {
            if (value.length < 8) {
                error = '密碼至少需要 8 個字元。';
            }
        }

        if (fieldName === 'newPassword') {
            if (value.length < 8) {
                error = '密碼至少需要 8 個字元。';
            } else if (!/[A-Z]/.test(value)) {
                error = '密碼需包含至少一個大寫字母。';
            } else if (!/[a-z]/.test(value)) {
                error = '密碼需包含至少一個小寫字母。';
            } else if (!/[0-9]/.test(value)) {
                error = '密碼需包含至少一個數字。';
            } else if (!/[!@#$%^&*]/.test(value)) {
                error = '密碼需包含至少一個特殊符號（如 !@#$%^&*）。';
            }
        }

        if (fieldName === 'confirmPassword') {
            if (value !== formValues.newPassword) {
                error = '新密碼與確認密碼不一致。';
            }
        }

        // 更新錯誤訊息
        setErrors(prev => ({
            ...prev,
            [fieldName]: error
        }));
    };

    // 定義為 React 組件
    const PasswordToggleIcon = ({ isVisible, onToggle }) => {
        const Icon = isVisible ? RemoveRedEyeTwoToneIcon : VisibilityOffTwoToneIcon;
        return <Icon sx={iconStyle} onClick={onToggle} />;
    };

    // 檢查按鈕狀態
    useEffect(() => {
        const allFieldsFilled = Object.values(formValues).every(value => value.trim() !== '');
        const noErrors = Object.values(errors).every(error => error === '');
        setIsButtonEnabled(allFieldsFilled && noErrors);
    }, [formValues, errors]);

    return (
        <div
            className={cx('set_password')}
            ref={containerRef} // 綁定容器
        >
            <Roles containerRef={containerRef} count={50} />
            <div className={cx('password_content')}>
                <div className={cx('password_form')}>
                    <h1>密碼變更</h1>
                    <p>
                        注意：密碼必須包含
                        <span>大小寫英文字母</span>、<span>數字</span>及<span>特殊符號</span>
                    </p>
                    <div className={cx('password_group')}>
                        <label htmlFor="oldPassword">
                            <span>原</span>密碼
                        </label>
                        <div className={cx('pwd_input')}>
                            <UIInput
                                type={showPwd.showOldPassword ? 'text' : 'password'}
                                name="oldPassword"
                                id="oldPassword"
                                placeholder="請輸入原始密碼"
                                required
                                onChange={e => handleInputChange(e)}
                            />
                            <PasswordToggleIcon
                                isVisible={showPwd.showOldPassword}
                                onToggle={() =>
                                    setShowPwd(prev => ({
                                        ...prev,
                                        showOldPassword: !prev.showOldPassword
                                    }))
                                }
                            />
                        </div>
                        <p style={{ color: 'red' }}>{errors?.oldPassword}</p>
                    </div>
                    <div className={cx('password_group')}>
                        <label htmlFor="newPassword">
                            <span>新</span>密碼
                        </label>
                        <div className={cx('pwd_input')}>
                            <UIInput
                                type={showPwd.showNewPassword ? 'text' : 'password'}
                                name="newPassword"
                                id="newPassword"
                                placeholder="請輸入新密碼"
                                required
                                onChange={e => handleInputChange(e)}
                            />
                            <PasswordToggleIcon
                                isVisible={showPwd.showNewPassword}
                                onToggle={() =>
                                    setShowPwd(prev => ({
                                        ...prev,
                                        showNewPassword: !prev.showNewPassword
                                    }))
                                }
                            />
                        </div>
                        <p style={{ color: 'red' }}>{errors?.newPassword}</p>
                    </div>
                    <div className={cx('password_group')}>
                        <label htmlFor="checkNewPassword">
                            確認<span>新</span>密碼
                        </label>
                        <div className={cx('pwd_input')}>
                            <UIInput
                                type={showPwd.showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="請輸入新密碼"
                                required
                                onChange={e => handleInputChange(e)}
                            />
                            <PasswordToggleIcon
                                isVisible={showPwd.showConfirmPassword}
                                onToggle={() =>
                                    setShowPwd(prev => ({
                                        ...prev,
                                        showConfirmPassword: !prev.showConfirmPassword
                                    }))
                                }
                            />
                        </div>
                        <p style={{ color: 'red' }}>{errors?.confirmPassword}</p>
                    </div>
                    <br />
                    <Button
                        variant="contained"
                        sx={{
                            width: '100%',
                            fontSize: '20px',
                            backgroundColor: '#20a2a0',
                            borderRadius: '100px',
                            padding: '14px 0'
                        }}
                        disabled={!isButtonEnabled}
                        // onClick={() => canClick && handleLogin()}
                    >
                        確認
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SetPassword;
