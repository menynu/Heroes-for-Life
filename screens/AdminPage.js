import React from 'react';
import { StyleSheet, View,ScrollView ,SafeAreaView } from 'react-native';
import {Container, DatePicker, Content, Button, Icon, Form, Text, Item, Input, Label, Picker} from 'native-base';
import firebase from "../database/firebaseDb";
import {Card} from "./common";
// import {addUser,addDelegation} from'../src/api/UsersApi'


export default class AdminPage extends React.Component {

// add user to delegation

    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('users');

        this.dbListRef = firebase.firestore().collection('delegationList');
        this.state = {
            email: '',
            password:'',
            permission: '',
            delegation: '',
            name: '',
            expiration:  new Date(),
            time: '',
            isLoading: false,
            destinationArr: [],
        };
        this.setDate = this.setDate.bind(this);

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
    setDate(newDate) {
        this.setState({ expiration: newDate });
    }




    addDelegationName() {
        if(this.state.name === '' ){
            alert('אנא מלא את כל הפרטים')
        } else {
            this.setState({
                isLoading: true,
            });
            this.dbDelRef.add({
                name: this.state.name,
                expiration: this.state.expiration,
            }).then((res) => {
                this.setState({
                    name: '',
                    expiration: '' ,
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
            <SafeAreaView>

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
                            <Item floatingLabel last>
                                <Label>שם משלחת</Label>
                                <Input
                                    placeholder={'india 2020'}
                                    value={this.state.delegation}
                                    onChangeText={(val) => this.inputValueUpdate(val, 'delegation')}

                                />
                            </Item>
                            <Item floatingLabel last>
                                <Label>מלגאי/מנהל</Label>
                                <Input
                                    placeholder={'M/V'}
                                    value={this.state.permission}
                                    onChangeText={(val) => this.inputValueUpdate(val, 'permission')}


                                />

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
                            <Text style={{fontSize:24}}> להוספת משלחת:</Text>
                            <Item floatingLabel>
                                <Label>שם משלחת:</Label>
                                <Input
                                    placeholder={'שם המשלחת'}
                                    value={this.state.name}
                                    onChangeText={(val) => this.delegationNameUpdate(val, 'name')}

                                />
                            </Item>
                            <Item >
                                <Text>תאריך סגירת המשלחת:</Text>
                                <DatePicker
                                    defaultDate={new Date(2020, 8, 1)}
                                    minimumDate={new Date(2020, 8, 1)}
                                    maximumDate={new Date(2030, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Select date"
                                    textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={this.setDate}
                                    disabled={false}
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
                            </Item>

                            <Button iconLeft
                                    onPress={() => this.addVolunteer()}
                            >
                                <Icon name='paper' />
                                <Text>הוספה למערכת</Text>
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
