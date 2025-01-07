import React, { useState, useEffect } from 'react';

// image
import ROLE1 from '@/assets/images/role_1.png';
import ROLE2 from '@/assets/images/role_2.png';
import ROLE3 from '@/assets/images/role_3.png';

// css
import classes from './style.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(classes);

// 背景人物圖片列表
const CHARACTER_IMAGES = [ROLE1, ROLE2, ROLE3];

const Roles = ({ containerRef, count = 20 }) => {
    const IMAGE_COUNT = count; // 設定圖片數量（可調整）

    const [characters, setCharacters] = useState([]);
    const GRID_SIZE = 150; // 網格單元的大小（包括間隔）
    const IMAGE_SIZE = 100; // 圖片大小（寬度和高度）
    const MARGIN = (GRID_SIZE - IMAGE_SIZE) / 2; // 保證圖片居中

    const shuffleArray = array => {
        // 使用 Fisher-Yates 洗牌算法隨機打亂數組
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const generateCharacters = () => {
        if (!containerRef.current) return;

        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;

        const columns = Math.floor(containerWidth / GRID_SIZE); // 計算列數
        const rows = Math.floor(containerHeight / GRID_SIZE); // 計算行數

        const totalPositions = columns * rows; // 總可用位置
        const positions = [];

        // 生成所有規律的網格位置
        for (let i = 0; i < totalPositions; i++) {
            const row = Math.floor(i / columns); // 行號
            const col = i % columns; // 列號

            const x = col * GRID_SIZE + MARGIN; // 水平位置
            const y = row * GRID_SIZE + MARGIN; // 垂直位置

            positions.push({ x, y });
        }

        // 隨機打亂網格位置
        const shuffledPositions = shuffleArray(positions);

        const newCharacters = [];

        // 按打亂的位置分配圖片
        for (let i = 0; i < shuffledPositions.length; i++) {
            const randomImage = CHARACTER_IMAGES[i % CHARACTER_IMAGES.length]; // 循環取圖片

            newCharacters.push({
                id: i,
                image: randomImage,
                position: shuffledPositions[i] // 使用打亂後的位置
            });
        }

        setCharacters(newCharacters);
    };

    useEffect(() => {
        generateCharacters();

        const handleResize = () => generateCharacters();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {characters.map(char => (
                <img
                    key={char.id}
                    src={char.image}
                    alt="character"
                    className={cx('role_img')}
                    style={{
                        position: 'absolute',
                        top: char.position.y,
                        left: char.position.x,
                        width: `${IMAGE_SIZE}px`,
                        height: `${IMAGE_SIZE}px`
                    }}
                />
            ))}
        </>
    );
};

export default Roles;
