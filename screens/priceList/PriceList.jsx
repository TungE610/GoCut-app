import { useState } from 'react';
import { StyleSheet, Dimensions, View, ScrollView, Text, Image } from "react-native";
import BackButton from '../../components/backButton/BackButton';
import SearchInput from '../../components/searchInput/SearchInput';
import { Switch } from '@rneui/themed';
import RemoveIcon from '../../assets/remove.svg';
import SaleIcon from '../../assets/sale.svg';

const service1 = require('../../assets/service1.jpg');

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const ServiceCard = (props) => {

	return (
		<View style={styles.serviceCard}>
			<Image source={props.image} style={styles.serviceImage}/>
			<View style={styles.serviceCardContent}>
				<Text style={styles.serviceName}>{props.serviceName}</Text>
				<View style={{flexDirection: 'row', justifyContent: 'flex-start', gap: 20}}>
					<Text style={styles.serviceFee}>${props.serviceFee}</Text>
					<Text style={styles.serviceTime}>{props.serviceTime} hours</Text>
				</View>
				<Text style={styles.serviceDescription}>{props.serviceDescription}</Text>
			</View>
			<View style={styles.saleAndAdd}>
				<View style={styles.saleCard}>
					<SaleIcon width={20} height={20} />
					<Text style={styles.salePercent}>-{props.salePercent}%</Text>
				</View>
				<RemoveIcon />
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
		flexDirection: 'row',
		gap: 10,
		marginTop: 15,
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
		justifyContent: 'space-around',
		flexShrink: 1,
		paddingVertical: 8,
	},
	serviceImage: {
		width: '30%',
		height: '100%',
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	serviceName: {
		fontSize: 18,
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

	},
	saleAndAdd: {

	}
})

export default PriceList;
