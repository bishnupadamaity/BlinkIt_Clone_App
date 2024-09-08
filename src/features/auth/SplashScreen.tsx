import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '@utils/Constants'
import { screenHeight, screeWidth } from '@utils/Scaling'
import Logo from '@assets/images/splash_logo.jpeg'

const SplashScreen = () => {
    return (
        <View style={styles.container} >
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