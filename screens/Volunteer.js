import React, { Component } from 'react';
import { StyleSheet, ScrollView,Button, ActivityIndicator, View, Text, SafeAreaView, I18nManager } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from '../database/firebaseDb';
import Information from './Information';



class Volunteer extends Component {

  constructor(props) {
    super(props);
    this.firestoreRef = firebase.firestore().collection('delegation');
    this.state = {
      isLoading: true,
      userArr: [],
    };
  }


  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { Name, Email, Mobile, Gender, Location, about_me, lang_support, meetDate, meetTime, Status } = res.data();
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

            <Text style={{fontSize: 20, textAlign: 'center'}}> דף המלגאים
            </Text>

            {
              this.state.userArr.map((item, i) => {
                return (

                    <View>
                      <ListItem
                          key={i}
                          chevron
                          pad={22}
                          bottomDivider
                          title={item.Name}
                          subtitle={item.Email}
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