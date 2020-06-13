// Registration Screen
import React, { Component } from 'react';
import { Button,Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../database/firebaseDb';
import {Item, Picker} from "native-base";
import cities from './cities/cities'
// import SearchableDropdown from 'react-native-searchable-dropdown';
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
      destinationArr: [],
      cityArea: [],
    };

  }

  componentDidMount() {
    this.unsubscribe = this.dbListRef.onSnapshot(this.getDelegationList);
    //this.unsubscribe = this.dbRef.onSnapshot(this.emailValidation);

  }


  componentWillUnmount() {
    this.unsubscribe();
  }


  emailValidation = (querySnapshot) => {
    //const destinationArr = [];
    this.dbRef.onSnapshot
        .where('Email', '==', this.state.Email)
        .get() // .where('Gender', '==', 'male')
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().Email == this.state.Email)
              alert('המייל שרשמת כבר  קיים במערכת עבור המשלחת')

            console.log('num of people  ', querySnapshot.size)

            //console.log('none from: ', doc.data().Location)
            //console.log('test for array:: ', this.state.cityName)


          });


        })


  }



    // querySnapshot.forEach((res) => {
    //   const {Email, Destination } = res.data();
    //   destinationArr.push({
    //     key: res.id,
    //     res,
    //     name,
    //     //expiration,
    //   });
    // });
    // this.setState({
    //   destinationArr,
    //   isLoading: false,
    // });
 // }

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

  storeDelegation() {


    if(this.state.Name === '' || this.state.Email == '' || this.state.Gender == '' || this.state.Age == '' || this.state.Location == '' || this.state.Mobile == '') {
      alert('אנא מלא את כל הפרטים')


    }

    //else if (this.dbRef.onSnapshot(this.emailValidation)){console.log('before email valid')}
   // this.emailValidation()
    else {
      console.log('after email valid')
      this.setState({
        isLoading: true,
      });
      this.dbRef.add({
        Name: this.state.Name ,
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

  selectedValue(index, item) {
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



            <View style={Styles.container}>
              <Text>
                {"בחר אזור מגורים"}
              </Text>
              <RNPicker
                  dataSource={cities}
                  dummyDataSource={this.state.dataSource}
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
                  selectedValue={(index, item) => this.selectedValue(index, item)}
              />
            </View>


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