// distance.ts

/**
 * 计算两点之间的距离（单位：公里）
 * @param {number} lat1 - 第一点的纬度
 * @param {number} lon1 - 第一点的经度
 * @param {number} lat2 - 第二点的纬度
 * @param {number} lon2 - 第二点的经度
 * @returns {number} - 两点之间的距离（公里）
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRadians = (degrees: number) => degrees * (Math.PI / 180);

    const R = 6371; // 地球半径，单位：公里
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}
