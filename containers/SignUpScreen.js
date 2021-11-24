import React, { useState } from 'react';
import {
	Button,
	Text,
	TextInput,
	View,
	ScrollView,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import axios from 'axios';

export default function SignUpScreen({ setToken }) {
	const navigation = useNavigation();
	const [email, setEmail] = useState('test@0mail.com');
	const [username, setUsername] = useState('test');
	const [password, setPassword] = useState('123456');
	const [confirmPassword, setConfirmPassword] = useState('123456');
	const [description, setDescription] = useState('xbxcncvncv');
	const [error, setError] = useState('');

	const onSubmit = async () => {
		//Vérifier que tous les champs sont remplis
		if (email && username && password && confirmPassword && description) {
			setError('');
			if (password === confirmPassword) {
				try {
					const response = await axios.post(
						'https://express-airbnb-api.herokuapp.com/user/sign_up',
						{
							email: email,
							password: password,
							description: description,
							username: username,
						}
					);
					console.log(response.data);

					//Cette ligne !!!!
					setToken(response.data.token);
				} catch (error) {
					console.log(error.response.status);
					console.log(error.response.data);
					if (
						error.response.data.error ===
							'This username already has an account.' ||
						error.response.data.error ===
							'This email already has an account.'
					) {
						setError(error.response.data.error);
					}
				}
			} else {
				setError('Les 2 MDP ne sont pas identiques');
			}
		} else {
			setError('Remplir tous les champs');
		}
	};
	return (
		<ScrollView>
			<View style={styles.mainContainer}>
				<Image
					style={styles.logo}
					source={require('../assets/airbnb.png')}
				/>
				<TextInput
					value={email}
					style={styles.input}
					onChangeText={(mail) => {
						setEmail(mail);
					}}
					placeholder='email'
					secureTextEntry={false}
				/>
				<TextInput
					value={username}
					style={styles.input}
					onChangeText={(mail) => {
						setUsername(mail);
					}}
					placeholder='username'
					secureTextEntry={false}
				/>

				<TextInput
					multiline
					numberOfLines={5}
					value={description}
					style={styles.area}
					onChangeText={(mail) => {
						setDescription(mail);
					}}
					placeholder='description'
					secureTextEntry={false}
				/>
				<TextInput
					value={password}
					style={styles.input}
					onChangeText={(mail) => {
						setPassword(mail);
					}}
					placeholder='password'
					secureTextEntry={true}
				/>
				<TextInput
					value={confirmPassword}
					style={styles.input}
					onChangeText={(mail) => {
						setConfirmPassword(mail);
					}}
					placeholder='confirmPassword'
					secureTextEntry={true}
				/>
				<Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>
				<TouchableOpacity
					style={styles.signupButton}
					title='Sign up'
					onPress={onSubmit}>
					<Text style={{ textAlign: 'center', fontSize: 20 }}>
						Sign up
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('SignIn');
					}}>
					<Text
						style={{
							color: 'grey',
							marginTop: 20,
							textAlign: 'center',
						}}>
						Already have an account ? Sign in
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	mainContainer: {
		alignItems: 'center',
		marginVertical: 25,
	},
	logo: {
		height: 100,
		width: 100,
	},
	input: {
		borderColor: 'transparent',
		borderBottomColor: 'red',
		borderWidth: 1,
		width: '80%',
		paddingTop: 20,
		paddingBottom: 10,
		marginTop: 30,
	},
	area: {
		borderColor: 'red',
		borderWidth: 1,
		width: '80%',

		// paddingBottom: 10,
		marginTop: 30,
	},
	signupButton: {
		textAlign: 'center',
		padding: 15,
		marginTop: 20,
		fontSize: 25,
		borderColor: 'red',
		borderWidth: 2,
		borderRadius: 40,
		width: 200,
	},
});
