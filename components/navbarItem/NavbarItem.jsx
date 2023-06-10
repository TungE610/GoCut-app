import {StyleSheet, Dimensions, View} from 'react-native';

const {width, height} = Dimensions.get('screen');

const NavbarItem = ({
    icon: Icon,
    choosen
}) => {

	const styles = StyleSheet.create({
		container: {
			backgroundColor: `${choosen ? '#FE7A01' : '#fff'}`,
			width: width/7.5,
			height: width/7.5,
			padding: 13,
			backgroundColor: '#C5CEE0',
			borderRadius: 5,
			shadowOffset: {
				width: 0,
				height: 1,
			},
			shadowOpacity: 0.5,
			shadowRadius: 5,
			elevation: 6,
			borderWidth: 0.25,
		}
	})

	return (
		<View style={styles.container}>
			<Icon width={30} height={30} />
		</View>
	)
}

export default NavbarItem;
