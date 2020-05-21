import { createStackNavigator } from 'react-navigation-stack';
import LoginForm from '../screens/LoginForm';

const screens ={
    LoginForm:{
        screen:LoginForm,
    },
}

const LoginStack = createStackNavigator(screens,{
    defaultNavigationOption:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee' , height:60}
    }
});


export default LoginStack;