import {StyleSheet, View, Text } from "react-native";
import Cart from '../../assets/cart.svg';

const ShopBox = () => {

	return (
		<View style={styles.container}>
			<Cart width={26} height={26} style={styles.icon}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 4,
		backgroundColor: '#647CAA',
		borderRadius: 5,
		width: 35,
		height: 35,
	},
	icon: {
		color: '#fff',
		fontWeight: 600,
	}
})

export default ShopBox;
