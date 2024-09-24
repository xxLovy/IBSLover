import { Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import tw from 'twrnc'
// import customMarkerImage from '../assets/ToiletMarker0.png';
// import toiletBySelf from '../assets/ToiletBySelf.png'
import { navigateToPlace } from '../utils/helper';
import NaviBar from './NaviBar';
// import ToiletByUser from '../assets/ToiletByUser.png'
import { selectBannedWord, selectVotingCount } from '../redux/filter/selectors';
import Refresh from './Refresh';
import { mergePlaces } from '../utils/utils';
import { selectMapRefRegion, selectSelectedMarker } from '../redux/stateManage/slice';
import { setSelectedMarker } from '../redux/stateManage/slice';
import { selectUser } from '../redux/auth/slice';
import { selectToiletFromGoogle, selectToiletFromUser } from '../redux/googleMapsPlaces/slice';
import { selectCurrentLocation } from '../redux/pin/slice';

const MmapView = () => {
    const markerRef = {}
    const pin = useAppSelector(selectCurrentLocation);
    const placesByGoogle = useAppSelector(selectToiletFromGoogle);
    const placesByUser = useAppSelector(selectToiletFromUser);
    const allPlaces: Toilet[] = mergePlaces(placesByGoogle, placesByUser)
    const bannedWord = useAppSelector(selectBannedWord)
    const votingCountFilter = useAppSelector(selectVotingCount)
    const mapRef = useRef<MapView>(null);
    const mapRefRegion = useAppSelector(selectMapRefRegion)
    const selectedMarker = useAppSelector(selectSelectedMarker)
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)

    useEffect(() => {
        if (mapRefRegion && mapRef.current) {
            mapRef.current.animateToRegion(mapRefRegion, 1000);
        }
    }, [mapRefRegion]);

    if (pin.latitude === 0 && pin.longitude === 0) {
        return null; // Or render a loading indicator
    }

    return (
        <View style={tw`flex-1 relative`}>
            <MapView
                ref={mapRef}
                style={tw`h-full bg-white`}
                region={
                    {
                        latitude: pin.latitude,
                        longitude: pin.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }
                }
                onRegionChangeComplete={() => {
                    if (selectedMarker) {
                        markerRef[selectedMarker].showCallout();
                        dispatch(setSelectedMarker(null));
                    }
                }}
            // provider='google'
            >
                <Marker
                    coordinate={pin}
                    pinColor="black"
                >
                    <Callout>
                        <Text>I'm here</Text>
                        <Text>{pin.latitude}</Text>
                        <Text>{pin.longitude}</Text>
                    </Callout>
                </Marker>



                {allPlaces && allPlaces.map((place, index) => {
                    if (!place.votesCount && bannedWord.includes(place.keyword)) return;
                    if (place.votesCount && place.votesCount <= votingCountFilter) return;
                    else return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: place.location.coordinates[1],
                                longitude: place.location.coordinates[0],
                            }}
                            title={place.name}
                            description={place.description}
                            image={
                                place.votesCount
                                    ? place.users.includes(user?.userId) && user?.userId !== undefined
                                        ? require('../assets/ToiletBySelf.png')
                                        : require('../assets/ToiletByUser.png')
                                    : require('../assets/ToiletMarker0.png')
                            }
                            ref={(ref) => {
                                markerRef[index + 1] = ref
                            }}
                        >
                            <Callout>
                                <View>
                                    <Text style={tw`font-semibold text-center`}>{place.name}</Text>
                                    <Text>{place.description}</Text>
                                    <TouchableOpacity onPress={() => {
                                        navigateToPlace(place.location.coordinates[1], place.location.coordinates[0], place.name);
                                    }}>
                                        <Text style={tw`text-blue-500 mt-2 text-center`}>Click to navigate</Text>
                                    </TouchableOpacity>
                                </View>
                            </Callout>

                        </Marker>
                    )

                })}


            </MapView>
            <View style={tw`absolute top-0 right-0 p-4`}>
                <NaviBar />
            </View>
            <View style={tw`absolute top-0 left-0 p-4`}>
                <Refresh />
            </View>
        </View>
    )
}

export default MmapView