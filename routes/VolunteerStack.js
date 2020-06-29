import { createStackNavigator } from 'react-navigation-stack';

import Volunteer from '../screens/Volunteer';
import Information from '../screens/Information';
import Header from "../screens/common/Header";
import React from "react";

const screens ={
    VolunteerScreen:{
        screen:Volunteer,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title='אזור מלגאים' />
            }
        }
    },
    Information:{
        screen:Information,
        navigationOptions:({ navigation }) =>{
            return {
                headerTitle: () => <Header navigation={navigation} title='עדכון פרטים' />
            }
        }
    },


}

const VolunteerStack = createStackNavigator(screens,{
    defaultNavigationOption:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee' , height:60}
    }
});


export default VolunteerStack;
