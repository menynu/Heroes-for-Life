import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';

const screens ={
    OurVisionScreen:{
        screen: OurVisionScreen,
        navigationOptions:() =>({
        title:'עוד עלינו',
        })
    },
}

const OurVisionStack = createStackNavigator(screens,{
    defaultNavigationOption:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee' , height:60}
    }
});


export default OurVisionStack;