import { StyleSheet } from "react-native";
import { AppStyles, } from "../AppStyles";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: AppStyles.color.bgColor,
        flex: 1,
    },
    card: {
        padding: 20,
        marginTop: 20,
        borderRadius: 5,
        justifyContent: 'center',
        borderColor: AppStyles.color.main,
        borderWidth: 1,
        lineHeight: 2
    },
    barCodeLabel: {
        fontSize: 14,
        textAlign: 'center',
        color: '#000',
    },
    barCodeField: {
        fontSize: 25,
        color: AppStyles.color.main,
        textAlign: 'center',
        fontWeight: '800',
        padding: 10,
        marginTop: 30,
    },
    input: {
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text,
        borderColor: AppStyles.color.main,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 20,
    },
    loginContainer: {
        backgroundColor: AppStyles.color.tint,
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
    },
    loginText: {
        color: AppStyles.color.white
    },
});