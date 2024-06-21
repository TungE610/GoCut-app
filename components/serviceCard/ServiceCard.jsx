import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Animated, Easing} from "react-native";
import AddIcon from '../../assets/add.svg';
import RemoveIcon from '../../assets/remove.svg';
import SaleIcon from '../../assets/sale.svg';
import ClockIcon from '../../assets/clock.svg';
import * as ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image'
import {formatCurrency} from '../../helpers/formatCurrency';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');

const ServiceCard = (props) => {

	const [image, setImage] = useState('');
    const fadeInOpacity = useRef(new Animated.Value(0)).current;

	useEffect(() => {
        Animated.timing(fadeInOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    }, []);

	const transferImage = async (uri) => {

		const formData = new FormData();

		formData.append("file_upload", {uri: uri, name: 'new_file.png', type: 'image/jpeg'});
		formData.append("id", props.id);

		try {
			props.changeProcessImageState(true);

			const endPoint = 'https://goose-clean-rattler.ngrok-free.app/uploadfile';

			await fetch(endPoint, {
				method: 'POST',
				body: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
				},            
			})
			.then(async (response) => {const text = await response.text(); return text})
				.then(async (text) => {
					if (text.replaceAll('"', '') == "Done") {

						props.changeProcessImageState(false);

						const transferEndPoint = 'https://goose-clean-rattler.ngrok-free.app/hair-transfer';

						const transferFormData = new FormData();

						transferFormData.append("id", props.id);

						await fetch(transferEndPoint, {
							method: 'POST',
							body: transferFormData,
							headers: {
								'Content-Type': 'multipart/form-data',
							},            
						}).then(async (response) => {
								const text =  await response.text();
								return text
							})
							.then((text) => {
								props.getResult(text.replaceAll('"', ''));
							});
						}
				})

		} catch (error) {
			return error
		}
	}
 	const onImageGalleryClick = useCallback(() => {
		const options = {
			selectionLimit: 1,
			mediaType: 'photo',
			includeBase64: true
		};

		ImagePicker.launchImageLibrary(options, res => {
			if(res.didCancel) {
				console.log('User cancelled')
			} else if(res.errorCode) {
				console.log('ImagePickerError: ', res.errorMessage)
			} else {
				setImage(res.assets[0].uri);

        		transferImage(res.assets[0].uri)
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
				setImage(res.assets[0].uri);

        		transferImage(res.assets[0].uri)
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
		<Animated.View style={{ opacity: fadeInOpacity }} >
			<View style={styles.container}>
				<View style={{flexDirection: 'row', gap: 10}}>
					<FastImage style={styles.image} source={{ uri: props.image }}
						resizeMode="cover" />
					<View style={styles.serviceContent}>
						<View style={{flexDirection: 'row'}}>
							<Text style={styles.serviceName}>{props.serviceName}</Text>
							{
							props.sale > 0 ? 
								<View style={styles.saleCard}>
									<SaleIcon width={20} height={20} />
									<Text style={styles.salePercent}>-{props.sale}%</Text>
								</View> : <View></View>
							}
						</View>
						<Text>{props.serviceSummary ? props.serviceSummary : ""}</Text>
						<View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
							<View style={styles.serviceTime}>
								<ClockIcon width={20} height={20} color="#3d5c98" />
								<Text style={styles.serviceTimeText}>
									{props.serviceTime} minutes
								</Text>
							</View>
							<TouchableOpacity onPress={toggleSelect}>
								{
									!props.selected ? 
									<AddIcon width={viewportWidth/10} height={viewportWidth/10} /> :
									<RemoveIcon width={viewportWidth/10} height={viewportWidth/10} />
								}
							</TouchableOpacity>
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
							<Text style={styles.serviceFee}>{formatCurrency(props.serviceFee)} <Text style={{textDecorationLine: 'underline'}}>đ</Text></Text>
							<View style={styles.operations}>
								<View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
									<TouchableOpacity onPress={onCameraPress} >
										<Text style={{color: '#3d5c98'}}>Try now</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={onImageGalleryClick} >
										<Text style={{color: '#3d5c98'}}>Transform image</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: viewportWidth,
		flexDirection: 'row',
		paddingVertical: 8,
		paddingHorizontal: 5,
		gap: -15,
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
		width:  3 *  viewportWidth / 4.2
	},
	serviceName: {
		fontSize: 16,
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
