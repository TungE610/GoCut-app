import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import ReturnIcon from '../../assets/return.svg';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const TurnBackButton  = (props) => {

	const styles = StyleSheet.create({
		container: {
			width: viewportWidth/10,
			height: viewportWidth/10,
			backgroundColor: '#0E295B',
			borderRadius: 10,
			opacity: 0.8,
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: 10,
			marginLeft: 10
		},
	})

	return (
		<TouchableOpacity style={styles.container} onPress={props.onClick}>
			<ReturnIcon height={30} width={30} color={'#fff'}/>
		</TouchableOpacity>
	)
}

export default TurnBackButton;
