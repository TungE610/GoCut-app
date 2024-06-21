import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Alert} from "react-native";
import FastImage from 'react-native-fast-image'
import axios from 'axios';
import {useEffect, useState} from 'react';
import { Button } from "react-native-elements";
import StarRating from 'react-native-star-rating-widget';
import { showMessage } from "react-native-flash-message";

const host = "https://salon-docker-production.up.railway.app";


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const calculateTotalFee = (services) => {

	let totalFee = 0;

	for (const service of services) {
	  totalFee += service.price;
	}
	return totalFee;
}
const HistoryBox = (props) => {
	
	const [services, setServices] = useState([]);
	const [showServices, setShowServices] = useState(false);
	const [showImages, setShowImages] = useState(false);
	const [images, setImages] = useState(props.images && props.images.length > 0  ? props.images.split(',') : [])
	const [showRate, setShowRate] = useState(false);
  	const [rating, setRating] = useState(props.rating);
  	const [rated, setRated] = useState(!(!props.rating));

	const showAlert = () =>
		Alert.alert(
		'Are you sure to cancel this order',
		'',
		[
		{
			text: 'Cancel',
			onPress: () => {},
			style: 'cancel',
		},
		{
			text: 'Confirm',
			onPress: () => {props.cancel(props.id)},
			style: 'cancel',
		},
		],
		{
		cancelable: true,
		onDismiss: () =>
			Alert.alert(
			'This alert was dismissed by tapping outside of the alert dialog.',
			),
		},
	);

	const styles = StyleSheet.create({
		container: {
			marginTop: 10,
			marginHorizontal: 5,
			paddingHorizontal: 5,
			paddingVertical: 10,
			backgroundColor: '#fff',
			borderRadius: 5,
			gap: 10,
			width: viewportWidth - 10,
			shadowColor: "#000",
			shadowOpacity: 0.1,
			shadowRadius: 5,
			content: 'fill',
			height: 'auto',
			flex: 0,
		},
		time: {
			fontSize: 15,
			fontWeight: "600",
			color: '#fff'
		},
		salonInfo: {
			flex: 1,
			flexDirection: 'row',
			gap: 10,
		},

		salonImage: {
			width: viewportHeight / 9,
			height: viewportHeight / 9,
			borderRadius: 2,
		},
		stylistName: {
			fontSize: 15,
			fontWeight: "500",
			color: '#3D5C98',
		},
		salonName: {
			fontSize: 15,
			fontWeight: "500",
			color: '#3D5C98',
		},
		seeAllServices: {
			fontSize: 15,
			fontWeight: "500",
			color: '#3D5C98',
			textDecorationLine: 'underline'
		},
		salonAddress: {
			fontSize: 15,
			fontWeight: "600",
			color: '#555'
		},
		fee: {
			fontSize: 17,
			fontWeight: "700",
			color: '#3D5C98'
		},
		service: {
			fontSize: 17,
			fontWeight: "700",
			color: '#3D5C98'
		},
		servicesList: {
			flex: 1,
			height: 'auto',
			width: viewportWidth - 20,
			borderRadius: 5,
			color: '#111',
			gap: 12,
			backgroundColor: '#ccc',
			padding: 8,
		}, 
		imageAlbum: {
			flex: 1,
			flexDirection: 'row', 
			width: '100%', 
			height: 'auto', 
			flexWrap: 'wrap', 
			gap: 2
		},
		rate: {
			flex: 1,
			flexDirection: 'row', 
			width: '100%', 
			height: 'auto', 
			flexWrap: 'wrap', 
			gap: 2
		}
	})
	useEffect(() => {
		if (showServices) {
			const seeServicesOfOrderHandler = async () => {

				setShowServices(true);

				await axios(`${host}/api/order/pos`, {
					params: {
						orderId: props.id,
					}
				}).then(res => {
					setServices(res.data);
				})
			}
			seeServicesOfOrderHandler();
		}
	}, [showServices]) 

	const submitRatingHandler = async () => {

		await axios.put(`${host}:8000/api/orders/${props.id}/rating`, {
				rating: rating
		}).then(res => {
			showMessage({
				message: "Rating submits, Thank you !!",
				type: "success",
				autoHide: false,
				duration: 60000,
				icon: "success",
			});
		})

		setRated(true);
	}
	return (		
		<View key={props.id} style={styles.container}>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
				<View style={{backgroundColor: '#3d5c98', paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4}}>
					<Text style={styles.time}>
						{props.orderedStartAt.replace(" ", ": ")} - {props.orderedEndAt.split(" ")[1]}
					</Text>
				</View>
				<View>
				{
					props.status === 0 && 
					<View style={{borderRadius: 5, padding: 5}}>
						<Text style={{fontWeight: "600",  color: '#3a74AD'}}>
								New
						</Text> 
					</View>
				}
				{
					props.status === 1 && 
					<View style={{borderRadius: 5, padding: 5}}>
						<Text style={{fontWeight: "600", color: '#489471'}}>
								Checked In
						</Text> 
					</View>
				}
				{
					props.status === 2 && 
					<View style={{borderRadius: 5, padding: 5}}>
						<Text style={{fontWeight: "600", color: '#ffc107'}}>
								Started
						</Text> 
					</View>
				}
				{
					props.status === 3 && 
					<View style={{borderRadius: 5, padding: 5}}>
						<Text style={{fontWeight: "600", color: '#6f42c1'}}>
								Ended
						</Text> 
					</View>
				}
				{
					props.status === 4 &&
					<View style={{color: '#000', borderRadius: 5, padding: 5}}>
						<Text style={{fontWeight: "600", color: '#ccc'}}>
								Checked out
						</Text> 
					</View> 
				}
				{
					props.status === 5 &&
					<View style={{color: '#000', borderRadius: 5, padding: 5}}>
						<Text style={{fontWeight: "600", color: '#fd7e14'}}>
								Not come
						</Text> 
					</View> 
				}
				{
					props.status === 6 &&
					<View style={{borderRadius: 5, padding: 5}}>
						<Text style={{fontWeight: "600", color: '#d45b4e'}}>
								Canceled
						</Text> 
					</View>
				}
				</View>
			</View>
			<View style={styles.salonInfo}>
				<FastImage style={styles.salonImage} source= {{uri:props.salonImage}} />
				<View style={{gap: 21, flex: 1}}>
					<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
						<Text style={styles.salonName}>Salon: {props.salonName}</Text>
						{/* <Text style={styles.fee}>${props.totalFee}</Text> */}
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
						<Text style={styles.stylistName}>Stylist: {props.staffFirstName} {props.staffLastName}</Text>
						{/* <Text style={styles.service}>{props.services}</Text> */}
					</View>
					<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
						<View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 8}}>
							<View style={{flexDirection: 'row', gap: 4}}>
								<TouchableOpacity onPress={() => {setShowServices(prev => !prev)}}>
									<Text style={[styles.seeAllServices]}>{showServices ? "Hide details" : "See detail"}</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {setShowImages(prev => !prev); setShowServices(false)}}>
									<Text style={[styles.seeAllServices]}>{showImages ? "Hide images" : "See images"}</Text>
								</TouchableOpacity>
							</View>
							{
								props.status === 4 &&
								<TouchableOpacity onPress={() => {setShowRate(prev => !prev);}}>
									<Text style={[styles.seeAllServices]}>Rate</Text>
								</TouchableOpacity>
							}
						</View>
						{
							props.status === 0 ? 
								<Button title="Cancel" size="sm" buttonStyle={{
									backgroundColor: 'red',
									padding: 0,
									paddingHorizontal: 2,
									fontSize: 15,
								}}
									onPress={showAlert}
								/>
 							: ""
						}
					</View>
				</View>
			</View>
			{
				showServices ? 
				<View style={styles.servicesList}>
					{
						services.map((service) => {
							return (
								<View key={service.name} style={{gap: 10, flexDirection: 'row', width: viewportWidth - 40, justifyContent: 'space-between'}}>
									<Text style={{fontSize: 15, fontWeight: "500"}}>{service.name}</Text>
									<View style={{flexDirection: 'row'}}>
										<Text>{service.price}</Text>
										<Text style={{textDecorationLine: 'underline', marginLeft: 10}}>đ</Text>
									</View>
								</View>
							)
						})
					}
					<View style={{gap: 10, flexDirection: 'row', width: viewportWidth - 40, justifyContent: 'space-between'}}>
						<Text style={{fontSize: 15, fontWeight: "500", paddingVertical: 4}}>Total fee: </Text>
						<View style={{flexDirection: 'row', borderTopColor: "#000", borderTopWidth: 1, paddingVertical: 4}}>
							<Text>{calculateTotalFee(services)}</Text>
							<Text style={{textDecorationLine: 'underline', marginLeft: 10}}>đ</Text>
						</View>
					</View>
				</View> 
				:  ""
			} 
			{
				showImages ? 
				<View style={styles.imageAlbum}>
					{
						images.map(image => {
							return <TouchableOpacity style={{width: '48%'}} onPress={() => {props.previewHandler(image)}}>
								<FastImage source={{uri: image}} resizeMode="cover" style={{width: '100%',
									height: viewportHeight/ 8,
									borderRadius: 2}} />
							</TouchableOpacity>
						})
					}
				</View> : ""
			}
			{
				showRate &&
				<View style={{flexDirection: 'row'}}>
					<View style={styles.rate}>
						<StarRating
							rating={!rating ? 0 : rating}
							onChange={setRating}
						/>
					</View>
					{
						!rated &&
						<Button title="Submit" size="sm" buttonStyle={{
							backgroundColor: '#3d5c00',
							padding: 0,
							paddingHorizontal: 5,
							paddingVertical: 2,
							fontSize: 15,
						}}
							onPress={() => {submitRatingHandler()}}
						/>
					}
				</View>

			}
		</View>
	)
}

export default HistoryBox;
