import React from 'react';
import {View,Text,TextInput} from 'react-native';

const Input = ({lable,value,onChangeText,placeholder,secureTextEntry}) => {
  const{ inputStyle, lableStyle, containerStyle} = styles;
  
  
  return (
      <View style={containerStyle}>
      <Text style={lableStyle}>{lable}</Text>
        <TextInput
          secureTextEntry= {secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={inputStyle}
          value={value}
          onChangeText={onChangeText}
          />
      </View>
  );
};

const styles = {
  inputStyle:{
    color:'#000',
    paddingRight:5,
    paddingLeft:5,
    fontSize:18,
    lineHeight:23,
    flex:2
  },
  lableStyle:{
    fontSize:18,
    paddingLeft:20,
    flex:1
  },
  containerStyle:{
    height:40,
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  }
};

export {Input};
