import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, Button, Linking, TouchableHighlight } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import customMarkerImage from './assets/ToiletMarker0.png';
import axios from 'axios'

const api = 'http://13.238.182.211:80'
export default function App() {
  const [pin, setPin] = useState(null);
  const [region, setRegion] = useState(null);
  const [places, setPlaces] = useState([]);


  // Get user current location
  useEffect(() => {
    const getInitialLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission denied');
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
      // console.log(pin.latitude)
      // console.log(pin.longitude)
      // console.log()

      console.log('fetching')
      axios.get(`${api}/search`, {
        params: {
          latitude: pin.latitude,
          longitude: pin.longitude
        }
      }).then((res) => {
        // console.log(res)
        setPlaces(res.data)
        console.log('fetched')
        // console.log(places)
      }).catch(error => {
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



  return (
    <View style={{ marginTop: 50, flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={region}
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
          >
            <Callout onPress={() => navigateToPlace(place.geometry.location.lat, place.geometry.location.lng, place.name)}>
              <View>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{place.name}</Text>
                <Text>{place.vicinity}</Text>
                <Text style={{ color: 'blue', marginTop: 5, textAlign: 'center' }}>Click to navigate</Text>
              </View>
            </Callout>
          </Marker>
        ))}

      </MapView>

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
    height: Dimensions.get("window").height * 0.8
  },
  buttonContainer: {
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.05,
    alignSelf: "center",
    zIndex: 1
  },

});