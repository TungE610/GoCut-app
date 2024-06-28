import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, ActivityIndicator, Button, ScrollView } from 'react-native';
import ReturnHomeButton from '../components/returnHomeButton/ReturnHomeButton';
import StepIndicator from 'react-native-step-indicator';
import Swiper from 'react-native-swiper'
import { SearchBar } from 'react-native-elements';
import ServiceTypeCard from '../components/serviceTypeCard/ServiceTypeCard';
import ServiceCard from '../components/serviceCard/ServiceCard';
import SalonList from '../components/salonList/SalonList';
import AddServicesButton from '../components/addServicesButton/AddServicesButton';
import SelectStylistIcon from '../assets/selectStylist.svg';
import Carousel from 'react-native-snap-carousel';
import cities from '../data/cities.json';
import StylistCard from '../components/stylistCard/StylistCard';
import StarIcon from '../assets/star.svg';
import AssistantIcon from '../assets/assistant.svg';
import CalendarIcon from '../assets/calendar.svg';
import TimeGrid from '../components/timeGrid/TimeGrid';
import axios from 'axios';
import DatePicker from 'react-native-date-picker'
import { Dropdown } from 'react-native-element-dropdown';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location';
import { getDistance } from 'geolib';
import LocationIcon from '../assets/location.svg';
import SadIcon from '../assets/sad.svg';
import HomeIcon from '../assets/home.svg';
import OfficeIcon from '../assets/office.svg';
import SearchTag from '../components/searchTag/SearchTag';
import ClockIcon from '../assets/clock.svg';
import ToggleSwitch from 'toggle-switch-react-native';
import FastImage from 'react-native-fast-image'
import ImageView from "react-native-image-viewing";
import {addMinutesToTimeString} from '../helpers/addTimeToTimeStrong';
import { showMessage } from "react-native-flash-message";
import { createDateTimeObject } from '../helpers/createDateTimeObject';
import { createYYYYMMDDString } from '../helpers/createYYYYMMDDString';
import { isInSameWeek } from '../helpers/isInSameWeek';
import { findMaxId } from '../helpers/findMax';
import { hashTimePoint, mergeArrays } from '../helpers/hashTimePoint';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const deviceWidth = Dimensions.get("window").width;
const host = "https://salon-docker-production.up.railway.app";

function comparisonFunction(a,b) {
    return a.distance - b.distance;
}

Geocoder.init("AIzaSyCXMER8nT28GR0VF--NbVdWROad-vDeZo4", {language : "vi"}); // use a valid API key

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

const wp = (percentage) => {
	const value = percentage * viewportWidth / 100;
	return Math.round(value);
}

