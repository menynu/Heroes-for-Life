import React from 'react';
// import { Container, Header, Content,Button, Icon, Form,Text, Item, Input, Label} from 'native-base';
import { StyleSheet, Text, View, Picker, Button, Modal, TouchableHighlight } from 'react-native';
import firebase from '../../database/firebaseDb';

export default class Report3 extends React.Component {
    constructor(props) {
        super(props);
        this.firestoreRef = firebase.firestore().collection('delegation');

        this.state = {
            pickerSelection: 'Default value!',
            pickerDisplayed: false,
            locationName: [],
        }
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getAreaList);
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    getAreaList = (querySnapshot) =>{
        const locationName= [];
        querySnapshot.forEach((res)=>{
            const { Location} = res.data();
            locationName.push({
                res,
                Location,
            });
        });
        this.setState({
            locationName: locationName,
            isLoading: false,
        })


    }

    setPickerValue(newValue) {
        this.setState({
            pickerSelection: newValue
        })

        this.togglePicker();
    }

    togglePicker() {
        this.setState({
            pickerDisplayed: !this.state.pickerDisplayed
        })
    }

    render() {
        return (
            <View >
                <Text style={{ marginTop: 16,fontSize: 20,alignItems: "center"}}>
                    דוח אזורים - איך שמעת על העמותה
                </Text>
                <Text>The default value is { this.state.pickerSelection }</Text>
                <Button onPress={() => this.togglePicker()} title={ "Select a value!" } />
                <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
                    <View style={{ margin: 20, padding: 20,
                        backgroundColor: '#efefef',
                        bottom: 20,
                        left: 20,
                        right: 20,
                        alignItems: 'center',
                        position: 'absolute' }}>
                        <Text>Please pick a value</Text>
                        { this.state.locationName.map((value, index) => {
                            return <TouchableHighlight key={index} onPress={() => this.setPickerValue(value.Location)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                                <Text>{ value.Location }</Text>
                            </TouchableHighlight>
                        })}


                        <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
                            <Text style={{ color: '#999' }}>Cancel</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
                <View>
                    <Button title={ "הנפק" } />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

//     render() {
//         return (
//             <View >
//                 <Text style={{ marginTop: 16,fontSize: 20,alignItems: "center"}}>
//                     דוח שבועי
//                 </Text>
//                 <View>
//                     <Text> to do picker of delegation</Text>
//                 </View>
//                 <Button rounded>
//                     <Text>הנפק</Text>
//                 </Button>
//
//                 <View>
//
//
//
//
//
//
//                 </View>
//             </View>
//         );
//     }
// }