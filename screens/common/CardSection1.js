import React from 'react';
import {View} from 'react-native';

const CardSection1 = (props) => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    padding: 15,
    justFlyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative',
  },
};

export {CardSection1};
