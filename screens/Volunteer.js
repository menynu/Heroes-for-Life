import React, { Component } from 'react';
import { StyleSheet, ScrollView,Button, ActivityIndicator, View, Text, SafeAreaView, I18nManager } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from '../database/firebaseDb';
import Information from './Information';
import {Card} from './common'




class Volunteer extends Component {

  constructor(props) {
    super(props);
    this.firestoreRef = firebase.firestore().collection('delegation');
    this.state = {
      volunteerDest: '',
      userDest: '',
      isLoading: true,
      userArr: [],

    };

  }




  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user != null) {
        this.usersRef
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                if(user.email===documentSnapshot.data().email){
                  //alert(documentSnapshot.data().delegation)
                  this.state.userDest = documentSnapshot.data().delegation;
                }
              });
            });
      }
    })
    //console.log('test#123##: ' ,firebase.firestore().collection('delegation').doc(this.props.navigation.state.params.userDelegation))
    //firebase.firestore().collection('delegation').doc(this.props.navigation.state.params.userDelegation)
    //console.log('test the param: ' , this.props.navigation.state.params.userDelegation)
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }




  getCollection = (querySnapshot) => {
    //this.getUserDelegation();



    const userArr = [];
    // let userDel = '';
    // if (this.props.navigation.state.params){
    //   userDel=this.props.navigation.state.params.userDelegation;
    //   console.log('i reached here with', userDel)
    // }
    //console.log('testing: ', this.props.navigation.state.getParam(userDelegation))
    // const id = this.props.navigation.getParam('userDelegation');
    // console.log('testing user delegation:!! #', id);
    querySnapshot.forEach((res) => {
      //if (res.data().Destination == this.props.navigation.state.params.userDelegation)
      const { Name, Email, Mobile, Gender, Location, about_me, lang_support, meetDate, meetTime, Status } = res.data();
      console.log('user curr dest: ', this.state.userDest)
      if (res.data().Destination === this.state.userDest || this.state.userDest== '' )
        userArr.push({
        key: res.id,
        res,
        Name,
        Email,
        Mobile,
        Gender,
        Location,
        about_me,
        lang_support,
        meetDate,
        meetTime,
        Status,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
      render(){

      }
    });
  }


  render() {
    I18nManager.forceRTL(true);
    if(this.state.isLoading){
      return(
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
            <Text> Loading</Text>
          </View>
      )
    }
    I18nManager.forceRTL(true);
    return (

        <SafeAreaView style={styles.container}>

          <ScrollView
              style= {styles.container}>

            <Text style={{fontSize: 20, textAlign: 'center'}}>פרטי המועמד למשלחת: brazil2020
            </Text>


            {
              this.state.userArr.map((item, i) => {
                return (

                    <View>
                      <Card>
                      <ListItem
                          key={i}
                          chevron
                          pad={22}
                          bottomDivider
                          title={<Text style={{fontSize: 20, textAlign: 'center'}}> שם המועמד:  {item.Name}</Text>}
                          subtitle={<Text style={{fontSize: 20, textAlign: 'center'}}> סטטוס:  {item.Status}</Text>}
                          onPress={() => this.props.navigation.navigate('Information',{userKey: item.key}) }
                      />

                      <View>

                        <Text> שם: {item.Name}  </Text>
                        <Text> טלפון: {item.Mobile} </Text>
                        <Text> אימייל: {item.Email}  </Text>
                        <Text> כתובת מגורים: {item.Location}  </Text>
                        <Text> על עצמי: {item.about_me}   </Text>
                        <Text> יעד משלחת: {item.Destination}  </Text>
                        <Text>  שפות: {item.lang_support}  </Text>
                        <Text> תאריך ראיון: {item.meetDate}  </Text>
                        <Text> שעת ראיון: {item.meetTime} </Text>
                        <Text> סטאטוס: {item.Status} </Text>

                      </View>
                    </Card>

                    </View>

                );
              })
            }

          </ScrollView>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
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

export default Volunteer;