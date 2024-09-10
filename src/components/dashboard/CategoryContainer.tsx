import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import ScalePress from '@components/ui/ScalePress'
import { navigate } from '@utils/NavigationUtils'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'

const CategoryContainer: FC<{ data: any }> = ({ data }) => {
    const renderItem = (items: any[]) => {
        return (
            <>
                {items.map((item, index) => (
                    <ScalePress onPress={() => navigate('ProductCategories')} key={index} style={styles.item}>
                        <View style={styles.imageContainer} >

                        <Image source={item.image} style={styles.image} />
                        </View>
                        <CustomText style={styles.text} variant='h8' fontFamily={Fonts.Medium}  >{item.name}</CustomText>
                    </ScalePress>
                ))}
            </>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>{renderItem(data?.slice(0,4))}</View>
            <View style={styles.row}>{renderItem(data?.slice(4))}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 12
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 16
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        // borderRadius: 20
    },
    text: {
        textAlign: 'center'
    },
    item: {
        width: '22%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10,
        padding: 6,
        backgroundColor: '#e5f3f3',
        marginBottom: 8

    }
})
export default CategoryContainer