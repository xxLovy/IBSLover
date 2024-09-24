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
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchCurrentLocation } from '../redux/pin/operations';
import { fetchToiletFromGoogle, fetchToiletFromUser } from '../redux/googleMapsPlaces/operations';
import { selectHasListView, selectMapRefRegion } from '../redux/stateManage/slice';
import { fetchKeywords } from '../redux/filter/operations';
import { navigateToPlace } from '../utils/helper';
import { selectBannedWord } from '../redux/filter/selectors';
import { setMapRefRegion } from '../redux/stateManage/slice';
import { mergePlaces } from '../utils/utils';
import { selectUser } from '../redux/auth/slice';
import { setIsSignedIn, setUserInfo } from '../redux/auth/slice';
import Loading from '../components/Loading';
import { selectToiletFromGoogle, selectToiletFromUser, selectToiletLoading } from '../redux/googleMapsPlaces/slice';
import { selectCurrentLocation } from '../redux/pin/slice';

export default function HomeScreen() {
    const dispatch = useAppDispatch();
    const pin = useAppSelector(selectCurrentLocation);
    const hasListView = useAppSelector(selectHasListView);
    // currently, PANIC! only fetches result by GoogleMaps
    const placesByGoogle = useAppSelector(selectToiletFromGoogle)
    const placesByUser = useAppSelector(selectToiletFromUser)
    const bannedWord = useAppSelector(selectBannedWord)
    const mapRefRegion = useAppSelector(selectMapRefRegion)
    const allPlaces: Toilet[] = mergePlaces(placesByGoogle, placesByUser)
    const user = useAppSelector(selectUser)
    const isLoading = useAppSelector(selectToiletLoading)
    const selectedPlaces = allPlaces.filter((item) => {
        // if (item.KWD && bannedWord.includes(item.KWD)) {
        //     return false
        // } else if (item.userId?.userId && !item.userId?.userId?.includes(user?.userId)) {
        //     return false
        // } else if (!item.userId?.userId && !item.KWD) {
        //     return false
        // }
        return true
    })
    console.log(`Selected: ${JSON.stringify(selectedPlaces)}`)

    useEffect(() => {
        dispatch(fetchCurrentLocation());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchToiletFromGoogle(pin));
        dispatch(fetchToiletFromUser())
        dispatch(fetchKeywords())
        dispatch(setMapRefRegion({
            ...mapRefRegion,
            latitude: pin.latitude,
            longitude: pin.longitude,
        }))
        dispatch(setUserInfo({}))
        dispatch(setIsSignedIn(false))
    }, [dispatch, pin]);

    return (
        <SafeAreaView style={tw`flex-1`}>
            {pin.isLoading ? <View style={tw`flex-1 justify-center items-center`}><Loading text={"Fetching your current location..."} /></View> :
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
                                navigateToPlace(selectedPlaces[0].location.coordinates[1], selectedPlaces[0].location.coordinates[0], selectedPlaces[0].name);
                            }}
                            disabled={isLoading || !selectedPlaces}

                        />
                    </View>


                </View>}
        </SafeAreaView>

    );
}