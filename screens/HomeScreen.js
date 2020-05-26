import React, { Component } from 'react';
import { Button,Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import {Header,Left,Right,Icon} from 'native-base';

export default class HomeScreen extends Component {
    
    render(){
        return (
        <View>
            <Header>
                <Left>
                    <Icon name='menu'  onPress={() => this.props.navigation.openDrawer()}/>
                </Left>
            </Header> 
            <ScrollView>
            <View>
            <Text style={{fontSize:40,color:'blue',marginTop:50}}>לוחמים ללא גבולות</Text>
            <Card>
                <CardSection>
            <Text style={{fontSize:26}}>ניתן להירשם כעת גם למשלחות החדשות, כאן בישראל!!</Text>
                </CardSection>
                <Text style={{fontSize:24}}>מי אנחנו?</Text>
            <Text> עמותת "לוחמים ללא גבולות" הינה עמותה ישראלית ציונית הפועלת למנף את התשתית העצומה של עשרות אלפי תרמילאים ישראלים בוגרי צבא המטיילים במדינות העולם השלישי לטובת התנדבות הומניטארית כחול לבן במדינות אלו כחלק מ"הטיול הגדול"</Text>
            </Card>
            <Text>העמותה הוקמה בשנת 2013 בידי שלושה קצינים בוגרי יחידת דובדבן אשר טיילו במזרח הרחוק ונחשפו לכמות הבלתי נתפסת של ישראלים המטיילים במדינות העולם השלישי במהלך "הטיול הגדול" (כמות הנאמדת בכ450,000 תרמילאים מדי עשור). המחשבה הייתה כי אם נשכיל למנף תשתית עצומה זו נוכל לעשות המון טוב וגם להציג את פניה היפות והאמיתיות של ישראל ובוגרי צה"ל בעולם.</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button onPress={() => this.props.navigation.navigate('RegistrationForm')} title="להגשת מועמדות"/> 
            </View>
            <View> 
                <Button onPress={() => this.props.navigation.navigate('LoginForm')} title="כניסה למורשים"/>
            </View>
            </ScrollView>
        </View>
        );
    }
}
