import React from 'react';
// import { Container, Header, Content,Button, Icon, Form,Text, Item, Input, Label} from 'native-base';
import { StyleSheet, Text, View, Picker, Button, Modal, TouchableHighlight } from 'react-native';
import firebase from '../../database/firebaseDb';

export default class PickerDel extends React.Component {
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
            <View style={styles.container}>
                <Text>The default value is { this.state.pickerSelection }</Text>
                <Button onPress={() => this.togglePicker()} title={ "Select a value!" } />
                {/* <Picker
          style={{ backgroundColor: '#fafafa', position: 'absolute', bottom: 0, left: 0, right: 0 }}
          selectedValue={ this.state.pickerSelection }
          onValueChange={(itemValue, itemIndex) => this.setState({ pickerSelection: itemValue})}>
          <Picker.Item label="Chicken" value="chicken" />
          <Picker.Item label="Eggs" value="eggs" />
          <Picker.Item label="Vegetables" value="vegetables" />
        </Picker> */}

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
