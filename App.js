import * as React from 'react';
import {Component} from 'react';
import {View, Text} from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Navigator from './routes/Drawer';

import HomeScreen from './screens/HomeScreen';
import RegistrationForm from './screens/RegistrationForm';
import Volunteer from './screens/Volunteer';
import AdminPage from './screens/AdminPage';
import {Header , Button, Spinner} from './screens/common';
import LoginForm from './screens/LoginForm';
import firebase from './database/firebaseDb';
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

export default class App extends Component {
  render(){
  return (
    
    <Navigator/>

    );
    }
}