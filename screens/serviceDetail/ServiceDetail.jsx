import { StyleSheet, Dimensions, View, Text, ScrollView, TouchableOpacity } from "react-native";
import ClockIcon from '../../assets/clock.svg';
import SaleIcon from '../../assets/sale.svg';
import TurnBackButton from "../../components/turnBackButton/TurnBackButton";
import FastImage from 'react-native-fast-image'
import {formatCurrency} from '../../helpers/formatCurrency';
import Carousel from 'react-native-snap-carousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageView from "react-native-image-viewing";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const wp = (percentage) => {
	const value = percentage * viewportWidth / 100;
	return Math.round(value);
}

const ServiceDetail = ({route, navigation, ...props}) => {

	const { service , prev} = route.params;
	const [images, setImages] = useState([]);
	const sliderItemHorizontalMargin = wp(2);
	const slideWidth = wp(24);
	const sliderWidth = viewportWidth - 30;
	const sliderItemWidth = slideWidth + sliderItemHorizontalMargin * 2;
	const [previewVisible, setPreviewVisible] = useState(false);
	const [viewingIndex, setViewingIndex] = useState(0);

	useEffect(() => {

		const getImages = async () => {
			try {

				const response = await axios.get(`https://salon-docker-production.up.railway.app/api/services/${service.id}/images`);
				
				setImages(response.data.map(ele => ele.image_url));

			}catch(error) {
				if (error.response && error.response.data) {
					console.log(error.response.data.error);
				} else {
					console.log(error);
				}
			};
		}

		getImages();

	}, [])

	const turnBack = () => {
		if (prev && prev === 'booking') {
			navigation.navigate("Booking", {
				initStep: null,
				selectedSalonId: null,
				selectedServicesId: [],
				selectedTotalTime: 0,
			})
		}
	}
	return (
		<View>
			<ScrollView style={styles.container}>
				<FastImage style={styles.serviceImage} source={{uri: service.try_on_image_url}} resizeMode="cover">
					<View></View>
					<TurnBackButton onClick={turnBack}/>
				</FastImage>
				<View style={styles.serviceInfo}>
					<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
						<Text style={styles.serviceName}>{service.name}</Text>
					</View>
					<View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
						<ClockIcon width={22} height={22} />
						<Text style={styles.serviceTime}>{service.duration} minutes</Text>
					</View>
					<View style={styles.serviceFee}>
						<View style={{flexDirection: 'row', gap: 3, alignItems: 'center'}}>
							<Text style={{color: '#EF7301', fontSize: 18, fontWeight: 600}}>{formatCurrency(service.price)}</Text>
							<Text style={{color: '#EF7301', fontSize: 18, fontWeight: 600, textDecorationLine: "underline"}}>đ</Text>
						</View>
						<View style={styles.saleCard}>
							<SaleIcon width={20} height={20} />
							<Text style={styles.salePercent}>-{20}%</Text>
						</View>
					</View>
					<View style={styles.serviceDescription}>
						<Text style={styles.aboutTitle}>About service</Text>
						<Text style={styles.aboutContent}>
							{service.description}
						</Text>
					</View>
					<View style={styles.imageAlbum}>
						<Text style={styles.aboutTitle}>Album </Text>
						<Carousel 
							data={images}
							renderItem={(item) =>
								<TouchableOpacity onPress={() => {
										setViewingIndex(item.index)
										setPreviewVisible(true)
									}}>
									<FastImage source={{uri: item.item}} style={{width: '90%',
										height: viewportHeight/7,
										borderRadius: 5}}
									/>
								</TouchableOpacity>
							}
							sliderWidth={sliderWidth}
							itemWidth={sliderItemWidth}
							activeSlideAlignment={'start' }
						/>
						<ImageView
							images={images.map(image => {return {uri: image}})}
							imageIndex={viewingIndex}
							visible={previewVisible}
							onRequestClose={() => setPreviewVisible(false)}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		width: viewportWidth,
		height: viewportHeight,
		backgroundColor: '#3d5c98',
		paddingTop: 38,
	},
	serviceImage: {
		width: viewportWidth,
		height: viewportHeight * 1/2,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingTop: 10,
		paddingLeft: 10,
		flex: 1,
	},
	serviceInfo: {
		paddingTop: 20,
		paddingHorizontal: 15,
		width: viewportWidth,
		minHeight: viewportHeight * 3/5,
		backgroundColor: '#fff',
		borderRadius: 10,
		gap: 10,
		paddingBottom: 40,
		marginTop: -10
	},
	serviceName: {
		fontSize: 19,
		fontWeight: "700",
		color: '#3d5c98'
	},
	serviceTime: {
		fontSize: 17,
		fontWeight: "600",
		color: '#555'
	},
	serviceFee: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	saleCard: {
		flexDirection: 'row',
		padding: 5,
		borderRadius: 50,
		backgroundColor: '#FFDEC0',
		alignItems: 'center'
	},
	salePercent: {
		color: '#EF7301',
		fontSize: 17,
		fontWeight: "600",
	},
	serviceDescription: {
		paddingTop: 30,
		borderTopWidth: 1,
		borderTopColor: '#ddd,'
	},
	aboutTitle: {
		color: '#3d5c98',
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 15
	},
	aboutContent: {
		lineHeight: 22,
	},
	tryNow: {
		color: '#3d5c98',
		fontWeight: 'bold',
	},
	imageAlbum: {
		flex: 1
	}
})

export default ServiceDetail;
