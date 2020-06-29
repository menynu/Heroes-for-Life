import React from 'react';
import { Image, StyleSheet, Text, View, ImageBackground} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ navigation, title}) {

  const openMenu = () => {
    navigation.openDrawer()
  };

  return (
      <View style={styles.header}>
        <Image source={require('../pics/hflCustom.png')} style={styles.headerImage} />

        <View style={styles.headerTitle}>

          <Text style={styles.headerText}>{ title }</Text>

        </View>

        <MaterialIcons name='menu' size={28} onPress={openMenu} style={styles.icon} />

      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    // color: '#31c5c7',
    // letterSpacing: 1,
    // alignSelf: 'center',
    // marginLeft: 90
  },
  icon: {
    position: 'absolute',
    right: 5
  },
  headerTitle: {
    flexDirection: 'row',
    marginHorizontal: 10
  },
  headerImage: {
    height: 40,
    width: 100,
    marginTop: -5,
    resizeMode: 'contain',
    flex: 1,
    // left: -115,
    position: 'absolute',
    left: -5
    // marginRight: -90,

  },

});