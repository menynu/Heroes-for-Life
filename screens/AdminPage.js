import React from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, Switch} from 'react-native';
import { CheckBox } from 'react-native-elements'
import {Container, DatePicker, Content, Button, Icon, Form, Text, Item, Input, Label, Picker} from 'native-base';
import firebase from "../database/firebaseDb";
import {Card} from "./common";
import {isTSTypeQuery} from "@babel/types";
// import {addUser,addDelegation} from'../src/api/UsersApi'


export default class AdminPage extends React.Component {

// add user to delegation

    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('users');

        this.dbListRef = firebase.firestore().collection('delegationList')//.orderBy("name", "desc");
            //.where('isActive', '==', 'true')
        this.state = {
            email: '',
            password:'',
            permission: '',
            delegation: '',
            name: '',
            expiration:  new Date(),
            time: '',
            isActive: true,
            isLoading: false,
            destinationArr: [],
            currDocID: '',
        };

    }
    componentDidMount() {
        this.unsubscribe = this.dbListRef.onSnapshot(this.getDelegationList);
    }


    componentWillUnmount(){
        this.unsubscribe();
    }

    getDelegationList = (querySnapshot) =>{
        const destinationArr = [];
        querySnapshot.forEach((res) => {
            const {name, expiration } = res.data();
            if (res.data().isActive) // remove this to get all delegations in DB
            destinationArr.push({
                key: res.id,
                res,
                name,
                expiration,
            });
        });
        this.setState({
            destinationArr,
            // isLoading: false,
        });
    }

    onValueChangeC(value: string) {
        this.setState({
            CameFrom: value
        });
    }

    delegationNameUpdate = (val,prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }





    addDelegationName() {
        if(this.state.name === '' ){
            alert('אנא מלא את כל הפרטים')
        } else {
            this.setState({
                isLoading: true,
            });
            this.dbListRef.add({
                name: this.state.name,
                //expiration: this.state.expiration,
                isActive: this.state.isActive,
            }).then((res) => {
                this.setState({
                    name: '',
                    //expiration: '' ,
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

    editDelegation(){
        this.dbListRef.where('name', '==', this.state.delegation)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    documentSnapshot.data().isActive='false';
                    this.state.currDocID = documentSnapshot.id;
                    console.log('after close ID: ', documentSnapshot.id, documentSnapshot.data());
                })
            });
        // this.setDelegation()
        //this.dbListRef.doc(this.state.currDocID).update({'isActive': false});
    }
    // setDelegation(){
    //     this.dbListRef.doc(this.state.currDocID).update({'isActive': false});
    // }

    addVolunteer() {
        if(this.state.email === '' ){
            alert('אנא מלא את כל הפרטים')
        } else {
            this.setState({
                isLoading: true,
            });

            const {email,password} = this.state;
            this.setState({loading:true})
            firebase.auth().createUserWithEmailAndPassword(email,password)
                .then(
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
                )
                .catch((err) => {
                    console.error("Error found: ", err);
                    this.setState({
                        isLoading: false,
                    });
                })
        }
        this.props.navigation.navigate('AdminPage');
    }

    render() {
        return (
            <SafeAreaView style={{backgroundColor: 'white'}}>

                <ScrollView>

                    <Card>
                        <Form>
                            <Text style={{fontSize:24}}> לרישום משתמש במערכת:</Text>
                            <Item floatingLabel>
                                <Label>אימייל</Label>
                                <Input
                                    placeholder={'Test@test.com'}
                                    value={this.state.email}
                                    onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                                />

                            </Item>
                            <Item floatingLabel last>
                                <Label>סיסמא ראשונית</Label>
                                <Input
                                    placeholder={'password'}
                                    value={this.state.password}
                                    onChangeText={(val) => this.inputValueUpdate(val, 'password')}

                                />
                            </Item>

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


                            <Button iconLeft
                                    onPress={() => this.addVolunteer()}
                            >
                                <Icon name='paper' />
                                <Text>הוספת משתמש חדש למערכת</Text>
                            </Button>
                        </Form>
                    </Card>

                    <Card>
                        <Form>
                            <Text style={{fontSize:24}}> להוספת משלחת חדשה:</Text>
                            <Item floatingLabel>
                                <Label>שם משלחת:</Label>
                                <Input
                                    placeholder={'שם המשלחת'}
                                    value={this.state.name}
                                    onChangeText={(val) => this.delegationNameUpdate(val, 'name')}

                                />
                            </Item>


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
                            <Text style={{fontSize:24}}> לעדכון משלחת קיימת:</Text>
                            <Item floatingLabel>
                                <Label>בחר משלחת</Label>
                            </Item>
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    style={{ width: 20 }}
                                    placeholder="choose destination"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.delegation}
                                    onValueChange={ (value) => ( this.setState({delegation: value}) ) } >
                                    <Picker.Item label="בחר" value="" />
                                    {
                                        this.state.destinationArr.map( (city, i) => {

                                            return <Picker.Item label={city.name} value={city.name} key={i} />
                                        })
                                    }
                                </Picker>

                                {/*<CheckBox*/}
                                {/*    center*/}
                                {/*    title='לחץ לסגירת משלחת'*/}
                                {/*    iconRight*/}
                                {/*    iconType='material'*/}
                                {/*    checkedIcon='clear'*/}
                                {/*    uncheckedIcon='add'*/}
                                {/*    checkedColor='red'*/}
                                {/*    checked={this.state.checked}*/}
                                {/*/>*/}
                            </Item>
                            {/*<Switch*/}
                            {/*  //  onValueChange = {props.toggleSwitch1}*/}
                            {/*  //  value = {props.switch1Value}*/}
                            {/*/>*/}


                            {/*<Button iconLeft on press={() => this.editDelegation()} >*/}
                            <Button iconLeft
                                    onPress={() => this.dbListRef.where('name', '==', this.state.delegation)
                                        .get()
                                        .then(querySnapshot => {
                                            querySnapshot.forEach(documentSnapshot => {
                                                console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                                                //documentSnapshot.data().isActive='false';
                                                //documentSnapshot.data().update({'isActive': false})
                                                this.state.currDocID = documentSnapshot.id;
                                                console.log('after close ID: ', documentSnapshot.id, documentSnapshot.data());
                                            })
                                            this.dbListRef.doc(this.state.currDocID).update({isActive: false})
                                            console.log('updated!', this.state.currDocID);
                                        })
                                        //this.dbListRef.doc(this.state.currDocID).update(isActive: false))

                                    }
                                      //  .update('isActive' : false)}
                            >
                                <Icon name='paper' />
                                <Text>סגור משלחת</Text>
                            </Button>
                        </Form>

                    </Card>

                    <Card>
                        <Text style={{fontSize:24}}>הנפקת דוחות</Text>
                        <Button iconLeft onPress={() =>{this.props.navigation.navigate('Report1')}}>
                            <Icon name='paper' />
                            <Text>לקבלת דוח שבועי לפי משלחת לחץ כאן</Text>
                        </Button>
                        <Button iconLeft onPress={() => {this.props.navigation.navigate('Report2')}}>
                            <Icon name='paper' />
                            <Text>לקבלת דוח איזורים לפי משלחת לחץ כאן</Text>
                        </Button>
                        <Button iconLeft onPress={() => {this.props.navigation.navigate('Report3')}}>
                            <Icon name='paper' />
                            <Text>לקבלת דוח איזורים על איך שמעת על העמותה לחץ כאן</Text>
                        </Button>
                        <Button iconLeft onPress={()=>{this.props.navigation.navigate('Report4')}}>
                            <Icon name='paper' />
                            <Text>לקבלת דוח כללי כללי לחץ כאן</Text>
                        </Button>
                    </Card>

                </ScrollView>

            </SafeAreaView>
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
