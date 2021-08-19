import React, {useState, useEffect} from 'react';
import CountDown from 'react-native-countdown-component';
import { AppStyles, } from "../AppStyles";

const Counter = (props) => {
    const [timer, setTimer] = useState(props.timer);

    useEffect(() => {
        setTimer(props.timer);
    }, [props.timer]);

    return <CountDown
        id={'counter'}
        until={parseInt(timer)}
        onFinish={() => {
            props.setFieldDisabled(false);
            setTimer('0');
        }}
        onChange={() => {}}
        size={40}
        timeToShow={['M', 'S']}
        timeLabelStyle={{fontSize: 14, color: AppStyles.color.main}}
        digitStyle={{backgroundColor: AppStyles.color.main}}
        digitTxtStyle={{color: AppStyles.color.white}}
    />
}

export default Counter;