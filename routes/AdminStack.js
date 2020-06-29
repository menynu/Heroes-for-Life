import { createStackNavigator } from 'react-navigation-stack';
import AdminPage from '../screens/AdminPage';
import MangeU from '../screens/MangeU';
import MangeD from '../screens/MangeD';
import React from 'react';
import Report1 from "../screens/Reports/Report1";
import Report2 from "../screens/Reports/Report2";
import Report3 from "../screens/Reports/Report3";
import Report4 from "../screens/Reports/Report4";
import Header from '../screens/common/Header';


const screens ={
    AdminPage:{
        screen:AdminPage,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title='אזור מנהלים' />
            }
        }
    },
    MangeU:{
        screen:MangeU,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title='ניהול משתמשים' />
            }
        }
    },
    MangeD:{
        screen:MangeD,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title='ניהול משלחות' />
            }
        }
    },
    Report1:{
        screen:Report1,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title='דוח 4' />
            }
        }
    },
    Report2:{
        screen:Report2,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title=' דוח 2' />
            }
        }
    },
    Report3:{
        screen:Report3,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title='דוח 3' />
            }
        }
    },
    Report4:{
        screen:Report4,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title='דוח 1' />
            }
        }
    }
}

const AdminStack = createStackNavigator(screens,{
    defaultNavigationOption:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee' , height:60}
    }
});


export default AdminStack;
