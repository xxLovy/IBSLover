import React, { useEffect } from 'react';
import {
    Button,
    SafeAreaView,
    View
} from 'react-native';
import MmapView from '../components/MmapView';
import ListView from '../components/ListView';
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentLocation } from '../redux/pin/operations';
import { fetchGoogleMaps } from '../redux/googleMapsPlaces/operations';
import { selectCurrentLocation } from '../redux/pin/selectors';
import { selectHasListView, selectMapRefRegion } from '../redux/stateManage/selectors';
import { fetchNearByPlacesByUser } from '../redux/userCreatedPlaces/operations';
import { fetchKeywords } from '../redux/filter/operations';
import { navigateToPlace } from '../utils/helper';
import { selectgooglePlaces } from '../redux/googleMapsPlaces/selectors';
import { selectBannedWord } from '../redux/filter/selectors';
import { setMapRefRegion } from '../redux/stateManage/slice';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const pin = useSelector(selectCurrentLocation);
    const hasListView = useSelector(selectHasListView);
    // currently, PANIC! only fetches result by GoogleMaps
    const places = useSelector(selectgooglePlaces)
    const bannedWord = useSelector(selectBannedWord)
    const mapRefRegion = useSelector(selectMapRefRegion)
    if (places) {
        let selectedPlaces = places.forEach(places => {
            return !bannedWord.includes(places.KWD)
        });
    } else {
        let selectedPlaces = []
    }


    useEffect(() => {
        dispatch(fetchCurrentLocation());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchGoogleMaps(pin));
        dispatch(fetchNearByPlacesByUser(pin))
        dispatch(fetchKeywords())
        dispatch(setMapRefRegion({
            ...mapRefRegion,
            latitude: pin.latitude,
            longitude: pin.longitude,
        }))
    }, [dispatch, pin]);

    return (
        <SafeAreaView style={tw`flex-1`}>
            <View style={hasListView ? tw`flex-6` : tw`flex-1`}>
                <MmapView />
            </View>
            <View style={hasListView ? tw`flex-4` : tw`flex-0`}>
                <ListView />
            </View>
            <View style={tw`flex justify-center items-center`}>
                <Button
                    title="PANIC!"
                    color="red"
                    onPress={() => {
                        navigateToPlace(selectedPlaces[0].geometry.location.lat, selectedPlaces[0].geometry.location.lng, selectedPlaces[0].name);
                    }}
                />
            </View>

        </SafeAreaView>
    );
}