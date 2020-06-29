// Registration Screen
import React, { Component } from 'react';
import { Button,Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, View,ImageBackground } from 'react-native';
import firebase from '../database/firebaseDb';
import {Item, Picker} from "native-base";
import cities from './cities/cities'
import RNPicker from "rn-modal-picker";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.dbRef = firebase.firestore().collection('delegation');
    this.dbListRef = firebase.firestore().collection("delegationList").orderBy("name", "desc");
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
      about_me: '',
      lang_support: '',
      Status: '',
      CameFrom: '',
      placeHolderText: 'בחר ישוב מגורים',
      selectedText: '',
      isLoading: false,
      selectedDest: 'בחר משלחת',
      mailExisted: false,
      destinationArr: [],
      cityArea: [],
      isEmailCorrect: false,
    };

  }

  componentDidMount() {
    this.unsubscribe = this.dbListRef.onSnapshot(this.getDelegationList);
  }


  componentWillUnmount() {
    this.unsubscribe();
  }



  getDelegationList = (querySnapshot) =>{
    const destinationArr = [];
    querySnapshot.forEach((res) => {
      const {name } = res.data();
      if (res.data().isActive)
        destinationArr.push({
          key: res.id,
          res,
          name,

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


  inputEmailUpdate = (val, prop) => {

    const state = this.state;
    state[prop] = val;
    this.setState(state);
    this.checkEmail()
  }



  checkEmail(){
    if (this.state.Destination == "")
    {
      this.state.Email = ''
      alert('נא לבחור קודם משלחת')
    }

    let alreadyExisted = false
    let counter = 0
    this.state.mailExisted = false
    this.dbRef//.where('Email', '==', this.state.Email)
        .where('Destination', '==', this.state.Destination)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(res => {
            if (res.data().Destination == this.state.Destination && res.data().Email == this.state.Email) {
              // alert('קיים כבר רישום למשלחת זו עבור המייל שהזנת')
              console.log('data:' , res.data())

              console.log('res email and destiantion ', this.state.Destination , this.state.Email)
              alreadyExisted = true
              //alert('קיים כבר רישום למשלחת זו עבור המייל שהזנת')
              //this.setState({Destination: '', Email: ''})



              console.log('EXISTED MAIL!')
              console.log('query size',querySnapshot.size)
              this.state.mailExisted = true
              alert('קיים כבר רישום למשלחת זו עבור המייל שהזנת')
              this.setState({Destination: '', Email: '', mailExisted: true })
              console.log('state inside check mail:', this.state.mailExisted)
            }

          })


        });



    alreadyExisted = false

  }


  storeDelegation() {
    if(this.state.Name == '')
    {
      alert('יש למלא שם פרטי')
      this.setState({Mobile: ""})

    }
    else if (this.state.isEmailCorrect ==false)
    {
      alert('אנא הכנס אימייל תקני')
    }
    else if (this.state.Gender == '')
    {
      alert('יש לבחור מגדר')
    }
    else if (this.state.Age <18 || this.state.Age >50)
    {
      alert('אנא הכנס גיל תקין')
      this.setState({Age: ""})

    }
    else if (this.state.Location == '')
    {
      alert('יש לבחור עיר מגורים')
    }
    else if(this.state.Mobile.length!=10)
    {
      alert('יש למלא פלאפון תקין')
      this.setState({Mobile: ""})

    }
    else if (this.state.CameFrom == '')
    {
      alert('יש לבחור מאיפה שמעת על העמותה')
    }
    else {
      this.setState({
        isLoading: true,
      });
      this.dbRef.add({
        Name: this.state.Name,
        Destination: this.state.Destination,
        Email: this.state.Email,
        Gender: this.state.Gender,
        Age: this.state.Age,
        Location: this.state.Location,
        Mobile: this.state.Mobile,
        about_me: this.state.about_me,
        lang_support: this.state.lang_support,
        meetDate: '',
        meetTime: '',
        Status: '',
        Remarks: '', // will be used for update info status by volunteer
        CameFrom: this.state.CameFrom,
        regTime: new Date(),
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
          CameFrom: '',
          isLoading: false,
          mailExisted: false,
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

  _selectedValue(index, item) {
    this.setState({selectedText: item.name, Location: item.name});
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

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setState({ Email: text })
      return false;
    }
    else {
      this.state.isEmailCorrect = true;
      this.setState({ Email: text, isEmailCorrect: true})

      console.log("Email is Correct");
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
        <ImageBackground source={require('./pics/background.jpeg')} style={styles.container}>
          <ScrollView style={styles.containerr}>
            <View style={styles.inputGroup}>
              <Text>שם מלא</Text>
              <TextInput
                  placeholder={'שם מלא'}
                  value={this.state.Name}
                  maxLength={16}
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
                      onValueChange={ (value) => (this.setState({Destination: value}) ) } >
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
                  keyboardType={'email-address' }
                  value={this.state.Email}
                  onChangeText={(val) => {this.validate(val); this.inputEmailUpdate(val, 'Email')}  }
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
                  keyboardType={'numeric' }
                  value={this.state.Age}
                  onChangeText={(val) => this.inputValueUpdate(val, 'Age')}
                  maxLength={2}
              />
            </View>
            <View style={styles.inputGroup}>



              <View style={Styles.container}>
                <Text>
                  {"בחר אזור מגורים"}
                </Text>
                <RNPicker
                    dataSource={cities}
                    dummyDataSource={cities}
                    defaultValue={false}
                    pickerTitle={"יישובים בארץ"}
                    showSearchBar={true}
                    disablePicker={false}
                    changeAnimation={"none"}
                    searchBarPlaceHolder={"חפש מהרשימה"}
                    showPickerTitle={true}
                    searchBarContainerStyle={this.props.searchBarContainerStyle}
                    pickerStyle={Styles.pickerStyle}
                    pickerItemTextStyle={Styles.listTextViewStyle}
                    selectedLabel={this.state.selectedText}
                    placeHolderLabel={this.state.placeHolderText}
                    selectLabelTextStyle={Styles.selectLabelTextStyle}
                    placeHolderTextStyle={Styles.placeHolderTextStyle}
                    dropDownImageStyle={Styles.dropDownImageStyle}
                    selectedValue={(index, item) => this._selectedValue(index, item)}
                />
              </View>


            </View>
            <View style={styles.inputGroup}>
              <Text>מס' פלאפון</Text>
              <TextInput
                  placeholder={'פלאפון'}
                  keyboardType={'numeric' }
                  maxLength={10}
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
                  onPress={() => {this.storeDelegation()}}
                  color="#19AC52"
              />
              <Text style={{marginBottom: 50}} />
            </View>

          </ScrollView>
        </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  containerr: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
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
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10
  },

  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row"
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row"
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center"
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left"
  },
  pickerStyle: {
    marginLeft: 18,
    elevation:3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1
    },
    borderWidth:1,
    shadowRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row"
  }
});