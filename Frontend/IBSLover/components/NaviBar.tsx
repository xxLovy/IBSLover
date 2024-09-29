import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert } from 'react-native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectHasListView, selectMapRefRegion } from '../redux/stateManage/slice';
import { setListView, setMapRefRegion } from '../redux/stateManage/slice';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import tw from 'twrnc';
import { selectCurrentLocation } from '../redux/pin/slice';
import { selectUser, selectIsSignedIn } from '../redux/auth/slice';


const NaviBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuAnimation = new Animated.Value(0);
    const dispatch = useAppDispatch();
    const isListViewVisible = useAppSelector(selectHasListView);
    const navigation = useNavigation();
    const pin = useAppSelector(selectCurrentLocation);
    const mapRefRegion = useAppSelector(selectMapRefRegion);
    const user = useAppSelector(selectUser)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        const toValue = menuOpen ? 0 : 1;

        Animated.timing(menuAnimation, {
            toValue,
            duration: 300,
            useNativeDriver: false
        }).start();
    };

    const menuTranslateY = menuAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [5, 0]
    });

    const onHideListPress = () => {
        dispatch(setListView());
    };

    const onChooseFilters = () => {
        navigation.navigate('ChooseFilter');
    };

    const onAddToiletPress = () => {
        navigation.navigate('AddToilet');
    };

    const onCurrentLocationPress = () => {
        dispatch(
            setMapRefRegion({
                ...mapRefRegion,
                latitude: pin.latitude,
                longitude: pin.longitude
            })
        );
    };

    return (
        <View style={[tw`absolute top-12 right-6 z-10 rounded-full`]}>
            <TouchableOpacity onPress={toggleMenu} style={[tw`bg-white p-2 rounded`]}>
                {menuOpen ? (
                    <Icon name="clear" type="ionicons" color="black" size={16} />
                ) : (
                    <Icon name="density-small" type="ionicons" color="black" size={16} />
                )}
            </TouchableOpacity>
            <Animated.View style={[tw`absolute top-8 right-0 w-48 bg-white rounded-lg shadow-xl`, { transform: [{ translateY: menuTranslateY }] }]}>
                {menuOpen ? (
                    <>
                        <TouchableOpacity onPress={onHideListPress} style={[tw`px-4 py-2 border-b border-gray-300 flex-row items-center`]}>
                            <Icon name={isListViewVisible ? 'menu-open' : 'minimize'} type="ionicons" color="black" size={16} />
                            <Text style={tw`ml-2`}>{isListViewVisible ? 'Hide List' : 'Show List'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCurrentLocationPress} style={[tw`px-4 py-2 border-b border-gray-300 flex-row items-center`]}>
                            <Icon name="location-searching" type="ionicons" color="black" size={16} />
                            <Text style={tw`ml-2`}>Current Location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => navigation.navigate('ChooseFilter')} style={[tw`px-4 py-2 border-b border-gray-300 flex-row items-center`]}>
                            <Icon name="filter-list-off" type="ionicons" color="black" size={16} />
                            <Text style={tw`ml-2`}>Set Filters</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => navigation.navigate('Signin')} style={[tw`px-4 py-2 border-b border-gray-300 flex-row items-center`]}>
                            <Icon name={user ? "logout" : "login"} type="ionicons" color="black" size={16} />
                            <Text style={tw`ml-2`}>{user ? 'Logout' : 'Login'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => user ? navigation.navigate('AddToilet') : Alert.alert('Login to use add toilet feature')} style={[tw`px-4 py-2 border-b border-gray-300 flex-row items-center`]}>
                            <Icon name="add-circle-outline" type="ionicons" color="black" size={16} />
                            <Text style={tw`ml-2`}>Add Toilet</Text>
                        </TouchableOpacity>
                    </>
                ) : null}
            </Animated.View>
        </View>
    );
};

export default NaviBar;