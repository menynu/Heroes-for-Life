import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import RegistrationForm from '../screens/RegistrationForm';
import LoginForm from '../screens/LoginForm';
import React from 'react';


const screens ={
    HomeScreen:{
        screen: HomeScreen,
        navigationOptions:() =>({
        title:'דף הבית',
        //title: this.props.navigation.getParam('otherParam', 'A Nested Details Screen'),
        headerStyle: {
        backgroundColor: 'transparent',
        //Background color of ActionBar
      },
        })
    },
    RegistrationForm:{
        screen : RegistrationForm,
        navigationOptions:() =>({
            title:'הגשת מועמדות'
        })
    },
    LoginForm:{
        screen:LoginForm,
        navigationOptions:() =>({
            title:'מערכת מורשים'
        })
    },
}

const HomeStack = createStackNavigator(screens,{
    defaultNavigationOption:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee' , height:60}
    }
});

export default HomeStack;