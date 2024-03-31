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
import * as Location from 'expo-location';
import customMarkerImage from './assets/ToiletMarker0.png';
import axios from 'axios'
import NavBar from './components/NaviBar';

const api = 'http://13.238.182.211:80'
const markersRef = {};
export default function App() {
  const [pin, setPin] = useState(null);
  const [region, setRegion] = useState(null);
  const [places, setPlaces] = useState([]);
  const mapRef = createRef();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isListViewVisible, setIsListViewVisible] = useState(true);


  // Get user current location
  useEffect(() => {
    // TODO: get location error
    const getInitialLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission denied');
        // TODO: EXIT
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 10000,
        timeout: 5000,
      });
      if (location) {
        setPin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      }
    };
    getInitialLocation();
  }, []);


  // search
  useEffect(() => {
    const searchNearbyPlaces = async () => {
      if (!pin || !pin.latitude || !pin.longitude) return;

      console.log('fetching')
      axios.get(`${api}/search`, {
        params: {
          latitude: pin.latitude,
          longitude: pin.longitude
        }
      }).then((res) => {
        console.log(`${api}/search?latitude=${pin.latitude}&longitude=${pin.longitude}`)
        const placesWithDistance = res.data.map(place => {
          const distance = getDistanceFromLatLonInKm(
            pin.latitude,
            pin.longitude,
            place.geometry.location.lat,
            place.geometry.location.lng
          );
          return { ...place, distance };
        });

        // sort according to distance
        const sortedPlaces = placesWithDistance.sort((a, b) => a.distance - b.distance);

        setPlaces(sortedPlaces);
        console.log('fetched and sorted by distance');
      }).catch(error => {
        // TODO: error: map key useage exceed customized return
        // TODO: error: IP useage exceed customized return
        // TODO: error: network error
        console.log(error)
        setPlaces([])
      })

      // setPlaces(dummyResponse.results);

    };

    searchNearbyPlaces();
  }, [pin]);

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

  // Helper function to calculate the distance
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }


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
    // Add logic to handle "Add Toilet" press
    return
  };


  return (

    <View style={{ marginTop: 50, flex: 1 }}>

      <NavBar
        onCurrentLocationPress={handleCurrentLocationPress}
        onHideListPress={handleHideListPress}
        onAddToiletPress={handleAddToiletPress}
        isListViewVisible={isListViewVisible}
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

      </MapView>

      {/* For current location
      <TouchableOpacity
        style={styles.locateButton}
        onPress={() => {
          if (pin) {
            mapRef.current.animateToRegion({
              ...region,
              latitude: pin.latitude,
              longitude: pin.longitude,
            }, 1000); // 1000毫秒的动画时长
          }
        }}
      >
        <Text>Current Location</Text>
      </TouchableOpacity>
      <NavBar />


      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsListViewVisible(!isListViewVisible)}
      >
        <Text>{isListViewVisible ? "Hide List" : "Show List"}</Text>
      </TouchableOpacity> */}



      {/* 条件渲染ListView */}
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
  locateButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    zIndex: 10,
  },

  toggleButton: {
    position: "absolute",
    top: 20, // Adjust as needed
    left: 20, // Adjust as needed
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  mapHalf: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
  mapFull: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});