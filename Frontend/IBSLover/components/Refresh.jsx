import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentLocation } from '../redux/pin/operations'
import { fetchGoogleMaps } from '../redux/googleMapsPlaces/operations'
import { selectCurrentLocation } from '../redux/pin/selectors'
import { fetchNearByPlacesByUser } from '../redux/userCreatedPlaces/operations'
import { setBannedWord, setVotingCount } from '../redux/filter/slice'
import { Icon } from '@rneui/base'
import { selectIsLoadingWhileGoogle } from '../redux/googleMapsPlaces/selectors'

const Refresh = () => {
    const dispatch = useDispatch()
    const pin = useSelector(selectCurrentLocation)
    const isLoading = useSelector(selectIsLoadingWhileGoogle)
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
                disabled={isLoading}
            >
                <Icon name="refresh" type="ionicons" color={isLoading ? "gray" : "black"} size={27} />
            </TouchableOpacity>
        </View>
    )
}

export default Refresh

const styles = StyleSheet.create({})