import React, { useState, useEffect, createRef } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Button,
    Linking,
    TouchableHighlight,
    FlatList,
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import customMarkerImage from '../assets/ToiletMarker0.png';
import NaviBar from '../components/NaviBar';
import ToiletByUser from '../assets/ToiletByUser.png'
import { searchNearbyPlaces, searchNearbyPlacesByUser, getInitialLocation } from '../utils/api';
import { getDistanceFromLatLonInKm, deg2rad } from '../utils/utils';
import ChooseFilter from './ChooseFilter'

const markersRef = {};
export default function HomePage({ navigation }) {
    const [pin, setPin] = useState(null);
    const [region, setRegion] = useState(null);
    const [places, setPlaces] = useState([]);
    const [placesByUser, setPlacesByUser] = useState([]);
    const mapRef = createRef();
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isListViewVisible, setIsListViewVisible] = useState(true);



    // Get user current location
    useEffect(() => {
        getInitialLocation(setPin, setRegion);
    }, []);

    useEffect(() => {
        searchNearbyPlaces(pin, setPlaces);
    }, [pin]);

    useEffect(() => {
        searchNearbyPlacesByUser(pin, setPlacesByUser);
    }, [pin]);


    const applyFilters = (selectedKeywords, votingCount) => {
        const filteredPlaces = places.filter(place => !selectedKeywords.some(keyword => place.name.includes(keyword)));
        const filteredPlacesByUser = placesByUser.filter(place => place.voteCount >= votingCount);

        setPlaces(filteredPlaces);
        setPlacesByUser(filteredPlacesByUser);
    };


    const navigateToPlace = (lat, lng, name) => {
        const url = `http://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(name)}`;
        Linking.openURL(url);
    };


    if (!region || !pin) {
        return <View style={styles.container}><Text>Loading...</Text></View>;
    }



    const renderPlace = ({ item, index }) => {
        const distance = pin
            ? getDistanceFromLatLonInKm(
                pin.latitude,
                pin.longitude,
                item.geometry.location.lat,
                item.geometry.location.lng
            )
            : 'Calculating...';


        return (
            <TouchableHighlight
                underlayColor="#DDDDDD"
                onPress={() => {
                    let newRegion = {
                        latitude: item.geometry.location.lat,
                        longitude: item.geometry.location.lng,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    };
                    mapRef.current.animateToRegion(newRegion, 1000); // Smooth transition

                    // Save the selected marker's reference
                    setSelectedMarker(markersRef[index]);
                }}
            >


                <View style={styles.listItem}>
                    <Text style={styles.placeName}>{item.name}</Text>
                    <Text>{item.vicinity}</Text>
                    <Text>Distance: {distance} km</Text>
                </View>
            </TouchableHighlight>
        )
    };

    const handleCurrentLocationPress = () => {
        if (pin) {
            mapRef.current.animateToRegion({
                ...region,
                latitude: pin.latitude,
                longitude: pin.longitude,
            }, 1000);
        }
    };

    const handleHideListPress = () => {
        setIsListViewVisible(!isListViewVisible);
    };

    const handleAddToiletPress = () => {
        navigation.navigate('AddToilet', { pin: pin });
    };

    const handleRefresh = async () => {
        // Re-fetch the user's current location
        await getInitialLocation(setPin, setRegion);

        // Re-fetch nearby places
        await searchNearbyPlaces(pin, setPlaces);
        await searchNearbyPlacesByUser(pin, setPlacesByUser);
    };

    const handleChooseFilters = () => {
        navigation.navigate('ChooseFilter', { applyFilters });
    };



    return (

        <View style={{ marginTop: 50, flex: 1 }}>
            <View style={styles.refreshContainer}>
                <Button title="Refresh" onPress={handleRefresh} />
            </View>

            <NaviBar
                onCurrentLocationPress={handleCurrentLocationPress}
                onHideListPress={handleHideListPress}
                onAddToiletPress={handleAddToiletPress}
                isListViewVisible={isListViewVisible}
                onChooseFilters={handleChooseFilters}
            />

            <MapView
                ref={mapRef}
                style={isListViewVisible ? styles.mapHalf : styles.mapFull}
                region={region}
                onRegionChangeComplete={() => {
                    if (selectedMarker) {
                        selectedMarker.showCallout();
                        setSelectedMarker(null);
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
                    </Callout>
                </Marker>

                {places.map((place, index) => (

                    <Marker
                        key={index}
                        coordinate={{
                            latitude: place.geometry.location.lat,
                            longitude: place.geometry.location.lng,
                        }}
                        title={place.name}
                        description={place.vicinity}
                        image={customMarkerImage}
                        ref={(ref) => {
                            markersRef[index] = ref;
                        }}
                    >
                        <Callout>
                            <View>
                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{place.name}</Text>
                                <Text>{place.vicinity}</Text>
                                <Text style={{ color: 'blue', marginTop: 5, textAlign: 'center' }}>Click to navigate</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}


                {placesByUser.map((place, index) => (
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
                                <Text style={{ color: 'blue', marginTop: 5, textAlign: 'center' }}>Click to navigate</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>


            {isListViewVisible && (
                <FlatList
                    data={places}
                    renderItem={renderPlace}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.list}
                />
            )}


            <View style={styles.buttonContainer}>
                <Button
                    title="PANIC!"
                    color="red"
                    onPress={() => {
                        navigateToPlace(places[0].geometry.location.lat, places[0].geometry.location.lng, places[0].name);
                    }}
                />
            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2,
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    placeName: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        padding: 10,
        backgroundColor: 'transparent',
    },

    mapHalf: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2,
    },
    mapFull: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },

    refreshContainer: {
        position: 'absolute',
        top: 40, // Adjust top and left as needed for your layout
        left: 10,
        zIndex: 10, // Make sure the button is clickable over the map
    },
});