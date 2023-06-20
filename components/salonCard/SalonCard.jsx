import {StyleSheet, View, Text, Animated, Dimensions, Easing, TouchableWithoutFeedback} from 'react-native';
import Location from '../../assets/location.svg';

const SalonCard = ({item, ...props}) => {
	
	const translateYImage = new Animated.Value(40);
	
	Animated.timing(translateYImage, {
		toValue: 0,
		duration: 1000,
		useNativeDriver: true,
		easing: Easing.bounce,
	}).start();

	return (
		<TouchableWithoutFeedback 
			style={styles.container}
			onPress={props.onClick}
		>
			<View>
			<Animated.Image
				source={item.item.img}
				resizeMode="cover"
				style={[
				styles.image,
				{
					transform: [
					{
						translateY: translateYImage,
					},
					],
					width: Dimensions.get('window').width - 33, height:150,
				},
				]}
			/>
			<Text style={styles.salonName}>{item.item.salonName}</Text>
			<View style={styles.addressContainer}>
				<Location width={17} height={17} />
				<Text style={styles.location}>{item.item.location}</Text>
			</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderRadius: 10,
		height: '100%',
		padding: 0,
		borderWidth: '2px',
		borderColor: '#fff'
	},
	image: {
		width: '95%',
		borderRadius: 10,
		marginBottom: 10,
	},
	salonName: {
		fontWeight: 800,
		fontSize: 18,
		paddingLeft: 5,
		color: '#2A4780'
	},
	addressContainer: {
		flexDirection: 'row',
		gap: 4,
		marginTop: 5,
		paddingLeft: 5,
	},
	location: {
		color: '#A5A1A1',
	}
})

export default SalonCard;
