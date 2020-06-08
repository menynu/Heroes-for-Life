import React from 'react';
import {View} from 'react-native';

const Card1 = (props) => {
  return < View style={styles.containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    // borderWidth: 1,
    borderRadius: 3,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    elevation: 1,
    // marginLeft: 5,
    // marginRight: 5,
    marginTop: 10,
  }
};

export {Card1};