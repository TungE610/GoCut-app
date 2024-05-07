import { StyleSheet, View , Text, TouchableOpacity} from 'react-native';

const MenuCard = ({
    icon: Icon,
    title,
    ...props
}) => {

	return (
			<TouchableOpacity style={styles.container} onPress={props.onClick}>
				<View style={{backgroundColor: props.backgroundColor, ...styles.iconContainer}}>
					<Icon width={40} height={40} style={styles.icon} color={props.iconColor}/>
				</View>
				<Text style={styles.title}>{title}</Text>
			</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '16%',
		flexDirection: 'column',
		gap: 10,
		backgroundColor: '#3d5c98',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	iconContainer: {
		width: '100%',
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
		padding: 10,
	},
	title: {
		color: '#fff',
	},
})

export default MenuCard;
