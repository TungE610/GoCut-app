import {useState} from 'react';
import { StyleSheet, Dimensions, View, Text } from "react-native";
import ReturnHomeButton from "../../components/returnHomeButton/ReturnHomeButton";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const CartScreen = (navigation) => {

	const returnHomeHandler = () => {
		navigation.navigate("Dashboard");
	}

	return (
		<View style={styles.container}>
			<View style={styles.returnHomeButtonContainer}>
				<ReturnHomeButton onClick={returnHomeHandler} />
			</View>
			<View style={styles.screenTitleContainer}>
				<Text style={styles.screenTitle}>Cart</Text>
			</View>
			{/* <ScrollableTabView renderTabBar={() => <MaskTabBar someProp={'here'} showMask={true} maskMode='light' />}>
				<ReactPage tabLabel="React" />
				<FlowPage tabLabel="Flow" />
				<JestPage tabLabel="Jest" />
			</ScrollableTabView> */}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: viewportWidth,
		height: viewportHeight,
		backgroundColor: '#fff',
		paddingHorizontal: 15,
	},
	returnHomeButtonContainer: {
		position: 'absolute',
		width: '20%',
		flexDirection: 'row',
		alignContent: 'space-around',
		alignItems: 'center',
		marginTop: viewportHeight/15,
		paddingLeft: viewportWidth/20,
		zIndex: 999,
	},
	screenTitleContainer: {
		borderBottomWidth: 0.3,
		borderBottomColor: '#D9D9D9',
		paddingBottom: 15,
	},
	screenTitle: {
		width: '100%',
		fontSize: 28,
		fontWeight: 700,
		color: '#3d5c98',
		letterSpacing: 1,
		textAlign: 'center',
		marginTop: viewportHeight/14,
	},
})

export default CartScreen;
