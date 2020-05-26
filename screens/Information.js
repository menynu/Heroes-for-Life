import React, { Component } from 'react';
//import { StyleSheet, View, Text, Button } from 'react-native';
//import { StyleSheet, ScrollView,Text, ActivityIndicator, View } from 'react-native';
import {Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text} from 'react-native';

import firebase from '../database/firebaseDb';

export default class Information extends Component {

    constructor() {
        super();
        this.state = {
            meetDate: '',
            meetTime: '',
            Status: '',
            isLoading: true
        };
    }

    componentDidMount() {
        // console.log("comp did mount?"); //this.props.navigation.state.params.user.name
        const dbRef = firebase.firestore().collection('delegation').doc(this.props.navigation.state.params.userKey)
        dbRef.get().then((res) => {
            if (res.exists) {
                console.log("1");
                const user = res.data();
                this.setState({
                    key: res.id,
                    meetDate: user.meetDate,
                    meetTime: user.meetTime,
                    Status: user.Status,


                    isLoading: false
                });
                console.log("2");
            } else {
                console.log("Document does not exist!");
            }
            console.log("3");
        });
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    updateUser() {
        this.setState({
            isLoading: true,
        });


        const updateDBRef = firebase.firestore().collection('delegation').doc(this.state.key);
        updateDBRef.update({
            meetDate: this.state.meetDate,
            meetTime: this.state.meetTime,
            Status: this.state.Status,

        }).then((docRef) => {
            this.setState({
                key: '',
                meetDate: '',
                meetTime: '',
                Status: '',
                isLoading: false,
            });
            this.props.navigation.navigate('UserScreen');
        })
            .catch((error) => {
                console.error("Error: ", error);
                this.setState({
                    isLoading: false,
                });
            });
    }

    deleteUser() {
        const dbRef = firebase.firestore().collection('delegation').doc(this.props.navigation.state.params.userKey)
        dbRef.delete().then((res) => {
            console.log('Item removed from database')
            this.props.navigation.navigate('UserScreen');
        })
    }

    openTwoButtonAlert=()=>{
        Alert.alert(
            'Delete User',
            'Are you sure?',
            [
                {text: 'Yes', onPress: () => this.deleteUser()},
                {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
            ],
            {
                cancelable: true
            }
        );
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>

                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Set Meeting Date'}
                        value={this.state.meetDate}
                        onChangeText={(val) => this.inputValueUpdate(val, 'meetDate')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder={'Set Meeting Time:'}
                        value={this.state.meetTime}
                        onChangeText={(val) => this.inputValueUpdate(val, 'meetTime')}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder={'Status'}
                        value={this.state.Status}
                        onChangeText={(val) => this.inputValueUpdate(val, 'Status')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='עדכן פרטי משתמש'
                        onPress={() => {this.updateUser(), this.props.navigation.navigate('Volunteer')}}
                        color="#19AC52"
                    />
                </View>
                <View>
                    <Button
                        title='Delete'
                        onPress={this.openTwoButtonAlert}
                        color="#E37399"
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginBottom: 7,
    }
})