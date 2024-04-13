// utils.js
export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
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

export function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export function mergePlaces(place1, place2) {
    let allPlaces = [];
    if (place1 && place2) {
        allPlaces = place1.concat(place2);
    } else if (place1) {
        allPlaces = place1;
    } else if (place2) {
        allPlaces = place2;
    }
    allPlaces.sort((a, b) => a.distance - b.distance);
    return allPlaces
}