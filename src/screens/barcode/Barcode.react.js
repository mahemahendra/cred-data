import React, {useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Alert,
    ActivityIndicator,
  } from "react-native";
import Button from "react-native-button";
import { AppStyles, } from "../../AppStyles";
import firestore from '@react-native-firebase/firestore';
import { generateBarCodeText } from '../../components/utils/Helper';
import CountDown from 'react-native-countdown-component';

const Barcode = (props) => {
    const [loading, setLoading] = useState(false);
    const [barCodeText, setBarCodeText] = useState(generateBarCodeText());
    const [barCodes, _setBarCodes] = useState([]);
    const [barCodeValue, setBarCodeValue] = useState('');
    const [barCodeError, setBarCodeError] = useState('');
    const [fieldDisabled, setFieldDisabled] = useState(true);
    const [counterKey, setCounterKey] = useState(0);

    const saveData = () => {
        setLoading(true);
        firestore().collection('barCodes').add({
            uid: props.user.id,
            barCodes: barCodes,
            barcodeCount: props.barcodeCount,
            timer: props.timer,
            assignee: props.assignee,
            timeStamp: new Date(),
        }).then(_ => {
            setLoading(false);
            props.navigation.navigate('Home');
        });
    }

    const nextBarCode = () => {
        if(barCodeValue.length === 0 && fieldDisabled) {
            setBarCodeError("Please enter Barcode");
        } else {
            barCodes.push({
                barCode: barCodeText,
                barCodeEntered: barCodeValue,
            });
            if(barCodes.length === parseInt(props.barcodeCount)) {
                saveData();
            }
            setBarCodeValue('');
            setBarCodeText(generateBarCodeText());
            setFieldDisabled(true);
            setCounterKey(prevKey => prevKey + 1);
        }
    }

    useEffect(() => {
        if(barCodeValue.length > 0) {
            setBarCodeError('');
        }
    }, [barCodeValue]);

    return loading ? <ActivityIndicator
            style={styles.spinner}
            size="large"
            color={AppStyles.color.tint}
        />
        :
        <View>
            <View>
                <Text>{ `${barCodes.length + 1} out of ${props.barcodeCount} Barcode` }</Text>
            </View>
            <View style={styles.card} removeClippedSubviews={true}>
                <CountDown
                    key={counterKey}
                    until={parseInt(props.timer)}
                    onFinish={() => {setFieldDisabled(false)}}
                    size={36}
                    timeToShow={['M', 'S']}
                    timeLabelStyle={{fontSize: 14, color: AppStyles.color.main}}
                    digitStyle={{backgroundColor: AppStyles.color.main}}
                    digitTxtStyle={{color: AppStyles.color.white}}
                />
                <Text style={styles.barCodeLabel}>Text to type</Text>
                <View><Text style={styles.barCodeField}>{barCodeText}</Text></View>
                <TextInput
                    contextMenuHidden={true}
                    style={styles.input}
                    placeholder="Enter Barcode"
                    onChangeText={text => setBarCodeValue(text)}
                    value={barCodeValue}
                    placeholderTextColor={AppStyles.color.grey}
                    editable={fieldDisabled}
                />
                <Text style={{color: 'red'}}>{barCodeError}</Text>
                <View style={{marginTop: 40, marginBottom: 10}}>
                    <Button
                    name={'nextBarcode'}
                    containerStyle={styles.loginContainer}
                    style={styles.loginText}
                    onPress={nextBarCode}
                    >
                        {(barCodes.length === props.barcodeCount - 1) ? 'Submit' : 'Next'}
                    </Button>
                </View>
            </View>
        </View>
}

export default Barcode;

const styles = StyleSheet.create({
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
        fontSize: 18,
        textAlign: 'center',
        color: '#000',
    },
    barCodeField: {
        fontSize: 34,
        color: AppStyles.color.main,
        textAlign: 'center',
        fontWeight: '800',
        padding: 10
    },
    input: {
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text,
        borderColor: AppStyles.color.main,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 24,
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