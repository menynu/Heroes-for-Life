// screens/UserScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView,Button, ActivityIndicator, View, Text, SafeAreaView } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';
import AdminPage from './AdminPage';



class Volunteer extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('delegation');
    this.state = {
      isLoading: true,
      userArr: [],
    };
  }
  // constructor(props) {
  //   super(props);
    //this.state = {{} }
 // }

  showDetail(){
    return(
      <View> <Text>trytyssss </Text> </View>


    )
    
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
      const { Name, Email, Mobile, Gender, Location, about_me, lang_support } = res.data();
      userArr.push({
        key: res.id,
        res,
        Name,
        Email,
        Mobile,
        //Gender,
        // Location,
        // about_me,
        // lang_support,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
      render(){
      //  <Text> abc</Text>
      //<Text > dasdasd </Text>
      }
   });
  }
  //  changeView(){
  //    this.setState({
  //      viewOne: !this.state.viewOne
  //    })

    render() {
      if(this.state.isLoading){
        return(
          <View style={styles.preloader}>
            <ActivityIndicator size="large" color="#9E9E9E"/>
            <Text> Loading</Text>
          </View>
        )
    }    
    return (
  
  <SafeAreaView style={styles.container}>

      <ScrollView 
      style= {styles.container}>
     
          <Text> asdsa
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
                  

                  onPress={() => this.props.navigation.navigate('AdminPage',{userKey: item.key}) }
                  // onPress={() => { 
                  //   console.log(item.key),
                  //   this.props.navigation.navigate('AdminPage',
                  //   {userkey: item.key}
                  //   );}}
                  />
                  <View>
                  <Text>number = {i} + 1= {i+i}</Text> 
                  <Text> test . . . . . </Text>
                  <Button onPress={() => this.props.navigation.navigate('UserDetailScreen')} title="כניסה למורשים"/>
                  </View>
                  </View>
                    //                 onPress={() => {
                    // this.props.navigation.navigate('UserDetailScreen', 
                    // {userkey: item.key});
            
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

// // screens/UserScreen.js

// import React, { Component } from 'react';
// import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
// import { ListItem } from 'react-native-elements'
// import firebase from '../database/firebaseDb';

// class Volunteer extends Component {

//   constructor() {
//     super();
//     this.firestoreRef = firebase.firestore().collection('delegation');
//     this.state = {
//       isLoading: true,
//       userArr: []
//     };
//   }

//   componentDidMount() {
//     this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
//   }

//   componentWillUnmount(){
//     this.unsubscribe();
//   }

//   getCollection = (querySnapshot) => {
//     const userArr = [];
//     querySnapshot.forEach((res) => {
//       const { Name, Email, Mobile } = res.data();
//       userArr.push({
//         key: res.id,
//         res,
//         Name,
//         Email,
//         Mobile,
//       });
//     });
//     this.setState({
//       userArr,
//       isLoading: false,
//    });
//   }

//   render() {
//     if(this.state.isLoading){
//       return(
//         <View style={styles.preloader}>
//           <ActivityIndicator size="large" color="#9E9E9E"/>
//         </View>
//       )
//     }    
//     return (
//       <ScrollView style={styles.container}>
//           {
//             this.state.userArr.map((item, i) => {
//               return (
//                 <ListItem
//                   key={i}
//                   chevron
//                   bottomDivider
//                   title={item.Name}
//                   subtitle={item.Email}
//                   onPress={() => {
//                     this.props.navigation.navigate('UserDetailScreen', {
//                       userkey: item.key
//                     });
//                   }}/>
//               );
//             })
//           }
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//    flex: 1,
//    paddingBottom: 22
//   },
//   preloader: {
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })

// export default Volunteer;