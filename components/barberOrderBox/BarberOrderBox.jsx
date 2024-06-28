import { View, StyleSheet, Text, Dimensions, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';
import CameraIcon from '../../assets/camera.svg';
import { Button } from "react-native-elements";
import { LocaleConfig } from 'react-native-calendars';
import FastImage from 'react-native-fast-image';
import { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const host = "http://172.16.32.27:8000"

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('screen');

const BarberOrderBox = (props) => {
    const [order, setOrder] = useState(props.order);
    const [loading, setLoading] = useState(false);
    const [showImages, setShowImages] = useState(false);

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

// Remove the 'file://' prefix if present (this is specific to Android)
			const formData = new FormData();
			formData.append('file', {
				uri: res.assets[0].uri.replace("file://", ""),
				type: 'image/jpg',
				name: 'image.jpg',
			});

			console.log(res.assets[0]);
			// Perform the POST request
			await axios({
				method: 'post',
				url: `${host}/api/upload`,
				data: formData,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(async (res) => {
				
				await axios.post(`${host}/api/orders/${orderId}/addImage`, {
						image_url: res.data.url,

					}).then(response => {
						if (response.data.msg == 'full') {
							showMessage({
								message: "Each order only can add 4 images",
								type: "danger",
									autoHide: false,
									duration: 60000,
									icon: "danger",
							});
						}
						setOrder(prev => {return {...prev, imageUrls: [...prev.imageUrls, res.data.url]}});
						showMessage({
								message: "Successfully add image",
								type: "success",
									autoHide: false,
									duration: 60000,
									icon: "success",
							});
					})
			})
			.catch((error) => {
				// Check if error response exists
				console.log(error);
				if (error.response) {
					console.error('Error uploading image:', error.response.data.msg);
					console.error('Error details:', error.response.data.error);
				} else {
					console.error('Error uploading image:', error.message);
				}
			});

            }
        });
    }, []);

    const startOrderHandler = async (orderId) => {
		setLoading(true);

		try {
			const userId = await AsyncStorage.getItem('userId').then((userId) => userId).catch((error) => { 
				console.log(error); 
				throw error; 
			});

			await axios.put(`${host}/api/orders/${orderId}/start`, { staffId: userId })
				.then(res => {
					setOrder(prev => { return { ...prev, status: res.data.order_status }; });
					setLoading(false);
				})
				.catch(error => {
					console.log(error);
					setLoading(false);
				});
		} catch (error) {
			console.log('Error occurred:', error);
			setLoading(false);
		}
    };

	const endOrderHandler = async (orderId) => {
		setLoading(true);

		try {
			const userId = await AsyncStorage.getItem('userId').then((userId) => userId).catch((error) => { 
				console.log(error); 
				throw error; 
			});

				await axios.put(`${host}/api/orders/${orderId}/end`, { staffId: userId }).then(res => {
					console.log(res.data)
					setOrder(prev => { return { ...prev, status: res.data.order_status }; });
					setLoading(false);
				})
				.catch(error => {
					console.log(error);
					setLoading(false);
				});

		}	catch (error) {
			console.log('Error occurred:', error);
			setLoading(false);
		}
    };
    const showImagesHandler = () => {
        setShowImages(prev => !prev);
    }
    return (
        <View key={order.orderId} style={styles.item}>
            <Text style={styles.nameText}>{order.name}</Text>
            <Text style={styles.dataText}>{order.data}</Text>
            { loading ? <ActivityIndicator color={"#3d5c98"}/> : 
            <View style={{ flexDirection: 'row', marginTop: 20, width: '100%', gap: 6, justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{flexDirection: 'row'}}>
                    {order.status == 0 ?
                        <TouchableOpacity >
                            <Text style={{fontSize: 14}}>Customer hasn't arrived</Text>
                        </TouchableOpacity> : ""                    
					}
                    {	order.status == 1 ?
                        <TouchableOpacity >
                            {/* <Button title="End" size="sm" buttonStyle={{
                                backgroundColor: '#3d5c00',
                                padding: 0,
                                paddingHorizontal: 5,
                                paddingVertical: 2,
                                fontSize: 15,
                            }}
                            onPress={() => { endOrderHandler(order.orderId) }}
                            /> */}
							<Button title="Start" size="sm" buttonStyle={{
                                backgroundColor: '#3d5c98',
                                padding: 0,
                                paddingHorizontal: 5,
                                paddingVertical: 2,
                                fontSize: 15,
                            }}
                            onPress={() => { startOrderHandler(order.orderId) }}
                            />
                        </TouchableOpacity> :  (order.status == 1 ? <Text style={styles.statusText}>
                        Checked in
                    </Text> : "")
                    }
					{	order.status == 2 ?
                        <TouchableOpacity >
                            <Button title="End" size="sm" buttonStyle={{
                                backgroundColor: '#3d5c00',
                                padding: 0,
                                paddingHorizontal: 5,
                                paddingVertical: 2,
                                fontSize: 15,
                            }}
                            onPress={() => { endOrderHandler(order.orderId) }}
                            />
                        </TouchableOpacity> :  (order.status == 2 ? <Text style={styles.statusText}>
                        Started
                    </Text> : "")
                    }
					{order.status == 3 ?
                        <TouchableOpacity >
                            <Text style={{fontSize: 14}}>Ended</Text>
                        </TouchableOpacity> : ""
                    }
					{order.status == 5 ?
                        <TouchableOpacity >
                            <Text style={{fontSize: 14}}>Customer not come</Text>
                        </TouchableOpacity> : ""
                    }
					{order.status == 6 &&
                        <TouchableOpacity >
                            <Text style={{fontSize: 14, color: '#dc3545'}}>Canceled</Text>
                        </TouchableOpacity>
                    }
                </View>
				{
					order.status == 3 &&
					<View style={{flexDirection: 'row', gap: 8, justifyContent: 'space-between', alignItems: 'center'}}>
						<TouchableOpacity onPress={showImagesHandler}>
							{showImages ? <Text>Hide Images</Text> : <Text>Show Image</Text>}
						</TouchableOpacity>
						<TouchableOpacity onPress={() => {getOrderImageHandler(order.orderId)}}>
							<CameraIcon />
						</TouchableOpacity>
					</View>
				}
            </View>}
            {
                showImages ?  
                <View style={{flexDirection: 'row', width: '100%', height: 'auto', flexWrap: 'wrap', gap: 2}}>
					{
						order.imageUrls.map((url, id) => {
							return (
								<TouchableOpacity key={id} style={{width: '48%'}} onPress={() => {props.previewHandler(url)}}>
									<FastImage source={{uri: url}} resizeMode="cover" style={{width: '100%',
										height: viewportHeight/ 7,
										borderRadius: 2}} 
									/>
								</TouchableOpacity>
							)
						})
					} 
                </View> : ""
            }
        </View>		
    )
}

const styles = StyleSheet.create({
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

export default BarberOrderBox;
