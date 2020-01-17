import {
    DynamicValue,
} from 'react-native-dark-mode';

export const Color = {
    light: {
        darkPrimary: 'rgb(48,115,1)',
        primary: 'rgb(102, 171, 51)',
        lightPrimary: 'rgb(188,208,172)',

        darkText: '#000',
        text: '#333',
        lightText: '#999',

        white: 'white',
        black: 'black',

        borderColor: 'grey',

        red: 'rgb(220, 30, 10)',
        green: 'rgb(48,115,1)',
        darkTransparent: 'rgba(0,0,0,0.5)',
        
        textInputBack: 'white'
    },
    dark: {
        darkPrimary: '#000000',
        primary: '#121212',
        lightPrimary: '#121212',

        darkText: '#fff',
        text: '#cccccc',
        lightText: '#666',

        white: '#76b642',
        black: 'white',

        borderColor: 'grey',
        
        red: 'rgb(220, 30, 10)',
        green: 'rgb(48,115,1)',
        darkTransparent: 'rgba(0,0,0,0.5)',

        textInputBack: '#121212'
    }
};

const DynamicColor = {
    darkPrimary: new DynamicValue(Color.light.darkPrimary, Color.dark.darkPrimary),
    primary: new DynamicValue(Color.light.primary, Color.dark.primary),
    lightPrimary: new DynamicValue(Color.light.lightPrimary, Color.dark.lightPrimary),

    darkText: new DynamicValue(Color.light.darkText, Color.dark.darkText),
    text: new DynamicValue(Color.light.text, Color.dark.text),
    lightText: new DynamicValue(Color.light.lightText, Color.dark.lightText),

    white: new DynamicValue(Color.light.white, Color.dark.white),
    black: new DynamicValue(Color.light.black, Color.dark.black),

    borderColor: new DynamicValue(Color.light.borderColor, Color.dark.borderColor),

    red: new DynamicValue(Color.light.red, Color.dark.red),
    green: new DynamicValue(Color.light.green, Color.dark.green),
    darkTransparent: new DynamicValue(Color.light.darkTransparent, Color.dark.darkTransparent),

    textInputBack: new DynamicValue(Color.light.textInputBack, Color.dark.textInputBack),
};

export default DynamicColor;