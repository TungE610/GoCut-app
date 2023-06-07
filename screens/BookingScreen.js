import { useState } from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import BackButton from '../components/backBuutton/BackButton';
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper'
import SalonSearch from '../components/salonSearch/SalonSearch';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const customStyles = {
	stepIndicatorSize: 25,
	currentStepIndicatorSize:30,
	separatorStrokeWidth: 2,
	currentStepStrokeWidth: 3,
	stepStrokeCurrentColor: '#EFF30F',
	stepStrokeWidth: 3,
	stepStrokeFinishedColor: '#EFF30F',
	stepStrokeUnFinishedColor: '#aaaaaa',
	separatorFinishedColor: '#EFF30F',
	separatorUnFinishedColor: '#aaaaaa',
	stepIndicatorFinishedColor: '#EFF30F',
	stepIndicatorUnFinishedColor: '#ffffff',
	stepIndicatorCurrentColor: '#ffffff',
	stepIndicatorLabelFontSize: 13,
	currentStepIndicatorLabelFontSize: 13,
	stepIndicatorLabelCurrentColor: '#3d5c98',
	stepIndicatorLabelFinishedColor: '#000',
	stepIndicatorLabelUnFinishedColor: '#aaaaaa',
	labelColor: '#fff',
	labelSize: 13,
	currentStepLabelColor: '#EFF30F',
}


const BookingScreen = ({navigation}) => {
	
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedSalon, setSelectedSalon] = useState({});

	const backButtonClickHandler = () => {
		navigation.navigate('Dashboard', {name: 'Tung'});
	}

	const stepPressHandler = (position) => {
		setCurrentPosition(position);
	}

	return (
		<View style={styles.container}>
			<View style={styles.backButton}>
				<BackButton onClick={backButtonClickHandler}/>
			</View>
			<View style={styles.screenTitleContainer}>
				<Text style={styles.screenTitle}>Booking</Text>
			</View>
			<View style={styles.bookingStepContainer}>
				<StepIndicator
					stepCount={3}
					style={styles.stepIndicator}
					customStyles={customStyles}
					currentPosition={currentPage}
					labels={["Select Salon","Select services", "Select stylists & time"]}
					onPress={stepPressHandler}
				/>
				<Swiper 
					style={styles.wrapper}
					index={currentPage}
					loop={false}
					onIndexChanged={(page) => {
						setCurrentPage(page);
					}}
				>
					<View key="page 1" style={styles.selectSalonContainer}>
						<Text style={styles.slideTitle}>Select Salon</Text>
						{/* <View style={styles.firstPageGuide}>
							<View></View>
							<Text style={styles.firstPageGuideText}>First, Please select the best salon</Text>
						</View> */}
						<SalonSearch />
						{/* <View style={styles.salonSelect}>

						</View> */}
					</View>
					<View key="page 2" style={styles.selectServicesContainer}>
						<Text style={styles.slideTitle}>Beautiful</Text>
					</View>
					<View key="page 3" style={styles.selectStylistAndTimeContainer}>
						<Text style={styles.slideTitle}>And simple</Text>
					</View>
				</Swiper>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: viewportHeight,
		width: viewportWidth,
		backgroundColor: '#3d5c98',
		flexDirection: 'column',
		shink: 1,
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
		paddingBottom: 15,
	},
	screenTitle: {
		width: '100%',
		fontSize: 28,
		fontWeight: 700,
		color: '#fff',
		letterSpacing: '1',
		textAlign: 'center',
		marginTop: viewportHeight/14,
	},
	bookingStepContainer: {
		height: viewportHeight*2/3,
		width: viewportWidth,
		paddingTop: 10,
	},
	stepIndicator: {
		marginLeft: 20,
	},
	wrapper: {
		height: "100%",
		paddingTop: 20,
	},
	selectSalonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	firstPageGuide: {
		height: viewportHeight/20,
		width: viewportWidth*9/10,
		backgroundColor: '#0D2044',
		marginTop: 10,
		borderRadius: 10,
		justifyContent: 'center',
	},
	firstPageGuideText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 800
	},
	selectServicesContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	selectStylistAndTimeContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	slideTitle: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
	}
})


export default BookingScreen;
