import React, { Component } from 'react';
import {StyleSheet, View, ScrollView, Text, Image, TouchableHighlight, Button} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { Item, Label, Picker} from "native-base";
import firebase from '../../database/firebaseDb';

export default class Report1 extends Component {

    constructor(props) {
        super(props);
        this.dbRef = firebase.firestore().collection('delegation');
        this.firestoreRef = firebase.firestore().collection('delegation');
        this.dbListRef = firebase.firestore().collection('delegationList');
        this.state = {
            numOfReg: '',
            numOfMale: 0,
            numOfFemale: 0,
            locationName: [],
            delegationName: [],
            destinationArr: [],
            currDelegation: '',
            genderArr: [],
            delegation: '',
            tableData : [],
            tableData2:[],
            tableHead: ['איזור', 'סכ"ה נרשמים'],
            widthArr: [120, 60]
        }
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCityName);
        this.unsubscribe = this.dbListRef.onSnapshot(this.getDelegationList);
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getDelegationName);

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
            this.dbRef.where('Destination', '==', this.state.delegation).get()
                .then(querySnapshot=> {
                    querySnapshot.forEach(doc => {
                        if (doc.data().Location == 'eilat')
                        {
                            console.log('i found jerusalem!!: ', doc.data().Location);
                            console.log('num of people,', querySnapshot.size)
                            cityArr.push({
                                City: doc.data().Location,
                            })

                        }
                        console.log('none from: ', doc.data().Location)
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

        });


        this.setState({
            numOfReg: delegationName.length,
            delegationName: delegationName,
            isLoading: false,
        })
    }

    getCityName = () =>{
        const cityArr = [];
        {
            this.dbRef.where('Destination', '==', this.state.delegation)
                .get()
                .then(querySnapshot=> {
                    querySnapshot.forEach(doc => {
                        console.log('num of people  ', querySnapshot.size)
                        this.state.cityName.push({
                            City: doc.data().Location,
                        })
                        cityArr.push(doc.data().Location);
                        console.log('City NAME:',cityArr)
                        console.log('none from: ', doc.data().Location)
                        // console.log('test for array:',  this.state.cityName)
                        // console.log('test 2:' , doc.id, '=>', doc.data());
                        // console.log('location is : ', doc.data().Location);
                        // Put here all the if / else / functions / states for the table values
                    });


                })


        }
        this.setState({
            isLoading: false,
        })
    }

    Generate(){
        const cityArr = [];
        console.log("ENTER GENRATE");
        this.dbRef.where('Destination', '==', this.state.delegation)
            .get()
            .then(querySnapshot=> {
                querySnapshot.forEach((doc) => {
                    cityArr.push(doc.data().Location);
                });
            })

        for (let i = 0; i < cityArr.length; i += 1) {
            console.log("before loop");
            let rowData = [];
            for (let j = 0; j < 2; j += 1) {
                switch (j) {
                    case 0:  //name of area
                        this.dbRef.where('Destination', '==', this.state.delegation).get()
                            .then(() => {
                                rowData.push(cityArr[i])
                                console.log("city1:",cityArr[i])
                            });
                        break;
                    case 1: //num candidate
                        this.dbRef.where('Destination', '==', this.state.delegation).where('Location', '==', cityArr[i]).get()
                            .then(querySnapshot => {
                                let numFromLocation = querySnapshot.size;
                                rowData.push(numFromLocation);
                                console.log(numFromLocation);
                            });
                        break;
                }
            }
            this.state.tableData.push(rowData);
        }
    // this.render();
    }

    render(){
        const state = this.state;
        console.log(this.state)
        return (


            <View style={styles.container}>
                <View style={styles.headerTitle}>

                    <Text> דוח 4 </Text>
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
                    {console.log('current delegation: ', this.state.delegation)}
                    <View>
                        <Text>write here..</Text>
                    </View>
                    <Button onPress={() => this.Generate()} title={ "הנפק" } />


                </View>
                <ScrollView horizontal={true} style={{marginTop:20}}>
                    <View>

                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                {
                                    this.state.tableData.map((rowData, index) => (
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






//
// getCityName = () =>{
//     const cityArr = [];
//     {
//         this.dbRef.where('Destination', '==', this.state.delegation)
//             .get()
//             .then(querySnapshot=> {
//                 querySnapshot.forEach(doc => {
//                     console.log('num of people  ', querySnapshot.size)
//                     this.state.cityName.push({
//                         City: doc.data().Location,
//                         Name: doc.data().Name,
//                         Destination: doc.data().Destination,
//                     })
//                     cityArr.push(doc.data().Location);
//                     console.log('City NAME:',cityArr)
//                     console.log('none from: ', doc.data().Location)
//                     // console.log('test for array:',  this.state.cityName)
//                     // console.log('test 2:' , doc.id, '=>', doc.data());
//                     // console.log('location is : ', doc.data().Location);
//                     // Put here all the if / else / functions / states for the table values
//                 });
//
//
//             })
//
//
//     }
//     this.setState({
//         isLoading: false,
//     })
// }