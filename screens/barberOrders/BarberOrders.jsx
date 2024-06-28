import { StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarberOrderBox from '../../components/barberOrderBox/BarberOrderBox';
import ImageView from "react-native-image-viewing";
import { Agenda } from 'react-native-calendars';
import { Button } from 'react-native-elements';

const host = "https://salon-docker-production.up.railway.app";
function formatToLocalTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour12: false }); // Returns 'HH:MM:SS' in 24-hour format
}

function transformOrdersToCalendarItems(orders) {
	const calendarItems = {};

	orders.forEach((order) => {
		// Extract the date part of ordered_start_at
		const date = new Date(order.ordered_start_at).toISOString().split('T')[0];

		// Create the meeting object
		const meeting = {

			name: `Serial: ${order.serial}   Time: ${formatToLocalTime(order.ordered_start_at)} - ${formatToLocalTime(order.ordered_end_at)}`,
			data: `Customer name: ${order.customer_name} \n\nServices: ${order.service_names.join(', ')}`,
			orderId: order.id,
			status: order.status,
			imageUrls: order.image_urls,
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
	const [previewVisible, setPreviewVisible] = useState(false);
	const [showingUrl, setShowingUrl] = useState('');

	 const getOrders = useCallback(async () => {
        const userId = await AsyncStorage.getItem('userId').then((userId) => userId).catch((error) => console.log(error));

        await axios(`${host}/api/users/${userId}/orders`).then(res => {
            const updatedOrders = res.data.map(order => {
                return {
                    time: order.ordered_start_at.split(" ")[1].split(":").slice(0, 2).join(":"),
                    title: `Tung`,
                    description: order.service_names.join("\n"),
                    status: order.status,
                }
            });

            setOrders(updatedOrders);
            setTransformedOrders(transformOrdersToCalendarItems(res.data));
        }).catch(error => {
            console.log(error);
        });
    }, []);

    useEffect(() => {
        getOrders();
    }, [getOrders]);

	const previewHandler = (url) => {
		setPreviewVisible(true);
		setShowingUrl(url);
	}

	const reloadHandler = async () => {
		await getOrders();
	}
	return (
		<SafeAreaView style={styles.container}>
			{!previewVisible && 
				<Button title="Reload" size="sm" buttonStyle={{
					backgroundColor: '#3d6c98',
					paddingVertical: 5,
					paddingHorizontal: 5,
					fontSize: 15,
				}}
					onPress={reloadHandler}
				/>
			}
			<ImageView
				images={[{uri: showingUrl}]}
				imageIndex={0}
				visible={previewVisible}
				onRequestClose={() => setPreviewVisible(false)}
			/>
			<Agenda
				items={transformedOrders}
				renderItem={(item) => {
					return (
						<BarberOrderBox order={item} previewHandler={previewHandler}/>
				)}}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
});


export default BarberOrder;
