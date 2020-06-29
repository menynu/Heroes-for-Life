import React, { Component } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    View,
    Text,
    FlatList, ImageBackground
} from 'react-native';
import {SearchBar } from 'react-native-elements';
import firebase from '../database/firebaseDb';
import Information from './Information';
import {Card} from './common'


class Volunteer extends Component {

    constructor(props) {
        super(props);
        this.firestoreRef = firebase.firestore().collection('delegation');
        this.usersRef = firebase.firestore().collection('users');
        this.state = {
            volunteerDest: '',
            userDest: '',
            userPermission: '',
            isLoading: true,
            userArr: [],
            search: '',
            text: '',
            dataSource: [],
            orderStatus: '',


        };
        this.arrayholder = [];

    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user != null) {
                this.usersRef
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(documentSnapshot => {
                            console.log('THIS user email: ',user.email, 'this doc email: '  )
                            if(user.email===documentSnapshot.data().email){
                                this.state.userDest = documentSnapshot.data().delegation;
                                console.log('user delegation: ',documentSnapshot.data().delegation)
                                this.state.userPermission = documentSnapshot.data().permission;
                                console.log('user permission: ',this.state.userPermission)
                            }
                        });
                        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);

                    });

            }
        })

        this.state.dataSource = this.state.userArr
        this.arrayholder = this.state.userArr;
        this.setState(
            {
                isLoading: false,
            },
            function() {
                this.arrayholder = this.state.userArr;
            }
        );
    }


    getCollection = (querySnapshot) => {

        const userArr = [];
        const dataSource =[]
        querySnapshot.forEach((res) => {

            const { Name, Email, Mobile, Gender, Location, about_me, lang_support, meetDate, meetTime, Status } = res.data();

            if (res.data().Destination === this.state.userDest || this.state.userDest== '' )
            {

                userArr.push({
                    key: res.id,
                    res,
                    Name,
                    Email,
                    Mobile,
                    Gender,
                    Location,
                    about_me,
                    lang_support,
                    meetDate,
                    meetTime,
                    Status,



                });}
        });
        this.dataSource = this.state.userArr
        this.setState({
            dataSource: userArr,
            userArr,
            isLoading: false,

        });
        this.arrayholder = this.state.userArr;


    }


    getColor = (item) => {
        switch (item.Status) {
            case '6.לא עודכן':
            {
                // this.state.orderStatus = 1
                // this.setState({orderStatus: 1 })
                return  'white'
            }
            case '5.לא ענה (1)':
            {
                // this.setState({orderStatus: 2 })
                return "#fffb00"

            }

            case '4.לא ענה (2)':
            {
                // this.setState({orderStatus: 3 })
                return "#ffdd00"
            }

            case '3.לא ענה (3)':
            {
                // this.setState({orderStatus: 4 })
                return "#ffa600"
            }
            case '1.לא רלוונטי':
            {
                // this.setState({orderStatus: 6 })
                return "#ff3333"
            }
            case '2.ענה ומגיע':
            {
                // this.setState({orderStatus: 5 })
                return "#00e600"
            }

        }
    }

    SearchFilterFunction(text) {

        const newData = this.arrayholder.filter(function(item) {
            const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            dataSource: newData,
            search:text,
        });
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 0.3,
                    width: '90%',
                    backgroundColor: '#5a77a1',
                }}
            />
        );
    };
    render() {
        if (this.state.isLoading) {
            //Loading View while data is loading
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <ImageBackground source={require('./pics/background.jpeg')} style={styles.container}>

                <View style={styles.viewStyle}>
                    <Text style={{color:'black', fontSize: 26, fontWeight:'bold', alignContent:"center", textAlignVertical: 'center'}}>
                        נתוני המועמדים במשלחת {this.state.userDest} </Text>
                    <SearchBar
                        round
                        containerStyle={{backgroundColor:'transparent'}}
                        searchIcon={{ size: 24 }}
                        onChangeText={text => this.SearchFilterFunction(text)}
                        placeholder="חיפוש לפי שם מועמד"
                        value={this.state.search}
                    />

                    <Card>
                        <Text style ={{fontSize:20,fontWeight: 'bold', textAlign: 'center'}}>מקרא צבעים:</Text>

                        <View style={{flexDirection:'row',textAlign: 'right' ,writingDirection:'rtl'}}>
                            <Text>                    </Text>
                            <Text style ={{fontWeight: 'bold', textAlign: 'center', color:'#ffa600'}}> לא ענה (3) </Text>
                            <Text style ={{fontWeight: 'bold', textAlign: 'right', color:'#ffdd00'}}> לא ענה (2) </Text>
                            <Text style ={{fontWeight: 'bold', textAlign: 'right', color:'#fffb00'}}>  לא ענה (1) </Text>
                            <Text style ={{fontWeight: 'bold', textAlign: 'right', color:'white'}}> לא עודכן </Text>


                        </View>
                        <View style={{flexDirection:'row', writingDirection:'rtl'}}>
                            <Text>                                                            </Text>
                            <Text style ={{fontWeight: 'bold', textAlign: 'right', color:'#ff3333'}}> לא רלוונטי </Text>
                            <Text style ={{fontWeight: 'bold', textAlign: 'right', color:'#00e600'}}> ענה ומגיע </Text>

                        </View>

                    </Card>
                    <FlatList
                        data={this.state.dataSource.sort((b, a) => a.Status.localeCompare(b.Status))}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        renderItem={({ item }) => (
                            <Card >
                                <View style={{borderRadius:10,borderColor:'white',borderWidth:2}}>
                                    <Text style={{backgroundColor: this.getColor(item), fontSize: 16,  color:'black'}}> שם:{item.Name}</Text>
                                    <Text style={{backgroundColor: this.getColor(item), fontSize: 16,  color:'black'}}> אימייל: {item.Email}  </Text>
                                    <Text style={{
                                        color: 'white',
                                        flex: 1,
                                        alignItems: "center",
                                        textAlign: "center"
                                    }}
                                          onPress={() => this.props.navigation.navigate('Information',{userKey: item.key}) }>
                                        לפרטים נוספים על המועמד לחץ כאן
                                    </Text>
                                </View>
                            </Card>
                        )}
                        enableEmptySections={true}
                        style={{ marginTop: 10 }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    viewStyle: {
        justifyContent: 'center',
        flex: 1,
        // backgroundColor:'white',
        // marginTop: Platform.OS == 'ios'? 30 : 0
    },
    textStyle: {
        padding: 10,
    },
});

export default Volunteer;
