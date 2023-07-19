import { Dimensions, StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import StarICon from '../../assets/star.svg';

const StylistCard = (props) => {

	const stylist = props.item.item;
	
	const selectSalon = () => {
		
		props.onClick({
			name: stylist.name,
			ratting: stylist.rate
		})
	}

	return (
		<TouchableOpacity style={styles.container} onPress={selectSalon}>
			<Image 
				style={styles.image}
				source={stylist.image}
			/>
			<View style={styles.rateContainer}>
				<StarICon width={18} height={18} color="#fff"/>
				<Text style={styles.rate}>{stylist.rate}</Text>
			</View>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		width: '90%',
		height: viewportHeight/6,
		padding: 5,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.3,
		shadowRadius: 3.84,
		elevation: 7,
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
		resizeMode: 'cover',
		position: 'relative',
	},
	rateContainer: {
		padding: 3,
		flexDirection: 'row',
		gap: 2,
		backgroundColor: '#FE7A01',
		width: 50,
		opacity: 0.9,
		height: 30,
		borderRadius: 5,
		position: 'absolute',
		right: -8,
		top: 0,
	},
	rate: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 700,
		textAlign: 'center',
	}
})

export default StylistCard;
