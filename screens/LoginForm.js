import React, { Component } from 'react';
import {TextInput, Button, Alert, Text, Image,ImageBackground} from 'react-native';
import {Icon, View} from 'native-base';
import { DotIndicator } from 'react-native-indicators';
import firebase from '../database/firebaseDb';


class LoginForm extends Component {
    static counter;
    constructor() {
        super();
        this.usersRef = firebase.firestore().collection('users')
        this.state = {
            email: "",
            password: "",
            delegation: '',
            loading: false,
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

        const { email, password } = this.state
        this.setState({ loading: true })
        let isExisted = false;
        this.usersRef
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(res => {
                    console.log('RES EMAIL: ',res.data().email , 'email: ', email)
                    if (res.data().email === email) {
                        isExisted=true;
                        firebase
                            .auth()
                            .signInWithEmailAndPassword(email, password)
                            .then(
                                this.onLoginSuccess.bind(this)
                            )
                            .catch(
                                this.onLoginFail.bind(this)
                            )
                        this.setState({email: "",password:""})
                    }
                })

                if (isExisted===false){
                    alert('המשתמש לא קיים במערכת')
                    this.setState({email: "",password:"", loading: false})
                }
            })
    }



    renderButton() {
        if (this.state.loading) {
            return <DotIndicator color = "#004577"/>
        }

        return (
            <View style = {styles.buttonStyle}>
                <Button
                    title = "כניסה למערכת"
                    color = "004577"
                    backgroundColor = 'white'
                    onPress= {() => this.onButtonPress()}
                >
                </Button>
            </View>
        )
    }
    renderButtonP() {
        if (this.state.loading) {
            return <DotIndicator color = "#004577"/>
        }

        return (
            <View style = {styles.buttonStyle}>
                <Button
                    title = "שכחתי סיסמא"
                    color = "004577"
                    backgroundColor = 'white'
                    onPress= {() => firebase.auth().sendPasswordResetEmail(this.state.email)
                        .then (()=>{alert('איפוס סיסמא בוצע בהצלחה'); this.setState({email: "",password:""})})
                        .catch(()=> alert('אנא הכנס כתובת מייל לאיפוס סיסמא'))
                    }
                >
                </Button>
            </View>
        )
    }

    render() {
        return(
            <ImageBackground source={require('./pics/loginBackGround.jpg')} style={styles.container}>
                <View style= {{width:'100%',paddingTop:'70%'}}>

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
                    <View>{this.renderButtonP()}</View>
                </View>
            </ImageBackground>
        )
    }
}

export default LoginForm;

const styles = {
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        alignSelf: "center",
        width: "60%",
    },

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
