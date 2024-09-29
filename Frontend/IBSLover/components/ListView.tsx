import { FlatList, SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { selectBannedWord, selectVotingCount } from '../redux/filter/slice';
import { mergePlacesAddDistance } from '../utils/utils';
import { setMapRefRegion, setSelectedMarker } from '../redux/stateManage/slice';
import { selectUser } from '../redux/auth/slice';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectToiletFromGoogle, selectToiletFromUser, selectToiletLoading } from '../redux/googleMapsPlaces/slice';
import { selectCurrentLocation } from '../redux/pin/slice';
import { Image } from 'react-native';

const ListView = () => {
    const placesByGoogle = useAppSelector(selectToiletFromGoogle)
    const placesByUser = useAppSelector(selectToiletFromUser)
    const pin = useAppSelector(selectCurrentLocation)
    const allPlaces = mergePlacesAddDistance(placesByGoogle, placesByUser, pin.latitude, pin.longitude)
    const dispatch = useAppDispatch()
    const isLoading = useAppSelector(selectToiletLoading)
    const user = useAppSelector(selectUser)

    const bannedWord = useAppSelector(selectBannedWord);
    const votingCountFilter = useAppSelector(selectVotingCount)
    const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

    const renderPlace = ({ item, index }: { item: any; index: number }) => {
        if (!item.votesCount && bannedWord.includes(item.keyword)) return;
        if (item.votesCount && item.votesCount <= votingCountFilter) return;

        const isSelected = selectedItemIndex === index;
        const isUserCreated = item.users?.includes(user?.userId) && user?.userId !== undefined;

        const iconSource = item.votesCount
            ? isUserCreated
                ? require('../assets/ToiletBySelf.png')
                : require('../assets/ToiletByUser.png')
            : require('../assets/ToiletMarker0.png');

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
                    setSelectedItemIndex(isSelected ? null : index);
                }}
            >
                <View style={tw`p-4 border-b border-gray-200 ${isSelected ? 'bg-gray-300' : 'bg-white'} flex-row justify-between items-center`}>
                    <View>
                        <Text style={tw`text-base font-semibold`}>{item.name}</Text>
                        <Text style={tw`text-sm text-gray-600`}>{item.description}</Text>
                        {item.votesCount ? <Text style={tw`text-sm text-gray-600`}>Vote Count: {item.votesCount}</Text> : null}
                        <Text style={tw`text-xs text-gray-500`}>Distance: {item.distance} km</Text>
                    </View>
                    <Image
                        source={iconSource}
                        style={tw`w-6 h-6`}
                    />
                </View>
            </TouchableHighlight>
        )
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
                    extraData={selectedItemIndex}
                />

            }

        </SafeAreaView >

    )
}

export default ListView

const styles = StyleSheet.create({})