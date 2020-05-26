import React from 'react';
import { StyleSheet, View,ScrollView ,SafeAreaView } from 'react-native';
import { Container, Header, Content,Button, Icon, Form,Text, Item, Input, Label} from 'native-base';
import firebase from "../database/firebaseDb";
import {Card} from "./common";
// import {addUser,addDelegation} from'../src/api/UsersApi'


export default class AdminPage extends React.Component {

// add user to delegation

    constructor() {
        super();
        this.dbRef = firebase.firestore().collection('users');

        this.dbDelRef =  firebase.firestore().collection('delegationList');
        this.state = {
            email: '',
            password:'',
            permission: '',
            delegation: '',
            name: '',
            expiration: '',
            time: new Date().toLocaleString(),
            isLoading: false
        };
    }
    componentWillMount(){
        setInterval(function(){
            this.setState({
                curTime: new Date().toLocaleString()
            })
        }.bind(this), 1000);
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
            this.dbDelRef.add({
                name: this.state.name,
                expiration: this.state.time,
                //value: res.key
            }).then((res) => {
                this.setState({
                    name: '',
                    expiration: '' ,
                    // delegation: '',
                    // permission: '',
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
                    //value: res.key
                }).then((res) => {
                    this.setState({
                        email: '',
                        password:'',
                        delegation: '',
                        permission: '',
                        isLoading: false,

                    })
                })
                    .catch((err) => {
                        console.error("Error found: ", err);
                        this.setState({
                            isLoading: false,
                        });
                    }))
            .catch(alert(email,password))
        }
    }

    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <Container>
                        <Content>
                        <Card>
                            <Form>
                                <Text style={{fontSize:24}}> לרישום מלגאי במערכת:</Text>
                                <Item floatingLabel>
                                    <Label>אימייל</Label>
                                    <Input
                                        placeholder={'email'}
                                        value={this.state.email}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'email')}
                                    />

                                </Item>
                                <Item floatingLabel last>
                                    <Label>סיסמא ראשונית</Label>
                                    <Input
                                        placeholder={'delegation'}
                                        value={this.state.password}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'password')}

                                    />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>שם משלחת</Label>
                                    <Input
                                        placeholder={'delegation'}
                                        value={this.state.delegation}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'delegation')}

                                    />
                                </Item>
                                <Item floatingLabel last>
                                    <Label>מלגאי/מנהל</Label>
                                    <Input
                                        placeholder={'status'}
                                        value={this.state.status}
                                        onChangeText={(val) => this.inputValueUpdate(val, 'status')}


                                    />

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
                                <Item floatingLabel last>
                                    <Label>תאריך יציאה:</Label>
                                    <Input />
                                </Item>
                                <Button iconLeft
                                        onPress={() => this.addDelegationName()}

                                >
                                    <Icon name='plus' />
                                    <Text >הוספה למערכת</Text>
                                </Button>
                            </Form>
                            </Card>

                            <Card>
                            <Form>
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

                            </Form>
                            </Card>
                        </Content>
                    </Container>
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