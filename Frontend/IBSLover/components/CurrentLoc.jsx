import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const CurrentLoc = () => {
    const [menuWidth, setMenuWidth] = useState(new Animated.Value(0));

    const toggleMenu = () => {
        console.log('toggleMenu called');
        // Animate the value of menuWidth from its current value to the new value
        Animated.timing(menuWidth, {
            toValue: menuWidth._value === 0 ? 1 : 0, // Toggle between 0 (closed) and 1 (open)
            duration: 300,
            useNativeDriver: false, // Layout animations are not supported by the native driver
        }).start();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                <Text style={styles.menuText}>...</Text>
            </TouchableOpacity>
            <Animated.View style={[styles.menu, {
                width: menuWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '50%'] // Width transitions from 0% to 50%
                }),
            }]}>
                <Text style={styles.menuItem} onPress={toggleMenu}>Hide List</Text>
                <Text style={styles.menuItem}>Current Location</Text>
                {/* Add more menu items here */}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 999
    },
    menuButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    menuText: {
        fontSize: 24
    },
    menu: {
        backgroundColor: '#FFF',
        paddingTop: 10
    },
    menuItem: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 18
    }
});

export default CurrentLoc;