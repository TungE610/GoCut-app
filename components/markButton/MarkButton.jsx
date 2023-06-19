import {StyleSheet, View, Dimensions} from 'react-native';
import LoveIcon from '../../assets/love.svg';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const MarkButton = () => {

	const styles = StyleSheet.create({
		container: {
			width: viewportWidth/10,
			height: viewportWidth/10,
			backgroundColor: '#0E295B',
			borderRadius: 10,
			opacity: 0.8,
			justifyContent: 'center',
			alignItems: 'center',
		},
	})

	return (
		<View style={styles.container}>
			<LoveIcon height={30} width={30}/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {

	}
})

export default MarkButton;