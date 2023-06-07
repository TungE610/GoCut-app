import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import HomeIcon from '../../assets/home.svg';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const BackButton  = (props) => {

	return (
		<TouchableOpacity style={styles.container} onPress={props.onClick}>
			<HomeIcon height={30} width={30} style={styles.icon}/>
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
