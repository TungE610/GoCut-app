import {StyleSheet, View, Image} from 'react-native';
const avatar = require ('../../assets/avatar.jpg');
import FastImage from 'react-native-fast-image';

const AvatarBox = () => {

	return(
		<View style={styles.container}>
			<FastImage
				style={styles.avatar}
				source={avatar}
      		/>
		</View>
	)	
}

const styles = StyleSheet.create({
	container: {
		padding: 2,
		width: 50,
		height: 50,
		backgroundColor: '#fff',
		borderRadius: 5,
	},
	avatar: {
		width: 46,
		height: 46,
		borderRadius: 5,
	}
})

export default AvatarBox;
