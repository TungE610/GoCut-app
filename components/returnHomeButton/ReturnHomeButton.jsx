import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import HomeIcon from '../../assets/home.svg';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const ReturnHomeButton  = (props) => {

	const styles = StyleSheet.create({
		container: {
			width: viewportWidth/10,
			height: viewportWidth/10,
			backgroundColor: props.page === 'booking' ? '#fff' : '#0E295B',
			borderRadius: 10,
			opacity: 0.4,
			justifyContent: 'center',
			alignItems: 'center',
		},
		icon: {
	
		}
	})

	return (
		<TouchableOpacity style={styles.container} onPress={props.onClick}>
			<HomeIcon height={30} width={30} style={styles.icon} color={props.page === 'booking' ? '#647CAA' : '#fff'}/>
		</TouchableOpacity>
	)
}

export default ReturnHomeButton;
