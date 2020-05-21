import React from 'react';
import {View, ActivetyIndicator} from 'react-native';

const Spinner = ({size}) => {
    return(
        <View style={styles.spinnerStyle}>
            <ActivetyIndicator size={size||'large'} />
        </View>
    );
};

const styles={
    spinnerStyle:{
        flex:1,
        justfyContent:'center',
        alignItems:'center'
    }
};

export {Spinner};