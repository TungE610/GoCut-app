import { StyleSheet, View, Text } from 'react-native';

const ServiceTypeCard = (props) => {

	return (
		<View style={styles.container}>
			{props.icon}
			<Text style={styles.service}>{props.service}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexWrap: 'wrap',
		alignSelf: 'flex-start',
		flexDirection: 'row',
		gap: 4,
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 50,
	},
	service: {
		fontSize: 16,
		fontWeight: 500,
		color: '#3d5c98'
	}
})

export default ServiceTypeCard;
