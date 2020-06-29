import { createStackNavigator } from 'react-navigation-stack';
import LoginForm from '../screens/LoginForm';
import AdminPage from '../screens/AdminPage';
import VolunteerScreen from '../screens/VolunteerScreen';


const screens ={
    LoginForm:{
        screen:LoginForm,
    },
	AdminPage:{
	screen:AdminPage,
	navigationOption: ({navigation}) =>{
		return{
			headerTitle: () => <Header navigation={navigation}/>,
		}
	}
    },
    VolunteerScreen:{
        screen:VolunteerScreen,
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
