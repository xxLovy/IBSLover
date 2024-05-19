import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCurrentLocation } from '../redux/pin/selectors';
import { useNavigation } from '@react-navigation/native';
import { selectUser } from '../redux/auth/selectors';
import { api } from '../global';

const AddToiletScreen = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const pin = useSelector(selectCurrentLocation)
    const navigation = useNavigation()
    const user = useSelector(selectUser)

    const submitToiletLocation = async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter a name for the location.');
            return;
        }
        // Confirm with the user
        Alert.alert(
            'Confirm Location',
            'Are you standing at the toilet now?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            if (user && user.userId) {
                                const response = await axios.post(`${api}/add-toilet`, {
                                    latitude: pin.latitude,
                                    longitude: pin.longitude,
                                    name: name,
                                    description: description,
                                    userId: user.userId,
                                });
                                // Handle the response.
                                // console.log(response);
                                if (response.status === 201) {
                                    Alert.alert('Success', 'Toilet location added successfully!');
                                } else if (response.status === 200) {
                                    Alert.alert('Success', 'Your vote for the toilet location has been successfully cast!');
                                }

                                navigation.goBack(); // Navigate back to the homepage
                            } else {
                                Alert.alert('Error', 'Failed to add toilet location.');
                            }

                        } catch (error) {
                            console.error(error);
                            Alert.alert('Error', 'Failed to add toilet location.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.addToiletContainer}>
            <Text>Name:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <Text>Description (optional):</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />
            <Button title="Done" onPress={submitToiletLocation} />
        </View>
    );
};

const styles = StyleSheet.create({
    addToiletContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
});

export default AddToiletScreen;