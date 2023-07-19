import {useState} from 'react';
import {StyleSheet, Dimensions, ScrollView, View, ImageBackground, Text} from 'react-native';
import ReturnHomeButton from '../../components/returnHomeButton/ReturnHomeButton';
import MarkButton from '../../components/markButton/MarkButton';
import ClockIcon from '../../assets/clock.svg';
import StarIcon from '../../assets/star.svg';
import ViewIcon from '../../assets/view.svg';
import CircleIcon from '../../assets/circle.svg';
import ServiceTypeCard from '../../components/serviceTypeCard/ServiceTypeCard';
import ServiceCard from '../../components/serviceCard/ServiceCard';
import AddServicesButton from '../../components/addServicesButton/AddServicesButton';
import CutIcon from '../../assets/cut.svg';
import FacialIcon from '../../assets/facial.svg';
import NailIcon from '../../assets/nail.svg';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');

const sampleServices = [
	{
		id: 0,
		name: 'Women medium blunt cut',
		type: "haircut",
		serviceTime: 2,
		serviceFee : 500,
		salePercent: 20,
		image: require('../../assets/service1.jpg')
	},
	{
		id: 1,
		name: 'Women medium blunt cut',
		type: "haircut",
		serviceTime: 2,
		serviceFee : 500,
		salePercent: 20,
		image: require('../../assets/service2.jpg')
	},
	{
		id: 2,
		name: 'Women medium blunt cut',
		type: "facial",
		serviceTime: 2,
		serviceFee : 500,
		salePercent: 30,
		image: require('../../assets/service3.jpg')
	}
]

const SalonDetail = ({navigation, ...props}) => {

	const initialServices =  sampleServices.filter(service => service.type === 'haircut');

	const [selectedServiceType, setSelectedServiceType] = useState("haircut");
	const [selectedServices, setSelectedServices] = useState([]);
	const [filtedServices, setFilteredServices] = useState(initialServices);

	const returnHomeHandler = () => {
		navigation.navigate('Dashboard');
	}

	const selectServiceTypeHandler = (value) => {
		setSelectedServiceType(value);
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

	console.log(selectedServices);
	
	return (
		<View style={styles.container}>
			<ScrollView style={styles.content}>
				<ImageBackground
					source={require('../../assets/salon1.jpg')}
					style={styles.salonImage}
				>
					<View style={styles.buttonsContainer}>
						<ReturnHomeButton onClick={returnHomeHandler}/>
						<MarkButton />
					</View>
				</ImageBackground>
				<View style={styles.salonDetail}>
					<Text style={styles.salonName}>
						{props.salonName || 'Plush beauty Salon'}
					</Text>
					<Text style={styles.salonAddress}>
						{props.salonAddress || '151 Nguyễn Đức Cảnh, Tương Mai, Hoàng Mai'}
					</Text>
					<View style={styles.currentStatus}>
						<ClockIcon width={30} height={30} color='#2A4780' />
						<Text>{props.currentStatus === 'open' ? '[open today]' : '[closed today]'}</Text>
					</View>
					<View style={styles.popularity}>
						<View style={styles.ratting}>
							<StarIcon width={25} height={25} color="#FE7A01"/>
							<Text style={styles.rattingPoint}>{props.rattingPoint || '8.7'}</Text>
							<Text style={styles.rattingNum}>({props.rattingNum || '1.3K'})</Text>
						</View>
						<View style={styles.view}>
							<ViewIcon />
							<Text style={styles.viewNum}>{props.viewNum || '2.7K'}</Text>
						</View>
					</View>
					<View style={styles.about}>
						<Text style={styles.aboutTitle}>
							About:
						</Text>
						<Text style={styles.aboutDetail}>
							{props.about || 
							'lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsum'}
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
							<ServiceTypeCard 
								icon={<CutIcon width={18} height={18} color={selectedServiceType === 'haircut' ? '#fff' : '#3d5c98'}/>} 
								service="Haircut"
								backgroundColor= {selectedServiceType === 'haircut' ? '#3d5c98' : '#fff'}
								color={selectedServiceType === 'haircut' ? '#fff' : '#3d5c98'}
								onClick={() => {
									setSelectedServiceType("haircut");
									setFilteredServices(sampleServices.filter(service => service.type === 'haircut'))
									selectedServices.length = 0;
								}}
							/>
							<ServiceTypeCard 
								icon={<FacialIcon width={22} height={22} color={selectedServiceType === 'facial' ? '#fff' : '#3d5c98'}/>} 
								service="Facial"
								backgroundColor= {selectedServiceType === 'facial' ? '#3d5c98' : '#fff'}
								color={selectedServiceType === 'facial' ? '#fff' : '#3d5c98'}
								onClick={() => {
									setSelectedServiceType("facial");
									setFilteredServices(sampleServices.filter(service => service.type === 'facial'));
									selectedServices.length = 0;
								}}
							/>
							<ServiceTypeCard 
								icon={<NailIcon width={22} height={22} color={selectedServiceType === 'nail' ? '#fff' : '#3d5c98'}/>} 
								service="Nail"
								backgroundColor= {selectedServiceType === 'nail' ? '#3d5c98' : '#fff'}
								color={selectedServiceType === 'nail' ? '#fff' : '#3d5c98'}
								onClick={() => {
									setSelectedServiceType("nail");
									setFilteredServices(sampleServices.filter(service => service.type === 'nail'));
									selectedServices.length = 0;
								}}
							/>
						</View>
						<View style={styles.servicesStack}>
							{
								filtedServices.map(service => {

									return (
										<ServiceCard 
										    key = {service.id}
											id = {service.id}
											serviceName = {service.name}
											serviceTime = {service.serviceTime}
											serviceFee = {service.serviceFee}
											image ={service.image}
											selectService={toggleServiceSelection}
										/>
									)
								})
							}
							{
								filtedServices.length === 0 ? <Text style={{textAlign: 'center', marginTop: 10, fontSize: 16, fontWeight: 600, color: '#3d5c98'}}>Not found any services</Text> : ""
							}
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={styles.addServicesButton}>
				{
					selectedServices.length > 0 ?
					<AddServicesButton selectedCount={selectedServices.length}/>
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
	salonDetail: {
		paddingHorizontal: 10,
	},
	salonName: {
		fontSize: 22,
		fontWeight: 700,
		letterSpacing: 0.4,
		color: '#2A4780',
		marginTop: 20,
		
	},
	salonAddress: {
		fontSize: 15,
		color: '#555',
		marginTop: 10,
	},
	currentStatus: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginTop: 20,
	},
	popularity: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 20,
		paddingBottom: 15,
		borderBottomColor: '#555',
		borderBottomWidth: 0.4,
	},
	ratting: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	rattingPoint: {
		fontSize: 19,
		fontWeight: 600,
		color: '#FE7A01',
	},
	rattingNum: {
		fontSize: 19,
		fontWeight: 600,
		color: '#555',
	},
	view: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	viewNum: {
		fontSize: 19,
		fontWeight: 600,
		color: '#555',
	},
	about: {
		marginTop: 20,
		gap: 10,
	},
	aboutTitle: {
		fontSize: 20,
		fontWeight: 600,
		color: '#2A4780'
	},
	aboutDetail: {
		color: '#555',
	},
	openingHoursDetail: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
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
		fontWeight: 700,
		color: '#2A4780'
	},
	serviceTypesStack: {
		flexDirection: 'row',
		gap: 5,
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
