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
    LoginStack:{
    screen:LoginStack,
    navigationOptions:() =>({
        title:'כניסה למורשים'
    })
    },
    RegistrationForm:{
        screen:HomeStack,
        navigationOptions:() =>({
        title:'הגשת מועמדות'
    })
    },
})

export default createAppContainer(RootDrawerNavigator);