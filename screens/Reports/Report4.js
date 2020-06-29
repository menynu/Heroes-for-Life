import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    Button, ImageBackground,
} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import {Item, Label, Picker} from 'native-base';
import firebase from '../../database/firebaseDb';

export default class Report4 extends Component {
    constructor(props) {
        super(props);
        this.dbRef = firebase.firestore().collection('delegation');
        this.firestoreRef = firebase.firestore().collection('delegation');
        this.dbListRef = firebase.firestore().collection('delegationList');

        //this.updateState = this.updateState.bind(this);
        this.state = {
            renderIndex: 1,
            myState: '',
            numOfReg: '',
            numOfMale: 0,
            numOfFemale: 0,
            locationName: [],
            delegationName: [],
            destinationArr: [],
            currDelegation: '',
            key: '',
            //genderArr: [],
            delegation: '',
            cityTable: [],
            fixedCityArr: [],
            tableData: [],
            tableData2: [],
            tableHead: [
                'שם משלחת',
                'סה"כ נרשמים מפתיחת ההרשמה',
                'סה"כ גברים שנרשמו מפתיחת ההרשמה',
                'סה"כ גברים שנרשמו מפתיחת ההרשמה באחוזים',
                'סה"כ נשים שנרשמו מפתיחת ההרשמה',
                'סה"כ נשים שנרשמו מפתיחת ההרשמה באחוזים',
            ],
            widthArr: [60, 120, 130, 130, 130, 130],
        };
    }

    componentDidMount() {
        //this.unsubscribe = this.firestoreRef.onSnapshot(this.getDelegationName);
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




    cityChecker(){
        let i = 0;
        let waitflag = 0;
        let tempName = 0;
        let uniqueCity = [];
        const cityArr = [];
        console.log('WWWWWWWWWWWTTTTTTTTTTTTTTFFFFFFFFFFFFFFF!')
        this.state.cityTable = [];
        this.dbRef
            .where('Destination', '==', this.state.delegation)
            //  .orderBy('Location','desc')
            .get()
            .then(querySnapshot=> {
                querySnapshot.forEach(doc => {
                    //console.log('TESTING@#@$')
                    this.state.cityTable[i]=doc.data().Location;
                    i++;
                    //   console.log('state.cityTable[',i,']: ', state.cityTable[i], 'city: ', doc.data().Location)
                    cityArr.push({

                        City: doc.data().Location,
                    })
                    // console.log('CITY ARRAY:! ',cityArr)
                    // console.log('DATA SIZE:  ', querySnapshot.size)
                    // console.log('STATE ARRAY:! ',this.state.cityTable)
                    if(i==querySnapshot.size)
                        this.fixCities()

                });
            })



        console.log('result is: ', this.state.cityTable)
        //this.state.cityTable = cityArr;
        //this.fixCities()

    }

    fixCities() {
        let unique = this.state.cityTable.filter((v, i, a) => a.indexOf(v) === i);
        console.log('unique : test: ', unique)

    }



    getDelegationName = (querySnapshot) =>{
        const delegationName= [];
        let i = 0;
        const cityArr = [];

        // //this.dbRef.where('Location', '==', 'Jerusalem').get()//.where('Gender', '==', 'male').get()
        // this.dbRef.where('Destination', '==', this.state.delegation)
        //     .orderBy("Location", "desc")
        //     .get() // .where('Gender', '==', 'male')
        //     .then(querySnapshot=> {
        //         querySnapshot.forEach(doc => {
        //             // if (doc.data().Location == 'eilat')
        //                 console.log('TESTING@#@$')
        //                 if (doc.data().Location != cityArr[i])
        //                     cityArr.push({
        //                         City: doc.data().Location,
        //                     })
        //                i++;
        //
        //             console.log('CITY ARRAY:! ',cityArr)
        //
        //
        //         });
        //     })
        //


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
            // console.log('destination123:' , Destination, 'Location: ',Location)

            //write here per delegation

        });


