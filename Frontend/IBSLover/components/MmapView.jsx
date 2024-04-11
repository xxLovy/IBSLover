import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc'
import { selectCurrentLocation } from '../redux/pin/selectors';
import { fetchCurrentLocation } from '../redux/pin/operations';

const MmapView = () => {
    const dispatch = useDispatch();
    const pin = useSelector(selectCurrentLocation);
    const mapRef = useRef();
    useEffect(() => {
        dispatch(fetchCurrentLocation())
    }, [dispatch])

    if (pin.latitude === 0 && pin.longitude === 0) {
        return null; // Or render a loading indicator
    }

    return (
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

        </MapView>
    )
}

export default MmapView

const styles = StyleSheet.create({})