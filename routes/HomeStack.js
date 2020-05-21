import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import RegistrationForm from '../screens/RegistrationForm';
import Header from '../screens/common/Header';
import React from 'react';

const screens ={
    HomeScreen:{
        screen: HomeScreen,
        navigationOptions:({navigation}) =>({
        title:'דף הבית'
        // return{
        //     headerTitle:()=> <Header navigation={navigation}/>,
        // }
        })
    
        // navigationOption: ({navigation}) =>{
        //     return{
        //         headerTitle:()=> <Header navigation={navigation}/>,
        //     }
        // }
    },
    RegistrationForm:{
        screen : RegistrationForm,
        navigationOption : {
            title : 'טופס רישום'
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