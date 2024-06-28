import {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native'; 
import NotificationBox from '../components/notificationBox/NotificationBox';
import ShopBox from '../components/shopBox/ShopBox';
import AvatarBox from '../components/avatarBox/AvatarBox';
import SearchInput from '../components/searchInput/SearchInput';
import MenuCard from '../components/menuCard/MenuCard';
import RecommendedCarousel from '../components/recommendCarousel/RecommendCarousel';
import menuItems from '../data/menuItems';
import NavigationBar from '../components/navigationBar/NavigationBar';
import SalonCard from '../components/salonCard/SalonCard';
import Carousel from 'react-native-snap-carousel';
import StylistCard from '../components/stylistCard/StylistCard';
import axios from 'axios';

const host = 'http://192.168.0.106:8000';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const wp = (percentage) => {
	const value = percentage * viewportWidth / 100;
	return Math.round(value);
  }

const DashboardScreen = ({route, navigation, ...props}) => {
	const sliderItemHorizontalMargin = wp(2);
	const slideWidth = wp(28);
	const sliderWidth = viewportWidth;
	const sliderItemWidth = slideWidth + sliderItemHorizontalMargin * 2;
	const [recommendedSalons, setRecommendedSalons] = useState([]);
	const [recommendedStylists, setRecommendedStylists] = useState([]);

	useEffect(() => {

		const getSalons = async () => {
			axios({
				method: 'get',
				url: `${host}/api/salons`,
			})
			.then(function (response) {
				// Assuming response.data is an array of salon objects with a 'rating' field
				const sortedSalons = response.data.sort((a, b) => b.rating - a.rating); // Sort descending by rating
				const topRatedSalons = sortedSalons.slice(0, 5); // Get top 5 salons
				setRecommendedSalons(topRatedSalons);
			})
			.catch(function (error) {
				console.error('Error fetching salons:', error);
			});
		}

		const getRecommendedStylist = async () => {

			await axios({
				method: 'get',
				url: `${host}/api/recommendedStylists`,
				})
				.then(function (response) {
					setRecommendedStylists(response.data);
			});
		}

		getSalons();
		getRecommendedStylist();
	}, []);

	const menuCardClickHandler = (index) => {
		if (index === 0) {
			navigation.navigate('Booking', {
				initStep: null,
				selectedSalonId: null,
				selectedServicesId: [],
				selectedTotalTime: 0,
			});
		} else if (index === 1) {
			navigation.navigate('Salons', {
				initStep: null,
				selectedSalonId: null,
				selectedServicesId: [],
				selectedTotalTime: 0,
			});
		} else if (index === 2) {
			navigation.navigate('UsageHistory');
		}	else if (index === 3) {
			navigation.navigate('Profile');
		}

	}

	const returnHomeHandler = () => {
		navigation.navigate("Dashboard");
	}

	const bookingHandler = () => {
		 navigation.navigate('Booking', {
			initStep: null,
			selectedSalonId: null,
			selectedServicesId: [],
			selectedTotalTime: 0,
		});	
	}

	const seeUserProfileHandler = () => {
		navigation.navigate("Profile");
	}

	const seeShopHandler = () => {
		navigation.navigate("Shop");
	}

	const openFavourite = () => {
		navigation.navigate("Favourite");
	}

	const seeStylistDetailHandler = (stylist) => {
		navigation.navigate("StylistDetail", {stylist: stylist});
	}

	const gotoCardHandler = () => {
		navigation.navigate('Cart');
	}

	return (
	<View>
		<ScrollView style={styles.container}>
			<View style={styles.contentContainer}>
				<View style={styles.header}>
					<AvatarBox />
					<View style={styles.userName}>
						<Text style={styles.name}>Hello {props.userName} !</Text>
						<Text style={styles.slogan}>Let make your hair attractive !!</Text>
					</View>
						<ShopBox onClick={gotoCardHandler}/>
						<NotificationBox />
				</View>
				<SearchInput placeholder='Search salon with name or location' onChange={() => {}}/>
				<View style={styles.mainMenu}>
					{
						menuItems.map((item, id) => {
							return <MenuCard key={id} id={id} title={item.name} icon={item.icon.default} onClick={() => {menuCardClickHandler(id)}}/>
						})
					}
				</View>
				<View style={styles.recommendTab}>
					<Text style={styles.recommendText}>Recommended for You</Text>
					<RecommendedCarousel 
						data={recommendedSalons} 
						item={(props) => <SalonCard {...props} onClick={() => {
								navigation.navigate('SalonDetail', {salon: props.item})
							}}/>
							} 
						/>
					<Text style={styles.hairStylistText}>Hair Stylist</Text>
					<Carousel 
						data={recommendedStylists}
						renderItem={item => <StylistCard key={item.id} item={item} onClick={() => {seeStylistDetailHandler(item)}}/>}
						sliderWidth={sliderWidth+50}
						itemWidth={sliderItemWidth}
						activeSlideAlignment={'start'}
						inactiveSlideScale={1}
						inactiveSlideOpacity={1}
						style={styles.stylistCarousel}
					/>
				</View>
			</View>
		</ScrollView>
		<NavigationBar 
			current={0}
			booking={bookingHandler}
			returnHome={returnHomeHandler}
			seeUserProfile={seeUserProfileHandler}
			seeShop={seeShopHandler}
			openFavourite={openFavourite}
		/>
	</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
	},
	contentContainer: {
		flex: 1,
		height: '100%',
		paddingTop: 80,
		paddingHorizontal: 0,
		flexDirection: 'column',
		backgroundColor: '#3D5C98',
		alignItems: 'center',
	},
	header: { 
		height: 60,
		flexDirection: 'row',
		gap: 5,
		padding: 0,
		paddingHorizontal: 20,
	},
	userName: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: 5,
		gap: 5,
		height: '100%'
	},
	name: {
		fontSize: 20,
		fontWeight: "700",
		color: '#fff',
	},
	slogan: {
		color: '#fff',
		fontSize: 14,
		fontWeight: "400",
	},

	mainMenu: {
		marginTop: 5,
		flexDirection: 'row',
		height: 60,
		width: '100%',
		backgroundColor: '#3d5c98',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
	},
	recommendTab: {
		height: viewportHeight/1.5,
		width: '100%',
		backgroundColor:'#D9D9D9',
		marginTop: 50,
		flexGrow: 1,
		borderRadius: 5,
		paddingTop: 10,
		paddingHorizontal: 10,
	},
	
	recommendText: {
		color: '#1E284D',
		fontWeight: "700",
		fontSize: 20,
		paddingBottom: 10,
	},
	hairStylistText: {
		color: '#1E284D',
		fontWeight: "700",
		fontSize: 20,
		marginTop: 20,
		marginBottom: 15,
	},
})

export default DashboardScreen;
