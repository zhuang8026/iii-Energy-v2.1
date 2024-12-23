/**
 * 自動生成高級漸變色
 * @param count - 要生成的顏色數量
 * @param startHue - 起始色相 (0-360)
 * @param endHue - 結束色相 (0-360)
 * @param saturation - 飽和度 (0-100)，建議在 60-80 範圍內
 * @param lightness - 亮度 (0-100)，建議在 55-70 範圍內
 * @returns 包含漸變色的數組
 */
function generateGradientColors(
    count: number,
    startHue: number = 20,    // 起始色相，略偏暖色
    endHue: number = 300,    // 結束色相，略偏冷色
    saturation: number = 75, // 飽和度，偏高以保證鮮豔
    lightness: number = 65   // 亮度，稍高以保證高級感
): string[] {
    if (count <= 0) {
        throw new Error('Count must be greater than 0');
    }

    const colors: string[] = [];
    const step = (endHue - startHue) / (count - 1);

    for (let i = 0; i < count; i++) {
        const hue = startHue + step * i;
        colors.push(`hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`);
    }

    return colors;
}

export { generateGradientColors };
