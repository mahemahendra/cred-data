import React, {useEffect, useState } from 'react';
import {
    Text,
    View,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Alert,
  } from "react-native";
import moment from 'moment';
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
    const [todayCount, setTodayCount] = useState(0);
    const [genBarcode, setGenBarcode] = useState(false);

    const setShowBox = () => {
        setLoading(false);
        getTodayBarcodeSubmitionCount();
        resetBarcodeCreation();
    }
    const showConfirmDialog = () => {
        return Alert.alert(
            "Barcode",
            "Barcode created successfully",
            [
                {
                text: "Yes",
                onPress: () => {
                        setShowBox();
                    },
                },
            ]
        );
    };

    const getTodayBarcodeSubmitionCount = () => {
        firestore().collection('barCodes')
        .where('id', '==', props.user.id)
        .get()
        .then(user => {
            let count = 0;
            const todayDate = moment(new Date()).format('DD/MM/YYYY');
            console.log(todayDate);
            user.forEach(u => {
                const dt = moment(u.data().timeStamp.toDate()).format('DD/MM/YYYY');
                if(todayDate === dt) {
                    count++;
                }
            });
            setTodayCount(count);
        });
    }

    const saveData = () => {
        setLoading(true);
        firestore().collection('barCodes').add({
            id: props.user.id,
            barCode: barCodeText,
            userId: props.user.userId,
            userName: props.user.firstName,
            timeStamp: new Date(),
        }).then(_ => {
            setTimeout(() => {
                showConfirmDialog();
            }, (parseInt(props.user.timer) * 1000));
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

    useEffect(() => {
        getTodayBarcodeSubmitionCount();
    }, []);
    const render = <View>
        <View>
            <Text style={AppCommonStyle.pageHeading}>Create Barcode</Text>
        </View>
        <View style={styles.card} removeClippedSubviews={true}>
            <Text style={styles.barCodeLabel}>Total barcode submitted Today: {todayCount}</Text>
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