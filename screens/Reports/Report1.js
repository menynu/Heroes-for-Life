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
            key: '',
            //tableData2:[],
            tableHead: ['שם המשלחת', 'נרשמים השבוע', 'סה"כ נרשמים', 'גברים שנרשמו השבוע' , 'נשים שנרשמו השבוע' , '% גברים שנרשמו השבוע', '% נשים שנרשמו השבוע'],
            widthArr: [120, 80, 80, 80, 80, 80, 80]
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
        //this.state.tableData=this.state.tableData2;
        this.state.tableData=[]

        // this.setState({tableData: rowData})
        for (let i = 0; i < this.state.destinationArr.length; i += 1) {
            let rowData = [];
            let weekData= 0, maleWeek=0, femaleWeek=0; //must be done to refresh every row
            for (let j = 0; j < this.state.tableHead.length; j += 1) {
                switch (j) {
                    case 0: //draw destination
                        rowData.push(this.state.destinationArr[i].name)
                        break;
                    case 1:  //reg this week - **TODO: must be fixed
                        this.dbRef
                            .where('regTime', '>', new Date( -7 * 24 * 60 * 60 * 1000))
                            .get()
                            .then(querySnapshot => {   //The solution to make a snapshot query for week
                                querySnapshot.forEach(res => {
                                    //console.log(' destination: ', res.data().destination, 'state dest: ', this.state.destinationArr[i].name)
                                    if (res.data().Destination == this.state.destinationArr[i].name){
                                        weekData++
                                        if (res.data().Gender == 'זכר') {

                                            maleWeek++
                                        }
                                        else if (res.data().Gender == 'נקבה')
                                            femaleWeek++

                                    }
                                });
                                //weekData = maleWeek+femaleWeek;
                                rowData.push(weekData) // update the specific cell
                                // rowData.push(maleWeek)  // maybe put these on same if
                                // rowData.push(femaleWeek)
                                // console.log('num of males:', maleWeek)
                                // console.log('num of females:', femaleWeek)

                            })


                        break;
                    case 2: //total reg
                        this.dbRef.where('Destination', '==', this.state.destinationArr[i].name)
                            .get()
                            .then(querySnapshot => {
                                rowData.push(querySnapshot.size)
                            });
                        break;
                    case 3: //male this week - **TODO: must be fixed -- not working this shit


                        // this.dbRef
                        // .where('regTime', '>', new Date( -7 * 24 * 60 * 60 * 1000))
                        // .get()
                        // .then(querySnapshot => {   //The solution to make a snapshot query for week
                        //     querySnapshot.forEach(res => {
                        //         //console.log(' destination: ', res.data().destination, 'state dest: ', this.state.destinationArr[i].name)
                        //         if (res.data().Destination == this.state.destinationArr[i].name ){
                        //             if (res.data().Gender === 'זכר')
                        //                 maleWeek++;
                        //
                        //         }
                        //     });
                        //     console.log('num of male this week: ', maleWeek)
                        //     rowData.push(maleWeek) // update the specific cell
                        //
                        // })
                        //
                        // console.log('num of male this week: ', maleWeek)
                        // rowData.push(maleWeek)

                        this.dbRef.where('Destination', '==', this.state.destinationArr[i].name)
                            .where('Gender', '==', 'זכר')

                            .get()
                            .then(querySnapshot => {
                                rowData.push(querySnapshot.size)
                            });
                        break;
                    case 4: //female this week - **TODO: must be fixed
                        //rowData.push(femaleWeek)
                        this.dbRef.where('Destination', '==', this.state.destinationArr[i].name)
                            .where('Gender', '==', 'נקבה')
                            .get()
                            .then(querySnapshot => {
                                rowData.push(querySnapshot.size)
                            });
                        break;
                    case 5: //% male this week  **TODO: must be fixed
                        this.dbRef.where('Destination', '==', this.state.destinationArr[i].name)
                            .get()
                            .then(querySnapshot => {
                                rowData.push(querySnapshot.size)
                            });
                        break;
                    case 6: //% of female  **TODO: must be fixed
                        this.dbRef.where('Destination', '==', this.state.destinationArr[i].name)
                            .get()
                            .then(querySnapshot => {
                                rowData.push(querySnapshot.size)
                            });
                        break;

                }
            }

            this.state.tableData.push(rowData);

        }


    }

    render(){
        this.cityChecker();
        console.log(this.state)
        return <View style={styles.container}>
            <View style={styles.headerTitle}>

                <Text> דוח 1 - דו'ח כללי </Text>


                {console.log('current delegation: ', this.state.delegation)}
                <View style={{marginTop: 15}}>




                </View>
                <Button onPress={() => {
                    this.firestoreRef.onSnapshot(this.getDelegationName);
                    this.Generate();

                }} title={"הנפק"}/>

                <Text style={{marginTop: 2}} />
                <Button

                    onPress={() => {
                        this.setState({ key: this.state.key + 1 });
                    }}
                    title={"הצג נתונים"}/>




            </View>
            <ScrollView horizontal={true} style={{marginTop: 20}}>
                <View
                    key={this.state.key}
                >

                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        <Row data={this.state.tableHead} widthArr={this.state.widthArr} style={styles.header}
                             textStyle={styles.text}/>
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            {

                                /// THIS MAYBE NEED TO BE INSIDE A STATE AFTER GENERATE FUNCTION IS DONE OR RERENDER
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


