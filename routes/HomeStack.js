import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import RegistrationForm from '../screens/RegistrationForm';
import LoginForm from '../screens/LoginForm';
import React from 'react';
import OurVisionScreen from "../screens/OurVisionScreen";
import Header from "../screens/common/Header";


const screens ={
    HomeScreen:{
        screen: HomeScreen,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title='דף הבית' />
            }
        }
    },
    RegistrationForm:{
        screen : RegistrationForm,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title='דף הרשמה' />
            }
        }
    },
    LoginForm:{
        screen:LoginForm,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title='מערכת מורשים' />
            }
        }
    },
    OurVisionScreen:{
        screen:OurVisionScreen,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title='חזון העמותה' />
            }
        }
    },
}

const HomeStack = createStackNavigator(screens,{
    defaultNavigationOption:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee' , height:60}
    }
});

export default HomeStack;