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
    TouchableOpacity
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import customMarkerImage from '../assets/ToiletMarker0.png';
import NaviBar from '../components/NaviBar';
import ToiletByUser from '../assets/ToiletByUser.png'
import { searchNearbyPlaces, searchNearbyPlacesByUser, getInitialLocation } from '../utils/api';
import { getDistanceFromLatLonInKm, deg2rad } from '../utils/utils';
import { handleRefresh } from '../utils/eventHandler';
import { debounce } from 'lodash';

const markersRef = {};
export default function HomePage({ navigation }) {
    const [pin, setPin] = useState(null);
    const [region, setRegion] = useState(null);
    const [places, setPlaces] = useState([]);
    const [placesByUser, setPlacesByUser] = useState([]);
    const mapRef = createRef();
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [isListViewVisible, setIsListViewVisible] = useState(true);




    const debouncedHandleRefresh = debounce(() => handleRefresh(setPin, setRegion, setPlaces, setPlacesByUser), 10000);

    // Get user current location
    useEffect(() => {
        getInitialLocation(setPin, setRegion);
    }, []);

    // Search for places
    useEffect(() => {
        searchNearbyPlaces(pin, setPlaces);
    }, [pin]);

    // search for places added by user
    useEffect(() => {
        searchNearbyPlacesByUser(pin, setPlacesByUser);
    }, [pin]);


    // filters
    const applyFilters = (selectedKeywords, votingCount) => {
        const filteredPlaces = places.filter(place => !selectedKeywords.some(keyword => place.name.includes(keyword)));
        const filteredPlacesByUser = placesByUser.filter(place => place.voteCount >= votingCount);

        setPlaces(filteredPlaces);
        setPlacesByUser(filteredPlacesByUser);
    };

    // jump to apple map(Google maps for Android)
    const navigateToPlace = (lat, lng, name) => {
        const url = `http://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(name)}`;
        Linking.openURL(url);
    };



    // loading page (setLoading to ...)
    if (!region || !pin) {
        return <View style={styles.container}><Text>Loading...</Text></View>;
    }


    // render places in the list view
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

    // handler functions
    // animate to the place which the user clicked
    const handleCurrentLocationPress = () => {
        if (pin) {
            mapRef.current.animateToRegion({
                ...region,
                latitude: pin.latitude,
                longitude: pin.longitude,
            }, 1000);
        }
    };

    // hide/show list
    const handleHideListPress = () => {
        setIsListViewVisible(!isListViewVisible);
    };

    // Jump to Add toilet page
    const handleAddToiletPress = () => {
        navigation.navigate('AddToilet', { pin: pin });
    };

    // TODO: Refreshing
    // TODO: Only refresh 1 time
    // refresh the page
    const handleRefresh = async () => {
        // Re-fetch the user's current location
        await getInitialLocation(setPin, setRegion);

        // Re-fetch nearby places
        await searchNearbyPlaces(pin, setPlaces);
        await searchNearbyPlacesByUser(pin, setPlacesByUser);
    };

    // jump to choose filter page
    const handleChooseFilters = () => {
        navigation.navigate('ChooseFilter', { applyFilters });
    };



    return (

        <View style={{ marginTop: 50, flex: 1 }}>
            <View style={styles.refreshContainer}>
                <Button title="Refresh" onPress={debouncedHandleRefresh} />
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
                                <TouchableOpacity onPress={() => {
                                    navigateToPlace(place.geometry.location.lat, place.geometry.location.lng, place.name);
                                }}>
                                    <Text style={{ color: 'blue', marginTop: 5, textAlign: 'center' }}>Click to navigate</Text>
                                </TouchableOpacity>

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