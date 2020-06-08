import React, { Component } from 'react';
import { Button,Image, Platform, StyleSheet, Text, TouchableOpacity, View, ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import { Card1, CardSection1 } from './common';
import { withTheme } from 'react-native-elements';
// import Video from 'react-native-video';
import { Card1 } from './common/Card1';
import { CardSection1 } from './common/CardSection1';




export default class HomeScreen extends Component {
    
    render(){
        return (

        <View style= {{flex: 1, backgroundColor: "white"}}>
            <View style={styles.headerTitle}>
                <Image source={require('./pics/hflCustom.png')} style={styles.HomeScreenLogo}
                       style={{
                           marginTop: 5,
                           marginBottom: 5,
                           resizeMode: 'contain',
                           flex: 1,
                           justifyContent: 'center',
                           alignItems: 'center',
                           width: '100%',
                           height: '100%',
                       }}
                />
            </View> 

        <ScrollView>
            <View>
                <Card1>
                    <View>
                        <ImageBackground source={require('./pics/introBackground.jpg')} style={styles.introBackground}>

                        <View><Text> </Text></View>
                        <View><Text> </Text></View>
                        

                        <CardSection1>
                            <Text style={styles.textTitle}>לוחמים ללא גבולות</Text>
                            <Text style={styles.line}>__________________</Text>
                            <View><Text> </Text></View>
                        </CardSection1>

                        <View style={styles.messageBox}>
                            <CardSection1 >
                                <Text style={styles.textMessage}>ניתן להירשם כעת גם למשלחות החדשות, כאן בישראל!!</Text>
                            </CardSection1>
                        </View>

                        <View style={styles.signUp}>
                            <CardSection1>
                                <Button 
                                    onPress={() => this.props.navigation.navigate('RegistrationForm')}
                                    title="     להתנדבות     "
                                    color = "#31c5c7"
                                /> 
                            </CardSection1>
                        </View>


                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>

                        </ImageBackground>
                    </View>
                </Card1>

                <Card1>
                    <View>
                        <ImageBackground source={require('./pics/israelFlag.jpg')} style={styles.introBackground}>
                            <View style={styles.aboutContainer}>
                                <CardSection1>
                                    <Text></Text>
                                    <Text></Text>
                                    <Text style={styles.textWho}>מי אנחנו?</Text>
                                    <Text style={styles.line}>__________________</Text>
                                </CardSection1>

                                <CardSection1>
                                    <Text style={styles.textAbout1}>עמותת "לוחמים ללא גבולות" הינה עמותה ישראלית ציונית הפועלת למנף את התשתית העצומה של עשרות אלפי תרמילאים ישראלים בוגרי צבא המטיילים במדינות העולם השלישי לטובת התנדבות הומניטארית כחול לבן במדינות אלו כחלק מ"הטיול הגדול"</Text>

                                    <Text style = {styles.textAbout2}>העמותה הוקמה בשנת 2013 בידי שלושה קצינים בוגרי יחידת דובדבן אשר טיילו במזרח הרחוק ונחשפו לכמות הבלתי נתפסת של ישראלים המטיילים במדינות העולם השלישי במהלך "הטיול הגדול" (כמות הנאמדת בכ450,000 תרמילאים מדי עשור). המחשבה הייתה כי אם נשכיל למנף תשתית עצומה זו נוכל לעשות המון טוב וגם להציג את פניה היפות והאמיתיות של ישראל ובוגרי צה"ל בעולם.</Text>
                                </CardSection1>
                            </View>    
                        </ImageBackground>
                    </View>
                </Card1>

                <Card1>
                    <View>
                        <CardSection1>
                            <Button
                                onPress={() => this.props.navigation.navigate('LoginForm')}
                                title="כניסה למורשים"
                                color = "#31c5c7"
                            />
                        </CardSection1>
                    </View>
                </Card1>
            </View>
            

        </ScrollView>
        </View>

        );
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    },
    introBackground: {

    },
    headerTitle: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: "white"
    },
    line: {
        color: "#e0ebeb",
        fontSize: 20,
        textAlign: 'center',
    },
    HomeScreenImage: {
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: "contain",
        width: '48%',
        height: 70,
        marginHorizontal: '24%',
    },
    HomeScreenLogo: {
        resizeMode: "contain",
        width: '48%',
        height: 50,
        marginHorizontal: '61.5%',
    },
    textTitle: {
        fontSize:40,
        marginLeft: 20 ,
        color:'#31c5c7',
        fontWeight: "bold",
        marginTop:50,
        fontFamily: 'Roboto'
    },
    textMessage: {
        color: 'white',
        fontSize:26,
        alignContent: 'center',
        includeFontPadding: true,
        textAlign: 'center',
    },
    messageBox: {
        alignItems: 'center',
        },
    signUpButton: {
        marginTop: 20,
        padding: 20,
        },
    signUp: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        },
    aboutContainer: {
            marginHorizontal: 25
        },
    textWho: {
        fontWeight: "bold",
        fontSize: 30,
        color: "black",
        textAlign: 'center',
    },
    textAbout1: {
        color: "black",
        fontSize: 26,
        flex: 1,
        textAlign: 'justify',
    },
    textAbout2: {
        color: "black",
        fontSize: 23,
        textAlign: 'justify',
    },
});
