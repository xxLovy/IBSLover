import { Text, View, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import tw from 'twrnc'
import { selectCurrentLocation } from '../redux/pin/selectors';
import { selectgooglePlaces } from '../redux/googleMapsPlaces/selectors';
import { selectUserPlaces } from '../redux/userCreatedPlaces/selectors'
import customMarkerImage from '../assets/ToiletMarker0.png';
import { navigateToPlace } from '../utils/helper';
import NaviBar from './NaviBar';
import ToiletByUser from '../assets/ToiletByUser.png'

const MmapView = () => {
    const pin = useSelector(selectCurrentLocation);
    const placesByGoogle = useSelector(selectgooglePlaces);
    const placesByUser = useSelector(selectUserPlaces)
    const mapRef = useRef();

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



                {placesByGoogle && placesByGoogle.map((place, index) => (

                    <Marker
                        key={index}
                        coordinate={{
                            latitude: place.geometry.location.lat,
                            longitude: place.geometry.location.lng,
                        }}
                        title={place.name}
                        description={place.vicinity}
                        image={customMarkerImage}
                    // ref={(ref) => {
                    //     markersRef[index] = ref;
                    // }}
                    >
                        <Callout>
                            <View>
                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{place.name}</Text>
                                <Text>{place.vicinity}</Text>
                                <TouchableOpacity onPress={() => {
                                    navigateToPlace(place.geometry.location.lat, place.geometry.location.lng, place.name);
                                }}>
                                    <Text style={{ color: 'blue', marginTop: 5, textAlign: 'center' }}>Click to navigate</Text>
                                </TouchableOpacity>

                            </View>
                        </Callout>
                    </Marker>
                ))}

                {placesByUser && placesByUser.map((place, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: place.geometry.location.lat,
                            longitude: place.geometry.location.lng,
                        }}
                        title={place.name}
                        description={place.vicinity}
                        image={ToiletByUser}
                    >
                        <Callout>
                            <View>
                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{place.name}</Text>
                                <Text>{place.vicinity}</Text>
                                <Text>Vote Count: {place.voteCount}</Text>
                                <TouchableOpacity onPress={() => {
                                    navigateToPlace(place.geometry.location.lat, place.geometry.location.lng, place.name);
                                }}>
                                    <Text style={{ color: 'blue', marginTop: 5, textAlign: 'center' }}>Click to navigate</Text>
                                </TouchableOpacity>

                            </View>
                        </Callout>
                    </Marker>
                ))}

            </MapView>
            <View style={tw`absolute top-0 right-0 p-4`}>
                <NaviBar />
            </View>
        </View>
    )
}

export default MmapView