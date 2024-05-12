import { StyleSheet, View, Text, Dimensions } from "react-native";
import BackButton from '../components/backButton/BackButton';
import AddressBox from '../components/addressBox/AddressBox';
import HomeIcon from '../assets/homeAddress.svg';
import OfficeIcon from '../assets/office.svg';
import FootIcon from '../assets/foot.svg';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const SavedAddress = ({route, navigation}) => {

	const backButtonClickedHandler = () => {
		navigation.navigate('Profile');
	}

	const {homeAddress, officeAddress, regularAddress, userId} = route.params;
	
	return (
		<View style={styles.container}>
			<View style={styles.backButton}>
					<BackButton onClick={backButtonClickedHandler} color="#fff"/>
			</View>
			<View style={styles.screenTitleContainer}>
				<Text style={styles.screenTitle}>Saved Address</Text>
			</View>
			<View style={styles.savedAddressStack}>
				<AddressBox icon={<HomeIcon width={30} height={30} color={'#3d5c98'}/>} addressType="home" address={homeAddress} userId={userId}/>
				<AddressBox icon={<OfficeIcon width={30} height={30} color={'#3d5c98'} />} addressType="office" address={officeAddress} userId={userId}/>
				<AddressBox icon={<FootIcon width={30} height={30} color={'#3d5c98'} />} addressType="regular" address={regularAddress} userId={userId}/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: viewportHeight,
		backgroundColor: '#3d5c98',
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
		fontWeight: "700",
		color: '#fff',
		letterSpacing: 1,
		textAlign: 'center',
		marginTop: viewportHeight/14,
	},
	savedAddressStack: {
		paddingBottom: 30,
		marginTop: 30,
		alignSelf: 'flex-start',
		width: viewportWidth,
		backgroundColor: '#eee',
		gap: 20,
		borderRadius: 5,
	}
})

export default SavedAddress;
