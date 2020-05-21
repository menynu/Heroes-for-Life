// import React from 'react';
// import {Text, View,styleSheet} from 'react-native';
// import {MaterialIcons} from '@expo/vector-icons';

// export default function Header({navigation}) {
//   const openMenu = () =>{
//     navigation.openDrewer()
//   }
//   return(
//     <View style={styles.header}>
//       <MaterialIcons name='menu' size={20} onPress={openMenu} style={styles.icon}/>
//       <View>
//       <Text style={styles.headerText}>{props.headerText}</Text>
//       </View>
//     </View>
//   );
// }

// const styles ={
//   header:{
//     width:'%100',
//     height:'100%',
//     flexDirection:'row',
//     alignItems:'center',
//     justifyContent:'center',
//   },
//   headerText:{
//     fontWeight:'bold',
//     fontSize:20,
//     color:'#333',
//     letterSpacing:1,

//   },
//   icon:{
//     position:'absolute',
//     left:16
//   }
// }







//import libraries for making a component
import React from 'react';
import {Text, View} from 'react-native';
import {MaterialIcons} from 'react-native-vector-icons';

//make component

const Header = props => {
  const {textStyle, viewStyle} = styles;

      const openMenu = () =>{
      this.props.navigation.openDrewer()
    }
  return (
    <View>
      <MaterialIcons name="menu" size={30} onPress={openMenu} style={styles.icon}/>
      <View style={viewStyle}>
        <Text style={textStyle}>{props.headerText}</Text>
      </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
  },
    icon:{
    position:'absolute',
    left:16
  }
};

//Make the components to other parts of the app
export {Header};
