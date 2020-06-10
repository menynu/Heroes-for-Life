import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  FlatList
} from 'react-native';
import {SearchBar } from 'react-native-elements';
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
      search: '',
      text: '',
      dataSource: [],

    };
    this.arrayholder = [];

  }



  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user != null) {
        this.usersRef
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                if(user.email===documentSnapshot.data().email){
                  this.state.userDest = documentSnapshot.data().delegation;
                }
              });
            });
      }
    })


    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    this.state.dataSource = this.state.userArr
    console.log('comp mount: user array: ', this.state.userArr)
    this.arrayholder = this.state.userArr;
    this.setState(
        {
          isLoading: false,
          //dataSource: this.state.userArr,
        },
        function() {
          this.arrayholder = this.state.userArr;
        }
    );

  }

  componentWillUnmount(){
    this.unsubscribe();
  }


  getCollection = (querySnapshot) => {

    const userArr = [];
    const dataSource =[]
    querySnapshot.forEach((res) => {
      //if (res.data().Destination == this.props.navigation.state.params.userDelegation)
      const { Name, Email, Mobile, Gender, Location, about_me, lang_support, meetDate, meetTime, Status } = res.data();

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
    this.dataSource = this.state.userArr
    this.setState({
      dataSource: userArr,
      userArr,
      isLoading: false,

    });
    this.arrayholder = this.state.userArr;

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

  SearchFilterFunction(text) {

    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      dataSource: newData,
      search:text,
    });
  }

  ListViewItemSeparator = () => {
    return (
        <View
            style={{
              height: 0.3,
              width: '90%',
              backgroundColor: '#080808',
            }}
        />
    );
  };
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <ActivityIndicator />
          </View>
      );
    }
    return (
        <View style={styles.viewStyle}>
          <SearchBar
              round
              searchIcon={{ size: 24 }}
              onChangeText={text => this.SearchFilterFunction(text)}
              placeholder="הקלד לחיפוש מועמד ספציפי"
              value={this.state.search}
          />
          <FlatList
              data={this.state.dataSource}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              renderItem={({ item }) => (
                  <Card >
                    <View>
                    <Text style={{backgroundColor: this.getColor(item)}}> שם:{item.Name} אימייל: {item.Email}  </Text>
                      <Text style={{
                              color: 'blue',
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                            onPress={() => this.props.navigation.navigate('Information',{userKey: item.key}) }>
                        לחץ כאן
                      </Text>
                    </View>
                  </Card>
              )}
              enableEmptySections={true}
              style={{ marginTop: 10 }}
              keyExtractor={(item, index) => index.toString()}
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor:'white',
    // marginTop: Platform.OS == 'ios'? 30 : 0
  },
  textStyle: {
    padding: 10,
  },
});

export default Volunteer;