import {StyleSheet, View, Text, Animated, Dimensions, Easing, TouchableWithoutFeedback} from 'react-native';

import Location from '../../assets/location.svg';
import FastImage from 'react-native-fast-image'

const SalonCard = ({item, ...props}) => {
	
	const translateYImage = new Animated.Value(40);

	Animated.timing(translateYImage, {
		toValue: 0,
		duration: 600,
		useNativeDriver: true,
		easing: Easing.bounce,
	}).start();

	return (
		<TouchableWithoutFeedback 
			style={styles.container}
			onPress={props.onClick}
		>
			<Animated.View>
			<FastImage
				source={{uri: item.images.length > 0 ? item.images[0].image_url : ""}}
				resizeMode="cover"
				style={[
					styles.image,
					{
						width: Dimensions.get('window').width - 33, height:150,
					},
				]}
			/>
			<Text style={styles.salonName}>{item.name}</Text>
			<View style={styles.addressContainer}>
				<Location width={17} height={17} />
				<Text style={styles.location}>{item.address}</Text>
			</View>
			</Animated.View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		borderRadius: 5,
		height: '100%',
		borderWidth: '2px',
		borderColor: '#fff'
	},
	image: {
		width: '95%',
		borderRadius: 5,
		marginBottom: 10,
	},
	salonName: {
		fontWeight: "800",
		fontSize: 18,
		paddingLeft: 5,
		color: '#2A4780'
	},
	addressContainer: {
		flexDirection: 'row',
		gap: 4,
		marginTop: 5,
		// paddingLeft: 5,
	},
	location: {
		color: '#333',
	}
})

export default SalonCard;
