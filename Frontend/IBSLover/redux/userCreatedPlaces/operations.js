import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { getDistanceFromLatLonInKm } from '../../utils/utils';
import { api } from '../../global';

export const fetchNearByPlacesByUser = createAsyncThunk(
    'toilets/fetchNearByPlacesByUser',
    async (pin, thunkAPI) => {
        try {
            const response = await axios.get(`${api}/normal/getUserCreatedToilets`);
            // console.log(`From user: ${JSON.stringify(response.data)}`)
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
                        genderNeutral: place.features.genderNeutral,
                        children: place.features.children,
                        women: place.features.women,
                        men: place.features.men,
                        accessible: place.features.accessible,
                        free: place.features.free
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
                    place.geometry.location.lng
                );
                /**
                [{"distance": "12147.24", "geometry": {"location": [Object]}, "name": "zzu north", "vicinity": "north toilet", "voteCount": 2}, {"distance": "12793.91", "geometry": {"location": [Object]}, "name": "Test1", "vicinity": "111", "voteCount": 8}]
                 */
                return { ...place, distance };
            });

            // sort according to distance
            const sortedPlaces = placesWithDistance.sort((a, b) => a.distance - b.distance);
            return sortedPlaces;
        } catch (error) {
            console.log(error.message)
            return thunkAPI.rejectWithValue(error.message);
        }

    }
)