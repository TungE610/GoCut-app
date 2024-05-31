import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Alert} from "react-native";
import FastImage from 'react-native-fast-image'
import axios from 'axios';
import {useEffect, useState} from 'react';
import { Button } from "react-native-elements";

const host = "http://192.168.1.14";


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
			paddingTop: 10,
			backgroundColor: '#fff',
			borderRadius: 5,
			gap: 10,
			width: viewportWidth - 10,
			shadowColor: "#000",
			shadowOpacity: 0.1,
			shadowRadius: 5,
			content: 'fill',
			height: showServices ? viewportHeight/3 : viewportHeight/6,
			flex: 0,
			paddingBottom: 5
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
			height: viewportWidth/6,
			width: viewportWidth - 20,
			borderRadius: 5,
			color: '#111',
			gap: 12,
			backgroundColor: '#ccc',
			padding: 8,
		}
	})
	useEffect(() => {
		if (showServices) {
			const seeServicesOfOrderHandler = async () => {

				setShowServices(true);

				await axios(`${host}:8000/api/order/services`, {
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

	return (		
		<View style={styles.container}>
			<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
				<View style={{backgroundColor: '#fc7303', paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4}}>
					<Text style={styles.time}>
						{props.orderedStartAt.replace(" ", ": ")} - {props.orderedEndAt.split(" ")[1]}
					</Text>
				</View>
				<View>
				{
					props.status === 0 ? 
					<View style={{backgroundColor: 'yellow', color: '#000', borderRadius: 5, padding: 5}}>
						<Text style={{fontWeight: "600"}}>
								Prepare
						</Text> 
					</View>
					: (
						props.status === 1 ? 
						<View style={{backgroundColor: '#3d5c98', color: '#000', borderRadius: 5, padding: 5}}>
							<Text style={{fontWeight: "600"}}>
									In progress
							</Text> 
						</View>
						: (
							props.status === 2 ? 
							<View style={{backgroundColor: 'green', color: '#fff', borderRadius: 5, padding: 5}}>
								<Text style={{fontWeight: "600", color: '#fff'}}>
										Done
								</Text> 
							</View>
							: (
								props.status === 2 ? 
								<View style={{backgroundColor: 'red', color: '#000', borderRadius: 5, padding: 5}}>
									<Text style={{fontWeight: "600"}}>
											Cancel
									</Text> 
								</View>
								: ""
							)
						)
					)
 				}
				</View>
			</View>
			<View style={styles.salonInfo}>
				<FastImage style={styles.salonImage} source= {{uri: props.finalImageUrl ? props.finalImageUrl : props.salonImage}} />
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
						<TouchableOpacity onPress={() => {setShowServices(prev => !prev)}}>
							<Text style={[styles.seeAllServices]}>{showServices ? "Hide details" : "See detail"}</Text>
						</TouchableOpacity>
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
				: ""
			} 
		</View>
	)
}


export default HistoryBox;
