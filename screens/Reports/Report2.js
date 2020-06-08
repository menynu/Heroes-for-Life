import React from 'react';
import { View, Text } from 'react-native';
import {Button} from "native-base";

export default class Report2 extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ marginTop: 16,fontSize: 20,alignItems: "center"}}>
                    דוח שבועי
                </Text>
                <View>
                    <Text> to do picker of delegation</Text>
                </View>
                <Button rounded>
                    <Text>הנפק</Text>
                </Button>
            </View>
        );
    }
}