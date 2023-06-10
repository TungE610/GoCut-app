import { useState } from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import ReturnHomeButton from '../components/returnHomeButton/ReturnHomeButton';
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper'
import SearchInput from '../components/searchInput/SearchInput';
import location from '../data/location';
import LocationIcon from '../assets/location.svg';
import HomeIcon from '../assets/home.svg';
import MarkIcon from '../assets/mark.svg';
import PolygonIcon from '../assets/polygon.svg';
import SearchTag from '../components/searchTag/SearchTag';
import ServiceTypeCard from '../components/serviceTypeCard/ServiceTypeCard';
import ServiceCard from '../components/serviceCard/ServiceCard';
import CutIcon from '../assets/cut.svg';
import FacialIcon from '../assets/facial.svg';
import NailIcon from '../assets/nail.svg';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const searchTagContent = [
	{
		icon: <LocationIcon />,
		text: 'Near me',
	},
	{
		icon: <HomeIcon />,
		text: 'Near my home',
	}
];


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

const LocationTag = (props) => {

	return (
		<View style={styles.locationTag}>
			<Text style={styles.locationName}>{props.location}</Text>
		</View>
	)
}

const BookingScreen = ({navigation}) => {
	
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedSalon, setSelectedSalon] = useState('Vai o slon');
	const [selectedServices, setSelectedServices] = useState([]);

	const backButtonClickHandler = () => {
		navigation.navigate('Dashboard', {name: 'Tung'});
	}

	const stepPressHandler = (position) => {
		setCurrentPosition(position);
	}

	const navigateSavedAddressHandler = () => {
		console.log("Tung");
		navigation.navigate('SavedAddress', {name: 'Tung'});
	}

	return (
		<View>
			<ScrollView style={styles.container}>
				<View style={styles.backButton}>
					<ReturnHomeButton onClick={backButtonClickHandler}/>
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
							<SearchInput placeholder="search for salon with name or location"/>
							<View style={styles.searchTagStack}>
								{
									searchTagContent.map((tag, index) => {
										return (
											<SearchTag key={index} icon={tag.icon} text={tag.text} />
										)
									})
								}
							</View>
							<TouchableOpacity onPress={navigateSavedAddressHandler}>
								<View style={styles.savedAddressBox} >
									<View style={{flexDirection: 'row'}}>
										<MarkIcon width={30} height={30} />
										<View>
											<Text>
												Saved Addresses
											</Text>
											<Text>
												Get to your favourite place faster
											</Text>
										</View>
									</View>
									<PolygonIcon />
								</View>
							</TouchableOpacity>
							<View style={styles.locationSelectBox}>
								{location.map((area, index) => {
									return (
										<View style={styles.areaBox}>
											<Text style={styles.areaName}>{area.area}</Text>
											<View style={styles.locationTagStack}>
												{area.location.map((location, index) => {
													return (
														<LocationTag key={index} location={location}/>
													)
												})}
											</View>
										</View>
									)
								})}
							</View>
						</View>

						<View key="page 2" style={styles.selectServicesContainer}>
							<Text style={styles.slideTitle}>Select services</Text>
							<Text style={styles.selectedSalon}>selected salon: {selectedSalon} </Text>
							<SearchInput placeholder="search for services"/>
							<View style={styles.serviceTypeTagsStack}>
								<ServiceTypeCard icon={<CutIcon width={18} height={18} />} service="Hair cut" />
								<ServiceTypeCard icon={<FacialIcon width={18} height={18} />} service="Hair cut" />
								<ServiceTypeCard icon={<NailIcon width={18} height={18} />} service="Hair cut" />
							</View>
							<View style={styles.serviceTagsStack}>
								<Text style={styles.selectedNum}>Selected number: {selectedServices.length}</Text>
								<ServiceCard serviceName="Women medium blunt cut" serviceTime="2 hours service" serviceFee="200" salePercent={20}/>
								<ServiceCard serviceName="Women medium blunt cut" serviceTime="2 hours service" serviceFee="200" salePercent={20}/>
								<ServiceCard serviceName="Women medium blunt cut" serviceTime="2 hours service" serviceFee="200" salePercent={20}/>

							</View>
						</View>

						<View key="page 3" style={styles.selectStylistAndTimeContainer}>
							<Text style={styles.slideTitle}>And simple</Text>
						</View>
					</Swiper>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	locationTag: {
		alignSelf: 'flex-start',
		backgroundColor: '#667EAE',
		padding: 4,
		borderRadius: 5,
		paddingHorizontal: 8,
	},
	locationName: {
		color: '#fff',
		fontSize: 16,
	},
	//------------------------
	container: {
		height: viewportHeight,
		width: viewportWidth,
		backgroundColor: '#3d5c98',
		flexDirection: 'column',
		grow: 1,
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
		height: viewportHeight,
		width: viewportWidth,
		paddingTop: 10,
	},
	stepIndicator: {
		marginLeft: 20,
	},
	wrapper: {
		paddingTop: 20,
	},

	// FIRST PAGE
	selectSalonContainer: {
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
	},
	searchTagStack: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: viewportWidth,
	},
	savedAddressBox: {
		backgroundColor: '#fff',
		height: viewportHeight/15,
		width: viewportWidth - 20,
		borderRadius: 5,
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	locationSelectBox: {
		marginTop: 15,
		backgroundColor: '#fff',
		alignSelf:'stretch',
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingTop: 20,
	},
	areaName: {
		fontSize: 21,
		fontWeight: 600,
		color: '#444',
	},
	areaBox:{
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		paddingVertical: 10,
	},
	locationTagStack: {
		flexDirection: 'row',
		width: '100%',
		gap: 4,
		flexWrap: 'wrap',
		paddingVertical: 10,
	},
	selectedSalon: {
		color: 'yellow',
	},
	/// Page 2
	selectServicesContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	serviceTypeTagsStack: {
		alignSelf: 'flex-start',
		flexDirection: 'row',
		gap: 6,
		paddingLeft: 10,
	},
	serviceTagsStack: {
		marginTop: 20,
		backgroundColor: '#fff',
		width: '100%',
		alignSelf: 'stretch',
		flexGrow: 1,
		minHeight: 700,
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingTop: 20,
	},
	selectedNum: {
		fontSize: 15,
		fontWeight: 500,
		color: '#3c5d98'
	}
})


export default BookingScreen;
