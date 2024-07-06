import { useEffect, useState, useRef } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, ActivityIndicator, Button, ScrollView } from 'react-native';
import ReturnHomeButton from '../components/returnHomeButton/ReturnHomeButton';
import SalonList from '../components/salonList/SalonList';
import cities from '../data/cities.json';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import GetLocation from 'react-native-get-location';
import { getDistance } from 'geolib';
import LocationIcon from '../assets/location.svg';
import HomeIcon from '../assets/home.svg';
import OfficeIcon from '../assets/office.svg';
import SearchTag from '../components/searchTag/SearchTag';
import ToggleSwitch from 'toggle-switch-react-native';
import SadIcon from '../assets/sad.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const deviceWidth = Dimensions.get("window").width;
const host = "https://salon-docker-production.up.railway.app";

function comparisonFunction(a,b) {
    return a.distance - b.distance;
}

Geocoder.init("AIzaSyAbGlZdGC8HtYiQXhyjxmmMww68WsLwgr0", {language : "vi"}); // use a valid API key

const wp = (percentage) => {
	const value = percentage * viewportWidth / 100;
	return Math.round(value);
}

const Salons = ({route, navigation}) => {
	
	const [searchInput, setSearchInput] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [salons, setSalons] = useState([])
	const [filteredSalon, setFilteredSalon] = useState([])
	const [loading, setLoading] = useState(true);
	const [selectedSalon, setSelectedSalon] = useState({});

    const [isCityFocus, setIsCityFocus] = useState(false);
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [isDistrictFocus, setIsDistrictFocus] = useState(false);
    const [currentPlace, setCurrentPlace] = useState(null);
    const [showDistrictDropdown, setShowDistrcitDropdown] = useState(false);
    const [hasCarPark, setHasCardPark] = useState(false);
    const [prevFilteredSalon, setPrevFilteredSalon] = useState([]);
	const { initStep, selectedSalonId, selectedServicesId, selectedTotalTime } = route.params;
	const [user, setUser] = useState(null);
	const getUserData = async () => {
		const token = await AsyncStorage.getItem('bearerToken').then((token) => token).catch((error) => console.log(error));

		const headers = {headers :
			{ 
				Authorization: `Bearer ${token}`,
				Accept :'application/json', 
			}
		};
		try {
			await axios(`${host}/api/customer`, headers).then(res => {
				setUser(res.data);
			}).catch((error) => console.log(error))
		}catch(error) {
			if (error.response && error.response.data) {
				console.log(error.response.data.error);
			} else {
				console.log(error);
			}
			}
	}
	useEffect(() => {
		getUserData();
	}, [])

  	 const hashValues = [];

    for (let i = 24; i <= 68; i++) {
        hashValues.push(i); // Add each number to the array
    }

	const swiperRef= useRef(null);
  	const autocompleteRef = useRef();

	const backButtonClickHandler = () => {
		navigation.navigate('Dashboard');
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
	
		const fetchData = async () => {
			setLoading(true);
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

				setFilteredSalon(response.data.map(salon => {
					return {...salon, distance: getDistance({latitude: currentLocation.latitude, longitude:currentLocation.longitude}, {latitude: salon.lat, longitude: salon.lng})}
				}).sort(comparisonFunction));

				setLoading(false);

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
    const selectSalonHandler = (value) => {
		setSelectedSalon(value);
	}

	const [listViewVisible, setListViewVisible] = useState(true)

	const searchTagContent = [
		{
			icon: <LocationIcon color="#cc4a16"/>,
			text: 'Near me',
			onClick: async () => {
				setFilteredSalon(salons.map(salon => {
					return {...salon, distance: getDistance({latitude: currentPlace.latitude, longitude:currentPlace.longitude}, {latitude: salon.lat, longitude: salon.lng})}
				}).filter(salon => salon.distance < 1000).sort(comparisonFunction));

			}
		},
		{
			icon: <HomeIcon color="#cc4a16" width={16} height={16}/>,
			text: 'Near home',
			onClick: () => {
				Geocoder.from(user.address)
					.then(json => {
						var location = json.results[0].geometry.location;
						setFilteredSalon(salons.map(salon => {
							return {...salon, distance: getDistance({latitude: location.lat, longitude:location.lng}, {latitude: salon.lat, longitude: salon.lng})}
						}).filter(salon => salon.distance < 1000).sort(comparisonFunction));
					})
					.catch(error => console.warn(error));

			}
		},
		{
			icon: <OfficeIcon color="#cc4a16" width={16} height={16}/>,
			text: 'Near office',
			onClick: () => {
				Geocoder.from(user.office_address)
					.then(json => {
						var location = json.results[0].geometry.location;
						setFilteredSalon(salons.map(salon => {
							return {...salon, distance: getDistance({latitude: location.lat, longitude:location.lng}, {latitude: salon.lat, longitude: salon.lng})}
						}).filter(salon => salon.distance < 1000).sort(comparisonFunction));
					})
					.catch(error => console.warn(error));

			}
		}
	];
	
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

	const seeSalonHandler = (salon) => {
		navigation.navigate('SalonDetail', {salon: salon})
	}

    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <ReturnHomeButton onClick={backButtonClickHandler} page="booking" />
            </View>
            <View style={styles.screenTitleContainer}>
                <Text style={styles.screenTitle}>Salons</Text>
            </View>
            <View style={styles.selectSalonContainer} >
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
                            key: "AIzaSyAbGlZdGC8HtYiQXhyjxmmMww68WsLwgr0",
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
                    <View style={{flex: 1, backgroundColor: '#eee', borderRadius: 5, marginTop: 3, width: viewportWidth, alignItems: 'center', justifyContent: 'center'}}>
                        {!loading ? (
							filteredSalon.length > 0 ? 
                            <SalonList salonList={filteredSalon} selectSalon={selectSalonHandler} seeMap={seeMap} seeSalon={seeSalonHandler}/> : <View style={{flex: 1, gap: 15, height: viewportHeight/5, alignItems: 'center'}}>
								<Text style={{color: '#3d5c98', fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center'}}>No salon found</Text>
								<SadIcon width={60} height={60} />
							</View>
                            )
                        : 
                        <ActivityIndicator size="large" color="#3d5c98" />
                        }
                    </View>
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
		fontWeight: "600",
	},
	//------------------------
	container: {
		height: viewportHeight,
		width: viewportWidth,
		backgroundColor: '#3d5c98',
		flexDirection: 'column',
        paddingTop: viewportHeight/ 25,
	},
	backButton: {
		position: 'absolute',
		width: '20%',
		flexDirection: 'row',
		alignContent: 'space-around',
		alignItems: 'center',
		marginTop: viewportHeight/15,
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


export default Salons;
