// api.js
import axios from 'axios';
import { getDistanceFromLatLonInKm } from '../utils/utils';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const api = 'http://13.238.182.211:80';


export const getInitialLocation = async (setPin, setRegion) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.warn('Location permission denied');
        return;
    }

    let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 10000,
        timeout: 5000,
    });
    if (location) {
        setPin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
        setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        });
    }
};


// TODO: Loading
export const searchNearbyPlaces = async (pin, setPlaces) => {
    if (!pin || !pin.latitude || !pin.longitude) return;

    try {
        console.log('fetching Google maps api')
        const response = await axios.get(`${api}/search`, {
            params: {
                latitude: pin.latitude,
                longitude: pin.longitude,
            },
        });

        const placesWithDistance = response.data.map(place => {
            const distance = getDistanceFromLatLonInKm(
                pin.latitude,
                pin.longitude,
                place.geometry.location.lat,
                place.geometry.location.lng,
            );
            return { ...place, distance };
        });

        const sortedPlaces = placesWithDistance.sort((a, b) => a.distance - b.distance);
        setPlaces(sortedPlaces);
    } catch (error) {
        setPlaces([]);
        const urlString = `${api}/search?latitude=${pin.latitude}&longitude=${pin.longitude}`;
        console.log(urlString);
        if (error.response) {
            if (error.response.status === 429) {
                Alert.alert("Operation too frequent", "Please try again later.");
            } else if (error.response.status === 430) {
                Alert.alert("Sorry", "The server's API quota for today has been reached, please come back tomorrow.");
            } else {
                // Handle other status codes or general network errors
                Alert.alert("Network Error", "Unable to connect to the server, please check your network connection and try again.");
            }
        } else {
            // Handle errors that don't have a response (e.g., network timeout)
            Alert.alert("Network Error", "Unable to connect to the server, please check your network connection and try again.");
        }
        console.log(error);
    }
};

export const searchNearbyPlacesByUser = async (pin, setPlacesByUser) => {
    if (!pin || !pin.latitude || !pin.longitude) return;

    try {
        // put all of the results on map
        // console.log('fetching (user)')
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
            // latitude=经度 (-90, 90)
            // console.log(newPlace.geometry.location.lat)
            // console.log(newPlace.geometry.location.lng)
            return newPlace;
        });
        // console.log(places)

        const placesWithDistance = places.map(place => {
            const distance = getDistanceFromLatLonInKm(
                pin.latitude,
                pin.longitude,
                place.geometry.location.lat,
                place.geometry.location.lng
            );
            return { ...place, distance };
        });

        // sort according to distance
        const sortedPlaces = placesWithDistance.sort((a, b) => a.distance - b.distance);

        setPlacesByUser(sortedPlaces);
        // console.log(places)
        console.log('fetched and sorted by distance (user)');
    } catch (error) {
        console.log(error);
        setPlacesByUser([]);
        const urlString = `${api}/toilets`;
        console.log(urlString);
        if (error.response) {
            if (error.response.status === 429) {
                Alert.alert("Operation too frequent", "Please try again later.");
            } else if (error.response.status === 430) {
                Alert.alert("Sorry", "The server's API quota for today has been reached, please come back tomorrow.");
            } else {
                // Handle other status codes or general network errors
                Alert.alert("Network Error", "Unable to connect to the server, please check your network connection and try again.");
            }
        } else {
            // Handle errors that don't have a response (e.g., network timeout)
            Alert.alert("Network Error", "Unable to connect to the server, please check your network connection and try again.");
        }
    }
};