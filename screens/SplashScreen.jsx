import {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, Animated, Image, Dimensions, Text, TouchableHighlight, ImageBackground, TextInput, ClipP} from 'react-native';
import { ClipPath, Ellipse } from 'react-native-svg';
import LottieView from 'lottie-react-native';
import { Svg } from 'react-native-svg';
import axios from 'axios';

const splash1 = require ('../assets/splash1.jpeg');

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');

const SplashScreen = ({navigation}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [inputPhoneNumber, setInputPhoneNumber] = useState('');

	const phoneNumberRef = useRef("")

	const animationRef = useRef();
    const animatedImageScale = new Animated.Value(0);
	const animatedButtonFade = new Animated.Value(1);
    const animatedFormShow = new Animated.Value(0);
	const animatedFormTransition = new Animated.Value(0);
	const animatedOTPShow = new Animated.Value(0);
	const animatedOTPTransition = new Animated.Value(0);

	const loginBtnPressedHandler = () => {
		Animated.spring(animatedButtonFade, {
            toValue: 0,
			duration: 2000,
            useNativeDriver: true,
        }).start();

		Animated.spring(animatedImageScale, {
            toValue: -viewportHeight/2,
			duration: 2000,
            useNativeDriver: true,
        }).start();

		Animated.spring(animatedFormShow, {
            toValue: 1,
			duration: 2000,
            useNativeDriver: true,
        }).start();

		Animated.spring(animatedFormShow, {
            toValue: 1,
			duration: 2000,
            useNativeDriver: true,
        }).start();

		Animated.spring(animatedFormTransition, {
            toValue: -viewportHeight,
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
            toValue: -viewportHeight/2,
			duration: 2000,
            useNativeDriver: true,
        }).start();

		Animated.spring(animatedFormShow, {
            toValue: 1,
			duration: 2000,
            useNativeDriver: true,
        }).start();

		Animated.spring(animatedFormShow, {
            toValue: 1,
			duration: 2000,
            useNativeDriver: true,
        }).start();

		Animated.spring(animatedFormTransition, {
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

		Animated.spring(animatedFormShow, {
            toValue: 0,
			duration: 2000,
            useNativeDriver: true,
        }).start();

		Animated.spring(animatedFormTransition, {
            toValue: 0,
			duration: 2000,
            useNativeDriver: true,
        }).start();

		Animated.spring(animatedOTPTransition, {
            toValue: 0,
			duration: 2000,
            useNativeDriver: true,
        }).start();
	}

	const sendOTPBtnClickHandler = async () => {

		// setInputPhoneNumber(phoneNumberRef.current.text);
		// const phoneNumber = phoneNumberRef.current.value.substring(1);
		// console.log(phoneNumber)

		// await axios.get(`http://localhost:3000/signup/${phoneNumber}`)
		// 	.then(response => {
		// 		console.log(response.data);
		// 	})
		// 	.catch(error => {
		// 		console.error(error);
		// 	});

		Animated.spring(animatedOTPShow, {
            toValue: 1,
			duration: 2000,
            useNativeDriver: true,
        }).start();

		Animated.spring(animatedFormShow, {
            toValue: 0,
			duration: 2000,
            useNativeDriver: true,
        }).start();

		Animated.spring(animatedFormTransition, {
            toValue: viewportHeight,
			duration: 2000,
            useNativeDriver: true,
        }).start();

		Animated.spring(animatedOTPTransition, {
            toValue: -viewportHeight,
			duration: 2000,
            useNativeDriver: true,
        }).start();
	}

	const animatedShowStyle = {
		opacity: animatedFormShow,
		transform: [{translateY: animatedFormTransition}]
    };

	const animatedChangeInputStyle = {
		opacity: animatedFormShow,
		transform: [{translateY: animatedFormTransition}]
    };

	const animatedFadeStyle = {
		opacity: animatedButtonFade,
        transform: [{translateY: animatedImageScale}]
    };

	const animatedScaleStyle = {
        transform: [{translateY: animatedImageScale}]
    };

	const animatedOTPStyle = {
        opacity: animatedOTPShow,
		transform: [{translateY: animatedOTPTransition}]
    };

	useEffect(() => {
		animationRef.current?.play();
	  }, []);

	  const handlePhoneNumberChange = (value) => {
		setInputPhoneNumber(value);
	  };
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
				onAnimationFinish={() => {setIsLoading(false)}}
			/> : null}
			{!isLoading ? 
			<View>
				<Animated.View style={[styles.animatedContainer, animatedScaleStyle]}>
					<ClipPath id="clipPathId">
						<Ellipse cx={viewportWidth/2} rx={viewportHeight} ry={viewportHeight} />
					</ClipPath>
					<ImageBackground style={styles.backgroundImageContainer} source={splash1} imageStyle={{opacity: 0.4}} clipPath="url(#clipPathId)" >
						<Text style={styles.text}>Booking your appointment <Text style={styles.decoratedText}>Quickly</Text> at the <Text style={styles.decoratedText}>BEST</Text> salons</Text>
					</ImageBackground>
					<TouchableHighlight style={styles.closeButtonContainer} onPress={closeButtonClickedHandler}>
						<Text style={{color: '#fff'}}>X</Text>
					</TouchableHighlight>
				</Animated.View>
				<Animated.View style={[animatedFadeStyle]}>
					<TouchableHighlight style={styles.loginButton} onPress={()=>{loginBtnPressedHandler()}}>
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
				<Animated.View style={[styles.loginContainer, animatedShowStyle]}>
					<TextInput 
						style={styles.phoneNumberInput} 
						placeholder="Phone number" 
						placeholderTextColor="#3d5c98"  
						onChangeText={(e) => {
							phoneNumberRef.current.value = e
						}}
						ref={phoneNumberRef}
					/>
					<TouchableHighlight style={styles.formButton} onPress={sendOTPBtnClickHandler}>
						<Text style={styles.formBtnText}>Send OTP</Text>
					</TouchableHighlight>
				</Animated.View>
				<Animated.View style={[styles.otpInputContainer, animatedOTPStyle]}>
					{<Text></Text>}
					<TextInput style={styles.otpInput} placeholder="OTP" placeholderTextColor="#3d5c98"/>
					<TouchableHighlight style={styles.formButton} onPress={()=>{}}>
						<Text 
							style={styles.formBtnText} 
							onPress={() =>
        						navigation.navigate('Dashboard')
      						}>
							Login
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
		width: viewportWidth/10, 
		height: viewportHeight/3,
		paddingLeft: 10,
	},
	loginButton: {
		position: 'absolute',
		bottom: viewportHeight/7.8,
		color: '#3d5c98',
		left: viewportWidth/6,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 50,
		elevation: 3,
		backgroundColor: '#3D5C98',
		width: viewportWidth/1.5,
		borderWidth: 2,
		borderColor: '#fff'
	},
	signUpButton: {
		position: 'absolute',
		bottom: viewportHeight/15,
		color: '#3d5c98',
		left: viewportWidth/6,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 50,
		elevation: 3,
		backgroundColor: '#3D5C98',
		width: viewportWidth/1.5,
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
		bottom: viewportHeight/4,
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
		height: viewportHeight/15,
		width: viewportWidth * 9/10,
		borderWidth: 2,
		borderColor: '#3d5c98',
		padding: 10,
		borderRadius: 10,
		fontSize: 20,
		color: '#3d5c98'
	},
	otpInputContainer: {
		position: 'absolute',
		bottom: -viewportHeight/1.3,
		paddingHorizontal: viewportWidth/20,
	},
	otpInput: {
		padding: 10,
		height: viewportHeight/15,
		width: viewportWidth* 9/10,
		borderWidth: 2,
		borderColor: '#3d5c98',
		borderRadius: 10,
		marginTop: 20,
		fontSize: 20,
		color: '#3d5c98'
	},
	loginContainer: {
		position: 'absolute',
		bottom: -viewportHeight/1.3,
		paddingTop: 0,
		paddingHorizontal: viewportWidth/20,
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
