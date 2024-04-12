import { Linking } from "react-native";



// jump to apple map(Google maps for Android)
export const navigateToPlace = (lat, lng, name) => {
    const url = `http://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(name)}`;
    Linking.openURL(url);
};