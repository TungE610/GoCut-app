import { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, ScrollView, Text } from 'react-native';
import ReturnHomeButton from '../../components/returnHomeButton/ReturnHomeButton';
import BookingButton from '../../components/bookingButton/BookingButton';
import SadIcon from '../../assets/sad.svg';
import HistoryBox from '../../components/historyBox/HistoryBox';
import SearchInput from '../../components/searchInput/SearchInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const host = "http://192.168.1.5";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const concatenateServiceNames = (services) => {
	const serviceNames = services.map(service => service.name);
	const concatenatedNames = serviceNames.join(", ");

	 if (concatenatedNames.length > 50) {
    	return concatenatedNames.substring(0, 47) + "...";
  	}
  
  	return concatenatedNames;
  };

const NoUsedHistory = (props) => {

	return (
		<View style={{marginTop: 30, paddingHorizontal: 30}}>
			<View style={{flexDirection: 'row', alignItems: 'center', gap: 10, alignSelf: 'center'}}>
				<Text style={{fontSize: 19,fontWeight: "700", textAlign: 'center'}}>You have never used our app 
				</Text>
				<SadIcon />
			</View>
			<Text style={{fontSize: 15,fontWeight: 500, textAlign: 'center',color: '#555', marginTop: 10,}}>Book an appointment now to experience the best service</Text>
			<BookingButton onClick={
				() => {props.comeToBookingScreen()}}
			/>
		</View>
	)
}

const UsedHistory = (props) => {

	const [usageHistory, setUsageHistory] = useState([]);

	useEffect(() => {
		const getUsageHistory = async () => {
			const userId = await AsyncStorage.getItem('userId').then((userId) => userId).catch((error) => console.log(error));

			await axios(`${host}:8000/api/usageHistory`, {
				params: {
					user_id: userId,
				}
			}).then(res => {
				setUsageHistory(res.data);
			})
		}

		getUsageHistory();
	}, [])
	const historySearchHandler = () => {

	}

	return (
		<View>
			<SearchInput
				placeholder='Type salon name to find usage history' 
				backgroundColor="#eee" 
				cancelButtonColor="#3d5c98"
				onChange={historySearchHandler}
			/>
				<ScrollView>
					{
						usageHistory.map(history => {
							return (
								<HistoryBox 
									key={history.id}
									id={history.id}
									orderedStartAt={history.ordered_start_at}
									orderedEndAt={history.ordered_end_at}
									finalImageUrl={history.final_image_url}
									salonName={history.salon_name}
									staffFirstName={history.staff_first_name}
									staffLastName={history.staff_last_name}
									status={history.status}
									// totalFee={calculateTotalFee(history.salon.services)}
									// salonImage={history.salonImage}
									// services={concatenateServiceNames(history.salon.services)}
								/>
							)
						})
					}
				</ScrollView>
		</View>
	)
}

const UsageHistory = ({navigation}) => {

	const backButtonClickHandler = () => {
		navigation.navigate('Dashboard')
	}

	return (
			<View style={styles.container}>
				<View style={styles.screenHeader}>
					<View style={styles.backButton}>
						<ReturnHomeButton onClick={backButtonClickHandler} page="usageHistory" />
					</View>
					<View style={styles.screenTitleContainer}>
						<Text style={styles.screenTitle}>History</Text>
					</View>
				</View>

				{/* <TabView value={index} onChange={setIndex} animationType="spring" style={{height: 100}}>
					<TabView.Item>
						<NoUsedHistory comeToBookingScreen={comeToBookingScreen}/>
					</TabView.Item> */}
						<UsedHistory />
					{/* <TabView.Item>
					</TabView.Item>
				</TabView> */}
			</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: viewportHeight,
		width: viewportWidth,
		flexDirection: 'column',
		grow: 1,
	},
	screenHeader: {
		shadowOffset: {width: -2, height: 4},  
		shadowColor: '#171717',  
		shadowOpacity: 0.2,  
		shadowRadius: 3,  
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
		borderBottomColor: '#555',
		paddingBottom: 15,
	},
	screenTitle: {
		width: '100%',
		fontSize: 28,
		fontWeight: "700",
		color: '#3D5C98',
		letterSpacing: 1,
		textAlign: 'center',
		marginTop: viewportHeight/14,
	},
})


export default UsageHistory;
