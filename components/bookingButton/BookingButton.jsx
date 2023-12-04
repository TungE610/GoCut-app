import {StyleSheet, Dimensions, View, Text, TouchableOpacity} from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const BookingButton = (props) => {

	return (
		<TouchableOpacity style={styles.container} onPress={props.onClick}>
			<View style={styles.buttonContainer}>
				<Text style={styles.bookingText}>Booking now</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		width: '100%',
		alignItems: 'center',
	},
	buttonContainer: {
		width: viewportWidth/3,
		height: 35,
		backgroundColor: '#FECD50',
		color: '#000',
		borderRadius: 10,
	},
	bookingText: {
		alignSelf: 'center',
		lineHeight: 35,
		fontWeight: "700",
		fontSize: 16,
	}
})

export default BookingButton;
