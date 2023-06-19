import { StyleSheet, Dimensions, View, Text, Image} from "react-native";
import AddIcon from '../../assets/add.svg';
import SaleIcon from '../../assets/sale.svg';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');

const ServiceImage = require('../../assets/service1.jpg');
const ServiceCard = (props) => {

	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', gap: 15}}>
				<Image style={styles.image} source={ServiceImage} />
				<View style={styles.serviceContent}>
					<Text style={styles.serviceName}>{props.serviceName}</Text>
					<Text style={styles.serviceTime}>{props.serviceTime}</Text>
					<Text style={styles.serviceFee}>${props.serviceFee}</Text>
				</View>
			</View>
			<View style={styles.operations}>
				<AddIcon width={40} height={40} />
				<View style={styles.saleCard}>
					<SaleIcon width={20} height={20} />
					<Text style={styles.salePercent}>-{props.salePercent}%</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		gap: 12,
		justifyContent: 'space-between',
		shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 5,
	},
	serviceContent: {
		justifyContent: 'space-around'
	},
	serviceName: {
		fontSize: 18,
		fontWeight: 600,
		color: '#3c5d98'
	},
	serviceTime: {
		fontSize: 15,
		fontWeight: 400,
	},
	serviceFee: {
		fontSize: 17,
		color: '#2A4780',
		fontWeight: 700,
	},
	saleCard: {
		flexDirection: 'row',
		padding: 5,
		borderRadius: 50,
		backgroundColor: '#FFDEC0',
		alignItems: 'center'
	},
	salePercent: {
		color: '#EF7301',
		fontSize: 17,
		fontWeight: 600,
	},
	operations: {
		justifyContent: 'space-between',
		alignItems: 'flex-end'
	}
})

export default ServiceCard;