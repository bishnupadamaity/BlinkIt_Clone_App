import { View, Text, ViewStyle, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React, { FC } from 'react'

interface CustomSafeAreaViewProps {
    children: React.ReactNode
    style?: ViewStyle
}
const CustomSafeAreaView: FC<CustomSafeAreaViewProps> = ({ children, style }) => {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={[styles.container, style]}>{children}</View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})

export default CustomSafeAreaView