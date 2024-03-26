import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, Button, Linking, TouchableHighlight } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import customMarkerImage from './assets/ToiletMarker0.png';

const api = ''
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
      console.log(pin.latitude)
      console.log(pin.longitude)
      console.log()

      // axios.get(`${api}/search`, {
      //   params: {
      //     latitude: pin.latitude,
      //     longitude: pin.longitude
      //   }
      // }).then((res) => {
      //   setPlaces(res.results)
      //   // console.log(res.results)
      // }).catch(error => {
      //   console.log(error)
      //   setPlaces([])
      // })

      setPlaces(dummyResponse.results);

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
        provider='google'
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
            description={place.address}
            image={customMarkerImage}
          >
            <Callout>
              <View>
                <Text>{place.name}</Text>
                <Text>{place.address}</Text>
                <TouchableHighlight onPress={() => navigateToPlace(place.geometry.location.lat, place.geometry.location.lng, place.name)}>
                  <Text style={{ color: 'blue', marginTop: 5 }}>Click to navigate</Text>
                </TouchableHighlight>
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
            // if (places.length > 0) {
            //   const closestPlace = places.reduce((prev, current) => {
            //     const prevDistance = Math.sqrt(
            //       Math.pow(prev.location.lat - pin.latitude, 2) +
            //       Math.pow(prev.location.lng - pin.longitude, 2)
            //     );
            //     const currentDistance = Math.sqrt(
            //       Math.pow(current.location.lat - pin.latitude, 2) +
            //       Math.pow(current.location.lng - pin.longitude, 2)
            //     );
            //     return prevDistance < currentDistance ? prev : current;
            //   });
            //   navigateToPlace(closestPlace.location.lat, closestPlace.location.lng, closestPlace.title);
            // }
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





