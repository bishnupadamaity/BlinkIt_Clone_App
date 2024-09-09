import React, { useEffect } from 'react';
import { Keyboard } from 'react-native';

export default function useKeyboardOffSetHeight() {
    const [keyboardOffsetHeight, setKeyboardOffsetHeight] = React.useState(0);
    useEffect(() => {
        const keyboardWillAndroidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            e => {
                setKeyboardOffsetHeight(e.endCoordinates.height);
            },
        );
        const keyboardWillIosShowListener = Keyboard.addListener(
            'keyboardWillShow',
            e => {
                setKeyboardOffsetHeight(e.endCoordinates.height);
            },
        );
        const keyboardWillAndroidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            e => {
                setKeyboardOffsetHeight(0);
            },
        );
        const keyboardWillIosHideListener = Keyboard.addListener(
            'keyboardWillHide',
            e => {
                setKeyboardOffsetHeight(0);
            },
        );

        return () => {
            keyboardWillAndroidHideListener.remove();
            keyboardWillIosHideListener.remove();
            keyboardWillAndroidShowListener.remove();
            keyboardWillIosShowListener.remove();
        };
    }, []);
    return keyboardOffsetHeight;
}
