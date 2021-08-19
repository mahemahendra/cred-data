import React from 'react';
import { Appbar } from 'react-native-paper';
import { appColors } from '../components/Theme';
import TopSection from '../screens/dashboard/TopSection.react';
import { StyleSheet, View } from 'react-native';

const AppBar = (props) => {
    return (
        <Appbar translucent={true} style={styles.appBar} >
            <View style={styles.content}>
                <TopSection />
            </View>
        </Appbar>
    );
}

export default AppBar;

const styles = StyleSheet.create({
    appBar: {
        backgroundColor: appColors.bottomTabsBG,
        elevation: 0,
        shadowOpacity: 0,
        height: 72,
        margin: 0,
        padding: 0,
        paddingBottom: 10,
    },
    content: {
        backgroundColor: appColors.bottomTabsBG,
        width: '100%',
        justifyContent: 'center',
    }
});