import React, { Component } from 'react';
import { Button,Image, Platform, StyleSheet, Text, TouchableOpacity, View, ImageBackground} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import { Card, CardSection } from './common';
import { withTheme } from 'react-native-elements';
import { Card1 } from './common/Card1';
import { CardSection1 } from './common/CardSection1';


export default class OurVisionScreen extends Component {
    
    render(){
        return (

        <View style= {{flex: 1, backgroundColor: "white"}}>
            <View style={styles.headerTitle}>
                <Image source={require('./pics/hflCustom.png')} style={styles.HomeScreenLogo} />
            </View> 

        <ScrollView>
            <View>
                <Card1>
                    <View style = {styles.Top}>
                        <CardSection1>
                            <View>
                                <Text></Text>
                                <Text style={styles.textTitle}>החזון שלנו</Text>
                                <Text></Text>
                                <Text style={styles.line}>__________________________________________________________________________________</Text>
                                <Text></Text>
                                <View style={styles.aboutContainer1}>
                                    <Text style={styles.textAbout2}>אנו מאמינים כי מדינת ישראל צריכה להיות לא רק מעצמת הייטק, מדע וחקלאות אלא גם ובעיקר מעצמה של חסד והתנדבות.</Text>
                                </View>
                                <View style={styles.aboutContainer2}>
                                    <Text style={styles.textAbout2}>בחזוננו הפרויקט הופך למפעל התנדבות ישראלי חובק עולם המפעיל מרכזי התנדבות כחול לבן במדינות המזרח הרחוק, דרום אמריקה ואפריקה כאשר כל מחזור התנדבות שלנו מתחיל בהתנדבות בת שלושה ימים בארץ עם נוער בסיכון, זאת במסגרת פרויקט "עניי עירך" שלנו.</Text>
                                </View>
                            </View>
                        </CardSection1>

                        <Text> </Text>
                        <Text> </Text>
                        <Text style={styles.line}>__________________________</Text>
                        <Text> </Text>
                        <Text> </Text>
                        <Text> </Text>

                    </View>


                <View style={styles.Bottom}>
                    <CardSection1>
                        <Text> </Text>
                        <Text style={styles.textTitle2}>מטרות הארגון</Text>
                        <Text> </Text>
                        <Text style={styles.line}>________________________________________________________________________</Text>
                    </CardSection1>

                    <CardSection1>
                        <Text style={styles.textTitleBottom}>סיוע לאוכלוסיות הזקוקות לכך מבית ומחוץ</Text>
                        <Text> </Text>
                        <Text style={styles.textBodyBottom}>אנו מאמינים כי לפעילות העמותה יכולת להוות מחולל שינוי אמיתי לאוכלוסיות מוחלשות הן בארץ והן בעולם וזאת מבלי להמציא שום דבר מחדש פשוט לנצל תשתית אדירה שקיימת כבר וניצולה למעשים טובים.</Text>
                    </CardSection1>

                    <Text> </Text>
                    <Text style={styles.line}>__________________________</Text>
                    <Text> </Text>

                    <CardSection1>
                        <Text style={styles.textTitleBottom}>שיפור התדמית של צה''ל והמדינה בעולם</Text>
                        <Text> </Text>
                        <Text style={styles.textBodyBottom}>פעילות החוץ הינה בעלת פוטנציאל הסברתי עצום וכאמור אחת ממטרותיה היא לתמוך את מאמץ ההסברה של צה"ל ומדינת ישראל ולהביא לחיזוק אמון הקהילה הבינלאומית בצה"ל ובמדינה באמצעות סיקור תקשורתי והפצת תמונות אנושיות מהמשלחת.</Text>
                    </CardSection1>

                    <Text> </Text>
                    <Text style={styles.line}>__________________________</Text>
                    <Text> </Text>

                    <CardSection1>
                        <Text style={styles.textTitleBottom}>מתן ערך מוסף משמעותי לטיול הגדול</Text>
                        <Text> </Text>
                        <Text style={styles.textBodyBottom}>טיול הגדול אחרי צבא הינו התחנה האחרונה של המשוחררים הטריים קודם היותם אזרחים במדינה .שילוב ערכים והתנדבות דווקא בתחנה זו מהווה חיזוק משמעותי בדרכנו להיות חברה ערכית וטובה יותר.</Text>
                    </CardSection1>

                    <Text style={styles.line}>__________________________</Text>
                    <Text> </Text>
                    <Text> </Text>

                </View>
                </Card1>
                
            </View>
            
            

        </ScrollView>
        </View>

        );
    }
}
const styles = StyleSheet.create({
    Top: {
        backgroundColor: '#31c5c7',
        alignItems: 'center',
        width: '100%',
    },
    Bottom: {
        alignItems: 'center',
        marginLeft: 25,
        marginRight: 25,
        
    },
    HomeScreenLogo: {
        resizeMode: "contain",
        width: '48%',
        height: 50,
        marginHorizontal: '61.5%',
    },
    headerTitle: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: "white"
    },
    line: {
        color: "#e0ebeb",
        fontSize: 10,
        textAlign: 'center',
    },
    textTitle: {
        fontSize:30,
        color:'white',
        textAlign: 'center'
    },
    textTitle2: {
        fontSize:30,
        color:'black',
        textAlign: 'center'
    },
    aboutContainer1: {
            marginHorizontal: 2
        },
    aboutContainer2: {
            marginHorizontal: 26
        },
    textAbout2: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center'
    },
    textTitleBottom: {
        fontSize:21,
        color:'black',
        textAlign: 'center'
    },
    textBodyBottom: {
        textAlign: 'center',
        fontSize: 15
    }
});