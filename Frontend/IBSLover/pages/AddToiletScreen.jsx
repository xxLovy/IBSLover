import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const api = 'http://13.238.182.211:80';

const AddToiletScreen = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { pin } = route.params;

    const submitToiletLocation = async () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter a name for the location.');
            return;
        }
        // TODO: different status code (202 existing toilet)
        // Confirm with the user
        Alert.alert(
            'Confirm Location',
            'Is this location a toilet?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const response = await axios.post(`${api}/add-toilet`, {
                                latitude: pin.latitude,
                                longitude: pin.longitude,
                                name: name,
                                description: description,
                            });
                            // Handle the response.
                            console.log(response.data);
                            Alert.alert('Success', 'Toilet location added successfully!');
                            navigation.goBack(); // Navigate back to the homepage
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