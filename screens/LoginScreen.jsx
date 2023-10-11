import { StyleSheet, View, Text, Dimensions} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');

const LoginScreen = () => {

	return (
		<View style={styles.container}>
			<Text style={styles.loginText}>Login</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#3d5c98',
		width: viewportWidth.toString(),
		height: viewportHeight.toString(),
		alignItems: 'center'
	},
	loginText: {
		marginTop: 150,
		fontSize: 32,
		fontWeight: "700",
		color: '#fff',
	}
})

export default LoginScreen;
