import { StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');

const AddServicesButton = (props) => {

	const styles = StyleSheet.create({
		container: {
			height: viewportHeight/15,
			borderRadius: 50,
			backgroundColor: props.backgroundColor || '#3d5c98',
			alignItems: 'center',
		},
		addText: {
			fontSize: 19,
			fontWeight: 700,
			alignSelf: 'center',
			lineHeight: viewportHeight/15,
			color: props.color || '#fff'
		}
	})

	return (
		<TouchableOpacity style={styles.container}>
			<Text style={styles.addText}>Select this salon and add {props.addedNumber || 2} services</Text>
		</TouchableOpacity>
	)
}

export default AddServicesButton;
