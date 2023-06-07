import { View, Dimensions, StyleSheet } from 'react-native';
const {width: viewportWidth} = Dimensions.get('screen');

const BookingNavbarItem = ({icon: Icon}) => {

	return (
		<View style={styles.container}>
			<Icon width={35} height={35} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: '#3D5C98',
		borderRadius: 50,
		width: viewportWidth/6,
		height: 70,
		marginTop: -30,
		borderColor: '#fff',
		borderWidth: 2,
	}
})

export default BookingNavbarItem;