var dummyResponse = {
  "html_attributions": [],
  "next_page_token": "ATplDJaro7flDNOVyVJZjmJWNvpDwUrDXOjSgZ5Mfjsp_E5IbeUNc3RRtrSASJI--YWxoTM7GgDT-VAiOJWAeQajZCyD9JPqDTxqXlX7rCA58xt5qGA228ikgy33S2pwp4LRaxumyKtuDfluTqHGOUCOwsDRNHRV1JGFKqiYmvF4Vot4QHk7HkjoCsrZjFDWRbvSve6M0Ivku6jybvQ6iu4TU-LBDHaWjtNBIOAFr-rxyQETW6o9FMWXBzxf1qJHuJqwKj8ktSlQQ3cS6xd7GbED2hw5HeFjgzcI-I528W223ydIVDUy3bgBfLnbACoR8v29B_wpwpuTP2QgEstWpCWmjc5pLUY6eoI-MPwwxEsCZsGus6T9zfyKNxJ3BmHGQKNoXMRt6tUw_916-PGWtKqTUfqKJRpWacdU2gbE4lXttdVf2mVciWfnRX7cxeo",
  "results": [
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.7868822,
          "lng": -122.407329
        },
        "viewport": {
          "northeast": {
            "lat": 37.78851377989272,
            "lng": -122.4060431201073
          },
          "southwest": {
            "lat": 37.78581412010728,
            "lng": -122.4087427798927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 2448,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/108247998625830146822\">Alessio Ganci</a>"
          ],
          "photo_reference": "ATplDJbjqGWKn58EMVH5qT4G5FjHStVv0J8gLEzvU5GzZnQjusgJMQEp6VsqpMxww1mbBV-VXVVATgVyorDmrMdB12myimdIYYk4xBwqYjeQUK3TcYllhLYuQ-qIYbGZ214nKkXDnynFNFzfSxIydJbrcZsOsFC7WOEDe4NfoOfE53lpvjB5",
          "width": 2448
        }
      ],
      "place_id": "ChIJ96HYr4-AhYARIpeOo-wEFEE",
      "plus_code": {
        "compound_code": "QHPV+Q3 Union Square, San Francisco, CA",
        "global_code": "849VQHPV+Q3"
      },
      "price_level": 2,
      "rating": 3.7,
      "reference": "ChIJ96HYr4-AhYARIpeOo-wEFEE",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 93,
      "vicinity": "170 O'Farrell St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.7839557,
          "lng": -122.4044015
        },
        "viewport": {
          "northeast": {
            "lat": 37.78525955000001,
            "lng": -122.4024697
          },
          "southwest": {
            "lat": 37.78139814999999,
            "lng": -122.4085841
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 4032,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/112737098261899273933\">Thiago Fernandes Gonçalves</a>"
          ],
          "photo_reference": "ATplDJYjmsC5fTxn55x65Lrs7ocuwfyUI1p53PZ4JWBFbyxkMPb-W70ylpWzCzQt0oPPTubarfmh90KfeSRUK7DTJAu_yjY9JFSzYxAgEVwYttoIiW4jKcuuP66AfbsUCnSa27XJum1hFf_YV3zhmth_Ct98b5q0TDT0yHyeJQaXhLQk19nH",
          "width": 3024
        }
      ],
      "place_id": "ChIJ6WBDWoaAhYARbkF4Dsf08WI",
      "plus_code": {
        "compound_code": "QHMW+H6 Yerba Buena, San Francisco, CA",
        "global_code": "849VQHMW+H6"
      },
      "price_level": 2,
      "rating": 3.9,
      "reference": "ChIJ6WBDWoaAhYARbkF4Dsf08WI",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 682,
      "vicinity": "120 4th St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.7840744,
          "lng": -122.4073725
        },
        "viewport": {
          "northeast": {
            "lat": 37.78527047989272,
            "lng": -122.40416515
          },
          "southwest": {
            "lat": 37.78257082010728,
            "lng": -122.40845415
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 1015,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/105083014256571557234\">A Google User</a>"
          ],
          "photo_reference": "ATplDJZl-K4NC4MA-NW7gS_lMYFbCDlsH68VwLF69hF_0GXu8p76-QYxWbjBq_Cg5zMG0GcjrLCyXpGHprnezBbkhMu-TTGgNWsLwuZlb1ru-dJKlhf-uj9ZBxPPKnFLBxThUIsKE2iyvZaJnj6HLymCF-3M3b4oVF7u2updfaWcc1nKGx8",
          "width": 1024
        }
      ],
      "place_id": "ChIJrZxI34WAhYARLlHHWVCHXa4",
      "plus_code": {
        "compound_code": "QHMV+J3 Yerba Buena, San Francisco, CA",
        "global_code": "849VQHMV+J3"
      },
      "price_level": 2,
      "rating": 4.1,
      "reference": "ChIJrZxI34WAhYARLlHHWVCHXa4",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 534,
      "vicinity": "865 Market Street San Francisco Centre, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.789147,
          "lng": -122.4084477
        },
        "viewport": {
          "northeast": {
            "lat": 37.79048687989272,
            "lng": -122.4071788201073
          },
          "southwest": {
            "lat": 37.78778722010728,
            "lng": -122.4098784798927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 4032,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/117159995448492619894\">naomi</a>"
          ],
          "photo_reference": "ATplDJZ2xuASYK7sDUZ-xsZoxsqbDO8kgI6EQFprKe0LU3vb7tcdmXzSS6aZu3mZhUtaBYxZQQunhW_nf4F8EuwitOWy-on_DdsQl_M7PW51gn8mH4z_HgGkSl1B6-45ocDHo_wFexifso5tW7hpNDmBMIm5N5jP-klhmGXOUuGpXgDQObQh",
          "width": 3024
        }
      ],
      "place_id": "ChIJO0psvY6AhYARW4wjPcTZcdM",
      "plus_code": {
        "compound_code": "QHQR+MJ Union Square, San Francisco, CA",
        "global_code": "849VQHQR+MJ"
      },
      "price_level": 2,
      "rating": 4,
      "reference": "ChIJO0psvY6AhYARW4wjPcTZcdM",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 526,
      "vicinity": "462 Powell St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.789348,
          "lng": -122.406831
        },
        "viewport": {
          "northeast": {
            "lat": 37.79068127989272,
            "lng": -122.4055488701073
          },
          "southwest": {
            "lat": 37.78798162010728,
            "lng": -122.4082485298928
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 5312,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/112203990805488726357\">Shai Arnon</a>"
          ],
          "photo_reference": "ATplDJaswdxiFV6Yi5AGpQ1xeTVwKWeLKXU71KF0MVlSTlTge2Wto0AwheJwG4qOzVTqVezu7liOjTee9N4djAGTd3hgkpYACBXTPqvDomoPrKzXrzKBlRY3jUwqtuwlmSL0yP6IrBI5UXC2owuKPjtqhyIeZ4IdOgrk_5EAR3oeewGR5_54",
          "width": 2988
        }
      ],
      "place_id": "ChIJuUGLS4mAhYAR1g0mGcIy8fk",
      "plus_code": {
        "compound_code": "QHQV+P7 Union Square, San Francisco, CA",
        "global_code": "849VQHQV+P7"
      },
      "price_level": 2,
      "rating": 3.9,
      "reference": "ChIJuUGLS4mAhYAR1g0mGcIy8fk",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 540,
      "vicinity": "390 Stockton St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.777059,
          "lng": -122.417348
        },
        "viewport": {
          "northeast": {
            "lat": 37.77831527989272,
            "lng": -122.4158871201073
          },
          "southwest": {
            "lat": 37.77561562010727,
            "lng": -122.4185867798927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 3096,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/101138771056672476722\">Vicky Palero</a>"
          ],
          "photo_reference": "ATplDJZ9Uwhy22Irnrh4UvhsIlBJlWNU1fuvko355UP1hnUkeqENR4_vXkuOsPfUcg2-BWIBPOS9FfkWXE4uruerno3rXnqi_X_9jfl1wuOhUFD4QRehx2fgRp7ZkWgjGwlegFztN3H7ByS_d76uNeSqGWnNCJLLPgPGuYj2GCaz4iNSDcJF",
          "width": 4128
        }
      ],
      "place_id": "ChIJ_c92FJyAhYAROOvKZ17WNTQ",
      "plus_code": {
        "compound_code": "QHGM+R3 Civic Center, San Francisco, CA",
        "global_code": "849VQHGM+R3"
      },
      "price_level": 2,
      "rating": 3.9,
      "reference": "ChIJ_c92FJyAhYAROOvKZ17WNTQ",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 486,
      "vicinity": "Fox Plaza, 1390 Market St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.7930882,
          "lng": -122.399686
        },
        "viewport": {
          "northeast": {
            "lat": 37.79439617989272,
            "lng": -122.3984656201073
          },
          "southwest": {
            "lat": 37.79169652010727,
            "lng": -122.4011652798928
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 5312,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/116257382244525670735\">Fernando Rodriguez</a>"
          ],
          "photo_reference": "ATplDJaPDTZcyMfeLJagvIn1jjnXJzxKtA4Mg9-aT3uNpALbKKcI3Ba27zQb496JtN7jXyFqcdA8kIBo1ZEj3ZKyP5eJ_1uP9jquXuvyRoooWxpQFxDqvl7efh6dhdP6Saq-skSttA3CbASg7wTweMlsJW4Kt-TQ6NexLCUxNIfVsa981fI",
          "width": 2988
        }
      ],
      "place_id": "ChIJGytykmGAhYAR9ibchXdk81A",
      "plus_code": {
        "compound_code": "QJV2+64 Financial District, San Francisco, CA",
        "global_code": "849VQJV2+64"
      },
      "price_level": 2,
      "rating": 4,
      "reference": "ChIJGytykmGAhYAR9ibchXdk81A",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 178,
      "vicinity": "295 California St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.7867268,
          "lng": -122.4084109
        },
        "viewport": {
          "northeast": {
            "lat": 37.78801727989272,
            "lng": -122.4069003701073
          },
          "southwest": {
            "lat": 37.78531762010728,
            "lng": -122.4096000298928
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 4032,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/115971941902766928514\">Brad Lai</a>"
          ],
          "photo_reference": "ATplDJZbP-AcRSm8GMhiSxTOuycAQhXGc_FNFb2hFS9JRV5-FMBMoRSIf_u9dHFL8nDl_NJCs1_NMFpyDN16SfD5cplpN_YPc5lfG-hWRBedngfj_Tr0MTKtN-XXfOgmvD0z57qUj44YK6QHPbeUoEA_toCPY1qa-VNJRv_AaKpm6xjyUyYt",
          "width": 3024
        }
      ],
      "place_id": "ChIJ04Axl-OAhYARWD7lhhEpVZ0",
      "plus_code": {
        "compound_code": "QHPR+MJ Union Square, San Francisco, CA",
        "global_code": "849VQHPR+MJ"
      },
      "price_level": 2,
      "rating": 3.9,
      "reference": "ChIJ04Axl-OAhYARWD7lhhEpVZ0",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 656,
      "vicinity": "201 Powell St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.7946357,
          "lng": -122.4027149
        },
        "viewport": {
          "northeast": {
            "lat": 37.79603252989273,
            "lng": -122.4013669201073
          },
          "southwest": {
            "lat": 37.79333287010728,
            "lng": -122.4040665798927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 4032,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/112927601146375082447\">H Ng</a>"
          ],
          "photo_reference": "ATplDJZ8a_GQSihN4x5a7LevoutDS7Plh3wqMIRhChbDAmP4DQUgT-EtFy7pposJKG-rq3V-jMuJkRp-nZrIBncwOkx6CvtMmAhwARc0xgdLcxC3UVK8LwZJqMFEBFy1B1J6d-1-mzQvvrC8thH25LjPICnlbtItSrWgbCU4PNFMCIiCGyuf",
          "width": 3024
        }
      ],
      "place_id": "ChIJdS_ykoqAhYAR7D9v8GCMGyI",
      "plus_code": {
        "compound_code": "QHVW+VW Financial District, San Francisco, CA",
        "global_code": "849VQHVW+VW"
      },
      "price_level": 2,
      "rating": 4,
      "reference": "ChIJdS_ykoqAhYAR7D9v8GCMGyI",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 474,
      "vicinity": "565 Clay St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.78440399999999,
          "lng": -122.4038104
        },
        "viewport": {
          "northeast": {
            "lat": 37.78565127989272,
            "lng": -122.4024832201073
          },
          "southwest": {
            "lat": 37.78295162010728,
            "lng": -122.4051828798927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 4032,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/101550276487190656491\">Mikey Chang</a>"
          ],
          "photo_reference": "ATplDJasHEevaT6moz_QzCZg2zfUtjS2wv6_O9j6Tprpu430KNba8C4D3YRwtkspEgiYPH-8KbyCzgjOkT47O2ogh98tENUzPjt7yLzdg19Rj_zbl_TLo_pMbYmRKp7pPquMEWOdImsX8-QejErQaEEIwIRKdHKbmVWuy1_9NmWJ7WtKoY87",
          "width": 3024
        }
      ],
      "place_id": "ChIJQQwisoeAhYARttscHlSNWzA",
      "plus_code": {
        "compound_code": "QHMW+QF Yerba Buena, San Francisco, CA",
        "global_code": "849VQHMW+QF"
      },
      "price_level": 2,
      "rating": 3.7,
      "reference": "ChIJQQwisoeAhYARttscHlSNWzA",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 282,
      "vicinity": "789 Mission St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.7898364,
          "lng": -122.402018
        },
        "viewport": {
          "northeast": {
            "lat": 37.79107687989272,
            "lng": -122.4007302201073
          },
          "southwest": {
            "lat": 37.78837722010728,
            "lng": -122.4034298798927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 2560,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/102186184225212920849\">cj tego</a>"
          ],
          "photo_reference": "ATplDJaJ9bEPCnKHZKuJT7MSvKHUI8mn61Ls9OVjTQ4YHeSNZNXIQRcSkPdTUXugnXxGugV7ABEEp07GaDNBqGupbfsQb5_edw5goRmyQ2k-3zAJ6o2nA0JEwkyGLFCJ4VG_SMQv0jq8HQSmnQ9p63L_ukAKFst4huLnVKcLVDc_pQu1AU2y",
          "width": 1440
        }
      ],
      "place_id": "ChIJM7mv1omAhYARkMmpBvyzpaY",
      "plus_code": {
        "compound_code": "QHQX+W5 Financial District, San Francisco, CA",
        "global_code": "849VQHQX+W5"
      },
      "price_level": 2,
      "rating": 4.1,
      "reference": "ChIJM7mv1omAhYARkMmpBvyzpaY",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 237,
      "vicinity": "44 Montgomery St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.7929964,
          "lng": -122.4041186
        },
        "viewport": {
          "northeast": {
            "lat": 37.79419162989273,
            "lng": -122.4028271201073
          },
          "southwest": {
            "lat": 37.79149197010728,
            "lng": -122.4055267798927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 4608,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/115454383001963859387\">Ritwik Pandey</a>"
          ],
          "photo_reference": "ATplDJaGB29AWWHs6Gf9NODZglz2eKFg-Naz0yqYnlvbTesXLJbuGlk8lC5Gq4hPMMFvw9Oek4e183Oi2-4gaZOOBanGC6_QCItqQZrhzmar5ne5SpAVcW2QjQ8FTIfcgaSMO8WNrtBgK545wvk-8jCx8fReB86G_VANak0uOWkoZMybtCrK",
          "width": 2592
        }
      ],
      "place_id": "ChIJSdu8souAhYARm2j_V4uodVM",
      "plus_code": {
        "compound_code": "QHVW+59 Financial District, San Francisco, CA",
        "global_code": "849VQHVW+59"
      },
      "price_level": 2,
      "rating": 4.2,
      "reference": "ChIJSdu8souAhYARm2j_V4uodVM",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 222,
      "vicinity": "580 California St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.79041369999999,
          "lng": -122.4057358
        },
        "viewport": {
          "northeast": {
            "lat": 37.79177987989272,
            "lng": -122.4043561701073
          },
          "southwest": {
            "lat": 37.78908022010728,
            "lng": -122.4070558298927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 5312,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/107614146642791266022\">Jarek Sulek</a>"
          ],
          "photo_reference": "ATplDJZoOXBTJ7jhWQIrBRPMZn5MLhzcRmoQ17GYBpLhOUyRgkfBQOyZQBQGg9EKUsCEixWX1E0cVvgWavxMWzphF3CJ2v-XycIcJaim5k7uKVEkLOH7qfK__05Q9qRjHrt26HzrWKkRN3kRqIHNqxi8vZfBC8K_wAQC8ai9fxz8pv7yHm0G",
          "width": 2988
        }
      ],
      "place_id": "ChIJkYFhaImAhYARWX9I0O6JqaQ",
      "plus_code": {
        "compound_code": "QHRV+5M Union Square, San Francisco, CA",
        "global_code": "849VQHRV+5M"
      },
      "price_level": 2,
      "rating": 3.9,
      "reference": "ChIJkYFhaImAhYARWX9I0O6JqaQ",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 254,
      "vicinity": "359 Grant Ave, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.7895085,
          "lng": -122.3974736
        },
        "viewport": {
          "northeast": {
            "lat": 37.79089087989272,
            "lng": -122.3960716701073
          },
          "southwest": {
            "lat": 37.78819122010728,
            "lng": -122.3987713298927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 3024,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/104429389056264404375\">Noriyuki Miyao</a>"
          ],
          "photo_reference": "ATplDJZxLKW6nXo89qNwFdYwrTTJsHxmhFFLL2UQiuRauBcBjioBzil32C_8hpPEjPTTJuM0LED3zr6HgYL-nh7Ln15igDxcXvUP4mLJQHnUqhqpXbj6Lxr5jvA5eGAA2l4fNoaIQt6qg2E-NyD3_2gQWPPmB9L6QRGtUEY-naWIptuCMb6L",
          "width": 4032
        }
      ],
      "place_id": "ChIJ-XJGJGeAhYAR__iKMkNXmuo",
      "plus_code": {
        "compound_code": "QJQ3+R2 SoMa, San Francisco, CA",
        "global_code": "849VQJQ3+R2"
      },
      "price_level": 2,
      "rating": 4.1,
      "reference": "ChIJ-XJGJGeAhYAR__iKMkNXmuo",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 170,
      "vicinity": "100 1st St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.7935874,
          "lng": -122.3945235
        },
        "viewport": {
          "northeast": {
            "lat": 37.79473092989272,
            "lng": -122.3933578201073
          },
          "southwest": {
            "lat": 37.79203127010727,
            "lng": -122.3960574798927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 1334,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/110064234015972693831\">Hailey Cho</a>"
          ],
          "photo_reference": "ATplDJbanwbY1Edq9ouBtdr3-fuAs2VLLQzhpZfF4aKKEwJk7BmapUsqp6yAZc8qQnAG8iU6U3m56wcPv-WewA4tV29sGm-tlFIM2z3uX0zcU4buKkG40ZVw6V8MQODSAN-F-8KzOC_e2cWTcGo6odnyusblUbMBrg-DV6bWo0sTcFLSv8I0",
          "width": 750
        }
      ],
      "place_id": "ChIJ9SXhpmaAhYARJ2T_hSBUwp4",
      "plus_code": {
        "compound_code": "QJV4+C5 Financial District, San Francisco, CA",
        "global_code": "849VQJV4+C5"
      },
      "price_level": 2,
      "rating": 4.3,
      "reference": "ChIJ9SXhpmaAhYARJ2T_hSBUwp4",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 31,
      "vicinity": "One Market Plaza, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.77723719999999,
          "lng": -122.419438
        },
        "viewport": {
          "northeast": {
            "lat": 37.77862717989272,
            "lng": -122.4181018701073
          },
          "southwest": {
            "lat": 37.77592752010727,
            "lng": -122.4208015298928
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 4032,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/110370255832077069266\">A Google User</a>"
          ],
          "photo_reference": "ATplDJa3r_WR5vvfMJN_ycOSWSxghyOK_TWZBX1JArso8wAf3pejhLVZNcx33I9xHCQ41IHVQaDDmUehiIKqzPhYZVlvHWLLQfmGPsjhYmNJR6AmX3LgGmBNbPXrNq6oHel9i3rcIKOgUV437goD6TzTpk4Yo13JP6YDjt5bsUPo8FjSbsGN",
          "width": 3024
        }
      ],
      "place_id": "ChIJm4gLsvOBhYARDnNvQu31r4w",
      "plus_code": {
        "compound_code": "QHGJ+V6 Civic Center, San Francisco, CA",
        "global_code": "849VQHGJ+V6"
      },
      "price_level": 2,
      "rating": 4.2,
      "reference": "ChIJm4gLsvOBhYARDnNvQu31r4w",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 119,
      "vicinity": "150 Van Ness Ave, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.776817,
          "lng": -122.39407
        },
        "viewport": {
          "northeast": {
            "lat": 37.77865787989272,
            "lng": -122.3924463701073
          },
          "southwest": {
            "lat": 37.77595822010727,
            "lng": -122.3951460298927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 3024,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/106802503142567295592\">A Google User</a>"
          ],
          "photo_reference": "ATplDJbqw-6rwR3wkn-jdOZFhVmMbl4gwuFhjFQus00-_90_NOCrM3fxoFYZG7f0SqrlF2lHpvklFG0XVyQKSI2PhhcbPWf-1QEtt3I-Pz1_W1l2zktuEivefEMyUYmiHEd99zax15HR4yLci72297e-WBdXnWv7FyVaFvrjLfW-uuja5ZC4",
          "width": 4032
        }
      ],
      "place_id": "ChIJvWdbXOV_j4ARorfapSolbHY",
      "plus_code": {
        "compound_code": "QJG4+P9 Mission Bay, San Francisco, CA",
        "global_code": "849VQJG4+P9"
      },
      "price_level": 2,
      "rating": 2.2,
      "reference": "ChIJvWdbXOV_j4ARorfapSolbHY",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 6,
      "vicinity": "298 King St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.7938438,
          "lng": -122.3966344
        },
        "viewport": {
          "northeast": {
            "lat": 37.79519682989272,
            "lng": -122.3952509701073
          },
          "southwest": {
            "lat": 37.79249717010727,
            "lng": -122.3979506298927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 3072,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/112473462789000947403\">A Google User</a>"
          ],
          "photo_reference": "ATplDJZii593GG1Bi0N5PQFi80YwpwbXxtLPi8NHEQAE398Uoi_y74MMFO_-ck-rfhpdfFdkRiPrXwdR32Ehd80wqccWByhUevF24h_Jv-XfLBout8dEYqEylaXso-Z6usElCEBUEgH7oLPfwfUStktVnWHvM_Qxz-N8Hz7uczI926ZVKqw6",
          "width": 4080
        }
      ],
      "place_id": "ChIJjbM7m-CBhYARG_Ru8QMv0do",
      "plus_code": {
        "compound_code": "QJV3+G8 Financial District, San Francisco, CA",
        "global_code": "849VQJV3+G8"
      },
      "price_level": 2,
      "rating": 3.9,
      "reference": "ChIJjbM7m-CBhYARG_Ru8QMv0do",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 30,
      "vicinity": "7 Drumm St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.788417,
          "lng": -122.393662
        },
        "viewport": {
          "northeast": {
            "lat": 37.78960787989271,
            "lng": -122.3922571201072
          },
          "southwest": {
            "lat": 37.78690822010727,
            "lng": -122.3949567798927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 4032,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/102770188715134703898\">Jermaine Ellis</a>"
          ],
          "photo_reference": "ATplDJams8gQaRS9fvzwWk2T5Lqmin4tXmFtyKmZLqtCPYe483KMivyfaKoh218XINS6OZ_NuzdbiTaVdEtBgoRZ2MAMx5qKSJ__UKvkXo0oVeCagMwIYUn9-8_9VoUfUwMcNwYgeQT8_UUvtF2WizuSF-CF9dLZfXhQMW5MxoCPPUgTGZmg",
          "width": 3024
        }
      ],
      "place_id": "ChIJG5Z89LKBhYARXvxHSDaER_E",
      "plus_code": {
        "compound_code": "QJQ4+9G SoMa, San Francisco, CA",
        "global_code": "849VQJQ4+9G"
      },
      "price_level": 2,
      "rating": 4.3,
      "reference": "ChIJG5Z89LKBhYARXvxHSDaER_E",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 117,
      "vicinity": "299 Fremont St, San Francisco"
    },
    {
      "business_status": "OPERATIONAL",
      "geometry": {
        "location": {
          "lat": 37.7970173,
          "lng": -122.3981072
        },
        "viewport": {
          "northeast": {
            "lat": 37.79841857989273,
            "lng": -122.3967606201073
          },
          "southwest": {
            "lat": 37.79571892010728,
            "lng": -122.3994602798927
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png",
      "icon_background_color": "#FF9E67",
      "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet",
      "name": "Starbucks",
      "opening_hours": {
        "open_now": false
      },
      "photos": [
        {
          "height": 2880,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/102711146396129356629\">Nixon Flores</a>"
          ],
          "photo_reference": "ATplDJYsOow_SfNVljYIzTdI_dxYAJpOcDjzPQYZtE6tsL11KSLfU-JK5-pqtHU_AnooHF4aqWOmf4w2GACfjLxEppnrKsT7-nwahWFJNAr6Zy3RN6tQipebBG10uHst3TTYiWwz09vWiTxv5tQFPD-Qx4IhPjFUyTK15B4QfT8RfBmSRcfj",
          "width": 2160
        }
      ],
      "place_id": "ChIJXfPOo2CAhYARxdJ46CUxCzw",
      "plus_code": {
        "compound_code": "QJW2+RQ Northern Waterfront, San Francisco, CA",
        "global_code": "849VQJW2+RQ"
      },
      "price_level": 2,
      "rating": 3.8,
      "reference": "ChIJXfPOo2CAhYARxdJ46CUxCzw",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "store",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 203,
      "vicinity": "99 Jackson St, San Francisco"
    }
  ],
  "status": "OK"
}