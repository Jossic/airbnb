import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
	Button,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Image,
	StyleSheet,
} from 'react-native';
import { useState } from 'react';
import axios from 'axios';

export default function SignInScreen({ setToken }) {
	const navigation = useNavigation();

	const [email, setEmail] = useState('test@0mail.com');
	const [password, setPassword] = useState('123456');
	const [error, setError] = useState('');

	const onSubmit = async () => {
		if (email && password) {
			// setError('');

			try {
				const res = await axios.post(
					'https://express-airbnb-api.herokuapp.com/user/log_in',
					{
						email,
						password,
					}
				);
				console.log(`res =>`, res.data);
				// const data = res.json();
				// console.log(`data =>`, data);

				const userToken = 'secret-token';
				setToken(userToken);
				//Cette ligne !!!!
				// setToken(res.data.token);
			} catch (error) {
				console.log(error);
				// console.log(error.res.data);
				// if (
				// 	error.res.data.error ===
				// 		'This username already has an account.' ||
				// 	error.res.data.error ===
				// 		'This email already has an account.'
				// ) {
				// 	setError(error.res.data.error);
				// }
			}
		} else {
			setError('Remplir tous les champs');
		}
	};

	return (
		// <KeyboardAwareScrollView>
		<View style={styles.flex}>
			<View style={styles.item}>
				<Image
					style={styles.tinyLogo}
					source={require('../assets/airbnb.png')}
				/>
				<Text style={styles.signin}>Sign in</Text>
			</View>
			<View
				style={[styles.item, { width: '100%', alignItems: 'center' }]}>
				<TextInput
					value={email}
					style={styles.input}
					placeholder='email'
					onChangeText={(text) => {
						setEmail(text);
					}}
				/>

				<TextInput
					value={password}
					style={styles.input}
					placeholder='password'
					onChangeText={(text) => {
						setPassword(text);
					}}
					secureTextEntry={true}
				/>
			</View>

			<View style={styles.item}>
				{/* {error && <Text>error: {error.message}</Text>} */}
				<TouchableOpacity
					style={styles.signinButton}
					title='Sign in'
					onPress={onSubmit}>
					<Text style={{ textAlign: 'center', fontSize: 20 }}>
						Sign in
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('SignUp');
					}}>
					<Text
						style={{
							color: 'grey',
							marginTop: 20,
							textAlign: 'center',
						}}>
						No account ? Register
					</Text>
				</TouchableOpacity>
			</View>
		</View>
		// </KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	tinyLogo: {
		width: 100,
		height: 100,
		margin: 5,
	},
	signin: {
		textAlign: 'center',
		marginTop: 20,
		fontSize: 25,
	},
	input: {
		borderColor: 'transparent',
		borderBottomColor: 'red',
		borderWidth: 1,
		width: '80%',
		paddingTop: 20,
		paddingBottom: 10,
	},
	item: {
		flex: 1,
	},
	signinButton: {
		textAlign: 'center',
		padding: 15,
		marginTop: 20,
		fontSize: 25,
		borderColor: 'red',
		borderWidth: 2,
		borderRadius: 40,
		width: 200,
	},
	flex: {
		flex: 1,
		justifyContent: 'space-around',
		// alignContent: 'flex-end',
		alignItems: 'center',
	},
});
