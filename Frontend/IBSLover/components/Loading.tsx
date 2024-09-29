import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "twrnc"

const Loading = ({ text }) => {
    const tips = [
        "Maintain a regular bathroom schedule by going at the same time each day. Your body's natural rhythm can help with this.",
        "Stay hydrated! Drinking enough water is crucial for healthy bowel movements and preventing constipation.",
        "Incorporate exercise into your daily routine to promote regular bowel movements. Physical activity stimulates intestinal muscles.",
        "Include fiber-rich foods like fruits, vegetables, and whole grains in your diet. Fiber helps regulate bowel movements.",
        "Listen to your body's signals and don't ignore the urge to go to the bathroom. Ignoring it can lead to constipation and other issues.",
    ];
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    useEffect(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * tips.length);
        } while (randomIndex === currentTipIndex);
        setCurrentTipIndex(randomIndex);
        const interval = setInterval(() => {
            setCurrentTipIndex(prevIndex => {
                let newIndex;
                do {
                    newIndex = Math.floor(Math.random() * tips.length);
                } while (newIndex === prevIndex);
                return newIndex;
            });
        }, 10000);
        return () => clearInterval(interval);
    }, []);


    return (
        <View style={tw`flex-1 justify-center items-center h-screen`}>
            <Text style={tw`text-lg`}>{text}</Text>
            <View style={tw`p-10`}><ActivityIndicator /></View>

            <Text style={[tw`text-base m-4 text-blue-500 pt-50`]}>
                {`Tips: ${tips[currentTipIndex]}`}
            </Text>
        </View>
    )
}

export default Loading