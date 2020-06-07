import React, { Component } from 'react';
import {StyleSheet, View, ScrollView, Text, Image, TouchableHighlight, Button} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { Item, Label, Picker} from "native-base";
import firebase from '../../database/firebaseDb';

export default class Report2 extends Component {

    constructor(props) {
        super(props);
        this.dbRef = firebase.firestore().collection('delegation');
        this.firestoreRef = firebase.firestore().collection('delegation');
        this.dbListRef = firebase.firestore().collection('delegationList');

        this.state = {
            delegationName: [],
            destinationArr: [],
            delegation: '',
            cityTable: [],
            tableData : [],
            tableData2:[],
            tableHead: ['שם העיר', 'נרשמים השבוע', 'סה"כ נרשמים'],
            widthArr: [120, 120, 120]
        }
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
        });
    }



// Method to get the list of cities
    cityChecker(){
        let i = 0;
        const cityArr = [];
        this.state.cityTable = [];
        this.dbRef
            .where('Destination', '==', this.state.delegation)
            .get()
            .then(querySnapshot=> {
                querySnapshot.forEach(doc => {
                    this.state.cityTable[i]=doc.data().Location;
                    i++;
                    cityArr.push({City: doc.data().Location})
                    if(i==querySnapshot.size)
                        this.fixCities()
                });
            })
        // console.log('result is: ', this.state.cityTable)
    }
// Make the city unique / distinct
    fixCities() {
        let unique = this.state.cityTable.filter((v, i, a) => a.indexOf(v) === i);
        // console.log('unique : test: ', unique)
        this.state.cityTable = unique;
    }

    getDelegationName = (querySnapshot) =>{
        const delegationName= [];
        const cityArr = [];

        querySnapshot.forEach((res)=>{
            const { Destination, Gender, Location, regTime, } = res.data();

            delegationName.push({
                res,
                Destination,
                Gender,
                Location,
                regTime,
            });
        });


        this.setState({
            delegationName: delegationName,
            cityArr: cityArr,
            isLoading: false,
        })
    }

    Generate(){
        this.state.tableData=this.state.tableData2;
        this.state.tableData=[]

        // this.setState({tableData: rowData})
        for (let i = 0; i < this.state.cityTable.length; i += 1) {
            let rowData = [];
            for (let j = 0; j < this.state.tableHead.length; j += 1) {
                switch (j) {
                    case 0: //draw cities rows
                        rowData.push(this.state.cityTable[i])
                        break;
                    case 1:  //num of candidate total
                        this.dbRef.where('Destination', '==', this.state.delegation)
                            .where('Location', '==', this.state.cityTable[i])
                            //.where('CameFrom', '==', 'שמעתי מחבר')
                            .get()
                            .then(querySnapshot => {
                                rowData.push(querySnapshot.size)
                            });
                        break;
                    case 2: //num of candidate
                        this.dbRef.where('Destination', '==', this.state.delegation)
                            .where('Location', '==', this.state.cityTable[i])
                            //.where('CameFrom', '==', 'פייסבוק')
                            .get()
                            .then(querySnapshot => {
                                rowData.push(querySnapshot.size)
                            });
                        break;

                }
            }

            this.state.tableData.push(rowData);
            // this.setState({tableData: rowData})

        }
        // this.setState({tableData: rowData})
    }

    render(){
        this.cityChecker();
        console.log(this.state)
        return <View style={styles.container}>
            <View style={styles.headerTitle}>

                <Text> דוח 2 </Text>
                <Item floatingLabel>
                    <Label>בחר משלחת</Label>
                </Item>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        style={{width: 20}}
                        placeholder="choose destination"
                        placeholderStyle={{color: "#bfc6ea"}}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.delegation}
                        onValueChange={(value) => {this.setState({delegation: value})} }>
                        <Picker.Item label="בחר" value=""/>
                        {
                            this.state.destinationArr.map((city, i) => {

                                return <Picker.Item label={city.name} value={city.name} key={i}/>
                            })
                        }
                    </Picker>
                </Item>
                {console.log('current delegation: ', this.state.delegation)}
                <View>
                    <Text>write here..</Text>

                    {
                    }



                </View>
                <Button onPress={() => {
                    this.firestoreRef.onSnapshot(this.getDelegationName);
                    this.Generate();
                }} title={"הנפק"}/>


            </View>
            <ScrollView horizontal={true} style={{marginTop: 20}}>
                <View>

                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.header}
                             textStyle={styles.text}/>
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            {
                                this.state.tableData.map((rowData, index) => (
                                    <Row
                                        key={index}
                                        data={rowData}
                                        widthArr={this.state.widthArr}
                                        style={[styles.row, index % 2 && {backgroundColor: '#F7F6E7'}]}
                                        textStyle={styles.text}
                                    />
                                ))
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' }
});


