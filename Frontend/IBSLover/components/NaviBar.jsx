import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectHasListView } from '../redux/stateManage/selectors';
import { setListView } from '../redux/stateManage/slice';
import { useNavigation } from '@react-navigation/native';
import { selectCurrentLocation } from '../redux/pin/selectors';

const NaviBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuAnimation = new Animated.Value(0);
    const dispatch = useDispatch()
    const isListViewVisible = useSelector(selectHasListView)
    const navigation = useNavigation()
    const pin = useSelector(selectCurrentLocation)

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

    const menuText = menuOpen ? "x" : "...";

    const onHideListPress = () => {
        dispatch(setListView())
    }
    const onChooseFilters = () => {
        navigation.navigate('ChooseFilter');
    }

    const onAddToiletPress = () => {
        navigation.navigate('AddToilet');
    }

    const onCurrentLocationPress = () => {
        return
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                <Text style={styles.menuText}>{menuText}</Text>
            </TouchableOpacity>
            <Animated.View style={[styles.menu, { transform: [{ translateY: menuTranslateY }] }]}>
                {menuOpen ? (
                    <>
                        <TouchableOpacity onPress={onHideListPress} style={styles.menuItem}>
                            <Text>{isListViewVisible ? "Hide List" : "Show List"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onCurrentLocationPress} style={styles.menuItem}>
                            <Text>Current Location</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onAddToiletPress} style={styles.menuItem}>
                            <Text>Add Toilet</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onChooseFilters} style={styles.menuItem}>
                            <Text>Filters</Text>
                        </TouchableOpacity>
                    </>
                ) : null}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 999,
    },
    menuButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    menuText: {
        fontSize: 24
    },
    menu: {
        position: 'absolute',
        top: 50,
        right: 0,
        width: 150,
        backgroundColor: '#FFF',
        borderRadius: 8,
        elevation: 4,
    },
    menuItem: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default NaviBar;
