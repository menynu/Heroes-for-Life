import React from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, Alert,ImageBackground} from 'react-native';
import { Button, Icon, Form, Text, Item, Input, Label, Picker} from 'native-base';
import firebase from "../database/firebaseDb";
import {Card} from "./common";

export default class MangeD extends React.Component {
    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('users');

        this.dbListRef = firebase.firestore().collection('delegationList')
        this.state = {
            email: '',
            password:'',
            permission: '',
            delegation: '',
            name: '',
            currUser: '',
            time: '',
            isActive: true,
            isLoading: false,
            userArr: [],
            userID: '',
            destinationArr: [],
            // currDocID: '',
        };

    }
    componentDidMount() {
        this.unsubscribe = this.dbListRef.onSnapshot(this.getDelegationList);
        this.unsubscribe = this.dbRef.onSnapshot(this.getUserList);
    }


    componentWillUnmount(){
        this.unsubscribe();
    }

    getDelegationList = (querySnapshot) =>{
        const destinationArr = [];
        querySnapshot.forEach((res) => {
            const {name} = res.data();
            if (res.data().isActive) // remove this to get all delegations in DB
                destinationArr.push({
                    key: res.id,
                    res,
                    name,
                });
        });
        this.setState({
            destinationArr,
            // isLoading: false,
        });
    }

    getUserList = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) =>{
            const {name, email, delegation} = res.data();
            if (res.data().permission == 'V')
                userArr.push({
                    key: res.id,
                    email,
                    name,
                    delegation,
                });
            this.setState({userArr})
        })
    }

    addDelegationName() {
        if(this.state.name === '' ){
            alert('יש למלא שם משלחת')
        } else {
            this.setState({
                isLoading: true,
            });
            this.dbListRef.add({
                name: this.state.name,
                isActive: this.state.isActive,
            }).then((res) => {
                this.setState({
                    name: '',
                    isActive: 'true',
                    isLoading: false

                })
                alert('הוספת בהצלחה משלחת חדשה');
                //  TODO* * POPUP CREATED USER COMPLETE this.props.navigation.navigate('UserScreen')
            })
                .catch((err) => {
                    console.error("Error found: ", err);
                    this.setState({
                        isLoading: false,
                    });
                });
        }
    }

    delegationNameUpdate = (val,prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }



    render() {
        return (
            <SafeAreaView style={{backgroundColor: 'white',width:'100%',height:'100%'}}>
                <ImageBackground source={require('./pics/background.jpeg')} style={styles.container}>

                    <ScrollView>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ marginTop: 16,fontSize: 25,}}>
                                ניהול משלחות
                            </Text>
                            <Text style={styles.line}>__________________________________________________________________________________</Text>

                        </View>
                        <Card>
                            <Form>
                                <Text style={{fontSize:24,textAlign:"center"  }}> הוספת משלחת חדשה</Text>

                                    <View style={styles.ViewStyle}>

                                        <Item floatingLabel>
                                            <Label>שם משלחת:</Label>
                                            <Input
                                                placeholder={'שם המשלחת'}
                                                value={this.state.name}
                                                onChangeText={(val) => this.delegationNameUpdate(val, 'name')}

                                            />
                                        </Item>
                                    </View>
                                    <Text/>
                                <Button iconLeft
                                        onPress={() => this.addDelegationName()}

                                >
                                    <Icon name='paper' />
                                    <Text >הוספת משלחת למערכת</Text>
                                </Button>
                            </Form>
                        </Card>

                        <Card>
                            <Form>
                                <Text style={{fontSize:24,textAlign:"center"  }}> עדכון משלחת קיימת</Text>
                                <View style={styles.ViewStyle}>

                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        style={{ width: 20 }}
                                        placeholder="choose destination"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.delegation}
                                        onValueChange={ (value) => ( this.setState({delegation: value}) ) } >
                                        <Picker.Item label="בחר משלחת" value="" />
                                        {
                                            this.state.destinationArr.map( (city, i) => {

                                                return <Picker.Item label={city.name} value={city.name} key={i} />
                                            })
                                        }
                                    </Picker>

                                </Item>
                                </View>
                                <Text/>

                                <Button iconLeft
                                        onPress={() =>{
                                            this.dbListRef.where('name', '==', this.state.delegation)
                                                .get()
                                                .then(querySnapshot => {

                                                    if (this.state.delegation == '')
                                                        alert('יש לבחור קודם משלחת')
                                                    else{
                                                        querySnapshot.forEach(documentSnapshot => {
                                                            console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                                                            this.state.currDocID = documentSnapshot.id;
                                                            console.log('after close ID: ', documentSnapshot.id, documentSnapshot.data());
                                                        })
                                                        this.dbListRef.doc(this.state.currDocID).update({isActive: false})
                                                        console.log('updated!', this.state.currDocID);
                                                    }


                                                })

                                        }
                                        }



                                >
                                    <Icon name='paper' />
                                    <Text>סגור משלחת</Text>
                                </Button>
                            </Form>

                        </Card>



                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    },
    textStyle: {
        fontSize: 23,
        textAlign: 'center',
        color: '#f00',
    },

    buttonStyle:{
        width: "93%",
        marginTop: 50,
        backgroundColor: "red",
    },
    ViewStyle:{
    borderColor: 'white',
        borderWidth:3 ,
        borderRadius:10,
},
    line: {
        color: "#e0ebeb",
        fontSize: 10,
        textAlign: 'center',
    },
});
