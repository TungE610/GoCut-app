import { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, ScrollView, Text } from 'react-native';
import ReturnHomeButton from '../../components/returnHomeButton/ReturnHomeButton';
import BookingButton from '../../components/bookingButton/BookingButton';
import SadIcon from '../../assets/sad.svg';
import HistoryBox from '../../components/historyBox/HistoryBox';
import SearchInput from '../../components/searchInput/SearchInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showMessage } from "react-native-flash-message";
import ImageView from "react-native-image-viewing";

const host = "https://salon-docker-production.up.railway.app";

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
	const [previewVisible, setPreviewVisible] = useState(false);
	const [filteredUsageHistory, setFilterUsageHistory] = useState([])
	const [showingUrl, setShowingUrl] = useState('');

	useEffect(() => {
		const getUsageHistory = async () => {
			const userId = await AsyncStorage.getItem('userId').then((userId) => userId).catch((error) => console.log(error));

			await axios(`${host}/api/usageHistory`, {
				params: {
					user_id: userId,
				}
			}).then(res => {
				setUsageHistory(res.data);
				setFilterUsageHistory(res.data);
			})
		}

		getUsageHistory();
	}, [])
	const historySearchHandler = (value) => {
		if(value.length > 0) {

			setFilterUsageHistory(usageHistory.filter(history => {
				const full_name = history.staff_first_name + " " + history.staff_last_name;
				return history.salon_name.toLowerCase().includes(value.toLowerCase()) || full_name.toLowerCase().includes(value.toLowerCase());
			}))
		} else {
			setFilterUsageHistory(usageHistory);
		}
	}

	const confirmCancelOrder = async (id) => {
		await axios.put(`${host}/api/orders/${id}/cancel`).then(res => {
			showMessage({
				message: "Successfully canceled the order",
				type: "success",
					autoHide: false,
					duration: 6000,
					icon: "success",
            });
			setUsageHistory(prev => prev.map(order => {
				if (order.id != id) {
					return order;
				} else {
					return {...order, status: 6}
				}
			}));
		})
	}

	const previewHandler = (url) => {
		setPreviewVisible(true);
		setShowingUrl(url);
	}	

	return (
		<View>
			<ImageView
				images={[{uri: showingUrl}]}
				imageIndex={0}
				visible={previewVisible}
				onRequestClose={() => setPreviewVisible(false)}
			/>
			<SearchInput
				placeholder="Type salon or stylist's name to find usage history"
				backgroundColor="#eee" 
				cancelButtonColor="#3d5c98"
				onChange={historySearchHandler}
			/>
				<ScrollView>
					{
						filteredUsageHistory.map((history,id) => {
							return (
								<HistoryBox 
									key={id}
									id={history.id}
									orderedStartAt={history.ordered_start_at}
									orderedEndAt={history.ordered_end_at}
									finalImageUrl={history.final_image_url}
									salonName={history.salon_name}
									staffFirstName={history.staff_first_name}
									staffLastName={history.staff_last_name}
									status={history.status}
									cancel={confirmCancelOrder}
									salonImage={history.salon_image}
									images={history.images}
									previewHandler={previewHandler}
									rating={history.rating}
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
