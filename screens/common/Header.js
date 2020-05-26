import React from 'react';
import {Text, View,styleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function Header({navigation}) {
  const openMenu = () =>{
    navigation.openDrewer()
  }
  return(
    <View style={styles.header}>
      <MaterialIcons name='menu' size={20} onPress={openMenu} style={styles.icon}/>
      <View>
      <Text style={styles.headerText}>{props.headerText}</Text>
      </View>
    </View>
  );
}

const styles ={
  header:{
    width:'%100',
    height:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  headerText:{
    fontWeight:'bold',
    fontSize:20,
    color:'#333',
    letterSpacing:1,

  },
  icon:{
    position:'absolute',
    left:16
  }
}
