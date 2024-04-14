import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { getDistanceFromLatLonInKm } from '../../utils/utils';

const api = 'https://xxxxuan.xyz';

export const fetchNearByPlacesByUser = createAsyncThunk(
    'toilets/fetchNearByPlacesByUser',
    async (pin, thunkAPI) => {
        try {
            const response = await axios.get(`${api}/toilets`);
            const places = response.data.map(place => {
                let newPlace = {
                    voteCount: place.votes,
                    name: place.name,
                    vicinity: place.description,
                    geometry: {
                        location: {
                            lng: place.coordinates.coordinates[0],
                            lat: place.coordinates.coordinates[1],
                        }
                    }
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