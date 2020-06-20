import React, { Component } from 'react';
import {Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text, ImageBackground} from 'react-native';

import firebase from '../database/firebaseDb';
import { Form, Item, Label, Picker} from "native-base";
import {Card, CardSection} from "./common";
import DatePicker from 'react-native-datepicker'

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
            Destination: '',


            meetDate: new Date(),
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
                    Destination: user.Destination,

                    meetDate: user.meetDate,
                    meetTime: user.meetTime,
                    Status: user.Status,

                    isLoading: false
                });

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
            'מחק מועמד',
            'האם אתה בטוח?',
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
                <Text></Text>
                <Text></Text>
                <Card>
                    <ImageBackground source={require('./pics/user_profile4.jpg')} style={styles.introBackground}>

                        <Text style={styles.TextName}> שם: {this.state.Name}  </Text>

                    <CardSection>
                <View>
                        <Text style={styles.Text}> טלפון: {this.state.Mobile} </Text>
                        <Text style={styles.Text}> אימייל: {this.state.Email}  </Text>
                        <Text style={styles.Text}> כתובת מגורים: {this.state.Location}  </Text>
                        <Text style={styles.Text}> יעד משלחת: {this.state.Destination}  </Text>
                        <Text style={styles.Text}>  שפות: {this.state.lang_support}  </Text>
                        <Text style={styles.Text}> על עצמי: {this.state.about_me}   </Text>
                        <Text></Text>
                </View>
                    </CardSection>
                    <CardSection>
                        <Text style={styles.Text}> תאריך ראיון: {this.state.meetDate}  </Text>
                        <Text style={styles.Text}> שעת ראיון: {this.state.meetTime} </Text>
                        <Text style={styles.Text}> סטאטוס: {this.state.Status} </Text>
                    </CardSection>
                    </ImageBackground>
                </Card>

                <Text> </Text>
                <Text style={styles.line}>___________________________________________________________________________________</Text>
                <Text> </Text>
            
                <View style={styles.InterviewDetails}>
                    <Text style={styles.Title}>פרטי הראיון</Text>
                    <Text style={styles.line}>___________________________________</Text>
                    <Text></Text>
                    <View style={styles.inputGroup}>
                        <Text style={styles.TextBig}>בחר תאריך לקביעת ראיון </Text>
                        <Text> </Text>


                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.meetDate} //initial date from state
                            mode="date" //The enum of date, datetime and time
                            placeholder="select date"
                            format="DD/MM/YYYY"
                            minDate= {new Date()}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 8,
                                    marginLeft: 0,
                                    width: 50,
                                    height: 50,
                                },
                                dateInput: {
                                    marginLeft: 50,
                                    marginTop: 30,
                                    backgroundColor: '#f7f7f7',
                                    borderColor: '#f7f7f7'
                                },
                            }}
                            onDateChange={date => {
                                this.setState({ meetDate: date });
                            }}
                        />
                        <Text></Text>
                        <Text style={styles.line}>___________________________________________________________________________________</Text>

                    </View>
                    <View style={styles.inputGroup}>

                        <Text style={styles.TextBig}> בחר שעה רצויה: </Text>
                        <Text></Text>
                        <TextInput
                        backgroundColor={'#f7f7f7'}
                            multiline={true}
                            numberOfLines={1}
                            fontSize={20}
                            placeholder={'Set Meeting Time:'}
                            value={this.state.meetTime}
                            onChangeText={(val) => this.inputValueUpdate(val, 'meetTime')}
                        />
        <Text style={styles.line}>___________________________________________________________________________________</Text>

                    </View>

                    <View>
                        <Label style={styles.TextBig}>עדכן סטטוס</Label>
                    </View>
                    <Text></Text>
                    <View style={{backgroundColor: '#f7f7f7'}}>
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
                    </View>
                    <Text></Text>


                    <View style={styles.button}>
                        <Button
                            title='עדכן פרטי משתמש'
                            onPress={() => {this.updateUser(),alert('עדכון התבצע בהצלחה') ,this.props.navigation.navigate('Volunteer')}}
                            color="#31c5c7"
                        />
                    </View>
                    <View>
                        <Button
                            title='Delete'
                            onPress={this.openTwoButtonAlert}
                            color="#ff292c"
                        />
                    </View>
                    <Text></Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 35,
        paddingHorizontal: 15,
        backgroundColor: 'white',

    },
    TextName: {
        fontSize:25,
        color: 'black',
        textAlign: 'center'
    },
    Text: {
        fontSize:17,
        color: 'black'
    },
    Title: {
        fontSize:30,
        color:'black',
        textAlign: 'center'
    },
    TextBig: {
        fontSize:22,
        color: 'black'
    },
    introBackground: {

    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
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
    },
    line: {
        color: "#e0ebeb",
        fontSize: 10,
        textAlign: 'center',
    },
})
