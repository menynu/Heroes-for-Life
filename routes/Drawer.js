import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import HomeStack from './HomeStack';
import TabNavigator from './TabNavigator';
import VolunteerStack from './VolunteerStack';
import LoginForm from "../screens/LoginForm";
import RegistrationForm from "../screens/RegistrationForm";
import MangeU from "../screens/MangeU";
import MangeD from "../screens/MangeD";

const RootDrawerNavigator = createDrawerNavigator({
    HomeScreen:{
        screen:HomeStack,
        navigationOptions:() =>({
            title: 'דף הבית',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
            },
        })
    },
    LoginForm:{
        screen:LoginForm,
        navigationOptions:() =>({
            title:'מערכת מורשים',
            alignItems:'right',
        })
    },
    RegistrationForm:{
        screen:RegistrationForm,
        navigationOptions:() =>({
            title:'טופס הרשמה',
        })
    },
    Volunteer:{
        screen:VolunteerStack,
        navigationOptions:() =>({
            drawerLabel: () => null
        }),


    },
    AdminScreen:{
        screen:TabNavigator,
        navigationOptions:() =>({
            drawerLabel: () => null
        })

    },
    MangeU:{
    screen:MangeU,
        navigationOptions:() =>({
        drawerLabel: () => null,

    })

    },
    MangeD:{
    screen:MangeD,
        navigationOptions:() =>({
        drawerLabel: () => null
    })

}


},{
    drawerPosition:"right",
    drawerType:"slide",
        contentOptions:{

    }
})

export default createAppContainer(RootDrawerNavigator);
