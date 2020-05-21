import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, I18nManager } from 'react-native';

export default class RadioButton extends Component {
	
    constructor() {
    super();
    this.state = { 
      value: null 
    }
  }
    // state = {
	// 	value: null,
	// };

	render() {
		
        I18nManager.forceRTL(true);
		const { value } = this.state;
        const { PROP } = this.props;

		return (
			<View>
				{PROP.map(res => {
					return (
						<View key={res.key} style={styles.container}>
							<Text style={styles.radioText}>{res.text}</Text>
							<TouchableOpacity
								style={styles.radioCircle}
								onPress={() => {
									this.setState({
										value: res.key,
									});
								}}>
                                  {value === res.key && <View style={styles.selectedRb} />}
							</TouchableOpacity>
						</View>
					);
				})}
                <Text> Selected: {this.state.value} </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        //formHorizontal={true}
        marginBottom: 35,
        alignItems: 'center',
        flexDirection: 'row',
		//justifyContent: 'space-between',
	},
    radioText: {
        marginRight: 35,
        fontSize: 15,
        color: '#000',
        fontWeight: '700'
    },
	radioCircle: {
		height: 30,
		width: 30,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: '#3740ff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 15,
		height: 15,
		borderRadius: 50,
		backgroundColor: '#3740ff',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});