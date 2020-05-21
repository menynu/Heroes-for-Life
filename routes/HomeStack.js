import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import RegistrationForm from '../screens/RegistrationForm';
// import LoginForm from '../screens/LoginForm';
import Header from '../screens/common/Header';
//import AdminPage from '../screens/AdminPage';
import React from 'react';

const screens ={
    HomeScreen:{
        screen: HomeScreen,
        title: 'דף הבית',
        navigationOption: {title: 'מערכת מורשים'}//({navigation}) =>{
            // return{
            //     headerTitle:()=> <Header navigation={navigation}/>,
            // }
      //  }
    },
    RegistrationForm:{
        screen : RegistrationForm,
        navigationOption : {
            title : 'טופס רישום'
        }
    },
    // LoginForm:{
    //     screen:LoginForm,
    //     navigationOption:{
    //         title:'מערכת מורשים'
    //     }
    //}
}

const HomeStack = createStackNavigator(screens,{
    defaultNavigationOption:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee' , height:60}
    }
});

export default HomeStack;