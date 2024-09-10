import React from 'react'
import { View, Alert, StyleSheet, ScrollView } from 'react-native'
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { deliveryLogin } from '@service/authService';
import CustomText from '@components/ui/CustomText';
import { screenHeight } from '@utils/Scaling';
import LottieView from 'lottie-react-native'
import { Fonts } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';

const DeliveryLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await deliveryLogin(email, password);
      if (result) {
        resetAndNavigate('DeliveryDashboard');
      }
    } catch (error) {
      Alert.alert("Login Failed");
      console.log("Delivery Login Error : ", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <CustomSafeAreaView>
      <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode='on-drag' >
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView autoPlay loop style={styles.lottie} source={require('@assets/animations/delivery_man.json')} />
          </View>
          <CustomText variant='h3' fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText variant='h6' fontFamily={Fonts.SemiBold} style={styles.text}>
            Faster than Flash⚡
          </CustomText>


          <CustomInput
            onChangeText={setEmail}
            value={email}
            left={<Icon
              name='mail'
              color={'#f8890e'}
              style={{ marginLeft: 10 }}
              size={RFValue(18)}
            />}
            inputMode='email'
            right={false}
            placeholder='Email'
          />
          <CustomInput
            onChangeText={setPassword}
            value={password}
            left={<Icon
              name='key-sharp'
              color={'#f8890e'}
              style={{ marginLeft: 10 }}
              size={RFValue(18)}
            />}
            // inputMode='text'
            placeholder='Password'
            secureTextEntry
            right={false}
          />

          <CustomButton
            disabled={email.length == 0 || password.length < 5}
            title='Login'
            onPress={handleLogin}
            loading={isLoading} />

        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  }
})
export default DeliveryLogin