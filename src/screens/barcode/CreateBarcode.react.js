import React, { useState } from 'react';
import { connect } from "react-redux";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
  } from "react-native";
import Button from "react-native-button";
import {
    AppStyles,
  } from "../../AppStyles";
import { Configuration } from "../../Configuration";
import Barcode from './Barcode.react';

const CreateBarcode = (props) => {
    const [timer, setTimer] = useState(60);
    const [barcodeCount, setBarcodeCount] = useState(1);
    const [assignee, setAssignee] = useState();
    const [formShow, setFormShow] = useState(true);
    
    const formRender = <View>
        <View style={styles.viewItem}>
            <Text style={styles.label}>Enter Timer for each Barcode</Text>
            <TextInput
                style={styles.input}
                placeholder="Sec"
                onChangeText={text => setTimer(text)}
                value={timer.toString()}
                placeholderTextColor={AppStyles.color.grey}
                keyboardType='numeric'
                maxLength={4}
            />
        </View>
        <View style={styles.viewItem}>
            <Text style={styles.label}>Number of Barcodes</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setBarcodeCount(text)}
                value={barcodeCount.toString()}
                placeholderTextColor={AppStyles.color.grey}
                keyboardType='numeric'
                maxLength={4}
            />
        </View>
        <View style={styles.viewItem}>
            <Text style={styles.label}>Assign To</Text>
            <TextInput
                style={{...styles.input, width: 200}}
                placeholder='Enter name'
                onChangeText={text => setAssignee(text)}
                value={assignee}
                placeholderTextColor={AppStyles.color.grey}
            />
        </View>
        <View style={styles.viewAction}>
            <View>
                <Button
                containerStyle={styles.loginContainer}
                style={styles.loginText}
                onPress={() => setFormShow(false)}
                >
                    Create
                </Button>
            </View>
            <View>
                <Button
                containerStyle={styles.loginContainer}
                style={styles.loginText}
                onPress={() => props.navigation.navigate('Home')}
                >
                    Cancel
                </Button>
            </View>
            <View>
                <Button title={'Cancel'}></Button>
            </View>
        </View>
    </View>;

    return <ScrollView style={styles.container}>
        {formShow && formRender}
        {!formShow && <Barcode barcodeCount={barcodeCount} assignee={assignee} {...props} timer={timer} />}
    </ScrollView>
}

const mapStateToProps = state => ({
    user: state.auth.user
});


export default connect(mapStateToProps)(CreateBarcode);

const styles = StyleSheet.create({
    container: {
      backgroundColor: AppStyles.color.bgColor,
      flex: 1,
      padding: Configuration.home.listing_item.offset
    },
    viewItem: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewAction: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    loginContainer: {
        width: 150,
        backgroundColor: AppStyles.color.tint,
        borderRadius: 5,
        padding: 10,
        marginTop: 30,
    },
    input: {
        width: 100,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text,
        borderColor: AppStyles.color.main,
        borderWidth: 1,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        alignSelf: 'center',
        marginRight: 10
    },
    loginText: {
        color: AppStyles.color.white
    },
});