import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectHasListView, selectMapRefRegion } from '../redux/stateManage/selectors';
import { setListView, setMapRefRegion } from '../redux/stateManage/slice';
import { useNavigation } from '@react-navigation/native';
import { selectCurrentLocation } from '../redux/pin/selectors';
import { Icon } from '@rneui/themed';
import tw from 'twrnc';


const NaviBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuAnimation = new Animated.Value(0);
    const dispatch = useDispatch();
    const isListViewVisible = useSelector(selectHasListView);
    const navigation = useNavigation();
    const pin = useSelector(selectCurrentLocation);
    const mapRefRegion = useSelector(selectMapRefRegion);

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
        <View style={[tw`absolute top-3 right-3 z-10 rounded-full`]}>
            <TouchableOpacity onPress={toggleMenu} style={[tw`bg-white p-2 rounded`]}>
                {menuOpen ? (
                    <Icon name="clear" type="ionicons" color="black" size={16} />
                ) : (
                    <Icon name="density-small" type="ionicons" color="black" size={16} />
                )}
            </TouchableOpacity>
            <Animated.View style={[tw`absolute top-8 right-0 w-20 bg-white rounded-lg shadow-xl`, { transform: [{ translateY: menuTranslateY }] }]}>
                {menuOpen ? (
                    <>
                        <TouchableOpacity onPress={onHideListPress} style={[tw`px-4 py-2 border-b border-gray-300`]}>
                            {/* <Text>{isListViewVisible ? 'Hide List' : 'Show List'}</Text> */}
                            <Icon name={isListViewVisible ? 'menu-open' : 'minimize'} type="ionicons" color="black" size={16} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCurrentLocationPress} style={[tw`px-4 py-2 border-b border-gray-300`]}>
                            {/* <Text>Current Location</Text> */}
                            <Icon name="location-searching" type="ionicons" color="black" size={16} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onAddToiletPress} style={[tw`px-4 py-2 border-b border-gray-300`]}>
                            {/* <Text>Add Toilet</Text> */}
                            <Icon name="add-circle-outline" type="ionicons" color="black" size={16} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onChooseFilters} style={[tw`px-4 py-2`]}>
                            {/* <Text>Filters</Text> */}
                            <Icon name="filter-list-off" type="ionicons" color="black" size={16} />
                        </TouchableOpacity>
                    </>
                ) : null}
            </Animated.View>
        </View>
    );
};

export default NaviBar;
