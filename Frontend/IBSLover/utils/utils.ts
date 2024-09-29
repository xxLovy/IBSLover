// utils.ts

/**
 * Calculates the distance between two points on Earth given their latitude and longitude.
 * @param lat1 Latitude of the first point
 * @param lon1 Longitude of the first point
 * @param lat2 Latitude of the second point
 * @param lon2 Longitude of the second point
 * @returns The distance in kilometers, rounded to two decimal places
 */
export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): string {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(2);
}

/**
 * Converts degrees to radians.
 * @param deg Angle in degrees
 * @returns The angle in radians
 */
export function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}


export function mergePlacesAddDistance(
    place1: Toilet[] | null | undefined,
    place2: Toilet[] | null | undefined,
    userLat: number,
    userLon: number
): Toilet[] {
    let allPlaces: Toilet[] = [];

    // 合并 place1 和 place2
    if (place1 && place2) {
        allPlaces = place1.concat(place2);
    } else if (place1) {
        allPlaces = place1;
    } else if (place2) {
        allPlaces = place2;
    }

    const placesWithDistance: Toilet[] = allPlaces.map(toilet => {
        const distance = parseFloat(getDistanceFromLatLonInKm(userLat, userLon, toilet.location.coordinates[1], toilet.location.coordinates[0]));
        return {
            ...toilet,
            distance: distance,
        };
    });

    placesWithDistance.sort((a, b) => a.distance - b.distance);

    return placesWithDistance;
}