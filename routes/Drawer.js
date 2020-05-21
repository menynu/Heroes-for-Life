import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeStack from './HomeStack';
import LoginStack from './LoginStack';
import Volunteer from '../screens/Volunteer';



const RootDrawerNavigator = createDrawerNavigator({
    Volunteer:{
    screen:Volunteer
    },
    HomeScreen:{
    screen:HomeStack
    },
    LoginForm:{
    screen:LoginStack
    },


})

export default createAppContainer(RootDrawerNavigator);