import axios from 'axios';
import { BASE_URL } from './config';
import { tokenStorage } from '@state/storage';
import { useAuthStore } from '@state/authStore';
import { Alert } from 'react-native';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { appAxios } from './apiInterceptor';
export const customerLogin = async (phone: string) => {
    try {
        console.log(`${BASE_URL}/customer/login`, { phone });
        const res = await axios.post(`${BASE_URL}/customer/login`, { phone },{timeout: 60000});
        const { accessToken, refreshToken, customer } = res.data;
        tokenStorage.set('accessToken', accessToken);
        tokenStorage.set('refreshToken', refreshToken);
        const { setUser } = useAuthStore.getState();
        setUser(customer);
        return true;
    } catch (error:any) {
        if (error.code === 'ECONNABORTED') {
            // Timeout error
            Alert.alert("Request Timeout", "Please try after some time.");
        } else {
            console.log("Login Error: ", error);
        }
    }
}
export const deliveryLogin = async (email:string,password:string) => {
    try {
        console.log(`${BASE_URL}/delivery/login`, { email, password });
        const res = await axios.post(`${BASE_URL}/delivery/login`, { email,password }, { timeout: 60000 });
        const { accessToken, refreshToken, deliveryPartner } = res.data;
        tokenStorage.set('accessToken', accessToken);
        tokenStorage.set('refreshToken', refreshToken);
        const { setUser } = useAuthStore.getState();
        setUser(deliveryPartner);
        return true;
    } catch (error: any) {
        if (error.code === 'ECONNABORTED') {
            // Timeout error
            Alert.alert("Request Timeout", "Please try after some time.");
        } else {
            console.log("Delivery Login Error: ", error);
        }
    }
}
export const refresh_Token = async () => {
    try {
        const refreshToken = tokenStorage.getString('refreshToken');
        const response = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken })
        
        const new_refresh_token = response.data.accessToken;
        const new_access_token = response.data.refreshToken;

        tokenStorage.set('refreshToken', new_refresh_token);
        tokenStorage.set('accessToken', new_access_token);


        return new_access_token;
    } catch (error: any) {
        console.log("Refresh Token error", error);
        tokenStorage.clearAll();
        resetAndNavigate('CustomerLogin');
    }
}

export const refetchUser = async(setUser:any) => {
    try {
        const response = await appAxios.get(`/user`);
        setUser(response.data.user);
    } catch (error) {
        console.log("Login Error : ", error);
    }
}