import React from 'react';
import {View} from 'react-native';

const Card = (props) => {
  return < View style={styles.containerStyle}>{props.children}</View>;
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#ddd',
    borderBouuomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    maeginRight: 5,
    marginTop: 10,
  }
};

export {Card};
