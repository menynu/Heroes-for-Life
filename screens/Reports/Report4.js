

import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';

export default class Report4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['שם משלחת', 'סכ"ה נרשמים', 'סכ"ה נרשמים מפתיחת ההרשמה', 'גברים שנרשמו מפתיחת ההרשמה', 'גברים שנרשמו מפתיחת ההרשמה באחוזים', 'נשים שנרשמו מפתיחת ההרשמה', 'נשים שנרשמו מפתיחת ההרשמה באחוזים'],
            widthArr: [60, 60, 120, 120, 120, 120, 120]
        }
    }

    render() {
        const state = this.state;
        const tableData = [];
        for (let i = 0; i < 30; i += 1) {
            const rowData = [];
            for (let j = 0; j < 9; j += 1) {
                rowData.push(`${i}${j}`);
            }
            tableData.push(rowData);
        }

        return (
            <View style={styles.container}>
                <ScrollView horizontal={true}>
                    <View>
                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                            <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                {
                                    tableData.map((rowData, index) => (
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


// import React from 'react';
// import { View, Text } from 'react-native';
// import {Button} from "native-base";
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
//
//
// export default class Report3 extends React.Component {
//     render() {
//         return (
//             <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//                 <Text style={{ marginTop: 16,fontSize: 20,alignItems: "center"}}>
//                     דוח שבועי
//                 </Text>
//                 <View>
//                     <Text> to do picker of delegation</Text>
//                 </View>
//                 <Button rounded>
//                     <Text>הנפק</Text>
//                 </Button>
//             </View>
//         );
//     }
// }