import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentLocation } from '../redux/pin/operations'
import { fetchGoogleMaps } from '../redux/googleMapsPlaces/operations'
import { selectCurrentLocation } from '../redux/pin/selectors'
import { fetchNearByPlacesByUser } from '../redux/userCreatedPlaces/operations'
import { setBannedWord, setVotingCount } from '../redux/filter/slice'

const Refresh = () => {
    const dispatch = useDispatch()
    const pin = useSelector(selectCurrentLocation)
    const handleRefresh = () => {
        dispatch(fetchCurrentLocation())
        dispatch(fetchGoogleMaps(pin))
        dispatch(fetchNearByPlacesByUser(pin))
        dispatch(setBannedWord([]))
        dispatch(setVotingCount(0))
    }
    return (
        <View>
            <TouchableOpacity
                onPress={handleRefresh}
            >
                <Text>Refresh</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Refresh

const styles = StyleSheet.create({})