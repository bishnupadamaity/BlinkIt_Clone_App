import React, { FC, useEffect } from 'react'
import { View, StyleSheet, Image, StatusBar, Alert } from 'react-native'
import GeoLocation from '@react-native-community/geolocation'
import { screenHeight, screeWidth } from '@utils/Scaling'
import Logo from '@assets/images/splash_logo.jpeg'
import { Colors } from '@utils/Constants'
import { useAuthStore } from '@state/authStore'
import { tokenStorage } from '@state/storage'
import { navigate } from '@utils/NavigationUtils'

GeoLocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto'
})
const SplashScreen: FC = () => {

    const { user, setUser } = useAuthStore();

    const tokenCheck = async () => {
        const accessToken = tokenStorage.getString('accessToken');
        const refreshToken = tokenStorage.getString('refreshToken');

        if (accessToken) {


        }

        navigate('CustomerLogin');
        return false;
    }

    useEffect(() => {
        const fetchUserLocation = async () => {
            try {
                GeoLocation.requestAuthorization();
                tokenCheck();
            } catch (error) {
                Alert.alert("Sorry we need location service for better experience.")
            }
        }
        const timeOutId = setTimeout(fetchUserLocation, 1000);
        return () => clearTimeout(timeOutId);
    }, [])
    return (
        <View style={styles.container} >
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Colors.primary}
            />
            <Image source={Logo} style={styles.logoImage} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: screeWidth * 0.7,
        height: screenHeight * 0.7,
        resizeMode: 'contain'
    }
})

export default SplashScreen