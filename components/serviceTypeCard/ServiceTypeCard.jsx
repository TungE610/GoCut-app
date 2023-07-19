import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const ServiceTypeCard = (props) => {

	return (
		<TouchableOpacity style={{backgroundColor: props.backgroundColor, ...styles.container}} onPress={props.onClick}>
			{props.icon}
			<Text style={{color: props.color, ...styles.service}}>{props.service}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexWrap: 'wrap',
		alignSelf: 'flex-start',
		flexDirection: 'row',
		gap: 6,
		alignItems: 'center',
		padding: 10,
		borderRadius: 50,
		// backgroundColor: '#fff'
		
	},
	service: {
		fontSize: 16,
		fontWeight: 500,
	}
})

export default ServiceTypeCard;
