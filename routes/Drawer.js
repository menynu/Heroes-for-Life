import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeStack from './HomeStack';
import LoginStack from './LoginStack';
import Volunteer from '../screens/Volunteer';



const RootDrawerNavigator = createDrawerNavigator({

    HomeScreen:{
    screen:HomeStack
    },
    LoginForm:{
    screen:LoginStack
    },
    Volunteer:{
    screen:Volunteer
    },


})

export default createAppContainer(RootDrawerNavigator);