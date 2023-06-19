import {StyleSheet, Dimensions, View, TouchableOpacity} from 'react-native';

const {width, height} = Dimensions.get('screen');

const NavbarItem = (props) => {
	const Icon = props.icon;
	const styles = StyleSheet.create({
		container: {
			backgroundColor: `${props.choosen ? '#FE7A01' : '#fff'}`,
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
		<TouchableOpacity style={styles.container} onPress={props.onClick}>
			<Icon width={30} height={30} />
		</TouchableOpacity>
	)
}

export default NavbarItem;