const BookingScreen = ({route, navigation}) => {
	
	const [currentPage, setCurrentPage] = useState(0);
	const [searchInput, setSearchInput] = useState('');
	const [serviceSearchInput, setServiceSearchInput] = useState('')
	const [isSearching, setIsSearching] = useState(false);
	const [selectedServices, setSelectedServices] = useState([]);
	const [salons, setSalons] = useState([])
	const [categories, setCategories] = useState([])
	const [stylists, setStylists] = useState([])
	const [selectedCategory, setSelectedCategory] = useState(0)
	const [filteredSalon, setFilteredSalon] = useState();
	const [filteredServices, setFilteredServices] = useState([])
	const [loading, setLoading] = useState(false);
	const [selectedSalon, setSelectedSalon] = useState({});
	const [rotationAngle, setRotationAngle] = useState(0);
	const [showStylistList, setShowStylistList] = useState(false);
	const sliderItemHorizontalMargin = wp(2);
	const slideWidth = wp(24);
	const sliderWidth = viewportWidth - 30;
	const sliderItemWidth = slideWidth + sliderItemHorizontalMargin * 2;
	const [selectedStylist, setSelectedStylist] = useState({id: null, name: null, rating: null})
	const [isLoading, setIsLoading] = useState(true);
	const [isProcessingAnImage, setIsProcessingAnImage] = useState(false);
  	const [isInferencing, setIsInferencing] = useState(false);

	const [selectedDate, setSelectedDate] = useState(new Date())
	const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [isCityFocus, setIsCityFocus] = useState(false);
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [isDistrictFocus, setIsDistrictFocus] = useState(false);
    const [currentPlace, setCurrentPlace] = useState(null);
    const [totalTime, setTotalTime] = useState(0);
    const [showDistrictDropdown, setShowDistrcitDropdown] = useState(false);
    const [hasCarPark, setHasCardPark] = useState(false);
    const [prevFilteredSalon, setPrevFilteredSalon] = useState([]);
    const [prevStylistHair, setPrevStylistHair] = useState([]);
	const [prevHairPreviewVisible, setPrevHairPreviewVisible] = useState(false);
	const [viewingPrevHairIndex, setViewingPrevHairIndex] = useState(0);
  	const [selectedTimePoint, setSelectedTimePoint] = useState(0);
  	const [selectedIndexes, setSelectedIndexes] = useState([]);
  	const [disabledIndexes, setDisabledIndexes] = useState([]);
  	const [helpSelect, setHelpSelect] = useState(true);
  	const [progress, setProgress] = useState(0);
	const [result, setResult] = useState("")
	const [isPreviewingResult, setIsPreviewingResult] = useState(false);
	const { initStep, selectedSalonId, selectedServicesId, selectedTotalTime } = route.params;

  	 const hashValues = [];

    for (let i = 24; i <= 68; i++) {
        hashValues.push(i); // Add each number to the array
    }

	const swiperRef= useRef(null);
  	const autocompleteRef = useRef();

	const backButtonClickHandler = () => {
		navigation.navigate('Dashboard');
	}

	const stepPressHandler = (position) => {
		setCurrentPosition(position);
	}

	const seeServiceDetailHandler = (service) => {
		navigation.navigate('ServiceDetail', {service: service, prev: 'booking'});
	}

	const seeMap = (destination) => {
		navigation.navigate('Map', {destination: destination});
	}

	useEffect(() => {
		setIsSearching(true);

		setFilteredSalon(salons.filter(salon => {
			return salon['name'].includes(searchInput);
		}));

		// Check if search input is empty, then stop searching
		if (searchInput.length === 0) {
			setIsSearching(false);
		}
	}, [searchInput]);

	useEffect(() => {

		if (city.length > 0) {
			setFilteredSalon(salons.filter(salon => {
				return salon['city'] == city;
			}));
		}

	}, [city]);

	useEffect(() => {

		if (district.length > 0) {
			setFilteredSalon(salons.filter(salon => {
				return salon['district'] == district;
			}));
		}

	}, [district]);
	useEffect(() => {

		if (isInferencing) {
			const duration = 30000; // 30 seconds in milliseconds
			const interval = 100; // Update interval (milliseconds)
			const steps = duration / interval; // Number of steps to reach 1 from 0

			let currentStep = 0;

			const timer = setInterval(() => {
			currentStep++;
			const newProgress = currentStep / steps; // Calculate the new progress

			setProgress(newProgress);

			if (currentStep === steps) {
				setLoading(true);
				clearInterval(timer); // Stop the timer when progress reaches 1
				setIsInferencing(false);
			}
			}, interval);

			return () => clearInterval(timer); // Cleanup the timer on component unmount
		}
	}, [isInferencing]);

	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dayOfWeek = daysOfWeek[selectedDate.getDay()];
	const dayOfMonth = selectedDate.getDate();
	const month = ('0' + (selectedDate.getMonth() + 1)).slice(-2);
	const year = selectedDate.getFullYear();

	useEffect(() => {
	
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(`${host}/api/salons`);

				const currentLocation = await GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 60000,
                });

				setCurrentPlace(currentLocation);

				setSalons(response.data.map(salon => {
					return {...salon, distance: getDistance({latitude: currentLocation.latitude, longitude:currentLocation.longitude}, {latitude: salon.lat, longitude: salon.lng})}
				}));

				if (selectedSalonId) {
					setSelectedSalon(response.data.filter(salon => salon.id == selectedSalonId)[0]);

					res = await axios.get(`${host}/api/salons/${selectedSalonId}/services`);

					setCategories(res.data.categories);

					setFilteredServices(res.data.categories[0].services);

					setStylists(res.data.users);

					const servicesArray = res.data.categories.length > 0 ? res.data.categories.map(cate => cate.services) : [];

					setSelectedServices([].concat(...servicesArray).filter(service => selectedServicesId.includes(service.id)));

					setSelectedStylist({id: null, name:null, rating: null});

					setSelectedDate(new Date());

					setTotalTime(selectedTotalTime);
				}

				setFilteredSalon(response.data.map(salon => {
					return {...salon, distance: getDistance({latitude: currentLocation.latitude, longitude:currentLocation.longitude}, {latitude: salon.lat, longitude: salon.lng})}
				}).sort(comparisonFunction));

				setIsLoading(false);
				if (initStep && initStep == 2) {
					setTimeout(() => {
						lastStepHandler();
					}, 300);
				}

			} catch (error) {
				console.error(error);
				navigation.navigate('Dashboard');
			}
		};

		fetchData();

		return () => {
			
		};
	}, []);

	const updateFreeTime = async (date, selectedStylist, helpSelect) => {

		const dateString = date.toLocaleString('en-GB',{hour12: false}).split(", ")[0];
		const currentDateString = new Date().toLocaleString('en-GB',{hour12: false}).split(", ")[0];

		if (dateString < currentDateString) {
			setDisabledIndexes(hashValues);


		} else if (dateString > currentDateString && !isInSameWeek(new Date(), date)) {
		
			showMessage({
				message: "You only can book for this week",
				type: "danger",
				autoHide: false,
				duration: 60000,
				icon: "danger",
			});
			setSelectedDate(new Date());
			
		} else {
			if (selectedStylist.id && !helpSelect) {

				await axios(`${host}/api/users/${selectedStylist.id}/freeInDate`, {
						params: {
							date: createYYYYMMDDString(date),
						}
					})
				.then((response => {
					const data = response.data

					const sequencedRanges = data.map(range => {
						const sequencedRange = [];
						const startIndex = hashTimePoint(range[0].slice(0, 5));
						const endIndex = hashTimePoint(range[1].slice(0, 5)) - 1;

						for (let i = startIndex; i <= endIndex;i ++) {
							sequencedRange.push(i);
						}

						return sequencedRange;
					})
					const mergedArray = mergeArrays(sequencedRanges);
					setDisabledIndexes(mergedArray)

				})).catch(function (error) {
					if (error.response && error.response.data) {
						console.log(error.response.data.error);
					} else {
						console.log(error);
					}
				});
			} else {
				let newSalonId;
				if (initStep && initStep == 2) {
					newSalonId = selectedSalonId;
				} else {
					newSalonId = selectedSalon.id;
				}
				try {
					await axios(`${host}/api/salons/${newSalonId}/${createYYYYMMDDString(date)}`)
						.then(res => {
							setDisabledIndexes(hashValues.filter(value => !res.data.includes(value)))
						});
				}catch(e) {
					if (e.response && e.response.data) {
						console.log(e.response.data.error);
					} else {
						console.log(e);
					}
				}
			}
		}
	}

	
	useEffect(() => {
		
		updateFreeTime(selectedDate, selectedStylist, helpSelect);

	}, [selectedDate.toDateString()])

	const selectSalonHandler = async (value) => {

		setSelectedSalon(value);

		try {
			const response = await axios.get(`${host}/api/salons/${value.id}/services`);

			setCategories(response.data.categories);

			setFilteredServices(response.data.categories[0].services);

			setStylists(response.data.users);

			nextStepHandler();

			await axios(`${host}/api/salons/${value.id}/availableInDate/${createYYYYMMDDString(new Date())}`)
			.then(
				res => {
					setDisabledIndexes(hashValues.filter(value => !res.data.includes(value)));
				});
		}catch(e) {
			if (e.response && e.response.data) {
				console.log("this", e.response.data);
			} else {
				console.log("here", e);
			}
		}
	}

	const nextStepHandler = () => {

		if (swiperRef.current) {
			swiperRef.current.scrollTo(1);
		}
	}

	const lastStepHandler = async () => {
		if (swiperRef.current) {
			swiperRef.current.scrollTo(2);
		}
	}

	const toggleServiceSelection = (service) => {

		const isSelected = selectedServices.some((selectedService) => selectedService.id === service.id);

		if (isSelected) {
		  	setSelectedServices((prevSelectedServices) => 
			prevSelectedServices.filter((selectedService) => selectedService.id !== service.id));
		  	setTotalTime(prev => prev - service.duration)
		} else {
		  	setSelectedServices((prevSelectedServices) => [...prevSelectedServices, service]);
			setTotalTime(prev => prev + service.duration)
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

	const selectPrevHair = async (id) => {
		await axios(`${host}/api/users/${id}/prevHair`, {
			params: {
				selectedServices: selectedServices.map(service => service.id),
			}
		}).then(function (response) {
			setPrevStylistHair(response.data);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	const selectStylist = async (stylist) => {

		if (helpSelect) {
			setHelpSelect(false);

		}

		setSelectedTimePoint(null);

		setSelectedIndexes([]);

		setSelectedStylist(stylist);

		await selectPrevHair(stylist.id);

		await updateFreeTime(selectedDate, stylist, false);
	}

	const retrieveCSRFToken = async () => {
		try {
			const response = await axios.get(`${host}/csrf-token`);
			return response.data.csrfToken;
		} catch (error) {
			console.error('Error retrieving CSRF token:', error);
			return null;
		}
	}

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		const hours = ('0' + date.getHours()).slice(-2);
		const minutes = ('0' + date.getMinutes()).slice(-2);
		const seconds = ('0' + date.getSeconds()).slice(-2);

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	};

	const bookingConfirm = async () => {
    	const csrfToken = await retrieveCSRFToken();

		const currentDate = new Date();

    	const startDateTime = createDateTimeObject(selectedDate, selectedTimePoint)

    	const endDateTime = createDateTimeObject(selectedDate, hashTimePoint(addMinutesToTimeString(selectedTimePoint, totalTime)));

		const userId = await AsyncStorage.getItem('userId').then((userId) => userId).catch((error) => { 
			console.log(error); 
			throw error; 
		});

        await axios.post(`${host}/api/orders/booking`, {
			salon_id: selectedSalon.id,
			customer_id: userId,
			status: 0,
			note: "",
			created_at: formatDate(currentDate),
			updated_at: formatDate(currentDate),
			ordered_start_at: formatDate(startDateTime),
			ordered_end_at: formatDate(endDateTime),
			staff_id: selectedStylist.id,
			services: selectedServices.map(service => service.id)
		}, {
			headers: {
				'Content-Type': 'multipart/form-data',
    			'X-CSRF-TOKEN': csrfToken
			}
		})
		.then(function (response) {
			showMessage({
				message: "Successful Booking",
				type: "success",
			});

			navigation.navigate('Dashboard');
		})
		.catch(function (error) {
			 if (error.response && error.response.data) {

				console.log(error.response.data.error);
			} else {
				console.log(error);
			}
		});
	}

	const getServiceInputHandler = (searchInput) => {
		setServiceSearchInput(searchInput);
		if (searchInput) {
			setFilteredServices(prev => prev.filter(service => service.name.toLowerCase().includes(searchInput.toLowerCase())));
		} else {
			setFilteredServices(categories[0].services);
		}
	}		

	const [listViewVisible, setListViewVisible] = useState(true)

	const searchTagContent = [
		{
			icon: <LocationIcon color="#cc4a16"/>,
			text: 'Near me',
			onClick: () => {

				setFilteredSalon(filteredSalon.filter(salon => salon.distance < 1000))
			}
		},
		{
			icon: <HomeIcon color="#cc4a16" width={16} height={16}/>,
			text: 'Near home',
		},
		{
			icon: <OfficeIcon color="#cc4a16" width={16} height={16}/>,
			text: 'Near office',
		}
	];
	
	const selectCategoryHandler = (id) => {
		setSelectedCategory(id);

		setFilteredServices(categories[id].services);
	}

	const showDistrictDropdownHandler = () => {
		setShowDistrcitDropdown(prev => !prev)
	}

	const toggleHasCardParkHandler = (isOn) => {
		setHasCardPark(isOn);
		setPrevFilteredSalon(filteredSalon);

		if (isOn) {
			setFilteredSalon(filteredSalon.filter(salon => salon.has_car_park))
		} else {
			setFilteredSalon(prevFilteredSalon)
		}
	}

	const helpSelectHandler = async (selectedTimePoint) => {

		setHelpSelect(true);

		try {
			await axios(`${host}/api/salons/${selectedSalon.id}/${createYYYYMMDDString(selectedDate)}/helpSelect`, {
				params: {
					time: selectedTimePoint,

					timeSlotNum: totalTime / 20,
				}
			}).then(async (res) => {

					const availableBarbers = res.data;

					const mostRattedBarber = findMaxId(stylists.map(stylist => {return {...stylist, name: stylist.first_name + " " + stylist.last_name, rating: stylist.pivot.rating}}).filter(stylist => availableBarbers.includes(stylist.id)), 'rating');

					setSelectedStylist(mostRattedBarber);

					await selectPrevHair(mostRattedBarber.id);
				}
			);

		}catch(error) {
			if (error.response && error.response.data) {
				console.log(error.response.data.error);
			} else {
				console.log(error);
			}
		};
	}

	const selectTimePointHandler = (timepoints) => {
		const newSelected = [];

		for (let i = timepoints; i <= timepoints + totalTime / 20; i ++) {
			newSelected.push(i);
		}

		setSelectedIndexes(newSelected);
		setSelectedTimePoint(timepoints)


		if (helpSelect) {
			helpSelectHandler(timepoints);
		}
	}

	const deselectTimePoints = () => {

		setSelectedTimePoint(null);

		setSelectedIndexes([]);

		if (selectedStylist.id && helpSelect) {
			setSelectedStylist(prev => { return {id: null, rating: null, name: null}})
		}
	}

	const changeProcessImageState = (state) => {
		setIsProcessingAnImage(state);

		if (!state) {
			setIsInferencing(true)
		}
	}

	const getResult = (result) => {
		setResult(result);	
		setLoading(false);
		setIsPreviewingResult(true);
	}

	const seeSalonHandler = async (salon) => {
		navigation.navigate('SalonDetail', {salon: salon})
	}

	const seeMoreStylistHandler = (stylist) => {
		navigation.navigate("StylistDetail", {stylist: stylist});
	}

	return (
		<View style={styles.container}>
			<ImageView
				images={[{uri: result}]}
				imageIndex={0}
				visible={isPreviewingResult}
				onRequestClose={() => setIsPreviewingResult(false)}
			/>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				{isLoading && <ActivityIndicator color={"#fff"} />}
				{isProcessingAnImage && 
				<View style={{gap: 5, alignItems: 'center'}}>
					<ActivityIndicator color={"#fff"} />
					<Text style={{color: '#fff'}}>Processing image, it may takes some seconds ... </Text>
				</View>
				}
				{isInferencing && 
				<View style={{gap: 30, alignItems: 'center'}}>
					<Progress.Circle progress={progress} size={100} color={"white"} thickness={7} borderWidth={3} showsText={true}/> 
					<Text style={{color: '#fff'}}>Transfering, please wait ...</Text>
				</View>
				}
			</View>
			{
				!isLoading && !isProcessingAnImage && !isInferencing && 
				<View>
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

							<View key="page 1" style={styles.selectSalonContainer} >
								<Text style={styles.slideTitle}>Select Salon</Text>
								<View style={{ width: '100%', paddingHorizontal: 5, marginTop: 10, zIndex: 10,overflow: 'visible',}}
				  						keyboardShouldPersistTaps='always'
									>
									<GooglePlacesAutocomplete
										ref={autocompleteRef}
										placeholder='Search salons by name or places'
                                		listViewDisplayed={listViewVisible}
										textInputProps={{
											onFocus: () => setListViewVisible(true),
											onSubmitEditing: () => {

												setFilteredSalon(salons.filter(salon => {
													return salon['name'].includes(autocompleteRef.current?.getAddressText());
												}).sort(comparisonFunction));
												
												setListViewVisible(false)
												setCity("")
												setDistrict("")
											},
										}}
										onPress={(data, details = null) => {
										
											const nearbySalons = salons.filter(salon => {
												return getDistance({latitude: details.geometry.location.lat, longitude:details.geometry.location.lng}, {latitude: salon.lat, longitude: salon.lng}) < 1000;
											}).sort(comparisonFunction)

											setFilteredSalon(nearbySalons);

											setListViewVisible(false);
											setCity("")
											setDistrict("")
										}}
										onFail={error => console.error(error)}
										keepResultsAfterBlur={true}
										nearbyPlacesAPI='GooglePlacesSearch'
										query={{
											key: 'AIzaSyCXMER8nT28GR0VF--NbVdWROad-vDeZo4',
											language: 'vi',
										}}
            							enablePoweredByContainer={false}
										styles={{
											textInputContainer: {
												borderTopWidth: 0,
												borderBottomWidth: 0,
												overflow: 'visible',
												backgroundColor: '#fff',
												borderColor: '#fff',
												borderRadius: 5,
											},
											description: {
												fontWeight: 'bold'
											},
											predefinedPlacesDescription: {
												color: '#1faadb'
											},
											listView: {
												position: 'absolute',
												display: listViewVisible ? 'flex' : 'none',
												top: 47,
												left: -1,
												backgroundColor: 'white',
												borderRadius: 5,
												flex: 1,
												elevation: 3,
												zIndex: 10,
            									width: deviceWidth - 8

											},
										}}
										fetchDetails={true}
									/>
								</View>
								<View style={styles.searchTagStack}>
									<TouchableOpacity>
										<SearchTag text={showDistrictDropdown ? "Hide" : "Select districts"} onClick={showDistrictDropdownHandler}/>
									</TouchableOpacity>
									<ScrollView horizontal={true} style={{width: viewportWidth * 2/5, borderRadius: 2}}>
										{
											searchTagContent.map((tag, index) => {
												return (
													<SearchTag key={index} icon={tag.icon} text={tag.text} onClick={tag.onClick}/>
												)
											})
										}
									</ScrollView>
								</View>
								{
								showDistrictDropdown && 
									<View style={{width: '100%', paddingHorizontal: 5, flexDirection: 'row', gap: 3, marginTop: 4}}>
										<Dropdown
											style={[styles.dropdown, isCityFocus && { borderColor: 'red' }]}
											placeholderStyle={styles.placeholderStyle}
											selectedTextStyle={styles.selectedTextStyle}
											inputSearchStyle={styles.inputSearchStyle}
											iconStyle={styles.iconStyle}
											data={cities}
											search
											maxHeight={300}
											labelField="label"
											valueField="value"
											placeholder={!isCityFocus ? 'Select City' : '...'}
											searchPlaceholder="Search..."
											value={city}
											onFocus={() => setIsCityFocus(true)}
											onBlur={() => setIsCityFocus(false)}
											onChange={item => {
												setCity(item.value);
												setIsCityFocus(false);
											}}
										/>
										<Dropdown
											style={[styles.dropdown, isDistrictFocus && { borderColor: 'blue' }, {fontSize: 14}]}
											placeholderStyle={styles.placeholderStyle}
											selectedTextStyle={styles.selectedTextStyle}
											inputSearchStyle={styles.inputSearchStyle}
											iconStyle={styles.iconStyle}
											data={city ? cities.filter(ct => ct.value == city)[0].districts : []}
											search
											maxHeight={300}
											labelField="label"
											valueField="value"
											placeholder={!isDistrictFocus ? 'Select District' : '...'}
											searchPlaceholder="Search..."
											value={district}
											onFocus={() => setIsDistrictFocus(true)}
											onBlur={() => setIsDistrictFocus(false)}
											onChange={item => {
												setDistrict(item.value);
												setIsDistrictFocus(false);
											}}
										/>
									</View>	
								}
								<View style={{flexDirection: 'row', paddingVertical: 8, alignItems: 'center', gap: 10, justifyContent: 'space-between', width: viewportWidth, paddingHorizontal: 8}}>
									<Text style={{ color: "white", fontWeight: "500" }}>Found {filteredSalon.length} {filteredSalon.length > 1 ? "salons" : "salon"}</Text>
									<ToggleSwitch
										isOn={hasCarPark}
										onColor="green"
										offColor="#cc4a16"
										size="medium"
										label="Has a car park"
  										labelStyle={{ color: "white", fontWeight: "500" }}
										onToggle={toggleHasCardParkHandler}
									/>
								</View>
									<View style={{flex: 1, backgroundColor: '#eee', borderRadius: 5, marginTop: 3, width: viewportWidth}}>
										{!loading ? (
											filteredSalon.length > 0 ? 
											<SalonList salonList={filteredSalon} selectSalon={selectSalonHandler} seeMap={seeMap} seeSalon={seeSalonHandler}/> : 
											<View style={{flex: 1, gap: 15, height: viewportHeight/5, alignItems: 'center'}}>
												<Text style={{color: '#3d5c98', fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>No salon found</Text>
												<SadIcon width={60} height={60} />
											</View>
										)
										: 
										<ActivityIndicator size="large" color="#fff" />
										}
									</View>
							</View>

							<View key="page 2" style={styles.selectServicesContainer}>
								<Text style={[styles.slideTitle, {marginBottom: 2}]}>Select services {selectedSalon.id ? ": " + selectedSalon.name + " " : ""}</Text>
								<SearchBar
									platform="ios"
									placeholder={"Search services with name"}
									value={serviceSearchInput}
									onChangeText={getServiceInputHandler}
									inputStyle={{height: 70}}
									containerStyle={{
										borderWidth: 0,
										paddingTop: 0,
										backgroundColor:'#3D5C98',
										width: viewportWidth, 
										height : 70,
									}}
									inputContainerStyle={{
										borderWidth: 1,
										borderColor: '#fff',
										borderRadius: 7,
										padding: 0,
										backgroundColor: '#fff',
										shadowColor: '#171717',
										shadowOffset: {width: -2, height: 4},
										shadowOpacity: 0.2,
										shadowRadius: 3,
										height: 43,
									}}
									placeholderTextColor="#999"
									searchIcon={{ size: 20 }}
									cancelButtonProps={{
										color: '#fff'
									}}
								/>
								{
									selectedSalon.id ?
									(categories.length > 0 ? <View>
										<ScrollView style={styles.serviceTypeTagsStack} horizontal>
											{
												categories.map((category, id) => {
													return (
														<ServiceTypeCard service={category.name} key={category.name} backgroundColor={id === selectedCategory ? "#d48206" : "#fff"} color={id === selectedCategory ? "#fff" : "#3d5c98"} onClick={() => selectCategoryHandler(id)}/>
													)
												})
											}
										</ScrollView>
										<View style={styles.serviceTagsStack}>
											<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10}}>
												<Text style={styles.selectedNum}>Selected services: {selectedServices.length}</Text>
												<View style={{flexDirection: 'row', alignItems: 'center', gap: 5, fontSize: 15, height: '100%', marginBottom: 8}}>
													<ClockIcon width={20} height={20} color="#3d5c98" />
													<Text style={{color: '#3d5c98', fontSize: 15, fontWeight: 500}}>
														Total time:
														{
															totalTime
														} minutes
													</Text>
												</View>
											</View>
											<ScrollView 
												contentContainerStyle={{ paddingBottom: 20 }}
												contentInset={{top: 0, bottom: 160, left: 0, right: 0}}
												contentInsetAdjustmentBehavior="automatic"
												style={{flex: 1, width: viewportWidth}}
											>
												{
													filteredServices.map(service => {
														return (
															<TouchableOpacity onPress={() => seeServiceDetailHandler(service)} key={service.id}>
																<ServiceCard 
																	id={service.id}
																	serviceName={service.name} 
																	serviceTime={service.duration}
																	serviceFee={service.price}
																	serviceSummary={service.summary}
																	sale={service.sale}
																	salePercent={20} 
																	onClick={seeServiceDetailHandler}
																	image={service.try_on_image_url}
																	selectService={toggleServiceSelection}
																	selected={selectedServices.some((selectedService) => selectedService.id === service.id)}
																	changeProcessImageState={changeProcessImageState}
																	getResult={getResult}
																/>
															</TouchableOpacity>
														)
													})
												}
											</ScrollView>
											{ selectedServices.length > 0 ? 
											<View style={styles.addServicesButton}>
												<AddServicesButton 
													backgroundColor="#3d5c98" 
													color='#fff' 
													selectedCount={selectedServices.length}
													nextStepHandler={lastStepHandler}
													content="only-add"
												/>
											</View> : ""
											}
										</View>
									</View> : <Text style={{color: '#fff', fontSize: 19, fontWeight: 'bold', marginTop: 30, flex: 1}}>No available service found</Text>) : <Text style={{color: '#fff', fontSize: 19, fontWeight: 'bold', marginTop: 30, flex: 1}}>Please select salon first</Text> }
							</View>
						
							<View key="page 3" style={styles.selectStylistAndTimeContainer}>
							<DatePicker
								modal
								open={datePickerOpen}
								date={selectedDate}
								onConfirm={async (date) => {
									setDatePickerOpen(false);

									setSelectedDate(date);

									deselectTimePoints();

									updateFreeTime(date, selectedStylist, helpSelect);
								}}
								onCancel={() => {
									setDatePickerOpen(false)
								}}
								mode="date"
							/>
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
									<View style={{paddingHorizontal: 5}}>
										<View style={{flexDirection: 'row', alignItems: 'center'}}>
											<TouchableOpacity style={[{alignItems: 'center', marginRight: 10}, helpSelect && {backgroundColor:"#f09000", borderRadius: 5, padding: 7}]} onPress={
												() => {
													if (!helpSelect && selectedTimePoint) {
														helpSelectHandler(selectedTimePoint);
													} else if (!helpSelect && !selectedTimePoint) {
														setHelpSelect(true);

														setSelectedStylist({id: null, name:null, rating: null});

														setPrevStylistHair([]);

														updateFreeTime(selectedDate, {id: null}, true);
													}
												}
											}>
												<AssistantIcon />
												<Text style={{color: helpSelect ? '#fff' : '#3d5c98', fontWeight: 600}}>help select</Text>
											</TouchableOpacity>
											<Carousel 
												data={stylists}
												
												renderItem={item => 
													{
													return <StylistCard 
														key={item.id} 
														item={item} 
														onClick={selectStylist} 
														name={item.full_name} 
														backgroundColor={item.item.id === selectedStylist.id && selectedStylist.id ? "#f09000" : "#fff"}	
														rating={item.item.pivot.rating}						
													/>
													}
													}
													sliderWidth={sliderWidth}
													itemWidth={sliderItemWidth}
													activeSlideAlignment={'start'}
											/>
										</View>
									
										<View style={styles.stylistDetail}>
											<View style={styles.stylistName}>
												<Text style={{fontSize: 16, color: '#3d5c98', fontWeight: 600}}>Full Name: </Text>
												<Text>{selectedStylist?.name}</Text>
												<TouchableOpacity style={{marginLeft: 18}} onPress={() => {seeMoreStylistHandler(selectedStylist)}}>
													<Text style={{textDecorationLine: 'underline', color: '#3d5c98'}}>See more</Text>
												</TouchableOpacity>
											</View>
											<View style={styles.stylistRatting}>
												<Text style={{fontSize: 16, color: '#3d5c98', fontWeight: 600}}>Rating: </Text>
												<StarIcon color={"#f09000"} width={16} height={16}/>
												<Text style={{color: '#d48206'}}>{selectedStylist?.rating}</Text>
											</View>
											<View>
												<Carousel 
													data={prevStylistHair}
													renderItem={item => 
														<TouchableOpacity onPress={() => {setPrevHairPreviewVisible(true)}}>
															<FastImage source={{uri: item.item}} style={{width: 90, height: 90, borderRadius: 5}}/>
														</TouchableOpacity>
													}
													sliderWidth={sliderWidth}
													itemWidth={sliderItemWidth}
													activeSlideAlignment={'start'}
												/>

												<ImageView
													images={prevStylistHair.map(image => {return {uri: image}})}
													imageIndex={viewingPrevHairIndex}
													visible={prevHairPreviewVisible}
													onRequestClose={() => setPrevHairPreviewVisible(false)}
												/>
											</View>
										</View>
									</View> : ""
									}
								</View>
									<View style={styles.selectTime}>
										<View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,}}>
											<View style={{flexDirection: 'row', alignItems: 'center', gap: 15,}}>
												<CalendarIcon height={22} width={22}/>
												<TouchableOpacity onPress={() => setDatePickerOpen(true)}>
													<Text style={{fontSize: 17, fontWeight: 600, color: '#3d6c98'}}>
														    {dayOfWeek}, {dayOfMonth}/{month}/{year}
													</Text>
												</TouchableOpacity>
											</View>
											<View style={{flexDirection: 'row', gap: 3}}>
												<Button title="Deselect" onPress={deselectTimePoints}/>
												<Button title="Today" onPress={() => {
													setSelectedDate(new Date())


												}}/>
											</View>
										</View>
										<View>
											<TimeGrid selectTimePointHandler={selectTimePointHandler} totalTime={totalTime} disabledIndexes={disabledIndexes} selectedIndexes={selectedIndexes}/>
										</View>
									</View>
									<TouchableOpacity style={[styles.confirmButton, (!selectedSalon.id || selectedServices.length == 0 || !selectedStylist.id || !selectedTimePoint) && {backgroundColor: "#ccc"} ]} onPress={bookingConfirm} disabled={!selectedSalon.id || selectedServices.length == 0 || !selectedStylist.id || !selectedTimePoint}>
										<Text style={styles.confirmText}>Book</Text>
									</TouchableOpacity>
							</View>
						</Swiper>
					</View>
				</View>
			}
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
		fontWeight: "600",
	},
	//------------------------
	container: {
		height: viewportHeight,
		width: viewportWidth,
		backgroundColor: '#3d5c98',
		flexDirection: 'column',
	},
	backButton: {
		position: 'absolute',
		width: '20%',
		flexDirection: 'row',
		alignContent: 'space-around',
		alignItems: 'center',
		marginTop: viewportHeight/22,
		paddingLeft: viewportWidth/50,
		zIndex: 999,
	},
	screenTitleContainer: {
		paddingBottom: 15,
	},
	screenTitle: {
		width: '100%',
		fontSize: 28,
		fontWeight: "700",
		color: '#fff',
		letterSpacing: 1,
		marginTop: viewportHeight/22,
		textAlign: 'center',
	},
	bookingStepContainer: {
		height: viewportHeight,
		width: viewportWidth,
	},
	stepIndicator: {
		marginLeft: 20,
	},
	wrapper: {
		paddingTop: 10,
	},

	// FIRST PAGE
	selectSalonContainer: {
		flex: 1,
		height: viewportHeight,
		justifyContent: 'center',
		alignItems: 'center',
	},
	slideTitle: {
		color: '#fff',
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	searchTagStack: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		width: viewportWidth,
		marginTop: 48,
		gap: 1,
		paddingHorizontal: 6,
		alignItems: 'center'
	},
	locationSelectBox: {
		flex: 1,
		alignSelf:'stretch',
		paddingHorizontal: 10,
		paddingTop: 10,
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
	pleaseSelectYourCity: {
		fontSize: 16,
		color: "#fff",
		fontWeight: 'bold'
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
	    maxHeight: 28,

	},
	serviceTagsStack: {
		marginTop: 10,
		backgroundColor: '#efefef',
		width: '100%',
		alignSelf: 'stretch',
		minHeight: 700,
		borderRadius: 5,
		paddingTop: 10,
	},
	selectedNum: {
		fontSize: 15,
		fontWeight: "500",
		color: '#3c5d98',
		marginBottom: 8,
	},
	addServicesButton: {
		position: 'absolute',
		bottom: viewportHeight/7,
		left: 0,
		right: 0,
		paddingHorizontal: 5,
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
		fontWeight: "600"
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
		fontWeight: "600"
	},
	stylistRatting: {
		flexDirection: 'row',
		alignItems: 'center',
		fontSize: 18,
		fontWeight: "600",
		gap: 3,
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
		fontWeight: "600",
		color: '#000',
		textAlign: 'center'
	},
	 dropdown: {
		height: 34,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 5,
		paddingHorizontal: 8,
		width: "49.5%",
		backgroundColor: '#fff',
		fontSize: 18 
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
	  color: '#999'
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
})


export default BookingScreen;
