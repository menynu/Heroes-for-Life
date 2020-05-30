// Registration Screen
import React, { Component } from 'react';
import { Button,Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';
import {Item, Picker} from "native-base";


class RegistrationForm extends Component {
    constructor(props) {
    super(props);
    this.dbRef = firebase.firestore().collection('delegation');
    this.dbListRef = firebase.firestore().collection('delegationList');
    this.state = {
      Name: '',
      Destination: '',
      Email: '',
      Gender: '',
      Age: '',
      Location: '',
      Mobile: '',
      meetDate: '',
      meetTime: '',
      Status: '',
      CameFrom:'',
      isLoading: false,
      selectedDest: 'בחר משלחת',
      destinationArr: [],
    };
  }
  componentDidMount() {
    this.unsubscribe = this.dbListRef.onSnapshot(this.getDelegationList);

  }


  componentWillUnmount(){
    this.unsubscribe();
  }


  getDelegationList = (querySnapshot) =>{
    const destinationArr = [];
    querySnapshot.forEach((res) => {
      const {name, expiration } = res.data();
      destinationArr.push({
        key: res.id,
        res,
        name,
        expiration,
      });
    });
    this.setState({
      destinationArr,
      isLoading: false,
    });
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
        //בעיה במגדר לתקן פונקציונאליות
        Age: this.state.Age,
        Location: this.state.Location,
        Mobile: this.state.Mobile,
        about_me: this.state.about_me,
        lang_support: this.state.lang_support,
        meetDate: '',
        meetTime: '',
        Status: '',
        CameFrom:this.state.CameFrom,
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
          meetDate: '',
          meetTime: '',
          Status: '',
          CameFrom:'',
          isLoading: false,
        });
        alert("הרשמתך נקלטה בהצלחה");
        this.props.navigation.navigate('HomeScreen')
      })
          .catch((err) => {
            console.error("Error found: ", err);
            this.setState({
              isLoading: false,
            });
          });
    }
  }


  onValueChangeG(value: string) {
    this.setState({
      Gender: value
    });
  }
  onValueChangeC(value: string) {
    this.setState({
      CameFrom: value
    });
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
          <View>
            <View style={styles.inputGroup}>
              <Text>יעד המשלחת</Text>
              <Item picker>
                <Picker
                    mode="dropdown"
                    style={{ width: 20 }}
                    placeholder="choose destination"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.Destination}
                    onValueChange={ (value) => ( this.setState({Destination: value}) ) } >
                <Picker.Item label="בחר" value="" />
                {
                  this.state.destinationArr.map( (city, i) => {

                    return <Picker.Item label={city.name} value={city.name} key={i} />
                  })
                }
              </Picker>
              </Item>
            </View>
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

          <View style={styles.inputGroup}>
            <Text>מגדר</Text>
            <Item picker>
              <Picker
                  mode="dropdown"
                  style={{ width: 20 }}
                  placeholder="בחר מגדר"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.Gender}
                  onValueChange={this.onValueChangeG.bind(this)}
              >
                <Picker.Item label="בחר" value="" />
                <Picker.Item label="זכר" value="זכר" />
                <Picker.Item label="נקבה" value="נקבה" />
                <Picker.Item label="אחר" value="אחר" />
              </Picker>
            </Item>
          </View>


          <View style={styles.inputGroup}>
            <Text>גיל</Text>
            <TextInput
                placeholder={''}
                value={this.state.Age}
                onChangeText={(val) => this.inputValueUpdate(val, 'Age')}
            />
          </View>
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
                value={this.state.Mobile}
                onChangeText={(val) => this.inputValueUpdate(val, 'Mobile')}
            />
          </View>
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
          <View style={styles.inputGroup}>
            <Text>איך שמעת על העמותה</Text>
            <Item picker>
              <Picker
                  mode="dropdown"
                  style={{ width: 20 }}
                  placeholder="איך שמעת על העמותה"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.CameFrom}
                  onValueChange={this.onValueChangeC.bind(this)}
              >
                <Picker.Item label="בחר" value="" />
                <Picker.Item label="שמעתי מחבר" value="שמעתי מחבר" />
                <Picker.Item label="פייסבוק" value="פייסבוק" />
                <Picker.Item label=" כתבה בחדשות" value="כתבה בחדשות" />
                <Picker.Item label="שלט חוצות" value="שלט חוצות" />
                <Picker.Item label="הרצאה בקורס משתחררים" value="הרצאה בקורס משתחררים" />
                <Picker.Item label="אחר" value="אחר" />
              </Picker>
            </Item>
          </View>
          <View style={styles.button} >
            <Button
                title='להגשת מועמדות'
                onPress={() => this.storeDelegation()}
                color="#19AC52"
            />
            <Text style={{marginBottom: 50}} />
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
  }
})

export default RegistrationForm;