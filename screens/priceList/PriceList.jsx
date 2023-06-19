import { useState } from 'react';
import { StyleSheet, Dimensions, View, ScrollView, Text, Image } from "react-native";
import BackButton from '../../components/backButton/BackButton';
import SearchInput from '../../components/searchInput/SearchInput';
import { Switch } from '@rneui/themed';
import RemoveIcon from '../../assets/remove.svg';
import SaleIcon from '../../assets/sale.svg';
import AddServicesButton from '../../components/addServicesButton/AddServicesButton';

const service1 = require('../../assets/service1.jpg');

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const ServiceCard = (props) => {

	return (
		<View style={styles.serviceCard}>
			<View style={styles.serviceCardContent}>
				<Image source={props.image} style={styles.serviceImage}/>
				<View style={styles.serviceDetail}>
					<Text style={styles.serviceName}>{props.serviceName}</Text>
					<View style={{flexDirection: 'row', justifyContent: 'flex-start', gap: 20}}>
						<Text style={styles.serviceFee}>${props.serviceFee}</Text>
						<Text style={styles.serviceTime}>{props.serviceTime} hours</Text>
					</View>
					<Text style={styles.serviceDescription}>{props.serviceDescription}</Text>
				</View>
			</View>
			<View style={styles.saleAndAdd}>
				<RemoveIcon width={35} height={35}/>
				<View style={styles.saleCard}>
					<SaleIcon width={30} height={30} />
					<Text style={styles.salePercent}>-{props.salePercent || 20}%</Text>
				</View>
			</View>
		</View>
	)
}

const PriceList = ({navigation}) => {

	const [ selectedServices, setSelectedServices ] = useState([]);
	const [checked, setChecked] = useState(false);

	const backButtonClickHandler = () => {
		navigation.navigate('Dashboard');
	}

	return (
		<View>
			<ScrollView style={styles.container}>
				<View style={styles.backButton}>
					<BackButton onClick={backButtonClickHandler} page="booking" />
				</View>
				<View style={styles.screenTitleContainer}>
					<Text style={styles.screenTitle}>Price List</Text>
				</View>
				<SearchInput placeholder="search for salon"/>
				<View style={styles.selectUtil}>
					<Text style={styles.selectedNumber}>Selected: {selectedServices.length}</Text>
					<View style={styles.priceFilter}>
						<Text style={styles.selectedNumber}>Price low to high</Text>
						<Switch
							value={checked}
							onValueChange={(value) => setChecked(value)}
						/>
					</View>
				</View>
				<ServiceCard image={service1} serviceName="Women medium blunt cut" serviceFee={20} serviceTime={2} serviceDescription="A blunt cut bob is a shorter hairstyle that" />
				<ServiceCard image={service1} serviceName="Women medium blunt cut" serviceFee={20} serviceTime={2} serviceDescription="A blunt cut bob is a shorter hairstyle that" />
				<ServiceCard image={service1} serviceName="Women medium blunt cut" serviceFee={20} serviceTime={2} serviceDescription="A blunt cut bob is a shorter hairstyle that" />
				<ServiceCard image={service1} serviceName="Women medium blunt cut" serviceFee={20} serviceTime={2} serviceDescription="A blunt cut bob is a shorter hairstyle that" />
			</ScrollView>
			<View style={styles.addServicesButton}>
				<AddServicesButton backgroundColor="#fff" color='#3d5c98'/>
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
	selectedNumber: {
		fontSize: 16,
		fontWeight: 600,
		color: '#fff'
	},
	selectUtil: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 12,
		marginTop: 10,
		alignItems: 'center'
	},
	priceFilter: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center'
	},
	serviceCard: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 15,
		justifyContent: 'space-between',
		width: viewportWidth - 20,
		height: viewportHeight/8,
		backgroundColor: '#fff',
		borderRadius: 10,
		marginHorizontal: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 6,
	},
	serviceCardContent: {
		flexDirection: 'row',
		gap: 10,
		flex: 3,
	},
	serviceDetail: {
		justifyContent: 'space-around',
		paddingVertical: 8,
		flex: 0.95,
	},
	serviceImage: {
		width: '32%',
		height: '100%',
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	serviceName: {
		fontSize: 16,
		fontWeight: 600,
		color: '#3d5c98'
	},
	serviceFee: {
		fontSize: 15,
		fontWeight: 600,
		color: '#333'
	},
	serviceTime: {

	},
	serviceDescription: {
		fontSize: 14,
	},
	saleAndAdd: {
		flex: 0.7,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	saleCard: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	salePercent: {
		color: '#EF7301'
	},
	addServicesButton: {
		position: 'absolute',
		bottom: 20,
		left: 0,
		right: 0,
		paddingHorizontal: 10,
	}
})

export default PriceList;
