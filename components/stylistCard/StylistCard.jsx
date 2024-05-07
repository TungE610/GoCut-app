import { Dimensions, StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
import StarICon from '../../assets/star.svg';
import FastImage from 'react-native-fast-image'

const StylistCard = (props) => {
	const styles = StyleSheet.create({
		container: {
			backgroundColor: props.backgroundColor,
			width: viewportHeight/9,
			height: viewportHeight/9,
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
			marginBottom: 3,
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
			width: 35,
			opacity: 0.9,
			height: 18,
			borderRadius: 5,
			position: 'absolute',
			right: -8,
			top: 0,
		},
		rate: {
			color: '#fff',
			fontSize: 10,
			fontWeight: "700",
			textAlign: 'center',
		}
	})
	
	const selectSalon = () => {
		
		props.onClick({
			name: props.item.item.first_name + " " + props.item.item.last_name,
			rating: props.rating,
			id: props.item.item.id,
		})
	}

	return (
		<TouchableOpacity style={styles.container} onPress={selectSalon}>
			<FastImage 
				style={styles.image}
				source={{uri: props.item.item.image_url ? props.item.item.image_url : ""}}
			/>
			<View style={styles.rateContainer}>
				<StarICon width={10} height={10} color="#fff"/>
				<Text style={styles.rate}>{props.rating}</Text>
			</View>
		</TouchableOpacity>
	)
}


export default StylistCard;
