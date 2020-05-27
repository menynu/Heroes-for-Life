import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeStack from './HomeStack';
import AdminStack from './AdminStack';
import VolunteerStack from './VolunteerStack';

import  LoginForm from '../screens/LoginForm';
import  RegistrationForm from '../screens/RegistrationForm';


const RootDrawerNavigator = createDrawerNavigator({

    HomeScreen:{
        screen:HomeStack,
        navigationOptions:() =>({
            title:'דף הבית'
        })
    },
    LoginForm:{
        screen:LoginForm,
        navigationOptions:() =>({
            title:'מערכת מורשים'
        })
    },
    RegistrationForm:{
        screen:RegistrationForm,
        navigationOptions:() =>({
            title:'טופס הרשמה'
        })
    },
    Volunteer:{
        screen:VolunteerStack
    },
    AdminScreen:{
        screen:AdminStack
    }

})

export default createAppContainer(RootDrawerNavigator);