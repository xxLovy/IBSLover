import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import {
    GoogleSignin,
    GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { selectIsSignedIn, selectUser } from "../redux/auth/slice";
import { setIsSignedIn, setUserInfo } from "../redux/auth/slice";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";



const SigninWIthGoogle = () => {
    const [error, setError] = useState();
    const dispatch = useAppDispatch()
    const user = useAppSelector(selectUser)
    const isSignedin = useAppSelector(selectIsSignedIn)
    const navigation = useNavigation()

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
        console.log("Pressed sign in5");

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const newUser: User = {
                username: userInfo.user.familyName + ' ' + userInfo.user.givenName,
                family_name: userInfo.user.familyName,
                given_name: userInfo.user.givenName,
                picture: userInfo.user.photo,
                email: userInfo.user.email,
                userId: userInfo.user.email,
            }
            dispatch(setUserInfo({ user: newUser }));
            dispatch(setIsSignedIn(true))
            setError();
            navigation.navigate('Home')
        } catch (e) {
            setError(e);
        }
    };

    const logout = () => {
        dispatch(setUserInfo({ user: undefined }))
        console.log("user logout5")
        dispatch(setIsSignedIn(false))
        GoogleSignin.revokeAccess();
        GoogleSignin.signOut();
        navigation.navigate('Home')
    };

    return (
        <View style={styles.container}>
            <Text>{JSON.stringify(error)}</Text>
            {/* {isSignedin && user && <Text>{JSON.stringify(user.user)}</Text>} */}
            {isSignedin ? (
                <Button title="Logout" onPress={logout} />
            ) : (
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Standard}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                />
            )}
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