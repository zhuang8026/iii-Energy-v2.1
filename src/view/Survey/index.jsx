import React, { useState, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// components
import Loading from '@/components/ui/Loading';
import PopUp from '@/components/global/PopUp';
import InputPrompt from '@/components/ui/InputPrompt';
import UIInput from '@/components/ui/UIInput';

// mui components
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';

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
const cx = classNames.bind(classes);

const Survey = () => {
    const [from, setFrom] = useState({
        question: {
            q1: [
                { id: 'a1', option: '(1). 上班族？' },
                { id: 'b1', option: '(2). 幼童(0-5歲)？' },
                { id: 'c1', option: '(3). 學齡兒童(6-12歲)？' },
                { id: 'd1', option: '(4). 國中以上學生?' },
                { id: 'e1', option: '(5). 退休族群、家管或在家工作者?' }
            ],
            q2_1: [
                { id: 'a', option: '0台' },
                { id: 'b', option: '1台' },
                { id: 'c', option: '2台' },
                { id: 'd', option: '3台以上' }
            ],
            q2_2: [
                { id: 'a', option: '0台' },
                { id: 'b', option: '1台' },
                { id: 'c', option: '2台' },
                { id: 'd', option: '3台以上' }
            ],
            q2_3: {
                16: '16',
                17: '17',
                18: '18',
                19: '19',
                20: '20',
                21: '21',
                22: '22',
                23: '23',
                24: '24',
                25: '25',
                26: '26',
                27: '27',
                28: '28',
                29: '29',
                30: '30'
            },
            q2_4: [
                { id: 'a', option: '0台' },
                { id: 'b', option: '1台' },
                { id: 'c', option: '2台' },
                { id: 'd', option: '3台以上' }
            ],
            q2_5: [
                { id: 'a', option: '每天' },
                { id: 'b', option: '4-6天' },
                { id: 'c', option: '1-3天' },
                { id: 'd', option: '沒有電視或不使用' }
            ],
            q2_6: [
                { id: 'a', option: '0-8點', isDisabled: false },
                { id: 'b', option: '8-16點', isDisabled: false },
                { id: 'c', option: '16-24點', isDisabled: false }
            ],
            q2_7: [
                { id: 'a', option: '每天' },
                { id: 'b', option: '4-6天' },
                { id: 'c', option: '1-3天' },
                { id: 'd', option: '沒有電腦或不使用' }
            ],
            q2_8: [
                { id: 'a', option: '0-8點', isDisabled: false },
                { id: 'b', option: '8-16點', isDisabled: false },
                { id: 'c', option: '16-24點', isDisabled: false }
            ],
            q2_9: [
                { id: 'a', option: '每天' },
                { id: 'b', option: '4-6天' },
                { id: 'c', option: '1-3天' },
                { id: 'd', option: '沒有電鍋或不使用' }
            ],
            q2_10: [
                { id: 'a', option: '0-8點', isDisabled: false },
                { id: 'b', option: '8-16點', isDisabled: false },
                { id: 'c', option: '16-24點', isDisabled: false }
            ],
            q2_11: [
                { id: 'a', option: '每天' },
                { id: 'b', option: '4-6天' },
                { id: 'c', option: '1-3天' },
                { id: 'd', option: '沒有洗衣機或不使用' }
            ],
            q2_12: [
                { id: 'a', option: '每天' },
                { id: 'b', option: '4-6天' },
                { id: 'c', option: '1-3天' },
                { id: 'd', option: '沒有除濕機或不使用' }
            ]
        },
        answer: {
            a1: '',
            b1: '',
            c1: '',
            d1: '',
            e1: '',
            a2: '',
            a3: '',
            a4: 16,
            a5: '',
            a6: '',
            a7: [],
            a8: '',
            a9: [],
            a10: '',
            a11: [],
            a12: '',
            a13: ''
        }
    });

    const { openLoading, closeLoading } = Loading();
    const { openPopUp, closePopUp } = PopUp();

    // 起始值和结束值的配置
    const minValue = 16; // 起始标签
    const maxValue = 30; // 结束标签
    const steps = 15; // 总刻度点数量

    // 生成平均分布的 marks 数据
    const generateMarks = (min, max, steps) => {
        const stepValue = (max - min) / (steps - 1); // 每步的增量
        return Array.from({ length: steps }, (_, index) => {
            const value = (index / (steps - 1)) * 100; // 计算滑块的 value (0 到 100)
            const label = Math.round(min + stepValue * index); // 计算标签值
            return { value, label: label.toString() };
        });
    };

    const marks = generateMarks(minValue, maxValue, steps);

    return (
        <div className={cx('survey')}>
            <div className={cx('survey_content')}>
                <div className={cx('survey_form')}>
                    <h1>家戶組成與電器持有調查</h1>
                    <p>初次登入請填寫本問卷，完成填寫才能使用平台，謝謝！</p>
                    <div className={cx('survey_group')}>
                        {/* Question 1 */}
                        <div className={cx('survey_question')}>
                            <>
                                一、您同住的家庭人口組成 (含自己) <span className={cx('mark')}>*</span>
                            </>
                            <div>
                                <div className={cx('options')}>
                                    <ul>
                                        <li>0人</li>
                                        <li>1人</li>
                                        <li>2人</li>
                                        <li>3人以上</li>
                                    </ul>
                                </div>
                                <ul className={cx('radio_items')}>
                                    {from.question.q1.map((item, index) => (
                                        <li key={item.id}>
                                            <div className={cx('radio_group_label')}>{item.option}</div>
                                            <div className={cx('radio_group')}>
                                                <FormControl>
                                                    {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"
                                                    >
                                                        <FormControlLabel value="0" control={<Radio />} label="" />
                                                        <FormControlLabel value="1" control={<Radio />} label="" />
                                                        <FormControlLabel value="2" control={<Radio />} label="" />
                                                        <FormControlLabel value="3" control={<Radio />} label="" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <span className={cx('error_message')}>請選擇家庭人口組成</span>
                        </div>
                        {/* Question 2 */}
                        <div className={cx('survey_question')}>
                            <>
                                二、家中電器持有調查與使用習慣 <span className={cx('mark')}>*</span>
                            </>

                            {/* 2-1 */}
                            <div>
                                <>
                                    1、家中冰箱數量為 <span className={cx('mark')}>*</span>
                                </>
                                <ul className={cx('radio_items', 'radio_row')}>
                                    <li>
                                        {/* <div className={cx('radio_group_label')}>{item.option}</div> */}
                                        <div className={cx('radio_group')}>
                                            <FormControl>
                                                {/* <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel> */}
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    {from.question.q2_1.map((item, index) => (
                                                        <FormControlLabel
                                                            value={item.option}
                                                            control={<Radio />}
                                                            label={item.option}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <span className={cx('error_message')}>請選擇一項</span>

                            {/* 2-2 */}
                            <div>
                                <>
                                    2.家中冷氣數量(以室內機計算)為 <span className={cx('mark')}>*</span>
                                </>
                                <ul className={cx('radio_items', 'radio_row')}>
                                    <li>
                                        <div className={cx('radio_group')}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    {from.question.q2_2.map((item, index) => (
                                                        <FormControlLabel
                                                            value={item.option}
                                                            control={<Radio />}
                                                            label={item.option}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <span className={cx('error_message')}>請選擇一項</span>

                            {/* 2-3 */}
                            <div>
                                <>
                                    3.冷氣經常設定溫度為 <span className={cx('mark')}>*</span>
                                </>
                                <div>介於 16~30 之間</div>
                                <div>
                                    <Slider
                                        aria-label="Average marks"
                                        defaultValue={50} // 设置滑块的初始位置 (可以是任意的 value)
                                        valueLabelDisplay="auto"
                                        sx={{ color: '#20a2a0', height: '8px' }}
                                        marks={marks}
                                        step={null} // 仅允许停留在生成的 marks 上
                                        valueLabelFormat={value => {
                                            const mark = marks.find(mark => mark.value === value);
                                            return mark ? mark.label : value;
                                        }}
                                    />
                                </div>
                            </div>
                            <span className={cx('error_message')}>請選擇一項</span>

                            {/* 2-4 */}
                            <div>
                                <>
                                    4.家中電熱水瓶/飲水機數量為 <span className={cx('mark')}>*</span>
                                </>
                                <ul className={cx('radio_items', 'radio_row')}>
                                    <li>
                                        <div className={cx('radio_group')}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    {from.question.q2_4.map((item, index) => (
                                                        <FormControlLabel
                                                            value={item.option}
                                                            control={<Radio />}
                                                            label={item.option}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <span className={cx('error_message')}>請選擇一項</span>

                            {/* 2-5 */}
                            <div>
                                <>
                                    5.一週當中, 有幾天會觀看電視 <span className={cx('mark')}>*</span>
                                </>
                                <ul className={cx('radio_items', 'radio_row')}>
                                    <li>
                                        <div className={cx('radio_group')}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    {from.question.q2_5.map((item, index) => (
                                                        <FormControlLabel
                                                            value={item.option}
                                                            control={<Radio />}
                                                            label={item.option}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <span className={cx('error_message')}>請選擇一項</span>

                            {/* 2-6 */}
                            <div>
                                <>
                                    6. 電視經常觀看時段為(可複選) <span className={cx('mark')}>*</span>
                                </>
                                <ul className={cx('radio_items', 'radio_row')}>
                                    {from.question.q2_6.map((item, index) => (
                                        <li key={item.id}>
                                            <div className={cx('radio_group')}>
                                                <FormControlLabel
                                                    control={<Checkbox defaultChecked />}
                                                    label={item.option}
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <span className={cx('error_message')}>請選擇一項</span>

                            {/* 2-7 */}
                            <div>
                                <>
                                    7.一週當中, 有幾天會使用電腦 <span className={cx('mark')}>*</span>
                                </>
                                <ul className={cx('radio_items', 'radio_row')}>
                                    <li>
                                        <div className={cx('radio_group')}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    {from.question.q2_7.map((item, index) => (
                                                        <FormControlLabel
                                                            value={item.option}
                                                            control={<Radio />}
                                                            label={item.option}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <span className={cx('error_message')}>請選擇一項</span>

                            {/* 2-8 */}
                            <div>
                                <>
                                    8.電腦經常使用時段為(可複選) <span className={cx('mark')}>*</span>
                                </>
                                <ul className={cx('radio_items', 'radio_row')}>
                                    <li>
                                        <div className={cx('radio_group')}>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    {from.question.q2_8.map((item, index) => (
                                                        <FormControlLabel
                                                            value={item.option}
                                                            control={<Radio />}
                                                            label={item.option}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <span className={cx('error_message')}>請選擇一項</span>

                            {/* 2-9 */}
                            <div>
                                <>
                                    9.一週當中, 有幾天會使用電鍋 <span className={cx('mark')}>*</span>
                                </>
                                <ul className={cx('radio_items', 'radio_row')}>
                                    <li>
                                        <div className={cx('radio_group')}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    {from.question.q2_9.map((item, index) => (
                                                        <FormControlLabel
                                                            value={item.option}
                                                            control={<Radio />}
                                                            label={item.option}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <span className={cx('error_message')}>請選擇一項</span>

                            {/* 2-10 */}
                            <div>
                                <>
                                    10.電鍋經常使用時段為(可複選) <span className={cx('mark')}>*</span>
                                </>
                                <ul className={cx('radio_items', 'radio_row')}>
                                    <li>
                                        <div className={cx('radio_group')}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    {from.question.q2_10.map((item, index) => (
                                                        <FormControlLabel
                                                            value={item.option}
                                                            control={<Radio />}
                                                            label={item.option}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <span className={cx('error_message')}>請選擇一項</span>

                            {/* 2-11 */}
                            <div>
                                <>
                                    11.一週當中, 有幾天會使用洗衣機 <span className={cx('mark')}>*</span>
                                </>
                                <ul className={cx('radio_items', 'radio_row')}>
                                    <li>
                                        <div className={cx('radio_group')}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    {from.question.q2_11.map((item, index) => (
                                                        <FormControlLabel
                                                            value={item.option}
                                                            control={<Radio />}
                                                            label={item.option}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <span className={cx('error_message')}>請選擇一項</span>

                            {/* 2-12 */}
                            <div>
                                <>
                                    12.一週當中, 有幾天會使用除濕機 <span className={cx('mark')}>*</span>
                                </>
                                <ul className={cx('radio_items', 'radio_row')}>
                                    <li>
                                        <div className={cx('radio_group')}>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                >
                                                    {from.question.q2_12.map((item, index) => (
                                                        <FormControlLabel
                                                            value={item.option}
                                                            control={<Radio />}
                                                            label={item.option}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <span className={cx('error_message')}>請選擇一項</span>
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
        </div>
    );
};

export default Survey;
