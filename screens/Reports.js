import React from 'react';
import { View, Text } from 'react-native';

export default class Reports extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ marginTop: 16,fontSize: 20,}}>
                    This Reports Screen
                </Text>
            </View>
        );
    }
}