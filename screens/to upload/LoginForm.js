import React, { Component } from 'react';
import {TextInput, Button, Alert, Text, Image} from 'react-native';
import { Header } from 'react-native-elements';
import {Icon, View} from 'native-base';
import { DotIndicator } from 'react-native-indicators';
import firebase from '../database/firebaseDb';


//import Volunteer from './Volunteer'; //added

class LoginForm extends Component {
    static counter;
    constructor() {
        super();
        this.usersRef = firebase.firestore().collection('users')
        this.state = {
            email: "",
            password: "",
            delegation: '',
            loading: false
        }
    }

    onLoginSuccess() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user != null) {
                this.usersRef
                    .get()
                    .then(querySnapshot => {
                        console.log('Total users: ', querySnapshot.size);

                        querySnapshot.forEach(documentSnapshot => {
                            if(user.email===documentSnapshot.data().email){
                                // console.log('testing user delegation: ', documentSnapshot.data().delegation)
                                if(documentSnapshot.data().permission==="M"){
                                    this.props.navigation.navigate('AdminPage');
                                }
                                else{
                                    // console.log('testing user delegation: ', this.user.delegation)
                                    let VolunteerDest = documentSnapshot.data().delegation;
                                    console.log('testing user delegation: ', VolunteerDest)
                                    this.props.navigation.navigate('Volunteer', {userDelegation: VolunteerDest});
                                }
                            }
                        });
                    });
            }
        })
        this.setState({
            email: "",
            password: "",
            loading: false
        })
    }

    onLoginFail() {
        this.setState({ loading: false})
        Alert.alert(
            "Error",
            "Email or password are incorrect",
            [{ text: "OK"}],
            { cancelable: false}
        )
    }


    onButtonPress() {
        // firebase.auth().onAuthStateChanged((user) => {
        //     if(user != null) {
        //         this.addUserToFire()
        //     }
        // })

        const { email, password } = this.state
        this.setState({ loading: true })

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(
                this.onLoginSuccess.bind(this)
            )
            .catch(
                this.onLoginFail.bind(this)
            )
    }



    renderButton() {
        if (this.state.loading) {
            return <DotIndicator color = "#004577"/>
        }

        return (
            <View style = {styles.buttonStyle}>
                <Button
                    title = "Log in"
                    color = "004577"
                    backgroundColor = 'white'
                    onPress= {() => this.onButtonPress()}
                >
                </Button>
            </View>
        )
    }

    render() {
        return(
            <View style= {{backgroundColor: 'white'}}>
                <View style={styles.headerTitle}>

                    <Icon name='menu' style={{marginRight: 15, marginTop:15}}  onPress={() => this.props.navigation.openDrawer()}/>
                    <Image source={require('./pics/hflCustom.png')} style={styles.HomeScreenLogo}
                           style={{
                               marginTop: 5,
                               marginBottom: 5,
                               marginLeft: 15,
                               resizeMode: 'contain',
                               flex: 1,
                               justifyContent: 'center',
                               alignItems: 'center',
                               width: '100%',
                               height: '100%',
                           }}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style = {styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"Email"}
                        placeholderTextColor = "#BCBCBC"
                        height = {45}
                        autoCorrect = {false}
                        onChangeText = {email => this.setState({ email })}
                        value = {this.state.email}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style = {styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"Password"}
                        placeholderTextColor = "#BCBCBC"
                        secureTextEntry = {true}
                        height = {45}
                        autoCorrect = {false}
                        onChangeText = {password => this.setState({ password })}
                        value = {this.state.password}
                    />
                </View>

                <View>{this.renderButton()}</View>

            <View style={{backgroundColor:'white'}}>
            <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
            <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
            <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
            <Text></Text><Text></Text><Text></Text><Text></Text><Text></Text><Text></Text>
            </View>

            </View>
        )
    }
}

export default LoginForm;

const styles = {
    inputView: {
        paddingTop: 20,
        paddingBottom: 20
    },
    textInputStyle: {
        borderColor: "#004577",
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "80%",
        alignSelf: "center"
    },
    buttonStyle: {
        backgroundColor: "#004577",
        borderColor: "#004577",
        borderRadius: 25,
        borderWidth: 2,
        fontSize: 20,
        width: "60%",
        alignSelf: "center",
        marginTop: 20
    }

}