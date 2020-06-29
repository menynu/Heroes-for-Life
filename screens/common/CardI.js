import React from 'react';
import {View} from 'react-native';

const CardI = (props) => {
    return < View style={styles.containerStyle}>{props.children}</View>;
};

const styles = {
    containerStyle: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#0a0a0a',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 2},
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,

    }
};

export {CardI};
