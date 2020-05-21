import React, {Component} from 'react';
import {Text , View} from 'react-native';
import {Header} from '../screens/common';
import firebase from 'firebase';
import {Button, Card, CardSection,Input,Spinner} from './common';

class LoginForm extends Component {
  state = {email:'',password:'',error:'',loading:false};
  
  onButtonPress(){
    const {email,password} = this.state;

    this.setState({ error: '' });

    firebase.auth().signInWithEmailAndPassword(email,password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {

        firebase.auth().createUserWithEmailAndPassword(email,password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail(){
    this.setState({error:'Autentication Failed',loading:false});
  }

  onLoginSuccess(){
    this.setState({
      email:'',
      password:'',
      loading:false,
      error:''
    })
  }

  renderButton(){
    if(this.state.loading){
      return (<Spinner size="small"/>);
    }
    return (<Button onPress={this.onButtonPress.bind(this)}>log in</Button>);


  }

  render() {
    return (
        <View>
          <Header headerText="מערכת התחברות" />
        <Card>
          <CardSection>
            <Input
              secureTextEntry = {false}
              placeHolder="user@gmail.com"
              lable="אימייל" 
              value={this.state.email}
              onChangeText={email=>this.setState({email})}
              />
          </CardSection>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>

          <CardSection>
           <Input
              secureTextEntry = {true}
              placeHolder="password"
              lable="סיסמא" 
              value={this.state.password}
              onChangeText={password=>this.setState({password})}
              />
            </CardSection>

          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
        </View>
    );
  }
}

const styles={
  errorTextStyle:{
    fontSize:20,
    alignSelf:'center',
    color:'red'
  }
};

export {LoginForm};
