// import React, { Component } from 'react';
// import { Button,Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
// import firebase from '../database/firebaseDb';

// class AdminPage extends Component{
//     render(){
        
//         const { navigation } = this.props;  
//         const userKey = navigation.getParam('userName', 'NO-User');
//         return(
//             <View>
//                 <Text style={styles.textStyle}>User Name: {JSON.stringify(userKey)}</Text>
//             </View>
//         );


//     }
// }

// export default AdminPage;

import React from 'react';  
import { StyleSheet, View, Text, Button } from 'react-native';  
  
export default class AdminPage extends React.Component {   
    render() {  
        {/*Using the navigation prop we can get the 
              value passed from the previous screen*/}  
        const { navigation } = this.props;  
        const user_name = navigation.getParam('userKey', 'NO-User');  
        return (  
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>  
                <Text style={{ marginTop: 16,fontSize: 20,}}>  
                    This is Profile Screen and we receive value from Home Screen  
                </Text>  
                <Text style={styles.textStyle}>User Name: {JSON.stringify(user_name)}</Text>  
                <View style={styles.buttonStyle}>   
                </View>  
            </View>  
        );  
    }  
}  
const styles = StyleSheet.create({  
    textStyle: {  
        fontSize: 23,  
        textAlign: 'center',  
        color: '#f00',  
    },  
  
    buttonStyle:{  
        width: "93%",  
        marginTop: 50,  
        backgroundColor: "red",  
    }  
});