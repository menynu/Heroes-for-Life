import React from 'react';
 //import {Button} from 'native-base';
import { StyleSheet, Text,Button, View, Modal, TouchableHighlight } from 'react-native';
import firebase from '../../database/firebaseDb';

export default class Report1 extends React.Component {
    constructor(props) {
        super(props);
        this.firestoreRef = firebase.firestore().collection('delegationList');

        this.state = {
            pickerSelection: 'Default value!',
            pickerDisplayed: false,
            delegationName: [],
        }
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getList);
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    getList = (querySnapshot) =>{
        const delegationName= [];
            querySnapshot.forEach((res)=>{
                const { name,expiration} = res.data();
                delegationName.push({
                    res,
                    name,
                    expiration,
                });
            });
            this.setState({
                delegationName: delegationName,
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
                    דוח שבועי
                </Text>


                <Text>The default value is { this.state.pickerSelection }</Text>
                <Button onPress={() => this.togglePicker()} title={ "בחר משלחת" } />


                <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
                    <View style={{ margin: 20, padding: 20,
                        backgroundColor: '#efefef',
                        bottom: 20,
                        left: 20,
                        right: 20,
                        alignItems: 'center',
                        position: 'absolute' }}>
                        <Text>Please pick a value</Text>
                        { this.state.delegationName.map((value, index) => {
                            return <TouchableHighlight key={index} onPress={() => this.setPickerValue(value.name)} style={{ paddingTop: 4, paddingBottom: 4 }}>
                                <Text>{ value.name }</Text>
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