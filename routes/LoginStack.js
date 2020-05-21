import { createStackNavigator } from 'react-navigation-stack';
import {LoginForm} from '../screens/LoginForm';
import AdminPage from '../screens/AdminPage'
import UserDetailScreen from '../screens/UserDetailScreen'

const screens ={
    LoginForm:{
        screen:LoginForm,
        navigationOption: ({navigation}) =>{
            return{
                headerTitle: () => <Header navigation={navigation}/>,
            }
        }
    },
     AdminPage:{
        screen:AdminPage,
        navigationOption: ({navigation}) =>{
            return{
                headerTitle: () => <Header navigation={navigation}/>,
            }
        }
    },
      UserDetailScreen:{
        screen:UserDetailScreen,
        navigationOption: ({navigation}) =>{
            return{
                headerTitle: () => <Header navigation={navigation}/>,
            }
        }
    },
    
}

const LoginStack = createStackNavigator(screens,{
    defaultNavigationOption:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee' , height:60}
    }
});

export default LoginStack;