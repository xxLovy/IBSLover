import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import {
    GoogleSignin,
    GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const SigninWIthGoogle = () => {
    const [error, setError] = useState();
    const [userInfo, setUserInfo] = useState();
    const dispatch = useDispatch()

    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            webClientId:
                "398793852102-829b77cc7u0sjjjkoa7otb7r5gk12di9.apps.googleusercontent.com",
            iosClientId:
                "398793852102-9n8h304aucoi2oos8catmv0vku44o6be.apps.googleusercontent.com",
        });
    };

    useEffect(() => {
        configureGoogleSignIn();
    });

    const signIn = async () => {
        console.log("Pressed sign in");

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUserInfo(userInfo);
            dispatch(setUserInfo(userInfo));
            setError();
        } catch (e) {
            setError(e);
        }
    };

    const logout = () => {
        setUserInfo(undefined);
        dispatch(setUserInfo(userInfo))
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
    };

    return (
        <View style={styles.container}>
            <Text>{JSON.stringify(error)}</Text>
            {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
            {userInfo ? (
                <Button title="Logout" onPress={logout} />
            ) : (
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                />
            )}
            <StatusBar style="auto" />
        </View>
    );
}

export default SigninWIthGoogle

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});