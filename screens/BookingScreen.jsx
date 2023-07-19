import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Button, Pressable } from 'react-native';
import ReturnHomeButton from '../components/returnHomeButton/ReturnHomeButton';
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper'
import SearchInput from '../components/searchInput/SearchInput';
import location from '../data/location';
import LocationIcon from '../assets/location.svg';
import HomeIcon from '../assets/home.svg';
import MarkIcon from '../assets/mark.svg';
import OfficeIcon from '../assets/office.svg';
import PolygonIcon from '../assets/polygon.svg';
import SearchTag from '../components/searchTag/SearchTag';
import ServiceTypeCard from '../components/serviceTypeCard/ServiceTypeCard';
import ServiceCard from '../components/serviceCard/ServiceCard';
import CutIcon from '../assets/cut.svg';
import FacialIcon from '../assets/facial.svg';
import NailIcon from '../assets/nail.svg';
import SalonList from '../components/salonList/SalonList';
import ReselectIcon from '../assets/reselect.svg';
import AddServicesButton from '../components/addServicesButton/AddServicesButton';
import SelectStylistIcon from '../assets/selectStylist.svg';
import Carousel from 'react-native-snap-carousel';
import sampleStylist from '../data/sampleStylist';
import StylistCard from '../components/stylistCard/StylistCard';
import StarIcon from '../assets/star.svg';
import CalendarIcon from '../assets/calendar.svg';
import TimeGrid from '../components/timeGrid/TimeGrid';
import Modal from "react-native-modal";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );
const sampleSalon = [
	{
		id: 0,
		salonName: "Prety Salon",
		salonLocation: "Hà Nội",
		salonAddress: "151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai, Hà Nội",
		ratting: 4.5,
		salonImage: require('../assets/salon1.jpg')
	},
	{
		id: 1,
		salonName: "BlackPink Salon",
		salonLocation: "Hà Nội",
		ratting: 4.5,
		salonAddress: "151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai, Hà Nội",
		salonImage: require('../assets/salon2.jpg')
	},
	{
		id: 2,
		salonName: "Bigbang Salon",
		salonLocation: "Hà Nội",
		ratting: 4.5,
		salonAddress: "151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai, Hà Nội",
		salonImage: require('../assets/salon3.jpg')
	},
	{
		id: 3,
		salonName: "BTS Salon",
		salonLocation: "Hà Nội",
		ratting: 4.5,
		salonAddress: "151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai, Hà Nội",
		salonImage: require('../assets/salon1.jpg')
	},
]

const sampleServices = [
	{
		id: 0,
		name: 'Women medium blunt cut',
		type: "hair cut",
		serviceTime: 2,
		serviceFee : 500,
		salePercent: 20,
		image: require('../assets/service1.jpg')
	},
	{
		id: 1,
		name: 'Women medium blunt cut',
		type: "hair cut",
		serviceTime: 2,
		serviceFee : 500,
		salePercent: 20,
		image: require('../assets/service2.jpg')
	},
	{
		id: 2,
		name: 'Women medium blunt cut',
		type: "hair cut",
		serviceTime: 2,
		serviceFee : 500,
		salePercent: 30,
		image: require('../assets/service3.jpg')
	}
]

