import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeStack from './HomeStack';
import AdminStack from './AdminStack';
import VolunteerStack from './VolunteerStack';

import  LoginForm from '../screens/LoginForm';
import  RegistrationForm from '../screens/RegistrationForm';


const RootDrawerNavigator = createDrawerNavigator({

    HomeScreen:{
        screen:HomeStack
    },
    LoginForm:{
        screen:LoginForm
    },
    RegistrationForm:{
        screen:RegistrationForm
    },
    Volunteer:{
        screen:VolunteerStack
    },
    AdminScreen:{
        screen:AdminStack
    }

})

export default createAppContainer(RootDrawerNavigator);