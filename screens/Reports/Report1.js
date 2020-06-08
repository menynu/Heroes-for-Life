import React from 'react';
// import { Container, Header, Content,Button, Icon, Form,Text, Item, Input, Label} from 'native-base';
import { StyleSheet, Text, View, Picker, Button, Modal, TouchableHighlight } from 'react-native';
import PickerDel from '/screens/common/PickerDel';

export default class Report1 extends React.Component {

    render() {
        return (
            <View >
                <Text style={{ marginTop: 16,fontSize: 20,alignItems: "center"}}>
                    דוח שבועי
                </Text>
                <PickerDel/>
                <Button rounded>
                    <Text>הנפק</Text>
                </Button>

                <View>






                </View>
            </View>
        );
    }
}