import React from 'react';
import {StyleSheet, Text, View,Button} from 'react-native';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import AdminPage from '../screens/AdminPage';
import MangeU from '../screens/MangeU';
import MangeD from '../screens/MangeD';
import AdminStack from "./AdminStack";
import SwitchNavigator from "./SwitchNavigator";


const screens ={
    AdminPage:{
        screen:SwitchNavigator,
        navigationOptions:({ navigation }) =>{
            return {
                tabBarLabel:'הנפקת דוחות',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-document'}/>
                    </View>)
            }
        }
    },
    MangeU:{
        screen:MangeU,
        navigationOptions:({ navigation }) =>{
            return {
                tabBarLabel:'ניהול משתמשים',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-people'}/>
                    </View>)
            }
        }
    },
    MangeD:{
        screen:MangeD,
        navigationOptions:({ navigation }) =>{
            return {
                tabBarLabel:'ניהול משלחות',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-globe'}/>
                    </View>)
            }
        }
    }
}

const TabNavigator  = createMaterialBottomTabNavigator(screens,
{
    initialRouteName: "AdminPage",
        activeColor: '#f0edf6',
    inactiveColor: '#226557',
    barStyle: { backgroundColor: '#469ed3' },
}

);


export default TabNavigator ;
