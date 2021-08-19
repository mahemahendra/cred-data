import ButtonsStyle from "../styles/Buttons.style";
import DoseTapColors from "../styles/DoseTapColors.style";

export const appColors = {
    ...DoseTapColors,
};

export const appStyle = {
    title : {
        color: appColors.primeryColor,
        fontSize: 24,
        padding: 10,
        fontWeight: '600',
    },
    ...ButtonsStyle,
}

export const theme = {
    palette: {
        primary: {
            main: appColors.primeryColor,
        },
        secondary: {
            main: appColors.secondaryColor,
        }
    },
};