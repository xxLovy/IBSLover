import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectKeyword, selectVotingCount, selectBannedWord } from '../redux/filter/slice';
import { setBannedWord, setVotingCount } from '../redux/filter/slice';
import { useNavigation } from '@react-navigation/native';

const ChooseFilter = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const keywords = useAppSelector(selectKeyword);
    const currentVotingCount = useAppSelector(selectVotingCount);
    const bannedWords = useAppSelector(selectBannedWord);

    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
    const [votingCountLocal, setVotingCountLocal] = useState<string>('');

    useEffect(() => {
        setSelectedKeywords(bannedWords);
        setVotingCountLocal(currentVotingCount.toString());
    }, [bannedWords, currentVotingCount]);

    const handleResetFilters = () => {
        dispatch(setBannedWord([]));
        dispatch(setVotingCount(0));
        navigation.goBack();
    };

    const handleKeywordToggle = (keyword: string) => {
        const updatedKeywords = selectedKeywords.includes(keyword)
            ? selectedKeywords.filter((key) => key !== keyword)
            : [...selectedKeywords, keyword];
        setSelectedKeywords(updatedKeywords);
    };

    const handleApplyFilters = () => {
        const parsedVotingCount = parseInt(votingCountLocal);
        if (!isNaN(parsedVotingCount)) {
            dispatch(setVotingCount(parsedVotingCount));
        }
        dispatch(setBannedWord(selectedKeywords));
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
                value={votingCountLocal}
                onChangeText={setVotingCountLocal}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleResetFilters}>
                <Text style={styles.applyButtonText}>Reset Filters</Text>
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
        margin: 10,
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ChooseFilter;
