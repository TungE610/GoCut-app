import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import BackIcon from '../../assets/back.svg';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const BackButton  = (props) => {

	return (
		<TouchableOpacity style={styles.container} onPress={props.onClick}>
			<BackIcon height={30} width={30} style={styles.icon}/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: viewportWidth/10,
		height: viewportWidth/10,
		backgroundColor: '#fff',
		borderRadius: 10,
		opacity: 0.4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {

	}
})

export default BackButton;
