import React, { Component } from 'react';
import { TextInput, Button, Alert } from 'react-native';
import { Header } from 'react-native-elements';
import { View } from 'native-base';
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
            loading: false
        }
    }

    onLoginSuccess() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user != null) {

                this.props.navigation.navigate('Volunteer');
            }
        })
        // when secsuss check if manager or voulnteer
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
            <View style= {{}}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'מערכת מורשים', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
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