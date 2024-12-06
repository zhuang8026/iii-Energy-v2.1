import React, { useState, useEffect } from 'react';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

const UIInput = ({
    type = 'text',
    name = '',
    id = '',
    placeholder = '',
    value = '',
    required = true,
    onChange = () => {}
}) => {
    const [inputVal, setInputVal] = useState(value); // 輸入的值x

    const handleChange = e => {
        setInputVal(e.target.value);
        onChange(e);
    };

    return (
        <>
            <input
                type={type}
                name={name}
                id={id}
                className={cx('input')}
                placeholder={placeholder}
                required={required}
                value={inputVal}
                onChange={e => handleChange(e)}
            />
        </>
    );
};

export default UIInput;
