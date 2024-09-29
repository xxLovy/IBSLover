import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fetchCurrentLocation } from '../redux/pin/operations'
import { fetchToiletFromGoogle, fetchToiletFromUser } from '../redux/googleMapsPlaces/operations'
import { setBannedWord, setVotingCount } from '../redux/filter/slice'
import { Icon } from '@rneui/base'
import { selectToiletLoading } from '../redux/googleMapsPlaces/slice'
import { selectCurrentLocation } from '../redux/pin/slice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

const Refresh = () => {
    const dispatch = useAppDispatch()
    const pin = useAppSelector(selectCurrentLocation)
    const isLoading = useAppSelector(selectToiletLoading)
    const handleRefresh = () => {
        dispatch(fetchCurrentLocation())
        dispatch(fetchToiletFromGoogle(pin))
        dispatch(fetchToiletFromUser())
        dispatch(setBannedWord([]))
        dispatch(setVotingCount(0))
    }
    return (
        <View>
            <TouchableOpacity
                onPress={handleRefresh}
                disabled={isLoading}
            >
                <Icon name="refresh" type="ionicons" color={isLoading ? "gray" : "black"} size={27} />
            </TouchableOpacity>
        </View>
    )
}

export default Refresh

const styles = StyleSheet.create({})