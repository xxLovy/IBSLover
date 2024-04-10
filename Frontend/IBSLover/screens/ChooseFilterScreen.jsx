import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

const ChooseFilter = ({ navigation, route }) => {
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [votingCount, setVotingCount] = useState('');
    const keywords = [
        'Starbucks',
        'McDonald\'s',
        'Walmart',
        'City Supper',
        'IKEA',
    ];

    const handleKeywordToggle = (keyword) => {
        const updatedKeywords = selectedKeywords.includes(keyword)
            ? selectedKeywords.filter((key) => key !== keyword)
            : [...selectedKeywords, keyword];
        setSelectedKeywords(updatedKeywords);
    };

    const { applyFilters } = route.params;

    const handleApplyFilters = () => {
        console.log('applied')
        // 调用applyFilters函数并传递所选的关键字和投票计数/
        applyFilters(selectedKeywords, parseInt(votingCount));
        navigation.goBack();
    };


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>General Filter</Text>
            <View style={styles.keywordContainer}>
                {keywords.map((keyword) => (
                    <TouchableOpacity
                        key={keyword}
                        style={[
                            styles.keyword,
                            selectedKeywords.includes(keyword) && styles.selectedKeyword,
                        ]}
                        onPress={() => handleKeywordToggle(keyword)}
                    >
                        <Text>{keyword}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.heading}>Voting Count Filter</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter voting count..."
                value={votingCount}
                onChangeText={setVotingCount}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    keywordContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    keyword: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 10,
    },
    selectedKeyword: {
        backgroundColor: '#007bff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    applyButton: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ChooseFilter;
