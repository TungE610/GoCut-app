import { View, StyleSheet, Text, Dimensions, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { Button } from "react-native-elements";
import CameraIcon from '../../assets/camera.svg';
import * as ImagePicker from 'react-native-image-picker';

LocaleConfig.locales['en'] = {
	monthNames: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	],
	monthNamesShort: [
		'Jun',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	],
	dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
	today: "Today"
};
LocaleConfig.defaultLocale = 'en';

const host = "192.168.1.14";

function transformOrdersToCalendarItems(orders) {
	const calendarItems = {};

	orders.forEach((order) => {
		// Extract the date part of ordered_start_at
		const date = new Date(order.ordered_start_at).toISOString().split('T')[0];

		// Create the meeting object
		const meeting = {

			name: `Serial: ${order.serial}   Time: ${new Date(order.ordered_start_at).toISOString().split('T')[1].split(".")[0]} - ${new Date(order.ordered_end_at).toISOString().split('T')[1].split(".")[0]}`,
			data: `Customer name: ${order.customer_name} \n\nServices: ${order.service_names.join(', ')}`,
			orderId: order.id,
			status: order.status,
		};

		// If the date key doesn't exist in calendarItems, initialize it as an empty array
		if (!calendarItems[date]) {
			calendarItems[date] = [];
		}

		// Push the meeting object into the array for the corresponding date
		calendarItems[date].push(meeting);
	});

	return calendarItems;
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');

const BarberOrder = ({ navigation }) => {

	const [orders, setOrders] = useState([]);
	const [transformedOrders, setTransformedOrders] = useState({});

	useEffect(() => {
		const getOrders = async () => {
			const userId = await AsyncStorage.getItem('userId').then((userId) => userId).catch((error) => console.log(error));

			await axios(`http://${host}:8000/api/users/${userId}/orders`).then(res => {
				setOrders(res.data.map(order => {

					return {
						time: order.ordered_start_at.split(" ")[1].split(":").slice(0, 2).join(":"),
						title: `Tung`,
						description: order.service_names.join("\n"),
					}
				}));
				setTransformedOrders(transformOrdersToCalendarItems(res.data));
			})
		}

		getOrders();
	}, [changed]);

	const getOrderImageHandler = useCallback((orderId) => {
        const options = {
            saveToPhotos: false,
            mediaType: 'photo',
            includeBase64: true,
        };
        
        ImagePicker.launchCamera(options, async res => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.errorCode) {
                console.log('ImagePicker Error: ', res.errorMessage);
            } else {
				const imageUri = res.assets[0].uri.replace("file://", ""); // Assuming res is the response from the image picker or camera
				const formData = new FormData();

				formData.append('file', {
					uri: imageUri,
					type: 'image/jpeg', // Adjust the MIME type as needed
					name: 'photo.jpg', // Adjust the file name as needed

				});

				// try {
				fetch(`http://${host}:8000/api/upload`, {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
					},
					body: formData
				}).then(res => res.json()).then(async (results) => {
					await axios.post(`http://${host}:8000/api/orders/${orderId}/addImage`, {
						image_url: results.url,
					}).then(res => {
						console.log(res.data);
					})
				}).catch(error => {
					console.error(error);
				});

            }
        });
    }, []);
	
	console.log(transformedOrders);
	const startOrderHandler = async (orderId) => {
		setLoading(true);

		await axios.put(`http://${host}:8000/api/orders/${orderId}/start`).then(res => {
			setChanged(true);
		})
    };

	const endOrderHandler = async (orderId) => {
		setLoading(true);

		await axios.put(`http://${host}:8000/api/orders/${orderId}/end`).then(res => {
			setChanged(true);
		})
    };
	return (
			<SafeAreaView style={styles.container}>
				{loading ? <ActivityIndicator color={"#3d5c98"} /> : 
				<Agenda
					items={transformedOrders}
					renderItem={(item) => (
						<View key={item.orderId} style={styles.item}>
							<Text style={styles.nameText}>{item.name}</Text>
							<Text style={styles.dataText}>{item.data}</Text>
							{ loading ? <ActivityIndicator color={"#3d5c98"}/> : 
							<View style={{ flexDirection: 'row', marginTop: 20, width: '100%', gap: 6, justifyContent: 'space-between', alignItems: 'center' }}>
								<View>
									{item.status == 0 ?
										<TouchableOpacity >
											<Button title="Start" size="sm" buttonStyle={{
												backgroundColor: '#3d5c98',
												padding: 0,
												paddingHorizontal: 5,
												paddingVertical: 2,
												fontSize: 15,
											}}
											onPress={() => { startOrderHandler(item.orderId) }}
											/>
										</TouchableOpacity> : (item.status == 1 ? <Text style={styles.statusText}>
										Checked In
									</Text> : "")
									}
									{	item.status == 1 ?
										<TouchableOpacity >
											<Button title="End" size="sm" buttonStyle={{
												backgroundColor: '#3d5c00',
												padding: 0,
												paddingHorizontal: 5,
												paddingVertical: 2,
												fontSize: 15,
											}}
											onPress={() => { endOrderHandler(item.orderId) }}
											/>
										</TouchableOpacity> :  (item.status == 2 ? <Text style={styles.statusText}>
										Checked Out
									</Text> : "")
									}
								</View>
								<TouchableOpacity onPress={() => {getOrderImageHandler(item.orderId)}}>
									<CameraIcon />
								</TouchableOpacity>
							</View>}
						</View>
					)}
				/>}
			</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	item: {
		backgroundColor: 'lightblue',
		flex: 1,
		borderRadius: 5,
		padding: 10,
		marginRight: 10,
		marginTop: 25,
		paddingBottom: 20
	},
	nameText: {
		color: 'black',
		fontSize: 16,
		marginBottom: 10,
		fontWeight: '600',
	},
	dataText: {
		color: 'black',
		fontSize: 16,
		marginBottom: 10
	},
	statusText: {
		fontWeight: '600' ,
		padding: 3,
		width: viewportWidth / 4,
		color: '#3d5c98'
	}
});


export default BarberOrder;
