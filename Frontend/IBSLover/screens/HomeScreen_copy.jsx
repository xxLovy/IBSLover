import React, { useEffect, useRef } from 'react';
import {
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
import { selectHasListView } from '../redux/stateManage/selectors';
import { fetchNearByPlacesByUser } from '../redux/userCreatedPlaces/operations';

export default function HomeScreen_copy() {
    const dispatch = useDispatch();
    const mapRef = useRef();
    const pin = useSelector(selectCurrentLocation);
    const hasListView = useSelector(selectHasListView);

    useEffect(() => {
        dispatch(fetchCurrentLocation());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchGoogleMaps(pin));
        dispatch(fetchNearByPlacesByUser(pin))
    }, [dispatch, pin]);

    return (
        <SafeAreaView style={tw`flex-1`}>
            <View style={hasListView ? tw`flex-6` : tw`flex-1`}>
                <MmapView />
            </View>
            <View style={hasListView ? tw`flex-4` : tw`flex-0`}>
                <ListView />
            </View>
        </SafeAreaView>
    );
}