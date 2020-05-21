// Registration Screen
import React, { Component } from 'react';
import { Button,Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';
import RadioButton from '../components/RadioButton';


const PROP = [
	{
		key: 'Male',
		text: 'זכר',
	},
	{
		key: 'Female',
		text: 'נקבה',
	},
	// {
	// 	key: 'motorola',
	// 	text: 'Motorola',
	// },
	// {
	// 	key: 'lenovo',
	// 	text: 'Lenovo',
  // },
];



class RegistrationForm extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('delegation');
    this.state = {
      Name: '',
      Destination: '',
      Email: '',
      Gender: '',
      Age: '',
      Location: '',
      Mobile: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeDelegation() {
    if(this.state.Name === ''){
     alert('אנא הכנס שם תקין')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        Name: this.state.Name,
        Destination: this.state.Destination,
        Email: this.state.Email,
        Gender: this.state.Gender,
        //console.log("hey there");
        Age: this.state.Age,
        Location: this.state.Location,
        Mobile: this.state.Mobile,
        about_me: this.state.about_me,
        lang_support: this.state.lang_support,
        //value: res.key
      }).then((res) => {
        this.setState({
          Name: '',
          Destination: '',
          Email: '',
          Gender: '',
          Age: '',
          Location: '',
          Mobile: '',
          about_me: '',
          lang_support: '',
          isLoading: false,
        });
        this.props.navigation.navigate('UserScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
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
          <Text>שם מלא</Text>
          <TextInput
              placeholder={'שם מלא'}
              value={this.state.Name}
              onChangeText={(val) => this.inputValueUpdate(val, 'Name')}
          />     
        </View>
        <View style={styles.inputGroup}>
          <Text> יעד המשלחת</Text>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'יעד'}
              value={this.state.Destination}
              onChangeText={(val) => this.inputValueUpdate(val, 'Destination')}
          />
        </View>
        {/* TODO: validation exist mail */}
        <View style={styles.inputGroup}>
          <Text>אימייל</Text>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'אימייל'}
              value={this.state.Email}
              onChangeText={(val) => this.inputValueUpdate(val, 'Email')}
          />
        </View>
        {/* TODO: check box male/female */}
        <View style={styles.inputGroup}>
          <Text>מגדר</Text>
          <RadioButton PROP={PROP} />
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={''}
              value={this.state.Gender}
              onChangeText={(val) => this.inputValueUpdate(val, 'Gender')}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>גיל</Text>
          <TextInput
              placeholder={''}
              value={this.state.mobile}
              onChangeText={(val) => this.inputValueUpdate(val, 'Age')}
          />
        </View>
        {/* TODO: scroll cities */}
        <View style={styles.inputGroup}>
          <Text>בחר אזור מגורים</Text>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'אזור מגורים'}
              value={this.state.Location}
              onChangeText={(val) => this.inputValueUpdate(val, 'Location')}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>מס' פלאפון</Text>
          <TextInput
              placeholder={'פלאפון'}
              value={this.state.mobile}
              onChangeText={(val) => this.inputValueUpdate(val, 'Mobile')}
          />
        </View>
        {/* TODO: text view input to some label */}
        <View style={styles.inputGroup}>
          <Text>ספר על עצמך</Text>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'...'}
              value={this.state.about_me}
              onChangeText={(val) => this.inputValueUpdate(val, 'about_me')}
          />
        </View>
        {/* TODO: check list */}
        <View style={styles.inputGroup}>
          <Text>שפות ומידת שליטה</Text>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'...'}
              value={this.state.lang_support}
              onChangeText={(val) => this.inputValueUpdate(val, 'lang_support')}
          />
        </View>
        <View style={styles.button} >
          <Button
            title='להגשת מועמדות'
            onPress={() => this.storeDelegation()} 
            color="#19AC52"
          />
          <Text style={marginBottom=150} />
        </View>
         <View style={marginBottom=15} />
          <View style={marginBottom=15} />
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
  }
})

export default RegistrationForm;