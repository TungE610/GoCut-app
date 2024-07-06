import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Animated, Image, Dimensions, Text, TouchableHighlight, ImageBackground, TextInput, ClipP } from 'react-native';
import { ClipPath, Ellipse } from 'react-native-svg';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { showMessage } from "react-native-flash-message";
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

const splash1 = require('../assets/splash1.jpeg');

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');

const storeToken = async (value) => {
	try {
		await AsyncStorage.setItem('bearerToken', value);

	} catch (error) {
		console.log("error");
		if (error.response && error.response.data) {
			console.log(error.response.data.error);
		} else {
			console.log(error);
		}
	}
};

const storeUserId = async (value) => {
	try {
		await AsyncStorage.setItem('userId', value);

	} catch (error) {
		console.log("error");
		if (error.response && error.response.data) {
			console.log(error.response.data.error);
		} else {
			console.log(error);
		}
	}
};


const SplashScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(true);

	const host = 'https://salon-docker-production.up.railway.app';

	const countryCode = "+84";
	let confirm = null;

	const requestOtp = async (ref) => {
		confirm = await auth().signInWithPhoneNumber(countryCode + ref.current.value);
	}
	const signupPhoneNumberRef = useRef("")
	const loginPhoneNumberRef = useRef("")

	const signupOtpRef = useRef("")
	const loginOtpRef = useRef("")


	const animationRef = useRef();
	const animatedImageScale = new Animated.Value(0);
	const animatedButtonFade = new Animated.Value(1);
	const animatedLoginFormShow = new Animated.Value(0);
	const animatedSignupFormShow = new Animated.Value(0);
	const animatedLoginFormTransition = new Animated.Value(0);
	const animatedSignupFormTransition = new Animated.Value(0);
	const animatedLoginOTPShow = new Animated.Value(0);
	const animatedSignupOTPShow = new Animated.Value(0);
	const animatedLoginOTPTransition = new Animated.Value(0);
	const animatedSignupOTPTransition = new Animated.Value(0);

	const loginBtnPressedHandler = () => {
		Animated.spring(animatedButtonFade, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedImageScale, {
			toValue: -viewportHeight / 2,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedLoginFormShow, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedSignupFormShow, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedLoginFormTransition, {
			toValue: -viewportHeight,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedSignupFormTransition, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();
	}

	const signUpBtnPressedHandler = () => {

		Animated.spring(animatedButtonFade, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedImageScale, {
			toValue: -viewportHeight / 2,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedLoginFormShow, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedSignupFormShow, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedLoginFormTransition, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedSignupFormTransition, {
			toValue: -viewportHeight,
			duration: 2000,
			useNativeDriver: true,
		}).start();
	}

	const closeButtonClickedHandler = () => {
		Animated.spring(animatedImageScale, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedButtonFade, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedLoginOTPShow, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedLoginFormShow, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedLoginFormTransition, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedSignupFormTransition, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();
	}

	const sendLoginOTPBtnClickHandler = async () => {

		await requestOtp(loginPhoneNumberRef)

		Animated.spring(animatedLoginOTPShow, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedLoginFormShow, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedLoginFormTransition, {
			toValue: viewportHeight,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedLoginOTPTransition, {
			toValue: -viewportHeight,
			duration: 2000,
			useNativeDriver: true,
		}).start();
	}

	const sendSignupOTPBtnClickHandler = async () => {

		await requestOtp(signupPhoneNumberRef)

		Animated.spring(animatedSignupOTPShow, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedSignupFormShow, {
			toValue: 0,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedSignupFormTransition, {
			toValue: viewportHeight,
			duration: 2000,
			useNativeDriver: true,
		}).start();

		Animated.spring(animatedSignupOTPTransition, {
			toValue: -viewportHeight,
			duration: 2000,
			useNativeDriver: true,
		}).start();
	}

	const animatedLoginShowStyle = {
		opacity: animatedLoginFormShow,
		transform: [{ translateY: animatedLoginFormTransition }]
	};

	const animatedSignupShowStyle = {
		opacity: animatedSignupFormShow,
		transform: [{ translateY: animatedSignupFormTransition }]
	};

	const animatedFadeStyle = {
		opacity: animatedButtonFade,
		transform: [{ translateY: animatedImageScale }]
	};

	const animatedScaleStyle = {
		transform: [{ translateY: animatedImageScale }]
	};

	const animatedLoginOTPStyle = {
		opacity: animatedLoginOTPShow,
		transform: [{ translateY: animatedLoginOTPTransition }]
	};

	const animatedSignupOTPStyle = {
		opacity: animatedSignupOTPShow,
		transform: [{ translateY: animatedSignupOTPTransition }]
	};

	useEffect(() => {
		const playAnimation = () => {
			animationRef.current?.play();
		}

		playAnimation();
	}, []);


	const signup = async () => {
		try {
			let res = await confirm.confirm(signupOtpRef.current.value);

			res = await axios.post(`${host}/api/signup`, {
				phone_number: res.user.phoneNumber,
			})

			signupPhoneNumberRef.current.value = "";
			signupOtpRef.current.value = "";
			showMessage({
				message: "Successfully signed up !!",
				type: "success",
				autoHide: true,
				duration: 2000,
			});
			navigation.navigate("Dashboard");

		} catch (error) {
			if (error.response && error.response.data) {
				console.log(error.response.data.error);
			} else {
				console.log(error);
			}
		}
	}

	const login = async () => {
		try {
			let res = await confirm.confirm(loginOtpRef.current.value);

			res = await axios.post(`${host}/api/login`, {
				phone_number: loginPhoneNumberRef.current.value,
			})

			if (res.data.status_code === 200) {

				showMessage({
					message: "Welcome back!!",
					type: "success",
					autoHide: true,
					duration: 1500,
				});

				await storeToken(res.data.access_token);
				await storeUserId(res.data.user_id);

				if (res.data.role && res.data.role  === 'barber') {
					navigation.navigate("BarberOrder");
				} else {
					navigation.navigate("Dashboard");
				}
			}

			loginPhoneNumberRef.current.value = "";
			loginOtpRef.current.value = "";


		} catch (error) {
			if (error.response && error.response.data) {
				console.log(error.response.data.error);
			} else {
				console.log(error);
			}
		}

	}

	return (
		<View style={styles.container}>
			{isLoading ? <LottieView
				ref={(animation) => {
					animationRef.current = animation;
				}}
				source={require('../assets/lottie/lottie4')}
				autoPlay
				loop={false}
				style={styles.lottieView}
				onAnimationFinish={() => { setIsLoading(false) }}
			/> : null}
			{!isLoading ?
				<View>
					<Animated.View style={[styles.animatedContainer, animatedScaleStyle]}>
						<ClipPath id="clipPathId">
							<Ellipse cx={viewportWidth / 2} rx={viewportHeight} ry={viewportHeight} />
						</ClipPath>
						<FastImage style={styles.backgroundImageContainer} source={splash1} imageStyle={{ opacity: 0.4 }} clipPath="url(#clipPathId)" >
							<Text style={styles.text}>Booking your appointment <Text style={styles.decoratedText}>Quickly</Text> at the <Text style={styles.decoratedText}>BEST</Text> salons</Text>
						</FastImage>
						<TouchableHighlight style={styles.closeButtonContainer} onPress={closeButtonClickedHandler}>
							<Text style={{ color: '#fff' }}>X</Text>
						</TouchableHighlight>
					</Animated.View>
					<Animated.View style={[animatedFadeStyle]}>
						<TouchableHighlight style={styles.loginButton} onPress={() => { loginBtnPressedHandler() }}>
							<Text style={styles.btnText}>Login</Text>
						</TouchableHighlight>
					</Animated.View>
					<Animated.View style={[animatedFadeStyle]}>
						<TouchableHighlight
							style={styles.signUpButton}
							onPress={() =>
								signUpBtnPressedHandler()
							}>
							<Text style={styles.btnText}>Sign Up</Text>
						</TouchableHighlight>
					</Animated.View>
					<Animated.View style={[styles.loginContainer, animatedLoginShowStyle]}>
						<TextInput
							style={styles.phoneNumberInput}
							placeholder="Login Phone number"
							placeholderTextColor="#3d5c98"
							onChangeText={(value) => {loginPhoneNumberRef.current.value = value; }}
							ref={loginPhoneNumberRef}
						/>
						<TouchableHighlight style={styles.formButton} onPress={sendLoginOTPBtnClickHandler}>
							<Text style={styles.formBtnText}>Send Login OTP</Text>
						</TouchableHighlight>
					</Animated.View>
					<Animated.View style={[styles.signupContainer, animatedSignupShowStyle]}>
						<TextInput
							style={styles.phoneNumberInput}
							placeholder="Signup Phone number"
							placeholderTextColor="#3d5c98"
							onChangeText={(value) => { signupPhoneNumberRef.current.value = value; }}
							ref={signupPhoneNumberRef}
						/>
						<TouchableHighlight style={styles.formButton} onPress={sendSignupOTPBtnClickHandler}>
							<Text style={styles.formBtnText}>Send Signup OTP</Text>
						</TouchableHighlight>
					</Animated.View>
					<Animated.View style={[styles.otpInputContainer, animatedLoginOTPStyle]}>
						<TextInput style={styles.otpInput} placeholder="OTP" placeholderTextColor="#3d5c98" value={loginOtpRef.current.value} onChangeText={(value) => { loginOtpRef.current.value = value; }} ref={loginOtpRef} />
						<TouchableHighlight style={styles.formButton} onPress={async () => { await login(); }}>
							<Text style={styles.formBtnText} >
								Login
							</Text>
						</TouchableHighlight>
					</Animated.View>
					<Animated.View style={[styles.otpInputContainer, animatedSignupOTPStyle]}>
						<TextInput style={styles.otpInput} placeholder="OTP" placeholderTextColor="#3d5c98" value={signupOtpRef.current.value} onChangeText={(value) => { signupOtpRef.current.value = value; }} ref={signupOtpRef} />
						<TouchableHighlight style={styles.formButton} onPress={async () => { await signup(); }}>
							<Text style={styles.formBtnText} >
								Signup
							</Text>
						</TouchableHighlight>
					</Animated.View>
				</View> : ''}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: viewportWidth,
		height: viewportHeight,
		backgroundColor: '#fff',
		justifyContent: 'center'

	},
	animatedContainer: {
		width: viewportWidth,
		height: viewportHeight,
		borderRadius: 20,
	},
	backgroundImageContainer: {
		backgroundColor: '#3d5c98',
		width: '100%',
		height: '100%',
		position: 'relative',
		resizeMode: "cover",
		justifyContent: 'center',
		borderRadius: 10,
	},
	closeButtonContainer: {
		position: 'absolute',
		bottom: -50,
		height: 50,
		width: 50,
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: '#3d5c98',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		borderWidth: 2,
		borderColor: '#fff',
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 1,
		alignItems: 'center',
		borderRadius: 50,
		color: '#fff'
	},
	lottieView: {
		width: viewportWidth / 10,
		height: viewportHeight / 3,
		paddingLeft: 10,
	},
	loginButton: {
		position: 'absolute',
		bottom: viewportHeight / 7.8,
		color: '#3d5c98',
		left: viewportWidth / 6,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 50,
		elevation: 3,
		backgroundColor: '#3D5C98',
		width: viewportWidth / 1.5,
		borderWidth: 2,
		borderColor: '#fff'
	},
	signUpButton: {
		position: 'absolute',
		bottom: viewportHeight / 15,
		color: '#3d5c98',
		left: viewportWidth / 6,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 50,
		elevation: 3,
		backgroundColor: '#3D5C98',
		width: viewportWidth / 1.5,
		borderWidth: 2,
		borderColor: '#fff'
	},
	decoratedText: {
		color: 'yellow',
		textDecorationStyle: 'solid',
		textDecorationLine: 'underline',
		textDecorationColor: 'yellow',
	},
	text: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 24,
		fontWeight: "800",
		position: 'absolute',
		bottom: viewportHeight / 4,
		alignSelf: 'center',
		paddingHorizontal: 10,
	},
	btnText: {
		fontSize: 20,
		lineHeight: 21,
		fontWeight: 'bold',
		letterSpacing: 0.25,
		color: '#fff',
	},
	loginText: {
		color: '#3d5c98',
		fontSize: 30,
		fontWeight: "800",
		marginBottom: 20,
	},
	phoneNumberInput: {
		height: viewportHeight / 15,
		width: viewportWidth * 9 / 10,
		borderWidth: 2,
		borderColor: '#3d5c98',
		padding: 10,
		borderRadius: 10,
		fontSize: 20,
		color: '#3d5c98'
	},
	otpInputContainer: {
		position: 'absolute',
		bottom: -viewportHeight / 1.3,
		paddingHorizontal: viewportWidth / 20,
	},
	otpInput: {
		padding: 10,
		height: viewportHeight / 15,
		width: viewportWidth * 9 / 10,
		borderWidth: 2,
		borderColor: '#3d5c98',
		borderRadius: 10,
		marginTop: 20,
		fontSize: 20,
		color: '#3d5c98'
	},
	loginContainer: {
		position: 'absolute',
		zIndex: 2,
		bottom: -viewportHeight / 1.3,
		paddingTop: 0,
		paddingHorizontal: viewportWidth / 20,
		backgroundColor: '#fff'
	},
	signupContainer: {
		position: 'absolute',
		zIndex: 3,
		bottom: -viewportHeight / 1.3,
		paddingTop: 0,
		paddingHorizontal: viewportWidth / 20,
		backgroundColor: '#fff'
	},
	formButton: {
		marginTop: 30,
		borderWidth: 2,
		borderColor: '#fff',
		borderRadius: 20,
		padding: 10,
		backgroundColor: '#3d5c98',
	},
	formBtnText: {
		color: '#fff',
		fontSize: 24,
		fontWeight: "800",
		textAlign: 'center'
	},
})

export default SplashScreen;
