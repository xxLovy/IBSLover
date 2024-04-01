// utils/handler.js
import { getInitialLocation, searchNearbyPlaces, searchNearbyPlacesByUser } from './api';

export const handleRefresh = async (setPin, setRegion, setPlaces, setPlacesByUser) => {
    // Re-fetch the user's current location
    await getInitialLocation(setPin, setRegion);

    // Re-fetch nearby places
    await searchNearbyPlaces(pin, setPlaces);
    await searchNearbyPlacesByUser(pin, setPlacesByUser);
};
