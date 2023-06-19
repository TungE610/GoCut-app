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

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');

const SalonDetail = ({navigation, ...props}) => {

	const returnHomeHandler = () => {
		navigation.navigate('Dashboard');
	}
	
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
							<ServiceTypeCard service="Haircut"/>
							<ServiceTypeCard service="Facial"/>
							<ServiceTypeCard service="Nail"/>
						</View>
						<View style={styles.servicesStack}>
							<ServiceCard serviceName="Women medium blunt cut" serviceTime="2 hours" serviceFee="20"/>
							<ServiceCard serviceName="Women medium blunt cut" serviceTime="2 hours" serviceFee="20"/>
							<ServiceCard serviceName="Women medium blunt cut" serviceTime="2 hours" serviceFee="20"/>
						</View>
					</View>
				</View>
			</ScrollView>
			<View style={styles.addServicesButton}>
				<AddServicesButton />
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
		paddingHorizontal: 20,
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
		flexDirection: 'row'
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
