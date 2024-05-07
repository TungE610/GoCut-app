import { StyleSheet, Dimensions, View, Text, TouchableOpacity} from "react-native";
import AddIcon from '../../assets/add.svg';
import RemoveIcon from '../../assets/remove.svg';
import SaleIcon from '../../assets/sale.svg';
import ClockIcon from '../../assets/clock.svg';
import React, { useState, useCallback, useEffect } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image'
import {formatCurrency} from '../../helpers/formatCurrency';
import ImageView from "react-native-image-viewing";
import * as Progress from 'react-native-progress';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');

const ServiceCard = (props) => {

	const [image, setImage] = useState('');
  	const [cutout, setCutout] = useState('');
  	const [result, setResult] = useState("");
	const [isPreviewingResult, setIsPreviewingResult] = useState(false);
  	const [progress, setProgress] = useState(0);
  	const [showProcess, setShowProcess] = useState(false);

	useEffect(() => {

		if (showProcess) {
			const duration = 30000; // 30 seconds in milliseconds
			const interval = 100; // Update interval (milliseconds)
			const steps = duration / interval; // Number of steps to reach 1 from 0

			let currentStep = 0;

			const timer = setInterval(() => {
			currentStep++;
			const newProgress = currentStep / steps; // Calculate the new progress

			setProgress(newProgress);

			if (currentStep === steps) {
				clearInterval(timer); // Stop the timer when progress reaches 1
				setIsPreviewingResult(true);
				setShowProcess(false);
			}
			}, interval);

			return () => clearInterval(timer); // Cleanup the timer on component unmount
		}
	}, [showProcess]);

 	const onImageGalleryClick = useCallback(() => {
	const options = {
		selectionLimit: 1,
		mediaType: 'photo',
		includeBase64: true
	};

	ImagePicker.launchLibrary(options, res => {
		if(res.didCancel) {
			console.log('User cancelled')
		} else if(res.errorCode) {
			console.log('ImagePickerError: ', res.errorMessage)
		} else {
			setPickerResponse(res);
		}
	});
}, [])

	const onCameraPress = useCallback(() => {
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
				
				setShowProcess(true);
				// setImage(res.assets[0].uri);

				// // await removeBackgroundOnConfirm(res.assets[0].uri.replace("file://", ""));

				// // const result = await Image.compress(res.assets[0].uri);

				// const formData = new FormData();

				// // while(!cutout) {

				// // }

        		// formData.append("file_upload", {uri: res.assets[0].uri, name: 'new_file.png', type: 'image/jpeg'});
        		// formData.append("id", props.id);

				// try {
				// 	const endPoint = 'https://b1e3-36-225-185-20.ngrok-free.app/uploadfile';

				// 	await fetch(endPoint, {
				// 		method: 'POST',
				// 		body: formData,
				// 		headers: {
				// 			'Content-Type': 'multipart/form-data',
				// 		},            
				// 	})
				// 	.then((response) => response.text())
				// 	.then((text) => {
				// 		setResult(text.replaceAll('"', '')); // Set the result to the new name
				// 		setIsPreviewingResult(true);
				// 	});
				// 	// .then( (response) => {
				// 	// 	const new_name = response; // Get the response as plain text
				// 	// 	console.log("1:", new_name); // Log the new name
				// 	// 	setResult(new_name); // Set the result to the new name
				// 	// 	while(new_name.length == 0) {

				// 	// 	}
				// 	// 	setIsPreviewingResult(true);
				// 	// })
					
				// 	// if (response.ok) {
				// 	// 	console.log("File uploaded successfully")
				// 	// } else {
				// 	// 	console.log(response)
				// 	// }

				// } catch (error) {
				// 	return error
				// }

            }
        });
    }, []);
	const toggleSelect = () => {

		props.selectService({
			id: props.id,
			name: props.serviceName,
			duration: props.serviceTime,
		})
	}

	return (
		<View style={styles.container}>
			 {/* {image && !cutout && (
				<Image
					source={{ uri: image }}
					style={{ width: viewportWidth, height: viewportHeight }}
					resizeMode="contain"
				/>
			)} */}
			<ImageView
				images={[{uri: result}]}
				imageIndex={0}
				visible={isPreviewingResult}
				onRequestClose={() => setIsPreviewingResult(false)}
			/>
			{cutout && (
			<View style={{ transform: [{ rotate: '90deg'}] }}>
				<FastImage
					source={{ uri: `data:image/png;base64,${cutout}` }}
					style={StyleSheet.absoluteFill}
					resizeMode="contain"
				/>
			</View>
			)}
			<View style={{flexDirection: 'row', gap: 10}}>
				<FastImage style={styles.image} source={{ uri: props.image }}
                    resizeMode="cover" />
				<View style={styles.serviceContent}>
					<Text style={styles.serviceName}>{props.serviceName}</Text>
					<Text>{props.serviceSummary ? props.serviceSummary : ""}</Text>
					<View style={styles.serviceTime}>
						<ClockIcon width={20} height={20} color="#3d5c98" />
						<Text style={styles.serviceTimeText}>
							{props.serviceTime} minutes
						</Text>
					</View>
					<Text style={styles.serviceFee}>{formatCurrency(props.serviceFee)} <Text style={{textDecorationLine: 'underline'}}>đ</Text></Text>
				</View>
			</View>
			<View style={styles.operations}>
				{
				props.sale > 0 ? 
					<View style={styles.saleCard}>
						<SaleIcon width={20} height={20} />
						<Text style={styles.salePercent}>-{props.sale}%</Text>
					</View> : <View></View>
				}
				{showProcess ? <Progress.Pie progress={progress} size={50}/> : 
				<View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
					<TouchableOpacity onPress={onCameraPress} >
						<Text style={{color: '#3d5c98'}}>Try now</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={toggleSelect}>
					{
						!props.selected ? 
						<AddIcon width={viewportWidth/12} height={viewportWidth/12} /> :
						<RemoveIcon width={viewportWidth/12} height={viewportWidth/12} />
					}
					</TouchableOpacity>
				</View>
				}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: viewportWidth,
		flexDirection: 'row',
		paddingVertical: 8,
		paddingHorizontal: 5,
		gap: 10,
		justifyContent: 'space-between',
		backgroundColor: '#fff',
		marginBottom: 5,
	},
	image: {
		width: viewportWidth / 4.2,
		height: viewportWidth / 3.8,
		borderRadius: 5,
	},
	serviceContent: {
		justifyContent: 'space-between',
	},
	serviceName: {
		fontSize: 17,
		fontWeight: "600",
		color: '#3c5d98'
	},
	serviceTime: {
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center',

	},
	serviceTimeText: {
		fontSize: 14,
		fontWeight: '400',
	},
	serviceFee: {
		fontSize: 15,
		color: '#111',
		fontWeight: "500",
	},
	saleCard: {
		flexDirection: 'row',
		paddingHorizontal: 4,
		paddingVertical: 3,
		borderRadius: 50,
		backgroundColor: '#FFDEC0',
		alignItems: 'center'
	},
	salePercent: {
		color: '#EF7301',
		fontSize: 14,
		fontWeight: "600",
	},
	operations: {
		justifyContent: 'space-between',
		alignItems: 'flex-end'
	}
})

export default ServiceCard;
