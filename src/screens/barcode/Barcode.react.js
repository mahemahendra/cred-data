import React, {useEffect, useState } from 'react';
import {
    Text,
    View,
    TextInput,
    ScrollView,
    ActivityIndicator,
  } from "react-native";
import Button from "react-native-button";
import { connect } from "react-redux";
import { AppStyles, AppCommonStyle } from "../../AppStyles";
import firestore from '@react-native-firebase/firestore';
import { generateBarCodeText } from '../../components/utils/Helper';
import CreateBarcodeReact from './CreateBarcode.react';
import { styles } from '../../styles/Barcode.styles';

const Barcode = (props) => {
    const [loading, setLoading] = useState(false);
    const [barCodeText, setBarCodeText] = useState(generateBarCodeText());
    const [barCodeValue, setBarCodeValue] = useState('');
    const [barCodeError, setBarCodeError] = useState('');
    const [genBarcode, setGenBarcode] = useState(false);

    const saveData = () => {
        setLoading(true);
        firestore().collection('barCodes').add({
            id: props.user.id,
            barCode: barCodeText,
            timeStamp: new Date(),
        }).then(_ => {
            setTimeout(() => {
                setLoading(false);
                props.navigation.navigate('Home');
            }, (parseInt(props.user.timer) * 1000))
            resetBarcodeCreation();
        });
    }

    const generateBarcode = () => {
        if(barCodeValue.length === 0) {
            setBarCodeError("Please enter Barcode");
        } else if(barCodeValue !== barCodeText) {
            setBarCodeError("Barcode not match");
        } else {
            setGenBarcode(true);
        }
    }

    const resetBarcodeCreation = () => {
        setBarCodeText(generateBarCodeText());
        setBarCodeValue('');
        setGenBarcode(false);
    }

    useEffect(() => {
        if(barCodeValue.length > 0) {
            setBarCodeError('');
        }
    }, [barCodeValue]);

    // useEffect(() => {
    //     resetBarcodeCreation();
    // }, []);
    const render = <View>
        <View>
            <Text style={AppCommonStyle.pageHeading}>Create Barcode</Text>
        </View>
        <View style={styles.card} removeClippedSubviews={true}>
            <Text style={styles.barCodeLabel}>Total barcode submitted Today: {0}</Text>
            <View><Text style={styles.barCodeField}>{barCodeText}</Text></View>
            <TextInput
                contextMenuHidden={true}
                style={styles.input}
                placeholder="Enter Barcode"
                onChangeText={text => setBarCodeValue(text)}
                value={barCodeValue}
                placeholderTextColor={AppStyles.color.grey}
            />
            <Text style={{color: 'red'}}>{barCodeError}</Text>
            <View style={{marginTop: 40, marginBottom: 10}}>
                <Button
                name={'generateBarcode'}
                containerStyle={styles.loginContainer}
                style={styles.loginText}
                onPress={generateBarcode}
                >
                    GENERATE BARCODE
                </Button>
            </View>
        </View>
    </View>;

    return loading ? <ActivityIndicator
            style={styles.spinner}
            size="large"
            color={AppStyles.color.tint}
        />
        :
        <ScrollView style={styles.container}>
            {!genBarcode && render}
            {genBarcode && <CreateBarcodeReact {...props} resetBarcodeCreation={resetBarcodeCreation} saveData={saveData} barCodeText={barCodeText} />}
        </ScrollView>
}

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(Barcode);