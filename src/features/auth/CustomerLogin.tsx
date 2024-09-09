import { View, Text, StatusBar, StyleSheet, Animated, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useRef } from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { resetAndNavigate } from '@utils/NavigationUtils';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffSetHeight from '@utils/useKeyboardOffSetHeight';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient'

const bottomColors = [...lightColors].reverse();
const CustomerLogin = () => {
  const [gestureSequence, setGestureSequence] = React.useState<string[]>([]);

  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const keyboardOffSetHeight = useKeyboardOffSetHeight();

  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (keyboardOffSetHeight == 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: - (keyboardOffSetHeight * 0.84),
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  },[keyboardOffSetHeight])
  const handleGesture = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      const { translationX, translationY } = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }
      console.log(translationX, translationY, direction);
      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      if (newSequence.join(' ') === 'up up down left right') {
        console.log('DeliveryLogin');
        resetAndNavigate('DeliveryLogin');
      }
    }
  };
  const handleAuth = () => {
    // setLoading(true);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomSafeAreaView>
        <ProductSlider />
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
            bounces={false}
            keyboardDismissMode={'on-drag'}
            keyboardShouldPersistTaps={'handled'}
            contentContainerStyle={styles.subContainer}
            style={{transform: [{translateY: animatedValue}]}}  
          >
            <LinearGradient colors={bottomColors} style={styles.gradient} />
            <View style={styles.content}>
              <Image
                source={require('@assets/images/logo.png')}
                style={styles.logo}
              />
              <CustomText variant="h2" fontFamily={Fonts.SemiBold}>
                India's last minute app
              </CustomText>
              <CustomText
                variant="h5"
                fontFamily={Fonts.SemiBold}
                style={styles.text}>
                Log in or sign up
              </CustomText>
              <CustomInput
                onChangeText={text => {
                  setPhoneNumber(text.slice(0, 10));
                }}
                onClear={() => {
                  setPhoneNumber('');
                }}
                value={phoneNumber}
                left={
                  <CustomText
                    variant="h6"
                    fontFamily={Fonts.SemiBold}
                    style={styles.phoneText}>
                    +91
                  </CustomText>
                }
                placeholder="Enter Phone Number"
                inputMode="numeric"
              />
              <CustomButton
                title="Continue"
                disabled={phoneNumber.length !== 10}
                onPress={handleAuth}
                loading={loading}
              />
            </View>
          </Animated.ScrollView>
        </PanGestureHandler>
      </CustomSafeAreaView>
      <View style={styles.footer}>
        <SafeAreaView>
          <CustomText fontSize={RFValue(8)}>
            By Continuing, you are agree to our Terms of Service & Privacy Policy
          </CustomText>
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  phoneText: {
    marginLeft: 10,
  },
  footer: {
    borderWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f9fc',
    width: '100%',
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
  }
});
export default CustomerLogin;
