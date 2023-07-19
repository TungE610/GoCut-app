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
		},
		selectedCount: {
			color: "#e88a0e",
		}
	})

	return (
		<TouchableOpacity style={styles.container} onPress={props.nextStepHandler}>
			<Text style={styles.addText}>Select this salon and add 
				<Text style={styles.selectedCount}>
					{" " + props.selectedCount + " "} {props.selectedCount > 1 ? "services" : "service"}
				</Text> 
			</Text>
		</TouchableOpacity>
	)
}

export default AddServicesButton;
