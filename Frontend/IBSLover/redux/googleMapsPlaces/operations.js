import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDistanceFromLatLonInKm } from '../../utils/utils';
import axios from 'axios';
import { Alert } from 'react-native';
import { api } from '../../global';

export const fetchGoogleMaps = createAsyncThunk(
    'toilets/fetchGoogleMaps',
    async (pin, thunkAPI) => {
        try {
            if (!pin || !pin.latitude || !pin.longitude) {
                console.log('no pin')
                return;
            }
            // console.log('fetching Google maps api')
            const response = await axios.get(`${api}/normal/getGooglePlaces?location=${pin.latitude},${pin.longitude}`);
            console.log(`From google: ${JSON.stringify(response.data)}`)
            const places = response.data.map(place => {
                let newPlace = {
                    id: place._id,
                    voteCount: place.votesCount,
                    name: place.name,
                    description: place.description,
                    vicinity: place.description,
                    lastUpdateTime: place.lastUpdateTime,
                    isOpening: place.isOpening,
                    isRemoved: place.isRemoved,
                    features: {
                        genderNeutral: place.features?.genderNeutral || false,
                        children: place.features?.children || false,
                        women: place.features?.women || false,
                        men: place.features?.men || false,
                        accessible: place.features?.accessible || false,
                        free: place.features?.free || false,
                    },
                    geometry: {
                        location: {
                            lng: place.location.coordinates[0],
                            lat: place.location.coordinates[1],
                        }
                    },
                    userId: place.users,
                    keyword: place.keyword || '',
                    removeMsg: place.removeMsg || ''
                };
                return newPlace;
            });
            const placesWithDistance = places.map(place => {
                const distance = getDistanceFromLatLonInKm(
                    pin.latitude,
                    pin.longitude,
                    place.geometry.location.lat,
                    place.geometry.location.lng,
                );
                return { ...place, distance };
            });

            const sortedPlaces = placesWithDistance.sort((a, b) => a.distance - b.distance);
            // console.log(sortedPlaces)
            /**
             *     {
        "business_status": "OPERATIONAL", 
        "distance": "0.14", 
        "geometry": {
            "location": [
                function Object() { [native code] }

            ], 
            "viewport": [
                function Object() { [native code] }

            ]
        }, 
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png", 
        "icon_background_color": "#FF9E67", 
        "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet", 
        "name": "Starbucks", 
        "opening_hours": {
            "open_now": false
        }, 
        "photos": [
            [
                function Object() { [native code] }

            ]
        ], 
        "place_id": "ChIJ96HYr4-AhYARIpeOo-wEFEE", 
        "plus_code": {
            "compound_code": "QHPV+Q3 Union Square, San Francisco, CA, USA", 
            "global_code": "849VQHPV+Q3"
        }, 
        "price_level": 2, 
        "rating": 3.7, 
        "reference": "ChIJ96HYr4-AhYARIpeOo-wEFEE", 
        "scope": "GOOGLE", 
        "types": [
            "cafe", 
            "food", 
            "store", 
            "point_of_interest", 
            "establishment"
        ], 
        "user_ratings_total": 93, 
        "vicinity": "170 O'Farrell St, San Francisco"
    }, 
             */
            return sortedPlaces;
        }
        catch (error) {
            console.log(error)
            if (error.response) {
                if (error.response.status === 429) {
                    // TODO
                    // Alert.alert("Operation too frequent", "Please try again later.");
                } else if (error.response.status === 430) {
                    Alert.alert("Sorry", "The server's API quota for today has been reached, please come back tomorrow.");
                } else {
                    // Handle other status codes or general network errors
                    Alert.alert("Network Error", "Unable to connect to the server, please check your network connection and try again.");
                }
            } else {
                // Handle errors that don't have a response (e.g., network timeout)
                Alert.alert("Unknown error occured");
            }
            console.log(error);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)