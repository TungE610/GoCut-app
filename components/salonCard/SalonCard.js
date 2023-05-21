import {StyleSheet, View, Text, Animated, Dimensions, Easing} from 'react-native';
import Location from '../../assets/location.svg';

const {width, height} = Dimensions.get('screen');

const SalonCard = ({item}) => {
	const translateYImage = new Animated.Value(40);
	
	Animated.timing(translateYImage, {
		toValue: 0,
		duration: 1000,
		useNativeDriver: true,
		easing: Easing.bounce,
	}).start();

	return (
		<View style={styles.container}>
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
					width: Dimensions.get('window').width - 56, height:150					
				},
				]}
			/>
			<Text style={styles.salonName}>{item.item.salonName}</Text>
			<View style={styles.addressContainer}>
				<Location width={17} height={17} />
				<Text style={styles.location}>{item.item.location}</Text>
			</View>
		</View>
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
		width: '100%',
		borderRadius: 10,
		marginBottom: 10,
	},
	salonName: {
		fontWeight: 800,
		fontSize: '18px',
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
