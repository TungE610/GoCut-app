import {StyleSheet, Dimensions, View} from 'react-native';
import navbarItems from '../../data/navbarItems';
import NavbarItem from '../navbarItem/NavbarItem';
import BookingNavbarItem from '../bookingNavbarItem/BookingNavbarItem';

const {width, height} = Dimensions.get('screen');

const NavigationBar = (props) => {

	const navigateHandler = (id) => {
		if (id === 0) {
			props.returnHome();
		} else if (id === 1) {
			props.seeShop();
		} else if (id === 2) {
			props.openGallery();
		} else if (id === 3) {
			props.openCamera();
		} else {
			props.seeUserProfile();
		}
	}

	const styles = StyleSheet.create({
		
		container: {
			position: 'absolute',
			bottom: 0,
			flexDirection: 'row',
			backgroundColor: props.backgroundColor || '#fff',
			width: width,
			height: height/9,
			justifyContent: 'space-around',
			paddingTop: 15,
		}
	})

	return (
		<View style={styles.container}>
			{navbarItems.map((item,id) => {
				if (id === 2) {
					return <BookingNavbarItem key={2} title={item.title} icon={item.icon.default} choosen={id === props.current} />
				} else {
					return <NavbarItem 
								key={item.id} 
								title={item.title} 
								icon={item.icon.default} 
								choosen={id === props.current} 
								backgroundColor={props.itemBackgroundColor} 
								iconColor={props.itemIconColor}
								onClick={() => {navigateHandler(id)}}
							/>
					}
				})
			}
		</View>
	)
}

export default NavigationBar;
