import React from 'react';
import {
    SafeAreaView
} from 'react-native';
import MmapView from '../components/MmapView';
import ListView from '../components/ListView';
import tw from 'twrnc'

export default function HomeScreen_copy() {

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <MmapView style={tw`h-1/2`} />
            <ListView style={tw`h-1/2`} />
        </SafeAreaView>
    );
}