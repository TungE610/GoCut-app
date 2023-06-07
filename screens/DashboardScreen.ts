import {StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native'; 
import NotificationBox from '../components/notificationBox/NotificationBox';
import ShopBox from '../components/shopBox/ShopBox';
import AvatarBox from '../components/avatarBox/AvatarBox';
import SalonSearch from '../components/salonSearch/SalonSearch';
import MenuCard from '../components/menuCard/MenuCard';
import RecommendedCarousel from '../components/recommendCarousel/RecommendCarousel';
import menuItems from '../data/menuItems';
import NavigationBar from '../components/navigationBar/NavigationBar';
import SalonCard from '../components/salonCard/SalonCard';
import sampleSalon from '../data/sampleSalon';
import Carousel from 'react-native-snap-carousel';
import sampleStylist from '../data/sampleStylist';
import StylistCard from '../components/stylistCard/StylistCard';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const wp = (percentage) => {
	const value = percentage * viewportWidth / 100;
	return Math.round(value);
  }

const DashboardScreen = ({navigation, ...props}) => {
	const sliderItemHorizontalMargin = wp(2);
	const slideWidth = wp(28);
	const sliderWidth = viewportWidth;
	const sliderItemWidth = slideWidth + sliderItemHorizontalMargin * 2;


	const menuCardClickHandler = () => {
		navigation.navigate('Booking');
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
						<ShopBox />
						<NotificationBox />
				</View>
				<SalonSearch />
				<View style={styles.mainMenu}>
					{
						menuItems.map((item, id) => {
							return <MenuCard key={id} id={id} title={item.name} icon={item.icon.default} onClick={menuCardClickHandler}/>
						})
					}
				</View>
				<View style={styles.recommendTab}>
					<Text style={styles.recommendText}>Recommended for You</Text>
					<RecommendedCarousel data={sampleSalon} item={SalonCard} />
					<Text style={styles.hairStylistText}>Hair Stylist</Text>
					<Carousel 
						data={sampleStylist}
						renderItem={item => <StylistCard key={item.id} item={item}/>}
						sliderWidth={sliderWidth+50}
						itemWidth={sliderItemWidth+50}
						activeSlideAlignment={'start'}
						inactiveSlideScale={1}
						inactiveSlideOpacity={1}
						style={styles.stylistCarousel}
					/>
				</View>
			</View>
		</ScrollView>
		<NavigationBar current={0}/>
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
		fontWeight: 700,
		color: '#fff',
	},
	slogan: {
		color: '#fff',
		fontSize: 14,
		fontWeight: 400,
	},

	mainMenu: {
		marginTop: 5,
		flexDirection: 'row',
		height: 60,
		width: '100%',
		backgroundColor: '#3d5c98',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
	},
	recommendTab: {
		height: viewportHeight/1.5,
		width: '100%',
		backgroundColor:'#D9D9D9',
		marginTop: 50,
		flexGrow: 1,
		borderRadius: 10,
		paddingTop: 10,
		paddingHorizontal: 20,
	},
	
	recommendText: {
		color: '#1E284D',
		fontWeight: 700,
		fontSize: 20,
		paddingBottom: 10,
	},
	hairStylistText: {
		color: '#1E284D',
		fontWeight: 700,
		fontSize: 20,
		marginTop: 20,
		marginBottom: 15,
	},
})

export default DashboardScreen;
