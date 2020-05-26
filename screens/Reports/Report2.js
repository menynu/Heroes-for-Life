import React from 'react';
//import {Button} from 'native-base';
import { StyleSheet, Text,Button, View, Modal, TouchableHighlight } from 'react-native';
import {PickerArea} from "../common/PickerArea";
import Picker from "react-native-web/dist/exports/Picker";
import {PickerDelegation} from "../common/PickerDelegation";

export default class Report2 extends React.Component {

     render() {
         return (
             <View  style={styles.container}>
                     <PickerArea/>
                     <PickerDelegation/>
                 </View>
         );
     }
 }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});