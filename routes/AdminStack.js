import { createStackNavigator } from 'react-navigation-stack';
import AdminPage from '../screens/AdminPage';
import Report1 from '../screens/Reports/Report1';
import Report2 from '../screens/Reports/Report2';
import Report3 from '../screens/Reports/Report3';
import Report4 from '../screens/Reports/Report4';

const screens ={
    AdminPage:{
        screen:AdminPage,
    },
    Report1:{
        screen:Report1,
    },
    Report2:{
        screen:Report2,
    },
    Report3:{
        screen:Report3,
    },
    Report4:{
        screen:Report4,
    }
}

const AdminStack = createStackNavigator(screens,{
    defaultNavigationOption:{
        headerTintColor:'#444',
        headerStyle:{backgroundColor:'#eee' , height:60}
    }
});


export default AdminStack;