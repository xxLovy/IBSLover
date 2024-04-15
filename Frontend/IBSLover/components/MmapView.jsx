import { Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc'
import { selectCurrentLocation } from '../redux/pin/selectors';
import { selectgooglePlaces } from '../redux/googleMapsPlaces/selectors';
import { selectUserPlaces } from '../redux/userCreatedPlaces/selectors'
import customMarkerImage from '../assets/ToiletMarker0.png';
import toiletBySelf from '../assets/ToiletBySelf.png'
import { navigateToPlace } from '../utils/helper';
import NaviBar from './NaviBar';
import ToiletByUser from '../assets/ToiletByUser.png'
import { selectBannedWord, selectVotingCount } from '../redux/filter/selectors';
import Refresh from './Refresh';
import { mergePlaces } from '../utils/utils';
import { selectMapRefRegion, selectSelectedMarker } from '../redux/stateManage/selectors';
import { setSelectedMarker } from '../redux/stateManage/slice';
import { selectUser } from '../redux/auth/selectors';

const MmapView = () => {
    const markerRef = {}
    const pin = useSelector(selectCurrentLocation);
    const placesByGoogle = useSelector(selectgooglePlaces);
    const placesByUser = useSelector(selectUserPlaces);
    const allPlaces = mergePlaces(placesByGoogle, placesByUser)
    const bannedWord = useSelector(selectBannedWord)
    const votingCountFilter = useSelector(selectVotingCount)
    const mapRef = useRef();
    const mapRefRegion = useSelector(selectMapRefRegion)
    const selectedMarker = useSelector(selectSelectedMarker)
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    useEffect(() => {
        if (mapRefRegion && mapRef) mapRef?.current?.animateToRegion(mapRefRegion, 1000)
    }, [mapRefRegion])

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
                    if (!place.voteCount && bannedWord.includes(place.KWD)) return;
                    if (place.voteCount && place.voteCount <= votingCountFilter) return;
                    else return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: place.geometry.location.lat,
                                longitude: place.geometry.location.lng,
                            }}
                            title={place.name}
                            description={place.vicinity}
                            image={place.voteCount ? place.userId?.includes(user?.userId) && user?.userId !== undefined ? toiletBySelf : ToiletByUser : customMarkerImage}
                            ref={(ref) => {
                                markerRef[index + 1] = ref
                            }}
                        >
                            <Callout>
                                <View>
                                    <Text style={tw`font-semibold text-center`}>{place.name}</Text>
                                    <Text>{place.vicinity}</Text>
                                    <TouchableOpacity onPress={() => {
                                        navigateToPlace(place.geometry.location.lat, place.geometry.location.lng, place.name);
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