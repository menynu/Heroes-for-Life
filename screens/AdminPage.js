import React from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView, ImageBackground,Image} from 'react-native';
import { Button, Text,Icon} from 'native-base';
import {Card} from "./common";


export default class AdminPage extends React.Component {

    render() {
        return (
            <SafeAreaView style={{backgroundColor: 'white',width:'100%',height:'100%'}}>

                <ImageBackground source={require('./pics/reportImage.jpg')} style={styles.container}>


                    <View style={{height:'100%',width:'100%'}}>
                        <Card >
                            <Text style={{fontSize:25,textAlign:"center" }}>הנפקת דוחות</Text>
                            <Text style={styles.line}>__________________________________________________________________________________</Text>

                            <View style={{paddingTop:'40%',}}>
                                <View style={{paddingTop:30,flexDirection:'row', flexWrap:'wrap',alignItems:'center', justifyContent:'center'}}>
                                <View style={{paddingRight:30}}>
                                 <Button style={styles.buttonStyle}
                                         onPress={() =>{this.props.navigation.navigate('Report2')}}>
                                    <Text style={styles.textButton}>לקבלת דוח איזורים לפי משלחת לחץ כאן  לקבלת דוח שבועי לפי משלחת לחץ כאן</Text>
                                 </Button>
                                </View>

                                    <Button style={styles.buttonStyle}
                                         onPress={() => {this.props.navigation.navigate('Report4')}}>
                                    <Text style={styles.textButton}>לקבלת דוח שבועי לפי משלחת לחץ כאן</Text>
                                    </Button>
                            </View>

                                <View style={{paddingTop:30,}}>


                                <View style={{flexDirection:'row', flexWrap:'wrap',alignItems:'center', justifyContent:'center'}}>
                                    <View style={{paddingRight:30}}>

                                    <Button style={styles.buttonStyle}
                                            onPress={() => {this.props.navigation.navigate('Report1')}}>
                                    <Text style={styles.textButton}> לקבלת דוח כללי כללי לחץ כאן</Text>


                                </Button>
                                    </View>
                                <Button style={styles.buttonStyle}
                                         onPress={()=>{this.props.navigation.navigate('Report3')}}>
                                    <Text style={styles.textButton}>לקבלת דוח איזורים על איך שמעת על העמותה לחץ כאן</Text>
                                </Button>
                                </View>

                            </View>
                            </View>
                        </Card>
                    </View>
                </ImageBackground>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    headerTitle: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: "white"
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    textStyle: {
        fontSize: 23,
        textAlign: 'center',
        color: '#f00',
    },
    textButton:{
        fontSize: 16,
        textAlign: 'center',
        color: '#ffffff',
    },

    buttonStyle:{
        height:150,
        width:150,
        borderRadius:10,
        borderColor: 'black',
        borderWidth:2,
        backgroundColor: 'transparent'

    },
    line: {
        color: "#e0ebeb",
        fontSize: 10,
        textAlign: 'center',
    },

});
