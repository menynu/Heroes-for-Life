import React, { Component } from 'react';
import {Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text} from 'react-native';

import firebase from '../database/firebaseDb';
import {DatePicker, Form, Item, Label, Picker} from "native-base";
import {Card, CardSection} from "./common";

export default class Information extends Component {

    constructor() {
        super();
        this.state = {
            Name: '',
            Email: '',
            Mobile: '',
            Gender: '',
            Location: '',
            about_me: '',
            lang_support: '',


            meetDate:'', //new Date(),
            //meetTime: '',
            //Status: '',
            isLoading: true
        };
        //this.setDate = this.setDate.bind(this);
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

                    Name: user.Name,
                    Email: user.Email,
                    Mobile: user.Mobile,
                    Gender: user.Gender,
                    Location: user.Location,
                    about_me: user.about_me,
                    lang_support: user.lang_support,

                    meetDate: user.meetDate,
                    meetTime: user.meetTime,
                    Status: user.Status,

                    isLoading: false
                });
                console.log("2");
            } else {
                console.log("Document does not exist!");
            }

        });
    }

    onValueChangeC(value: string) {
        this.setState({
            Status: value
        });
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    setDate(newDate) {
        this.setState({ meetDate: newDate });
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
                // meetDate: '',
                // meetTime: '',
                // Status: '',
                isLoading: false,
            });
            //this.props.navigation.navigate('UserScreen');
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
            this.props.navigation.navigate('Volunteer');
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

                <Card>
                    <CardSection>
                <View>
                    <Text> שם: {this.state.Name}  </Text>
                    <Text> טלפון: {this.state.Mobile} </Text>
                    <Text> אימייל: {this.state.Email}  </Text>
                    <Text> כתובת מגורים: {this.state.Location}  </Text>
                    <Text> על עצמי: {this.state.about_me}   </Text>
                    <Text> יעד משלחת: {this.state.Destination}  </Text>
                    <Text>  שפות: {this.state.lang_support}  </Text>
                    <Text> תאריך ראיון: {this.state.meetDate}  </Text>
                    <Text> שעת ראיון: {this.state.meetTime} </Text>
                    <Text> סטאטוס: {this.state.Status} </Text>

                </View>
                    </CardSection>

                </Card>

                <View style={styles.inputGroup}>
                    <Text>בחר תאריך לקביעת ראיון </Text>
                    <DatePicker
                        minimumDate={new Date()}
                        //locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Select date"
                        textStyle={{ color: "blue" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={this.setDate}
                        disabled={false}
                    />

                </View>
                <View style={styles.inputGroup}>
                    <Text> בחר שעה רצויה: </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder={'Set Meeting Time:'}
                        value={this.state.meetTime}
                        onChangeText={(val) => this.inputValueUpdate(val, 'meetTime')}
                    />
                </View>

                <View>
                    <Label>עדכן סטטוס</Label>
                </View>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        style={{ width: 20 }}
                        placeholder="סטטוס של המועמד"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.Status}
                        onValueChange={this.onValueChangeC.bind(this)}
                    >
                        <Picker.Item label="בחר סטטוס" value="" />
                        <Picker.Item label="לא ענה (1)" value="לא ענה (1)" />
                        <Picker.Item label="לא ענה (2)" value="לא ענה (2)" />
                        <Picker.Item label="לא ענה (3)" value="לא ענה (3)" />
                        <Picker.Item label="לא רלוונטי" value="לא רלוונטי" />
                        <Picker.Item label="ענה ומגיע" value="ענה ומגיע" />

                    </Picker>
                </Item>


                <View style={styles.button}>
                    <Button
                        title='עדכן פרטי משתמש'
                        onPress={() => {this.updateUser(),alert('עדכון התבצע בהצלחה') ,this.props.navigation.navigate('Volunteer')}}
                        color="#19AC52"
                    />
                </View>
                <View>
                    <Button
                        title='Delete'
                        onPress={this.openTwoButtonAlert}
                        color="#ff292c"
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