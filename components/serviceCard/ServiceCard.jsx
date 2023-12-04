import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity} from "react-native";
import AddIcon from '../../assets/add.svg';
import RemoveIcon from '../../assets/remove.svg';
import SaleIcon from '../../assets/sale.svg';
import ClockIcon from '../../assets/clock.svg';
import { useState } from "react";

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');

const ServiceCard = (props) => {

	const [selected, setSelected] = useState(false);

	const toggleSelect = () => {

		setSelected(prev => !prev);
		
		props.selectService({
			id: props.id,
			name: props.serviceName,
		})
	}

	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', gap: 15}}>
				<Image style={styles.image} source={props.image} />
				<View style={styles.serviceContent}>
					<Text style={styles.serviceName}>{props.serviceName}</Text>
					<View style={styles.serviceTime}>
						<ClockIcon width={20} height={20} color="#3d5c98" />
						<Text style={styles.serviceTimeText}>
							{props.serviceTime} hours service
						</Text>
					</View>
					<Text style={styles.serviceFee}>${props.serviceFee}</Text>
				</View>
			</View>
			<View style={styles.operations}>
				<View style={styles.saleCard}>
					<SaleIcon width={20} height={20} />
					<Text style={styles.salePercent}>-{props.salePercent || 20}%</Text>
				</View>
				<TouchableOpacity onPress={toggleSelect}>
				{
					!selected ? 
					<AddIcon width={40} height={40} /> :
					<RemoveIcon width={40} height={40} />
				}
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: viewportWidth-20,
		flexDirection: 'row',
		paddingVertical: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
		gap: 7,
		justifyContent: 'space-between',
		
	},
	image: {
		width: 90,
		height: 90,
		borderRadius: 5,
	},
	serviceContent: {
		justifyContent: 'space-around',
	},
	serviceName: {
		fontSize: 17,
		fontWeight: 600,
		color: '#3c5d98'
	},
	serviceTime: {
		flexDirection: 'row',
		gap: 3,
		alignItems: 'center',

	},
	serviceTimeText: {
		fontSize: 15,
		fontWeight: 400,
	},
	serviceFee: {
		fontSize: 17,
		color: '#2A4780',
		fontWeight: "700",
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
