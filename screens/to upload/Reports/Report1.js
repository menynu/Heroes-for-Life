import React, { Component } from 'react';
import {StyleSheet, View, ScrollView, Text, Image, TouchableHighlight, Button} from 'react-native';
import { Table, Row } from 'react-native-table-component';
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
            tableData : [],
            key: '',
            totalReg:[],
            tableHead: ['שם המשלחת', 'גברים שנרשמו השבוע', '% גברים שנשרשמו השבוע', 'נשים שנרשמו השבוע' , '% נשים שנרשמו השבוע' , 'סה"כ נרשמו השבוע', 'סה"כ נרשמים'],
            widthArr: [120, 80, 80, 80, 80, 80, 80]
        }
    }

    componentDidMount() {
        this.firestoreRef.onSnapshot(this.getDelegationName);
        this.unsubscribe = this.dbListRef.onSnapshot(this.getDelegationList);
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    getDelegationList = (querySnapshot) =>{
        const destinationArr = [];
        querySnapshot.forEach((res) => {
            const {name} = res.data();

            destinationArr.push({
                key: res.id,
                res,
                name,
            });
        });


        this.setState({
            destinationArr,
        });
    }


    getDelegationName = (querySnapshot) =>{
        const delegationName= [];
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
            isLoading: false,
        })
    }

    getTotalReg(){

        for (let i=0; i<this.state.destinationArr.length; i++ ) {
            this.dbRef
                .where('Destination', '==', this.state.destinationArr[i].name)
                .get()
                .then(querySnapshot => {
                    this.state.totalReg[i] = querySnapshot.size
                });
        }
    }

    Generate(){
        let weekAgo = new Date();
        let weekInMilliseconds = -7 * 24 * 60 * 60 * 1000;
        weekAgo.setTime(weekAgo.getTime() + weekInMilliseconds);
        const tableData=[]
        for (let i = 0; i < this.state.destinationArr.length; i += 1) {
            let rowData = [];
            let weekData= 0, maleWeek=0, femaleWeek=0; //must be done to refresh every row
            for (let j = 0; j < 2; j += 1) {
                if (j==0)
                    rowData.push(this.state.destinationArr[i].name) // 1 - name of dest
                this.dbRef
                    .where('regTime', '>', weekAgo) // represent week in millisec
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(res => {
                            if (res.data().Destination == this.state.destinationArr[i].name ) {
                                    weekData++

                                if (res.data().Gender == 'זכר') {
                                    maleWeek++
                                } else if (res.data().Gender == 'נקבה')
                                    femaleWeek++
                            }
                        })
                        rowData.push(maleWeek) // 2 - male week

                        if (maleWeek*100 / weekData == 0)  // 3  % male week
                            rowData.push(0 +'%')
                        else
                            rowData.push(maleWeek*100 / weekData +'%')

                        rowData.push(femaleWeek) // 4 female week

                        if (femaleWeek*100 / weekData == 0)  // 5 % female week
                            rowData.push(0 +'%')
                        else
                            rowData.push(femaleWeek*100 / weekData +'%')
                        rowData.push(weekData) // 6-  total week
                        rowData.push(this.state.totalReg[i])
                    })
            }
            tableData.push(rowData);
        }
        this.setState({
            tableData: tableData,
            //key: this.state.key + 1
        })
    }

    render(){

        console.log(this.state)
        return <View style={styles.container}>
            <View style={styles.headerTitle}>

                <Text> דוח 1 - דו'ח כללי </Text>

                <View style={{marginTop: 15}}>

                </View>
                <Button onPress={() => {
                    // this.firestoreRef.onSnapshot(this.getDelegationName);
                    this.getTotalReg();
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


