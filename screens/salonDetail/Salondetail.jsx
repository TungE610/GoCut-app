import {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, ScrollView, View, Text} from 'react-native';
import ReturnHomeButton from '../../components/returnHomeButton/ReturnHomeButton';
import MarkButton from '../../components/markButton/MarkButton';
import ClockIcon from '../../assets/clock.svg';
import StarIcon from '../../assets/star.svg';
import CatIcon from '../../assets/cut.svg';
import CircleIcon from '../../assets/circle.svg';
import ServiceTypeCard from '../../components/serviceTypeCard/ServiceTypeCard';
import ServiceCard from '../../components/serviceCard/ServiceCard';
import AddServicesButton from '../../components/addServicesButton/AddServicesButton';
import CutIcon from '../../assets/cut.svg';
import FacialIcon from '../../assets/facial.svg';
import NailIcon from '../../assets/nail.svg';
import FastImage from 'react-native-fast-image'
import axios from 'axios';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');
const host = 'http://192.168.1.5';

const SalonDetail = ({route, navigation, ...props}) => {

	const initialServices =  [].filter(service => service.type === 'haircut');

	// const [selectedServiceType, setSelectedServiceType] = useState("haircut");
	const [selectedServices, setSelectedServices] = useState([]);
	// const [filtedServices, setFilteredServices] = useState(initialServices);
	const [orderedNumber, setOrderedNumber] = useState(0);
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
	const [categories , setCategories] = useState([]);
	const [totalTime, setTotalTime] = useState(0);

	const {salon} = route.params;

	useEffect(() => {

		const getSalonOrderedNumber = async () => {
			await axios(`${host}:8000/api/salons/orderedNumber`, {
				params: {
					salonId: salon.id,
				}
			}).then (res => {
				setOrderedNumber(res.data);
			})
		}

		const getCategories = async () => {
			const response = await axios.get(`${host}:8000/api/salons/${salon.id}/services`);

			setCategories(response.data.categories);
		}

		getSalonOrderedNumber();
		getCategories();

	}, [])
	const returnHomeHandler = () => {
		navigation.navigate('Dashboard');
	}
	const toggleServiceSelection = (service) => {

		const isSelected = selectedServices.some((selectedService) => selectedService.id === service.id);

		if (isSelected) {
		  	setSelectedServices((prevSelectedServices) => prevSelectedServices.filter((selectedService) => selectedService.id !== service.id));
			setTotalTime(prev => prev - service.duration)
		} else {
		  	setSelectedServices((prevSelectedServices) => [...prevSelectedServices, service]);
			console.log("add:", service.duration)
			setTotalTime(prev => prev + service.duration)
		}
	};
	
	return (
		<View style={styles.container}>
			<ScrollView style={styles.content}>
				<FastImage
					source={{uri: salon.images.length > 0 ? salon.images[0].image_url : ""}}
					style={styles.salonImage}
				>
					<View style={styles.buttonsContainer}>
						<ReturnHomeButton onClick={returnHomeHandler}/>
						<MarkButton />
					</View>
				</FastImage>
				<View style={styles.salonDetail}>
					<Text style={styles.salonName}>
						{salon.name}
					</Text>
					<Text style={styles.salonAddress}>
						{salon.address}
					</Text>
					<View style={styles.currentStatus}>
						<ClockIcon width={30} height={30} color='#2A4780' />
						<Text>{props.currentStatus === 'open' ? '[open today]' : '[closed today]'}</Text>
					</View>
					<View style={styles.popularity}>
						<View style={styles.ratting}>
							<StarIcon width={25} height={25} color="#FE7A01"/>
							<Text style={styles.rattingPoint}>{salon.rating}</Text>
							<Text style={styles.rattingNum}>({props.rattingNum || '1.3K'})</Text>
						</View>
						<View style={styles.view}>
							<CatIcon width={20} height={20} color={"#3d5c98"}/>
							<Text style={styles.viewNum}>{orderedNumber}</Text>
						</View>
					</View>
					<View style={styles.about}>
						<Text style={styles.aboutTitle}>
							About:
						</Text>
						<Text style={styles.aboutDetail}>
							{salon.description}
						</Text>
					</View>
					<View style={styles.about}>
						<Text style={styles.aboutTitle}>
							Opening hours:
						</Text>
						<View style={styles.openingHoursDetail}>
								<View style={styles.Am}>
									<CircleIcon width={10} height={10} />
									<View style={styles.AmDetail}>
										<Text style={styles.amOpeningDay}>{props.amOpeningFromDay || 'Monday'}-{props.amOpeningToDay || 'Friday'}</Text>
										<Text style={styles.amOpeningHours}>{props.amOpeningFromHour || '08:00'} am - {props.amOpeningToHour || '11:30'} am</Text>
									</View>
								</View>
								<View style={styles.Am}>
									<CircleIcon width={10} height={10} />
									<View style={styles.AmDetail}>
										<Text style={styles.amOpeningDay}>{props.amOpeningFromDay || 'Monday'}-{props.amOpeningToDay || 'Friday'}</Text>
										<Text style={styles.amOpeningHours}>{props.amOpeningFromHour || '13:00'} am - {props.amOpeningToHour || '16:30'} am</Text>
									</View>
								</View>
						</View>
					</View>
					<View style={styles.about}>
						<Text style={styles.aboutTitle}>
							Our services:
						</Text>
						<View style={styles.serviceTypesStack}>
								<ScrollView horizontal>
									{
										categories.map((category, index) =>  
											<ServiceTypeCard 
												key={index}
												service={category.name}
												backgroundColor= {selectedCategoryIndex === index ? '#3d5c98' : '#fff'}
												color={selectedCategoryIndex === index ? '#fff' : '#3d5c98'}
												onClick={() => {
													setSelectedCategoryIndex(index);
												}}

											/>
										)
									}
								</ScrollView>
							
						</View>
						<View style={styles.servicesStack}>
							{
								categories.length > 0 ? categories[selectedCategoryIndex].products.map(service => {
									
									return (
										<ServiceCard 
										    key = {service.id}
											id = {service.id}
											serviceName = {service.name}
											serviceTime = {service.duration}
											serviceFee = {service.price}
											image ={service.illustration}
											selected={selectedServices.some((selectedService) => selectedService.id === service.id)}
											selectService={toggleServiceSelection}
										/>
									)
								}) : ""
							}
							{
								categories.length > 0 ? <Text style={{textAlign: 'center', marginTop: 10, fontSize: 16, fontWeight: "600", color: '#3d5c98'}}>Not found any services of this category</Text> : ""
							}
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={styles.addServicesButton}>
				{
					selectedServices.length > 0 ?
					<AddServicesButton selectedCount={selectedServices.length} nextStepHandler={() => {
						navigation.navigate('Booking', {
							initStep: 2,
							selectedSalonId: salon.id,
							selectedServicesId: selectedServices.map(service => service.id),
							selectedTotalTime: totalTime,
						})
					}}/>
					: ""
				}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		marginTop: viewportHeight/20,
	},
	salonImage: {
		width: viewportWidth,
		height: viewportHeight/3.5,
	},
	salonName: {
		fontSize: 22,
		fontWeight: "700",
		letterSpacing: 0.4,
		color: '#2A4780',
		marginTop: 20,
		paddingHorizontal: 10
	},
	salonAddress: {
		fontSize: 15,
		color: '#555',
		marginTop: 10,
		paddingHorizontal: 10
	},
	currentStatus: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginTop: 20,
		paddingHorizontal: 10
	},
	popularity: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 20,
		paddingBottom: 15,
		borderBottomColor: '#555',
		borderBottomWidth: 0.4,
		paddingHorizontal: 10
	},
	ratting: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingHorizontal: 10
	},
	rattingPoint: {
		fontSize: 19,
		fontWeight: "600",
		color: '#FE7A01',
	},
	rattingNum: {
		fontSize: 19,
		fontWeight: "600",
		color: '#555',
	},
	view: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	viewNum: {
		fontSize: 19,
		fontWeight: "600",
		color: '#555',
	},
	about: {
		marginTop: 20,
		gap: 10,
	},
	aboutTitle: {
		fontSize: 20,
		fontWeight: "600",
		color: '#2A4780',
		paddingHorizontal: 10
	},
	aboutDetail: {
		color: '#555',
		paddingHorizontal: 10
	},
	openingHoursDetail: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10
	},
	Am: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 15,
	}, 
	AmDetail: {
		gap: 7,
	},
	amOpeningDay: {
		fontSize: 16,
		color: '#726565'
	},
	amOpeningHours: {
		fontSize: 14,
		fontWeight: "700",
		color: '#2A4780'
	},
	serviceTypesStack: {
		flexDirection: 'row',
		gap: 5,
		paddingHorizontal: 10
	},
	servicesStack: {
		
	},
	addServicesButton: {
		position: 'absolute',
		bottom: 20,
		left: 0,
		right: 0,
		paddingHorizontal: 10,
	}
})

export default SalonDetail;
