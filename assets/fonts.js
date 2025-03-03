// useCustomFonts.js

import * as Font from 'expo-font';

export const useCustomFonts = () => {
    return Font.loadAsync({
        // Lexend fonts
        'Lexend-Regular': require('../assets/fonts/lexend-main/fonts/lexend/ttf/Lexend-Regular.ttf'),
        'Lexend-Bold': require('../assets/fonts/lexend-main/fonts/lexend/ttf/Lexend-Bold.ttf'),
        'Lexend-ExtraBold': require('../assets/fonts/lexend-main/fonts/lexend/ttf/Lexend-ExtraBold.ttf'),
        'Lexend-Light': require('../assets/fonts/lexend-main/fonts/lexend/ttf/Lexend-Light.ttf'),
        'Lexend-Medium': require('../assets/fonts/lexend-main/fonts/lexend/ttf/Lexend-Medium.ttf'),
        'Lexend-SemiBold': require('../assets/fonts/lexend-main/fonts/lexend/ttf/Lexend-SemiBold.ttf'),
        'Lexend-Black': require('../assets/fonts/lexend-main/fonts/lexend/ttf/Lexend-Black.ttf'),
        'Lexend-Thin': require('../assets/fonts/lexend-main/fonts/lexend/ttf/Lexend-Thin.ttf'),

        // Poppins fonts
        'Poppins-Black': require('../assets/fonts/poppins/Poppins-Black.ttf'),
        'Poppins-BlackItalic': require('../assets/fonts/poppins/Poppins-BlackItalic.ttf'),
        'Poppins-Bold': require('../assets/fonts/poppins/Poppins-Bold.ttf'),
        'Poppins-BoldItalic': require('../assets/fonts/poppins/Poppins-BoldItalic.ttf'),
        'Poppins-ExtraBold': require('../assets/fonts/poppins/Poppins-ExtraBold.ttf'),
        'Poppins-ExtraBoldItalic': require('../assets/fonts/poppins/Poppins-ExtraBoldItalic.ttf'),
        'Poppins-ExtraLight': require('../assets/fonts/poppins/Poppins-ExtraLight.ttf'),
        'Poppins-ExtraLightItalic': require('../assets/fonts/poppins/Poppins-ExtraLightItalic.ttf'),
        'Poppins-Italic': require('../assets/fonts/poppins/Poppins-Italic.ttf'),
        'Poppins-Light': require('../assets/fonts/poppins/Poppins-Light.ttf'),
        'Poppins-LightItalic': require('../assets/fonts/poppins/Poppins-LightItalic.ttf'),
        'Poppins-Medium': require('../assets/fonts/poppins/Poppins-Medium.ttf'),
        'Poppins-MediumItalic': require('../assets/fonts/poppins/Poppins-MediumItalic.ttf'),
        'Poppins-Regular': require('../assets/fonts/poppins/Poppins-Regular.ttf'),
        'Poppins-SemiBold': require('../assets/fonts/poppins/Poppins-SemiBold.ttf'),
        'Poppins-SemiBoldItalic': require('../assets/fonts/poppins/Poppins-SemiBoldItalic.ttf'),
        'Poppins-Thin': require('../assets/fonts/poppins/Poppins-Thin.ttf'),
        'Poppins-ThinItalic': require('../assets/fonts/poppins/Poppins-ThinItalic.ttf'),
    });
};
