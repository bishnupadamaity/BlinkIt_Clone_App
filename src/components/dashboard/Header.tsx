import React, { FC } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import { useAuthStore } from '@state/authStore';
import { Fonts } from '@utils/Constants';

const Header: FC<{ showNotice: () => void }> = ({ showNotice }) => {
    const { user, setUser } = useAuthStore();
    return (
        <View style={styles.subContainer}>
            <TouchableOpacity activeOpacity={0.8}>
                <CustomText
                    fontFamily={Fonts.SemiBold}
                    variant="h8"
                    style={styles.text}>
                    Delivery in
                </CustomText>
                <View style={[styles.flexRowGap]}>
                    <CustomText
                        fontFamily={Fonts.SemiBold}
                        variant="h2"
                        style={[styles.text]}>
                        10 minutes
                    </CustomText>
                    <TouchableOpacity style={[styles.noticeBtn]} onPress={showNotice}>
                        <CustomText
                            fontSize={RFValue(5)}
                            fontFamily={Fonts.SemiBold}
                            style={{ color: '#3b4886' }}>
                            🌦️ Rain
                        </CustomText>
                    </TouchableOpacity>
                </View>
                <View style={styles.flexRow}>
                    <CustomText variant='h8' numberOfLines={1} fontFamily={Fonts.Medium} style={[styles.text2]}>{user?.address || 'Somewhere in earth 😅'}</CustomText>
                    <Icon name='menu-down' color={'#fff'} size={RFValue(20)} style={{bottom: -1}} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <Icon name='account-circle-outline' size={RFValue(36)} color={'#fff'} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: Platform.OS === 'ios' ? 5 : 10,
        justifyContent: 'space-between',
    },
    text: {
        color: '#fff',
    },
    flexRowGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    noticeBtn: {
        backgroundColor: '#e8eaf5',
        borderRadius: 100,
        paddingHorizontal: 8,
        paddingVertical: 2,
        bottom: -1,
    },
    flexRow: {
        // justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 3,
        maxWidth: '70%',
    },
    text2: {
        color: '#fff',
        width: '90%',
        flexWrap: 'wrap',
    }
});

export default Header;
