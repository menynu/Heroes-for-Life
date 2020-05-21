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
import {LoginForm} from './screens/LoginForm';
import UserDetailScreen from './screens/UserDetailScreen';
import firebase from './database/firebaseDb';


export default class App extends Component {
    state = {loggedIn:false};
     ComponentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBEz0bAS3dV7AZkmipNexnxqNbwLEdgBkE',
      authDomain: 'hflnewdb.firebaseapp.com',
      databaseURL: 'https://hflnewdb.firebaseio.com',
      storageBucket: 'hflnewdb.appspot.com',
      messagingSenderId: '265302555358',
    });
    
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({loggedIn:true});
      } else {
        this.setState({loggedIn:false});
      }
    });
  }
  renderContent(){
    switch (this.state.loggedIn) {
      case true:  //return value what show up if login auth
        return <Button>Log Out</Button>;
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }

    if(this.state.loggedIn){ 
      return(
        <Button> Log Out </Button>
      );
    }

    return <LoginForm/>
  }
  render(){
  return (

    <Navigator/>

  );
}}