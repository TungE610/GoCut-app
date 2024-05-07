import {StyleSheet, View, Dimensions, Text, TouchableOpacity} from 'react-native';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const SearchTag = (props) => {

	const searchWithTagHandler = () => {
		props.onClick();
	}
	
	return (
		<TouchableOpacity style={styles.container} onPress={searchWithTagHandler}>
			{props.icon}
			<Text style={styles.text}>{props.text}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		alignSelf: 'flex-start',
		backgroundColor: '#fff',
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
		flexDirection: 'row',
		paddingHorizontal: 6,
		gap: 5,
		border: "none",
		outline: "none",
		height: 33,
		marginRight: 3,
	},
	text: {
		fontSize: 15,
		color: '#888',
		fontWeight: '400',
		textAlign: 'center',
	}
})

export default SearchTag;
