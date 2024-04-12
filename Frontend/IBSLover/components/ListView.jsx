import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectgooglePlaces } from '../redux/googleMapsPlaces/selectors';
import { getDistanceFromLatLonInKm } from '../utils/utils';
import { selectCurrentLocation } from '../redux/pin/selectors';
import tw from 'twrnc'

const ListView = () => {
    const placesByGoogle = useSelector(selectgooglePlaces);

    const renderPlace = ({ item, index }) => {

        return (
            <TouchableOpacity
                onPress={() => {
                    let newRegion = {
                        latitude: item.geometry.location.lat,
                        longitude: item.geometry.location.lng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    };
                    // mapRef.current.animateToRegion(newRegion, 1000); // Smooth transition

                    // // Save the selected marker's reference
                    // setSelectedMarker(markersRef[index]);
                }}
            >


                <View style={tw`p-4 border-b border-gray-200`}>
                    <Text style={tw`text-base font-semibold`}>{item.name}</Text>
                    <Text style={tw`text-sm text-gray-600`}>{item.vicinity}</Text>
                    <Text style={tw`text-xs text-gray-500`}>Distance: {item.distance} km</Text>
                </View>
            </TouchableOpacity>
        )
    };
    return (
        <SafeAreaView>
            <FlatList
                data={placesByGoogle}
                renderItem={renderPlace}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView >

    )
}

export default ListView

const styles = StyleSheet.create({})