import React, { useEffect } from 'react';
import {
    Button,
    SafeAreaView,
    Text,
    View
} from 'react-native';
import MmapView from '../components/MmapView';
import ListView from '../components/ListView';
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentLocation } from '../redux/pin/operations';
import { fetchGoogleMaps } from '../redux/googleMapsPlaces/operations';
import { selectCurrentLocation, selectIsLoading } from '../redux/pin/selectors';
import { selectHasListView, selectMapRefRegion } from '../redux/stateManage/selectors';
import { fetchNearByPlacesByUser } from '../redux/userCreatedPlaces/operations';
import { fetchKeywords } from '../redux/filter/operations';
import { navigateToPlace } from '../utils/helper';
import { selectIsLoadingWhileGoogle, selectgooglePlaces } from '../redux/googleMapsPlaces/selectors';
import { selectBannedWord } from '../redux/filter/selectors';
import { setMapRefRegion } from '../redux/stateManage/slice';
import { mergePlaces } from '../utils/utils';
import { selectUserPlaces } from '../redux/userCreatedPlaces/selectors';
import { selectUser } from '../redux/auth/selectors';
import { setIsSignedin, setUserInfo } from '../redux/auth/slice';

export default function HomeScreen() {
    const dispatch = useDispatch();
    const pin = useSelector(selectCurrentLocation);
    const hasListView = useSelector(selectHasListView);
    // currently, PANIC! only fetches result by GoogleMaps
    const placesByGoogle = useSelector(selectgooglePlaces)
    const placesByUser = useSelector(selectUserPlaces)
    const bannedWord = useSelector(selectBannedWord)
    const mapRefRegion = useSelector(selectMapRefRegion)
    const allPlaces = mergePlaces(placesByGoogle, placesByUser)
    const user = useSelector(selectUser)
    const isLoading = useSelector(selectIsLoadingWhileGoogle)
    const selectedPlaces = allPlaces.filter((item) => {
        if (item.KWD && bannedWord.includes(item.KWD)) {
            return false
        } else if (item.userId?.userId && !item.userId?.userId?.includes(user?.userId)) {
            return false
        } else if (!item.userId?.userId && !item.KWD) {
            return false
        }
        return true
    })

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
        dispatch(setUserInfo({}))
        dispatch(setIsSignedin(false))
    }, [dispatch, pin]);

    return (
        <SafeAreaView style={tw`flex-1`}>
            {pin.isLoading ? <Text style={tw`text-lg flex justify-center items-center`}>Fetching your current location...</Text> :
                <View style={tw`flex-1`}>
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
                            disabled={isLoading || !selectedPlaces}

                        />
                    </View>


                </View>}
        </SafeAreaView>

    );
}