const searchTagContent = [
	{
		icon: <LocationIcon />,
		text: 'Near me',
	},
	{
		icon: <HomeIcon />,
		text: 'Near my home',
	},
	{
		icon: <OfficeIcon />,
		text: 'Near my office',
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

	const selectLocationHandler = () => {
		props.onLocationSelect(props.location); // Pass the selected location to the parent component
	}

	return (
		<TouchableOpacity style={styles.locationTag} onPress={selectLocationHandler}>
			<Text style={styles.locationName}>{props.location}</Text>
		</TouchableOpacity>
	)
}

const wp = (percentage) => {
	const value = percentage * viewportWidth / 100;
	return Math.round(value);
  }

const BookingScreen = ({navigation}) => {
	
	const [currentPage, setCurrentPage] = useState(0);
	const [searchInput, setSearchInput] = useState('');
	const [serviceSearchInput, setServiceSearchInput] = useState('')
	const [isSearching, setIsSearching] = useState(false);
	const [selectedServices, setSelectedServices] = useState([]);
	const [filteredSalon, setFilteredSalon] = useState([])
	const [filtedServices, setFilteredServices] = useState([])
	const [loading, setLoading] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState(''); // Add a state to store the selected location
	const [locationSelected, setLocationSelected] = useState(false);
	const [selectedSalon, setSelectedSalon] = useState({});
	const [rotationAngle, setRotationAngle] = useState(0);
	const [showStylistList, setShowStylistList] = useState(false);
	const [showTimeGrid, setShowTimeGrid] = useState(false);
	const sliderItemHorizontalMargin = wp(2);
	const slideWidth = wp(28);
	const sliderWidth = viewportWidth - 20;
	const sliderItemWidth = slideWidth + sliderItemHorizontalMargin * 2;
	const [selectedStylist, setSelectedStylist] = useState({})
	const [isModalVisible, setModalVisible] = useState(false);

	const swiperRef= useRef(null);

	const backButtonClickHandler = () => {
		navigation.navigate('Dashboard');
	}

	const stepPressHandler = (position) => {
		setCurrentPosition(position);
	}

	const navigateSavedAddressHandler = () => {
		navigation.navigate('SavedAddress');
	}

	const seeServiceDetailHandler = () => {
		navigation.navigate('ServiceDetail');
	}

	const getSearchInputHandler = (searchInput) => {

		setSearchInput(searchInput);
	}

	const onLocationSelectHandler = (location) => {
		setSelectedLocation(location); 

		setIsSearching(true);
		setFilteredSalon(sampleSalon.filter(salon => {
			return salon.salonLocation === selectedLocation;
		}))

		setLocationSelected(true);
	}

	useEffect(() => {

		setFilteredSalon(sampleSalon.filter(salon => {
			return salon.salonLocation === selectedLocation;
		}))
	}, [selectedLocation])

	useEffect(() => {
		if (searchInput.length > 0) {

			setIsSearching(true);
		} else {
			setIsSearching(false);
		}

		setLoading(true);
		setFilteredSalon(sampleSalon.filter(salon => {
			return salon.salonName.includes(searchInput);
		}))
		setLoading(false);

	}, [searchInput])

	useEffect(() => {
	
		setLoading(true);
		setFilteredSalon(sampleServices.filter(service => {
			return service.name.includes(serviceSearchInput);
		}))
		setLoading(false);

	}, [serviceSearchInput])

	const reselectLocationHandler = () => {

		setLocationSelected(false);

		setIsSearching(false);
	}

	const selectSalonHandler = (value) => {
		setSelectedSalon(value);
	}

	const nextStepHandler = () => {

		if (swiperRef.current) {
			swiperRef.current.scrollTo(1);
		}
	}

	const lastStepHandler = () => {
		if (swiperRef.current) {
			swiperRef.current.scrollTo(2);
		}
	}
	const toggleServiceSelection = (service) => {

		const isSelected = selectedServices.some((selectedService) => selectedService.id === service.id);
		if (isSelected) {
		  // Remove the service from the selectedServices array
		  setSelectedServices((prevSelectedServices) => prevSelectedServices.filter((selectedService) => selectedService.id !== service.id));
		} else {
		  // Add the service to the selectedServices array
		  setSelectedServices((prevSelectedServices) => [...prevSelectedServices, service]);
		}
	};

	const expandSelectStylist = () => {
		
		setRotationAngle((prevAngle) => {
			if(prevAngle === 0) {
				return prevAngle + 90;
			} else {
				return prevAngle - 90;
			}
		});

		setShowStylistList(prev => !prev);
	}

	const selectStylist = (stylist) => {

		setSelectedStylist(stylist);
	}

	const bookingConfirm = () => {
        setModalVisible(true)
	}

	const getServiceInputHandler = (searchInput) => {
		setServiceSearchInput(searchInput);
	}

	return (
		<View style={styles.container}>
				<View style={styles.backButton}>
					<ReturnHomeButton onClick={backButtonClickHandler} page="booking" />
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
						ref={swiperRef}
					>

						<View key="page 1" style={styles.selectSalonContainer}>
							<Text style={styles.slideTitle}>Select Salon</Text>
							<SearchInput 
								placeholder="search for salon with name or location" 
								onChange={getSearchInputHandler} 
							/>
							<View style={styles.searchTagStack}>
								{
									searchTagContent.map((tag, index) => {
										return (
											<SearchTag key={index} icon={tag.icon} text={tag.text} />
										)
									})
								}
							</View>
							<View>
								{!locationSelected ? <View style={styles.savedAddressBox} >
									<TouchableOpacity style={{flexDirection: 'row', gap: 8, alignItems: 'center'}} onPress={navigateSavedAddressHandler}>
										<MarkIcon width={20} height={20} />
										<View style={{gap: 3}}>
											<Text style={styles.savedAddressesText}>
												Saved Addresses
											</Text>
											<Text style={styles.savedAddressesSlogan}>
												Get to your favourite place faster
											</Text>
										</View>
									</TouchableOpacity>
									<PolygonIcon />
								</View> : 
								<TouchableOpacity style={styles.newSavedAddressBox} onPress={reselectLocationHandler}>
									<ReselectIcon width={24} height={24} color={"#000"} />
									<Text style={{fontSize: 20, fontWeight: 700, color: "#000"}}>Reselect city</Text>
								</TouchableOpacity>
								}
							</View>
							{
								!isSearching && !locationSelected ? 
								<View style={styles.locationSelectBox}>
									{location.map((area, index) => {
										return (
											<View style={styles.areaBox} key={index}>
												<Text style={styles.areaName}>{area.area}</Text>
												<View style={styles.locationTagStack}>
													{area.location.map((location, index) => {
														return (
															<LocationTag 
																key={index} 
																location={location}
																onLocationSelect={onLocationSelectHandler} // Pass the handler function to LocationTag
															/>
																
														)
													})}
												</View>
											</View>
										)
									})}
								</View> : 
								<ScrollView>
									{!loading ? (
										filteredSalon.length > 0 ? 
										<SalonList salonList={filteredSalon} selectSalon={selectSalonHandler} nextStepHandler={nextStepHandler}/> : 
										<Text style={{flex: 1, color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 20}}>No salon found</Text>
									)
									: 
									<ActivityIndicator size="large" color="#fff" />
									}
								</ScrollView>
							}
						</View>

						<View key="page 2" style={styles.selectServicesContainer}>
							<Text style={[styles.slideTitle, {marginTop: 50}]}>Select services</Text>
							{/* <Text style={styles.selectedSalon}>selected salon: {selectedSalon} </Text> */}
							<SearchInput 
								placeholder="search for services"
								onChange={getServiceInputHandler} 	
							/>
							<View style={styles.serviceTypeTagsStack}>
								<ServiceTypeCard icon={<CutIcon width={18} height={18} />} service="Hair cut" backgroundColor="#fff"/>
								<ServiceTypeCard icon={<FacialIcon width={18} height={18} />} service="Facial" backgroundColor="#fff"/>
								<ServiceTypeCard icon={<NailIcon width={18} height={18} />} service="Nail"  backgroundColor="#fff"/>
							</View>
							<View style={styles.serviceTagsStack}>
								<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
									<Text style={{color: '#3d5c98', fontSize: 15, fontWeight: 500,}}>Selected Salon:
										{
											selectedSalon.name != null ? 
											<Text style={{color: '#d48206'}}>
												{" " + selectedSalon.name + " "}
											</Text> : ""
										}
									</Text>
									<Text style={styles.selectedNum}>Selected services: {selectedServices.length}</Text>
								</View>
								{
									sampleServices.map(service => {
										return (
											<TouchableOpacity onPress={seeServiceDetailHandler}>
												<ServiceCard 
													id={service.id}
													serviceName={service.name} 
													serviceTime={service.serviceTime} 
													serviceFee={service.serviceFee} 
													salePercent={service.salePercent} 
													onClick={seeServiceDetailHandler}
													image={service.image}
													selectService={toggleServiceSelection}
													/>
											</TouchableOpacity>
										)
									})
								}
								{ selectedServices.length > 0 ? 
								<View style={styles.addServicesButton}>
									<AddServicesButton 
										backgroundColor="#3d5c98" 
										color='#fff' 
										selectedCount={selectedServices.length}
										nextStepHandler={lastStepHandler}
									/>
								</View> : ""
								}
							</View>
						</View>
					
						<View key="page 3" style={styles.selectStylistAndTimeContainer}>
						<Modal isVisible={isModalVisible}>
							<View style={{ flex: 1 }}>
							<Text>Hello!</Text>
							<Button title="Hide modal" onPress={() => setModalVisible(false)} />
							</View>
						</Modal>
							<Text style={styles.slideTitle}>Select stylist and time</Text>
							<View style={styles.stylistSelectContainer}>
								<View>
									<TouchableOpacity onPress={expandSelectStylist} style={styles.stylistSelectTitle}>
										<Text style={styles.stylistSelectText}>
											Select Stylist
										</Text>
										<SelectStylistIcon 
											color={"#3d5c98"} 
											style={{ transform: [{ rotate: `${rotationAngle}deg` }] }}
										/>
									</TouchableOpacity>
								</View>
								{
									showStylistList ? 
								<View>
									<Carousel 
										data={sampleStylist}
										renderItem={item => <StylistCard key={item.id} item={item} onClick={selectStylist} name={item.name} rate={item.rate} />}
										sliderWidth={sliderWidth}
										itemWidth={sliderItemWidth+50}
										activeSlideAlignment={'start'}
										inactiveSlideScale={1}
										inactiveSlideOpacity={1}
										style={styles.stylistCarousel}
									/>
								
									<View style={styles.stylistDetail}>
										<View style={styles.stylistName}>
											<Text style={{fontSize: 16, color: '#3d5c98', fontWeight: 600}}>Full Name: </Text>
											<Text>{selectedStylist.name}</Text>
										</View>
										<View style={styles.stylistRatting}>
											<Text style={{fontSize: 16, color: '#3d5c98', fontWeight: 600}}>Rating: </Text>
											<StarIcon color={"#f09000"} width={16} height={16}/>
											<Text>{selectedStylist.ratting}</Text>
										</View>
									</View>
								</View> : ""
								}
							</View>
								<View style={styles.selectTime}>
									<View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,}}>
										<View style={{flexDirection: 'row', alignItems: 'center', gap: 15,}}>
											<CalendarIcon height={22} width={22}/>
											<Text style={{fontSize: 17, fontWeight: 600, color: '#3d6c98'}}>
												To day, 17/07/2023
											</Text>
										</View>
										<SelectStylistIcon />
									</View>
									<View>
										<TimeGrid />
									</View>
								</View>
								<TouchableOpacity style={styles.confirmButton} onPress={bookingConfirm}>
									<Text style={styles.confirmText}>Book</Text>
								</TouchableOpacity>
						</View>
					</Swiper>
				</View>
		</View>
	)
}

