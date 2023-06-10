import { StyleSheet, View, Text, Dimensions } from "react-native";
import BackButton from '../components/backButton/BackButton';
import AddressBox from '../components/addressBox/AddressBox';
import HomeIcon from '../assets/homeAddress.svg';
import OfficeIcon from '../assets/office.svg';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const SavedAddress = ({navigation}) => {

	const backButtonClickHandler = () => {
		navigation.navigate('Booking', {name: 'Tung'});
	}
	
	return (
		<View style={styles.container}>
			<View style={styles.backButton}>
					<BackButton onClick={backButtonClickHandler}/>
			</View>
			<View style={styles.screenTitleContainer}>
				<Text style={styles.screenTitle}>Saved Address</Text>
			</View>
			<View style={styles.savedAddressStack}>
				<AddressBox icon={<HomeIcon width={30} height={30} color={'#3d5c98'}/>} addressType="Home address" address="151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai"/>
				<AddressBox icon={<OfficeIcon width={30} height={30} color={'#3d5c98'} />} addressType="Office address" address="Số 7 Thiền Quang"/>
				<AddressBox icon={<HomeIcon width={30} height={30} color={'#3d5c98'} />} addressType="Home address" address="151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai"/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: viewportHeight,
		backgroundColor: '#3d5c98'
	}, 
	backButton: {
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
		paddingBottom: 20,
	},
	screenTitle: {
		width: '100%',
		fontSize: 25,
		fontWeight: 700,
		color: '#fff',
		letterSpacing: '1',
		textAlign: 'center',
		marginTop: viewportHeight/14,
	},
	savedAddressStack: {
		paddingBottom: 30,
		marginTop: 30,
		alignSelf: 'flex-start',
		width: viewportWidth,
		backgroundColor: '#D9D9D9',
		gap: 10,
	}
})

export default SavedAddress;
