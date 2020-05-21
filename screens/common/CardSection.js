import React from 'react';
import {View} from 'react-native';

const CardSection = (props) => {
  return <View style={styles.containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    padding: 15,
    borderBouuomWidth: 1,
    backgroundColor: '#fff',
    justFlyContent: 'flex-start',
    borderColor: '#ddd',
    position: 'relative',
  },
};

export {CardSection};
