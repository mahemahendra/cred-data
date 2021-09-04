import { StyleSheet } from "react-native";
import { AppStyles, AppCommonStyle } from "../AppStyles";

export const styles = StyleSheet.create({
    surface: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    pageHeading: {
        ...AppCommonStyle.pageHeading,
    },
    container: {
        padding: 20,
        borderWidth: 1,
        borderColor: AppStyles.color.main,
        borderRadius: 20,
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    userRow: {
        lineHeight: 2,
        paddingBottom: 20
    },
    userInfoRow: {
        fontSize: 18,
    },
    userInfoRowValue: {
        fontWeight: 'bold',
        textAlign: 'right',
        color: AppStyles.color.main,
    },
});