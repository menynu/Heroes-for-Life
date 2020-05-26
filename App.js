
import * as React from 'react';
import {Component} from 'react';

import Navigator from './routes/Drawer';

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