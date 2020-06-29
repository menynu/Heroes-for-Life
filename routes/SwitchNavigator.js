import { createStackNavigator } from 'react-navigation-stack';

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AdminPage from '../screens/AdminPage';
import AdminStack from "./AdminStack";
import TabNavigator from "./TabNavigator";
import HomeStack from "./HomeStack";


export default createAppContainer(createSwitchNavigator(
    {
        Starter: AdminPage,
        App: AdminStack,
    },
    {
        initialRouteName: 'Starter'
    }
));
