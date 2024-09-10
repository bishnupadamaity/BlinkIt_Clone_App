import React, { FC, useEffect } from 'react'
import { View, StyleSheet, Image, StatusBar, Alert } from 'react-native'
import GeoLocation from '@react-native-community/geolocation'
import { screenHeight, screenWidth } from '@utils/Scaling'
import Logo from '@assets/images/splash_logo.jpeg'
import { Colors } from '@utils/Constants'
import { useAuthStore } from '@state/authStore'
import { tokenStorage } from '@state/storage'
import { navigate, resetAndNavigate } from '@utils/NavigationUtils'
import { jwtDecode } from 'jwt-decode'
import { refetchUser, refresh_Token } from '@service/authService'

GeoLocation.setRNConfiguration({
    skipPermissionRequests: false,
    authorizationLevel: 'always',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto'
})

interface DecodedToken {
    exp: number;
}
const SplashScreen: FC = () => {

    const { user, setUser } = useAuthStore();

    const tokenCheck = async () => {
        const accessToken = tokenStorage.getString('accessToken') as string;
        const refreshToken = tokenStorage.getString('refreshToken') as string;

        if (accessToken) {

            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);

            const currentTime = Date.now() / 1000;

            if (decodedRefreshToken?.exp < currentTime) {
                resetAndNavigate('CustomerLogin');
                Alert.alert("Session Expired", "Please login again.");
                return false;
            }
            if (decodedAccessToken?.exp > currentTime) {
                try {
                    refresh_Token();
                    await refetchUser(setUser);

                } catch (error) {
                    console.log("Access Token Error: ", error);
                    Alert.alert("Error", "There is an error refreshing accessToken");
                }
            }

            if (user?.role === 'Customer') {
                resetAndNavigate('ProductDashboard');
            } else {
                resetAndNavigate('DeliveryDashboard');
            }

            return true;
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
        width: screenWidth * 0.7,
        height: screenHeight * 0.7,
        resizeMode: 'contain'
    }
})

export default SplashScreen