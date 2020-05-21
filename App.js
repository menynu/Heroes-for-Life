import * as React from 'react';
import {Component} from 'react';
import {View, Text} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from 'react-navigation-drawer';
// import { createStackNavigator } from '@react-navigation/stack';

import Navigator from './routes/Drawer';

import HomeScreen from './screens/HomeScreen';
import RegistrationForm from './screens/RegistrationForm';
import Volunteer from './screens/Volunteer';
import AdminPage from './screens/AdminPage';
import {Header , Button, Spinner} from './screens/common';
import LoginForm from './screens/LoginForm';
import UserDetailScreen from './screens/UserDetailScreen';
import firebase from './database/firebaseDb';


export default class App extends Component {
  render(){
  return (

    <Navigator/>

  );
  }
}