import { FlatList, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { selectBannedWord, selectVotingCount } from '../redux/filter/selectors';
import { mergePlaces } from '../utils/utils';
import { setMapRefRegion, setSelectedMarker } from '../redux/stateManage/slice';
import { selectUser } from '../redux/auth/slice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectToiletFromGoogle, selectToiletFromUser, selectToiletLoading } from '../redux/googleMapsPlaces/slice';

const ListView = () => {
    const placesByGoogle = useAppSelector(selectToiletFromGoogle)
    const placesByUser = useAppSelector(selectToiletFromUser)
    const allPlaces = mergePlaces(placesByGoogle, placesByUser)
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(selectToiletLoading)
    const user = useAppSelector(selectUser)

    const bannedWord = useAppSelector(selectBannedWord);
    const votingCountFilter = useAppSelector(selectVotingCount)

    const renderPlace = ({ item, index }: { item: Toilet; index: number }) => {

        console.log(`UserID: ${item.users}`)
        console.log(`UserID :${user}`)
        if (!item.votesCount && bannedWord.includes(item.keyword)) return;
        if (item.votesCount && item.votesCount <= votingCountFilter) return;


        else {
            return (
                <TouchableHighlight
                    onPress={() => {
                        let newRegion = {
                            latitude: item.location.coordinates[1],
                            longitude: item.location.coordinates[0],
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        };
                        dispatch(setMapRefRegion(newRegion))
                        dispatch(setSelectedMarker(index + 1))

                    }}
                >

                    <View style={tw`p-4 border-b border-gray-200 ${item.votesCount ? item?.users?.includes(user?.userId) && user?.userId !== undefined ? `bg-purple-100` : `bg-blue-100` : 'bg-green-100'}`}>
                        <Text style={tw`text-base font-semibold`}>{item.name}</Text>
                        <Text style={tw`text-sm text-gray-600`}>{item.description}</Text>
                        {/* // TODO */}
                        {/* {item.voteCount && <Text style={tw`text-sm text-gray-600`}>Vote Count: {item.voteCount}</Text>} */}
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