const styles = StyleSheet.create({
	locationTag: {
		alignSelf: 'flex-start',
		backgroundColor: '#667EAE',
		padding: 4,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
	locationName: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 600,
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
		letterSpacing: 1,
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
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	slideTitle: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	searchTagStack: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: viewportWidth,
	},
	savedAddressBox: {
		backgroundColor: '#fff',
		height: viewportHeight/16,
		width: viewportWidth - 20,
		borderRadius: 5,
		marginTop: 10,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 6,
	},
	newSavedAddressBox: {
		backgroundColor: '#f5dc1d',
		height: viewportHeight/24,
		width: viewportWidth - 20,
		borderRadius: 5,
		marginTop: 10,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 6,
		gap: 10,
	},
	savedAddressesText: {
		fontSize: 17,
		fontWeight: 600,
		color: '#3d5c98'
	},
	savedAddressesSlogan: {
		color: '#999'
	},
	locationSelectBox: {
		flex: 1,
		marginTop: 15,
		backgroundColor: '#fff',
		alignSelf:'stretch',
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingTop: 10,
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
		display: 'none'
	},
	/// Page 2
	selectServicesContainer: {
		flex: 1,
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
		minHeight: 700,
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingTop: 20,
	},
	selectedNum: {
		fontSize: 15,
		fontWeight: 500,
		color: '#3c5d98'
	},
	addServicesButton: {
		position: 'absolute',
		bottom: 200,
		left: 0,
		right: 0,
		paddingHorizontal: 10,
	},
	selectStylistAndTimeContainer: {
		paddingHorizontal: 10,
	},
	stylistSelectContainer: {
		backgroundColor: '#fff',
		borderRadius: 10,
		marginTop: 20,
	},
	stylistSelectTitle: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 7,
	},
	stylistSelectText: {
		color: '#3d5c98',
		fontSize: 18,
		fontWeight: 600
	},
	stylistDetail: {
		paddingHorizontal: 10,
		marginTop: 10,
		gap: 10,
		marginBottom: 10,
	},
	stylistName: {
		flexDirection: 'row',
		fontSize: 18,
		fontWeight: 600
	},
	stylistRatting: {
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 18,
		fontWeight: 600
	},
	selectTime: {
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		borderRadius: 10,
		marginTop: 20,
		paddingVertical: 10
	},
	confirmButton: {
		backgroundColor: 'yellow',
		borderRadius: 5,
		marginTop: 20,
		paddingVertical: 8
	},
	confirmText: {
		fontSize: 20,
		fontWeight: 600,
		color: '#000',
		textAlign: 'center'
	}
})


export default BookingScreen;
