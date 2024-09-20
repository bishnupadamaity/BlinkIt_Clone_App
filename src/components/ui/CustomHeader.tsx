import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native'
import React, { FC } from 'react'

import  Icon  from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { goBack } from '@utils/NavigationUtils';
import CustomText from './CustomText';
import { Colors, Fonts } from '@utils/Constants';

const CustomHeader:FC<{title: string,search?: boolean}> = ({ title, search }) => {
  return (
    <SafeAreaView>
      <View style={styles.flexRow}>
        <Pressable onPress={()=>goBack()}>
          <Icon name='chevron-back' size={RFValue(16)} color={Colors.text} />
        </Pressable>
        <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text}>{title}</CustomText>
        <View>
          {
            search && <Icon name='search' color={Colors.text} size={RFValue(16)} />
          }
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    padding: 10,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 0.6,
    borderColor: Colors.border,
  },
  text: {
    textAlign: 'center'
  }
});

export default CustomHeader