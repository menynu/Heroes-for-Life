import { createStackNavigator } from 'react-navigation-stack';

import Volunteer from '../screens/Volunteer';
import Information from '../screens/Information';

const screens ={
    VolunteerScreen:{
        screen:Volunteer,
    },
    Information:{
        screen:Information,
    }
}

const VolunteerStack = createStackNavigator(screens,{
    defaultNavigationOption:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee' , height:60}
    }
});


export default VolunteerStack;