        this.setState({
            numOfReg: delegationName.length,
            delegationName: delegationName,
            cityArr: cityArr,
            isLoading: false,
        })
    }

    Generate(){
        this.state.tableData=this.state.tableData2;
        this.state.tableData=[]


        // console.log('didnt FIND :(')
        for (let i = 0; i < 1; i += 1) {
            let rowData = [];
            for (let j = 0; j < 6; j += 1) {
                switch (j) {
                    case 0:
                        rowData.push(this.state.delegation); // delegation name
                        break;
                    case 1:  //num of candidate
                        this.dbRef.where('Destination', '==', this.state.delegation)
                            .get()
                            .then(querySnapshot => {
                                this.state.numOfReg = querySnapshot.size
                                rowData.push(this.state.numOfReg)
                                console.log(querySnapshot.size)
                            });
                        break;
                    case 2: //num of male candidate
                        this.dbRef.where('Destination', '==', this.state.delegation)
                            .where('Gender', '==', 'זכר')
                            .get()
                            .then(querySnapshot => {
                                this.state.numOfMale++;
                                this.state.numOfMale = querySnapshot.size;
                                rowData.push(this.state.numOfMale);
                                console.log(querySnapshot.size);
                            });
                        break;
                    case 3: //present of male candidate
                        this.dbRef.where('Destination', '==', this.state.delegation)
                            .where('Gender', '==', 'זכר')
                            .get()
                            .then(querySnapshot => {
                                let precent = Number((querySnapshot.size* 100) / this.state.numOfReg).toFixed(2);
                                rowData.push(precent +'%');
                                console.log((querySnapshot.size* 100) / this.state.numOfReg);
                            });
                        break;
                    case 4:
                        //num of female candidate
                        this.dbRef.where('Destination', '==', this.state.delegation)
                            .where('Gender', '==', 'נקבה')
                            .get()
                            .then(querySnapshot => {
                                this.state.numOfFemale++;
                                this.state.numOfFemale = querySnapshot.size
                                rowData.push(this.state.numOfFemale)
                                console.log(this.state.numOfFemale)
                            });
                        break;
                    case 5:
                        //precent of female candidate
                        this.dbRef.where('Destination', '==', this.state.delegation)
                            .where('Gender', '==', 'נקבה')
                            .get()
                            .then(querySnapshot => {
                                let precent = Number((querySnapshot.size* 100) / this.state.numOfReg).toFixed(2) ;
                                rowData.push(precent +'%');
                                console.log('######CASE 5: ', (querySnapshot.size * 100) / this.state.numOfReg + "%")
                                //this.state.tableData.push(rowData);
                            });
                        break;
                    // case 6:
                }
            }
            console.log('this is before push!#!@#!@#')
            this.state.tableData.push(rowData);
            this.setState(rowData)

        }
        //this.forceUpdate();
    }

    render() {
        // this.cityChecker();
        const state = this.state;
        console.log(this.state);
        return (
            <ImageBackground source={require('../pics/background.jpeg')} style={styles.container}>

                <View style={styles.container}>
                    <View style={styles.headerTitle}>
                        <Text style={{fontSize:20}}> דוח 1 </Text>
                        <Text>דוח זה מנפיק נתונים על אודות הנרשמים בשבוע הנוכחי </Text>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                style={{width: 20}}
                                placeholder="choose destination"
                                placeholderStyle={{color: '#bfc6ea'}}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.delegation}
                                onValueChange={value => {
                                    this.cityChecker();
                                    this.setState({delegation: value});
                                }}>
                                <Picker.Item label="בחר משלחת" value="" />
                                {this.state.destinationArr.map((city, i) => {
                                    return (
                                        <Picker.Item label={city.name} value={city.name} key={i} />
                                    );
                                })}
                            </Picker>
                        </Item>
                        {console.log('current delegation: ', this.state.delegation)}

                        <Button
                            onPress={() => {
                                if(this.state.delegation == '')
                                {
                                    alert('נא לבחור משלחת')
                                }else{
                                    this.Generate()
                                    setTimeout(() => {
                                        this.setState({renderIndex: this.state.renderIndex + 1});
                                    }, 3000);
                                    // this.setState({key:key+1})
                                    this.setState({ key: this.state.key + 1 });
                                }

                            }}
                            title={'הנפק'}
                        />
                    </View>
                    <ScrollView horizontal={true} style={{marginTop: 20}}>
                        <View key={this.state.renderIndex}>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                <Row
                                    data={this.state.tableHead}
                                    widthArr={this.state.widthArr}
                                    style={styles.header}
                                    textStyle={styles.text}
                                />
                            </Table>
                            <ScrollView style={styles.dataWrapper}>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                    {this.state.tableData.map((rowData, index) => (
                                        <Row
                                            key={index}
                                            data={rowData}
                                            widthArr={this.state.widthArr}
                                            style={[
                                                styles.row,
                                                index % 2 && {backgroundColor: '#F7F6E7'},
                                            ]}
                                            textStyle={styles.text}
                                        />
                                    ))
                                    }
                                </Table>
                            </ScrollView>
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 5, paddingTop: 2},
    header: {height: 50, backgroundColor: '#537791'},
    text: {textAlign: 'center', fontWeight: '100'},
    dataWrapper: {marginTop: -1},
    row: {height: 40, backgroundColor: '#E7E6E1'},
});
