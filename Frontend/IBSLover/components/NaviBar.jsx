import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const NaviBar = ({ onCurrentLocationPress, onHideListPress, onAddToiletPress, isListViewVisible }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuAnimation = new Animated.Value(0);

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
