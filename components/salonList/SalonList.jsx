import {View, StyleSheet, Dimensions, TouchableOpacity, Image, Text} from 'react-native';
import Location from '../../assets/location.svg';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const SalonCard = (props) => {

	return (
		<TouchableOpacity
			style={styles.salonCardContainer} 
			onPress={props.onClick}
	>
			<Image
				source={props.salonImage}
				resizeMode="cover"
				style={styles.salonImage}
			/>
			<Text style={styles.salonName}>{props.salonName}</Text>
			<View style={styles.addressContainer}>
				<Location width={17} height={17} />
				<Text style={styles.location}>{props.salonAddress}</Text>
			</View>
	</TouchableOpacity>
	)
}


const SalonList = (props) => {

	const selectSalonHandler = (value) => {

		props.selectSalon(value);
	}

	const nextStepHandler = () => {

		props.nextStepHandler();
	}

	return (
		<View style={styles.container}>
			{props.salonList.map(salon => {

				return (
					<SalonCard
						salonImage={salon.salonImage}
						salonName={salon.salonName}
						salonAddress={salon.salonAddress}
						onClick={() => {
							selectSalonHandler({name: salon.salonName});
							nextStepHandler();
						}}
					/>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: viewportWidth,
		paddingHorizontal: 10,
	},
	salonCardContainer: {
		width: viewportWidth-20,
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		gap: 7,
		justifyContent: 'space-between',
		backgroundColor: "#fff",
		marginTop: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
	},
	salonImage: {
		width: '100%',
		borderRadius: 10,
		height: viewportHeight/5.5,
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
		paddingLeft: 5,
	},
	location: {
		color: '#A5A1A1',
	}
})

export default SalonList;
