import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';

const BarberOrderBox = () => {
    const [loading, setLoading] = useState(false);
	const [changed, setChanged] = useState(false);

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

export default BarberOrderBox;
