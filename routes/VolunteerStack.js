import { createStackNavigator } from 'react-navigation-stack';

import Volunteer from '../screens/Volunteer';
import Information from '../screens/Information';

const screens ={
    VolunteerScreen:{
        screen:Volunteer,
        navigationOptions:() =>({
            title:'אזור מלגאים',
        })
    },
    Information:{
        screen:Information,
        navigationOptions:() =>({
            title:'עידכון מידע על המועמד',
        })
    },


}

const VolunteerStack = createStackNavigator(screens,{
    defaultNavigationOption:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee' , height:60}
    }
});


export default VolunteerStack;