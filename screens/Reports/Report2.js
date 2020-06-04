

import React, { Component } from 'react';
import {StyleSheet, View, ScrollView, Text, Image, TouchableHighlight} from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';
import {Button, Form, Icon, Item, Label, Picker} from "native-base";
import firebase from '../../database/firebaseDb';

export default class Report2 extends Component {

    constructor(props) {
        super(props);
        this.dbRef = firebase.firestore().collection('delegation');
        this.firestoreRef = firebase.firestore().collection('delegation');
        this.dbListRef = firebase.firestore().collection('delegationList');
        this.state = {
            numOfReg: '',
            numOfMale: 0,
            numOfFemale: 0,
            cityName: [],
            delegationName: [],
            destinationArr: [],
            currDelegation: '',
            genderArr: [],
            delegation: '',
            tableHead: ['שם משלחת', 'סכ"ה נרשמים', 'סכ"ה נרשמים מפתיחת ההרשמה', 'גברים שנרשמו מפתיחת ההרשמה', 'גברים שנרשמו מפתיחת ההרשמה באחוזים', 'נשים שנרשמו מפתיחת ההרשמה', 'נשים שנרשמו מפתיחת ההרשמה באחוזים'],
            widthArr: [60, 60, 120, 120, 120, 120, 120]
        }
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getDelegationName);

        this.unsubscribe = this.dbListRef.onSnapshot(this.getDelegationList);



        //this.unsubscribe = this.firestoreRef.onSnapshot(this.getDelegationList);

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


    getDelegationName = (querySnapshot) =>{
        const delegationName= [];
        const cityArr = [];
        {
            //this.dbRef.where('Location', '==', 'Jerusalem').get()//.where('Gender', '==', 'male').get()
            this.dbRef.where('Destination', '==', this.state.delegation)
            // .orderBy('Location', 'desc')
                .get() // .where('Gender', '==', 'male')
                .then(querySnapshot=> {
                    querySnapshot.forEach(doc => {

                        console.log('num of people  ', querySnapshot.size)
                        //alert(doc.data().size)
                        this.state.cityName.push({
                            City: doc.data().Location,
                            Name: doc.data().Name,
                            Destination: doc.data().Destination,
                        })

                        console.log('none from: ', doc.data().Location)
                        console.log('test for array:: ',  this.state.cityName)



                        // console.log('test 2:' , doc.id, '=>', doc.data());
                        // console.log('location is : ', doc.data().Location);
                        // Put here all the if / else / functions / states for the table values

                    });
                })

        }

        querySnapshot.forEach((res)=>{
            const { Destination, Gender, Location, regTime, } = res.data();

            delegationName.push({
                res,
                numOfReg: querySnapshot.size, //querySnapshot.size = num of total in this query
                Destination,
                Gender,
                Location,
                regTime,
            });
            console.log('destination123:' , Destination, 'Location: ',Location)

            //write here per delegation

        });


        this.setState({
            numOfReg: delegationName.length,
            delegationName: delegationName,

            isLoading: false,
        })
    }




    Generate(){
        this.state.tableData=this.state.tableData2;
        for (let i = 0; i < 1; i += 1) {
            let rowData = [];
            for (let j = 0; j < 6; j += 1) {
                switch (j) {
                    case 0:
                        rowData.push(this.state.delegation); // delegation name
                        break;
                    case 1:  //num of candidate
                        this.dbRef.where('Destination', '==', this.state.delegation).get()
                            .then(querySnapshot => {
                                this.state.numOfReg = querySnapshot.size
                                rowData.push(this.state.numOfReg)
                                console.log(querySnapshot.size)
                            });
                        break;
                    case 2: //num of male candidate
                        this.dbRef.where('Destination', '==', this.state.delegation).where('Gender', '==', 'זכר').get()
                            .then(querySnapshot => {
                                this.state.numOfMale++;
                                this.state.numOfMale = querySnapshot.size;
                                rowData.push(this.state.numOfMale);
                                console.log(querySnapshot.size);
                            });
                        break;
                    case 3: //present of male candidate
                        this.dbRef.where('Destination', '==', this.state.delegation).where('Gender', '==', 'זכר').get()
                            .then(querySnapshot => {
                                let precent = (querySnapshot.size* 100) / this.state.numOfReg;
                                rowData.push(precent +'%');
                                console.log((querySnapshot.size* 100) / this.state.numOfReg);
                            });
                        break;
                    case 4:
                        //num of female candidate
                        this.dbRef.where('Destination', '==', this.state.delegation).where('Gender', '==', 'נקבה').get()
                            .then(querySnapshot => {
                                this.state.numOfFemale++;
                                this.state.numOfFemale = querySnapshot.size
                                rowData.push(this.state.numOfFemale)
                                console.log(this.state.numOfFemale)
                            });
                        break;
                    case 5:
                        //precent of female candidate
                        this.dbRef.where('Destination', '==', this.state.delegation).where('Gender', '==', 'נקבה').get()
                            .then(querySnapshot => {
                                let precent = (querySnapshot.size* 100) / this.state.numOfReg;
                                rowData.push(precent +'%');
                                console.log((querySnapshot.size * 100) / this.state.numOfReg + "%")
                            });
                        break;
                }
            }
            this.state.tableData.push(rowData);
        }

    }




    render() {
        const state = this.state;
        const tableData = [];
        for (let i = 0; i < 5; i += 1) {
            const rowData = [];
            for (let j = 0; j < 2; j += 1) {
                {console.log()}
                rowData.push(`abc`);
                let temp = this.state.cityName
                rowData.push(this.state.Destination)
                {console.log('testing name', this.state.cityName)}

            }
            tableData.push(rowData);
        }

        return (


            <View style={styles.container}>
                <View style={styles.headerTitle}>


                    <Text> {this.state.delegation} </Text>
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
                            onPress={() => {
                                //this.state.cityName= []
                                //this.dbListRef.onSnapshot(this.getDelegationName)}}
                                this.Generate()}} title={ "הנפק" }

                    >
                        <Icon name='paper' />
                        <Text>ה</Text>
                    </Button>

                    {console.log('current delegation: ', this.state.delegation)}
                    <View>
                        <Text>write here..</Text>


                    </View>
                    <Text> </Text>

                </View>
                <ScrollView horizontal={true} style={{marginTop:20}}>
                    <View>

                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                {
                                    tableData.map((rowData, index) => (
                                        <Row
                                            key={index}
                                            data={rowData}
                                            widthArr={state.widthArr}
                                            style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                            textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' }
});

