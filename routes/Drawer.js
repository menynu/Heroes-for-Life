import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeStack from './HomeStack';
import LoginStack from './LoginStack';
import LoginForm from '../screens/LoginForm';

const RootDrawerNavigator = createDrawerNavigator({
    HomeScreen:{
    screen:HomeStack,
    navigationOptions:() =>({
        title:'דף הבית'
    })
    },
    RegistrationForm:{
        screen:HomeStack,
        navigationOptions:() =>({
        title:'הגשת מועמדות'
    })
    },
    LoginForm:{
        screen:LoginForm,
        navigationOptions:() =>({
        title:'כניסה למורשים'
    })
    },
    
})

export default createAppContainer(RootDrawerNavigator);