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
    // this.setState(
    //     userDest
    // )

    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }




  getCollection = (querySnapshot) => {

    const userArr = [];

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


  getColor = (item) => {
    switch (item.Status) {
      case 'לא ענה (1)':
        return "yellow"
      case 'לא ענה (2)':
        return "yellow"
      case 'לא ענה (3)':
        return "yellow"
      case 'לא רלוונטי':
        return "red"
      case 'ענה ומגיע':
        return "green"
    }
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
                          //chevron
                          chevron={{ color: 'black'}}
                          friction={90}
                          activeScale={0.95}
                          pad={1}
                          bottomDivider
                          containerStyle={{backgroundColor: this.getColor(item)}}
                          title={<Text style={{fontSize: 20, textAlign: 'center'}}> שם המועמד:  {item.Name}</Text>}
                          subtitle={<Text style={{fontSize: 20, textAlign: 'center'}}> סטטוס:  {item.Status}</Text>}
                          //style = {{ backgroundColor: 'red'}}
                          onPress={() => this.props.navigation.navigate('Information',{userKey: item.key}) }
                      />

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