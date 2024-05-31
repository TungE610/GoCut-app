import {StyleSheet, Dimensions, View, Text, Image} from 'react-native';
import NavigationBar from '../../components/navigationBar/NavigationBar';
import SearchIcon from '../../assets/search.svg';
import ShopBox from '../../components/shopBox/ShopBox';
import SearchInput from '../../components/searchInput/SearchInput';
import RecommendCarousel from '../../components/recommendCarousel/RecommendCarousel';
import shopItems from '../../data/shopItems';
import MenuCard from '../../components/menuCard/MenuCard';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('screen');

const ShopScreen = ({navigation}) => {

	const returnHomeHandler = () => {
		navigation.navigate("Dashboard");
	}

	const seeUserProfileHandler = () => {
		navigation.navigate("Profile");
	}

	const seeShopHandler = () => {
		navigation.navigate("Shop");
	}

	const openSearchHandler = () => {

	}

	return (
		<View style={styles.container}>
			<View style={styles.screenHeaderContainer}>
				<SearchInput 
					placeholder="search for salon or product" 
					width={viewportWidth * 0.8} 
					height={60}
					cancelButtonColor="#3d5c98"
					backgroundColor="#Fff"
					onChange={() => {}}
				/>
				<ShopBox />
			</View>
			<RecommendCarousel 
				data={[]}
				item={(props) => <Image source={props.item.item.image} style={styles.carouselImage}/>} 
			/>
			<View style={styles.mainMenu}>
				{shopItems.map((item,id) => {
					<MenuCard 
						key={id} 
						id={id} 
						title={item.name} 
						icon={item.icon}
						backgroundColor="#fff"
						iconColor="#fff"
					/>
				})}
			</View>
			<NavigationBar 
				backgroundColor="#3d5c98" 
				itemBackgroundColor="#fff" 
				itemIconColor="#3d5c98"
				returnHome={returnHomeHandler}
				seeUserProfile={seeUserProfileHandler}
				seeShop={seeShopHandler}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: viewportHeight,
		width: viewportWidth,
		backgroundColor: '#fff',
		paddingTop: 60,
	},
	screenHeaderContainer: {
		paddingBottom: 20,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 10,
		paddingHorizontal: 15,
		alignItems: 'center',
	},
	carouselImage: {
		width: viewportWidth - 12,
		height: '100%',
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
})

export default ShopScreen;
