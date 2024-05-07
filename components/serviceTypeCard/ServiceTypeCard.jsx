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
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 5,
	},
	service: {
		fontSize: 16,
		fontWeight: 500,
	}
})

export default ServiceTypeCard;
