import {StyleSheet, View, Dimensions, Text} from 'react-native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const SearchTag = (props) => {

	return (
		<View style={styles.container}>
			{props.icon}
			<Text style={styles.text}>{props.text}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'flex-start',
		backgroundColor: '#EEE70E',
		color: '#000',
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
		width: 0,
		height: 3,
		},
		alignItems:'center',
		justifyContent: 'space-around',
		shadowOpacity:  0.17,
		shadowRadius: 3.05,
		elevation: 4,
		marginLeft: 10,
		flexDirection: 'row',
		borderColor: '#E38228',
		borderWidth: 1,
		padding: 5,
		gap: 5,
	},
	text: {
		fontSize:19,
		color: '#3d5c98',
		fontWeight: 600,
		textAlign: 'center',
	}
})

export default SearchTag;
