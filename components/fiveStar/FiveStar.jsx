import {StyleSheet, View} from 'react-native';
import RatingStar from '../../assets/ratingStar.svg';

const FiveStar = (props) => {

	const array = [1, 2, 3];
	const array1 = [4, 5];

	return (
		<View style={styles.container}>
			{array.map(
				() => {
					return <RatingStar color="#FE7A01"/>
				}
			)}
			{array1.map(
				() => {
					return <RatingStar color="#ccc"/>
				}
			)
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	}
})

export default FiveStar;
