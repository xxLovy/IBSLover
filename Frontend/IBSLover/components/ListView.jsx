import { FlatList, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc'
import { selectBannedWord, selectVotingCount } from '../redux/filter/selectors';
import { selectUserPlaces } from '../redux/userCreatedPlaces/selectors';
import { mergePlaces } from '../utils/utils';
import { selectIsLoadingWhileGoogle, selectgooglePlaces } from '../redux/googleMapsPlaces/selectors';
import { setMapRefRegion, setSelectedMarker } from '../redux/stateManage/slice';

const ListView = () => {
    const placesByGoogle = useSelector(selectgooglePlaces)
    const placesByUser = useSelector(selectUserPlaces)
    const allPlaces = mergePlaces(placesByGoogle, placesByUser)
    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoadingWhileGoogle)
    const userId = null

    const bannedWord = useSelector(selectBannedWord);
    const votingCountFilter = useSelector(selectVotingCount)

    const renderPlace = ({ item, index }) => {
        if (!item.voteCount && bannedWord.includes(item.KWD)) return;
        if (item.voteCount && item.voteCount <= votingCountFilter) return;
        else {
            return (
                <TouchableHighlight
                    onPress={() => {
                        let newRegion = {
                            latitude: item.geometry.location.lat,
                            longitude: item.geometry.location.lng,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        };
                        dispatch(setMapRefRegion(newRegion))
                        dispatch(setSelectedMarker(index + 1))

                    }}
                >


                    <View style={tw`p-4 border-b border-gray-200 ${item.voteCount ? item.userId === userId ? `bg-purple-100` : `bg-blue-100` : 'bg-green-100'}`}>
                        <Text style={tw`text-base font-semibold`}>{item.name}</Text>
                        <Text style={tw`text-sm text-gray-600`}>{item.vicinity}</Text>
                        {item.voteCount && <Text style={tw`text-sm text-gray-600`}>Vote Count: {item.voteCount}</Text>}
                        <Text style={tw`text-xs text-gray-500`}>Distance: {item.distance} km</Text>
                    </View>

                </TouchableHighlight >
            )
        }

    };
    return (
        <SafeAreaView>
            {isLoading ?
                <Text style={tw`font-semibold content-center text-lg`}>Searching Toilets...</Text>
                :
                <FlatList
                    data={allPlaces}
                    renderItem={renderPlace}
                    keyExtractor={(item, index) => index.toString()}
                />

            }

        </SafeAreaView >

    )
}

export default ListView

const styles = StyleSheet.create({})