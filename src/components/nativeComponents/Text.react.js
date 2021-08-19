import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { AppStyles } from '../../AppStyles';

const Text = (props) => {
    const { cls = 'normal' } = props;
    return <RNText style={styles[cls]}>
        {props.children}
    </RNText>
}

export default Text;

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: 20,
        color: AppStyles.color.white,
    },
    mainText: {
        color: AppStyles.color.white,
    },
    mainDate: {
        fontSize: 12,
        color: AppStyles.color.white,
        position: 'absolute',
        right: 10,
    },
});