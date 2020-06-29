import React from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, Alert,ImageBackground} from 'react-native';
import { Button, Icon, Form, Text, Item, Input, Label, Picker} from 'native-base';
import firebase from "../database/firebaseDb";
import {Card} from "./common";
import {CardI} from "./common/CardI";


export default class MangeU extends React.Component {
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
            isEmailCorrect: false,
            currDocID: '',
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
    onValueChangeC(value) {
        this.setState({
            permission: value
        });
    }
    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }
    addVolunteer() {
        let isExisted = false;
        if(this.state.email === '' )
            alert('יש למלא אימייל')
        else if(this.state.isEmailCorrect === false)
            alert('יש להזין אימייל תקין')
        else if(this.state.password === '' || this.state.password.length < 6 )
            alert('יש להזין סיסמה תקינה')
        else if(this.state.delegation === '' )
            alert('יש לבחור משלחת')
        else if(this.state.permission === '' )
            alert('יש לבחור הרשאה')

        else {
            this.setState({
                isLoading: true,
            });

            const {email,password} = this.state;
            this.setState({loading:true})

            this.dbRef
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(res => {
                        console.log('RES EMAIL: ',res.data().email , 'email: ', email)
                        if (res.data().email === email)
                        {
                            isExisted=true;
                            alert('קיים משתמש עם האימייל הזה במערכת')
                            this.setState({email: '', password: ''})
                            // .then(this.props.navigation.navigate('AdminPage')) //  .then fixed the issue!!!

                        }

                    })
                    if (isExisted===false) {
                        firebase.auth().createUserWithEmailAndPassword(email,password)
                            .then(
                                this.dbRef.add({
                                    email: this.state.email,
                                    delegation: this.state.delegation,
                                    permission: this.state.permission,
                                }),
                            )
                            .then( alert('הוספת משתמש בוצעה בהצלחה!'))
                            .then (this.setState({
                                email: '',
                                password:'',
                                delegation: '',
                                permission: '',
                                isLoading: false,
                            }))
                            .catch(() => {
                                this.dbRef.add({
                                    email: this.state.email,
                                    delegation: this.state.delegation,
                                    permission: this.state.permission,
                                }),
                                    this.setState({
                                            email: '',
                                            password:'',
                                            delegation: '',
                                            permission: '',
                                            isLoading: false,
                                        }
                                    )
                            })
                    }
                })

        }

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
        return (
            <SafeAreaView style={{width:'100%',height:'100%'}}>
                <ImageBackground source={require('./pics/background.jpeg')} style={styles.container}>
                    <ScrollView>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ marginTop: 16,fontSize: 25,}}>
                                ניהול משתמשים
                            </Text>
                            <Text style={styles.line}>____________________________</Text>

                        </View>
                        <Card>
                            <Form >
                                <Text style={{fontSize:24,textAlign:"center" }}> רישום משתמש חדש</Text>

                                <View style={styles.ViewStyle}>
                                    <Item floatingLabel >
                                        <Label>אימייל</Label>
                                        <Input
                                            placeholder={'Test@test.com'}
                                            value={this.state.email}
                                            onChangeText={(val) => {this.validate(val); this.inputValueUpdate(val, 'email')}}
                                        />
                                    </Item>
                                </View>
                                <Text/>
                                <View style={styles.ViewStyle}>
                                    <Item floatingLabel last>
                                        <Label>סיסמא ראשונית</Label>
                                        <Input
                                            placeholder={'password'}
                                            value={this.state.password}
                                            onChangeText={(val) => this.inputValueUpdate(val, 'password')}

                                        />
                                    </Item>
                                </View>
                                <Text/>
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
                                <View style={styles.ViewStyle}>
                                    <View>
                                        <Label>מלגאי \ מנהל</Label>
                                    </View>
                                    <Item picker>
                                        <Picker
                                            mode="dropdown"
                                            style={{ width: 20 }}
                                            placeholder="איך שמעת על העמותה"
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.permission}
                                            onValueChange={this.onValueChangeC.bind(this)}
                                        >
                                            <Picker.Item label="בחר מלגאי \ מנהל" value="" />
                                            <Picker.Item label="מלגאי" value="V" />
                                            <Picker.Item label="מנהל" value="M" />

                                        </Picker>
                                    </Item>
                                </View>
                                <Text/>
                                <Button iconLeft
                                        onPress={() => this.addVolunteer()}
                                        style={styles.buttonStyle}
                                >
                                    <Icon name='paper' />
                                    <Text>הוספת משתמש חדש למערכת</Text>
                                </Button>
                            </Form>
                        </Card>

                        <Card>
                            <Form>
                                <Text style={{fontSize:24,textAlign:"center"  }}> עדכון משלחת למלגאי</Text>

                                <View style={styles.ViewStyle}>
                                    <Item picker>
                                        <Picker
                                            mode="dropdown"
                                            style={{ width: 20 }}
                                            placeholder="choose destination"
                                            placeholderStyle={{ color: "#bfc6ea" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.currUser}
                                            onValueChange={ (value) => ( this.setState({currUser: value}) ) } >
                                            <Picker.Item label="בחר מלגאי" value="" />
                                            {
                                                this.state.userArr.map( (user, i) => {
                                                    return <Picker.Item label={user.email} value={user.email} key={i} />
                                                })
                                            }
                                        </Picker>
                                    </Item>
                                </View>
                                <Text/>
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
                                        style={styles.buttonStyle}
                                        onPress={() => {
                                            console.log('delegation::: ', this.state.delegation, '')
                                            const newDeleg = this.state.delegation;
                                            this.setState({delegation: newDeleg})
                                            if (this.state.currUser == '')
                                                alert('יש לבחור קודם מלגאי')
                                            else if(this.state.delegation == '')
                                                alert('יש לבחור משלחת לשיוך המועמד')
                                            else {
                                                this.dbRef.where('email', '==', this.state.currUser)
                                                    .get()
                                                    .then(querySnapshot => {

                                                        querySnapshot.forEach(documentSnapshot => {
                                                            console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                                                            this.state.userID  = documentSnapshot.id;
                                                            console.log('after close ID: ', this.state.userID)//, documentSnapshot.data());
                                                        })
                                                        console.log('newDeleg::: ', newDeleg)
                                                        this.dbRef.doc(this.state.userID).update({delegation: newDeleg})
                                                        console.log(' user id : ', this.state.userID, 'delegation', newDeleg )
                                                    })
                                                    .then(
                                                        alert('עדכון המלגאי למשלחת חדשה בוצע בהצלחה'),
                                                    )
                                                    .then(
                                                        this.setState({delegation: '', currUser: ''})
                                                    )
                                            }
                                        }}

                                >
                                    <Icon name='paper' />
                                    <Text>עדכן מלגאי</Text>
                                </Button>
                                <Button iconLeft
                                        style={styles.buttonStyle}
                                        onPress={() =>
                                        {
                                            if (this.state.currUser == '')
                                                alert('יש לבחור קודם מלגאי')
                                            else{


                                                Alert.alert(
                                                    'מחק מלגאי',
                                                    'האם אתה בטוח במחיקה?',
                                                    [
                                                        {text: 'כן', onPress: () => {
                                                                this.dbRef.where('email', '==', this.state.currUser)
                                                                    .get()
                                                                    .then(querySnapshot => {

                                                                        querySnapshot.forEach(documentSnapshot => {
                                                                            console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                                                                            this.state.userID =  documentSnapshot.id;
                                                                            console.log('after close ID: ', this.state.userID)
                                                                        })
                                                                        this.dbRef.doc(this.state.userID).delete()
                                                                        this.setState({userID: '', currUser: ''})
                                                                    })
                                                                    .then(this.props.navigation.navigate('MangeU'))
                                                            }
                                                        },
                                                        {text: 'לא', onPress: () => console.log('No item was removed'), style: 'cancel'},
                                                    ],
                                                    {
                                                        cancelable: true
                                                    }
                                                );}
                                        }
                                        }

                                >
                                    <Icon name='paper' />
                                    <Text>מחק מלגאי</Text>
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
        borderRadius:10
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
