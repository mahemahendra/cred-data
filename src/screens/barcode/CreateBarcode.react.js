import React, { } from 'react';
import {
    Text,
    View,
    Alert,
  } from "react-native";
import Button from "react-native-button";
import {
    AppCommonStyle,
  } from "../../AppStyles";
import { styles } from '../../styles/Barcode.styles';
import Barcode from "react-native-barcode-builder";
import firestore from '@react-native-firebase/firestore';

const CreateBarcode = (props) => {
    const {barCodeText} = props;

    return <React.Fragment>
          <View>
              <Text style={AppCommonStyle.pageHeading}>Create Barcode</Text>
          </View>
          <View style={styles.card} removeClippedSubviews={true}>
              <View><Text style={styles.barCodeField}>{barCodeText}</Text></View>
              <Barcode width={1.5} value={barCodeText} format="CODE128" />
              <View style={{marginTop: 40, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Button
                    name={'generateBarcode'}
                    containerStyle={styles.loginContainer}
                    style={styles.loginText}
                    onPress={() => props.resetBarcodeCreation()}
                    >
                      BACK
                  </Button>
                  <Button
                  name={'generateBarcode'}
                  containerStyle={styles.loginContainer}
                  style={styles.loginText}
                  onPress={() => props.saveData()}
                  >
                      SUBMIT
                  </Button>
              </View>
          </View>
    </React.Fragment>
}

export default CreateBarcode;