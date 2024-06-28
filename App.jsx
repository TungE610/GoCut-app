import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingScreen from './screens/BookingScreen';
import SavedAddress from './screens/SavedAddress';
import UsageHistory from './screens/usageHistory/UsageHistory';
import PriceList from './screens/priceList/PriceList';
import ServiceDetail from './screens/serviceDetail/ServiceDetail';
import SalonDetail from './screens/salonDetail/Salondetail';
import Profile from './screens/profile/Profile';
import ShopScreen from './screens/shop/ShopScreen';
import CartScreen from './screens/card/CardScreen';
import CameraScreen from './screens/CameraScreen';
import Gallery from './screens/gallery/Gallery';
import Map from './screens/map/Map';
import Salons from './screens/Salons';
import StylistDetail from './screens/stylistDetail/StylistDetail';
import BarberOrder from './screens/barberOrders/BarberOrders';

import Favourite from './screens/favourite/Favourite';

import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
	<NavigationContainer>
		<FlashMessage position="top" />
		<Stack.Navigator   
			screenOptions={{
    			headerShown: false,
				gestureEnabled: false,
  			}}>
			<Stack.Screen
				name="Splash"
				component={SplashScreen}
				options={{title: 'Welcome'}}
			/>
			<Stack.Screen name="Dashboard" component={DashboardScreen} />
			<Stack.Screen name="Booking" component={BookingScreen}/>
			<Stack.Screen name="SavedAddress" component={SavedAddress} />
			<Stack.Screen name="PriceList" component={PriceList} />
			<Stack.Screen name="UsageHistory" component={UsageHistory} />
			<Stack.Screen name="ServiceDetail" component={ServiceDetail} />
			<Stack.Screen name="SalonDetail" component={SalonDetail} />
			<Stack.Screen name="Profile" component={Profile} />
			<Stack.Screen name="Shop" component={ShopScreen} />
			<Stack.Screen name="Cart" component={CartScreen} />
			<Stack.Screen name="Camera" component={CameraScreen} />
			<Stack.Screen name="Gallery" component={Gallery} />
			<Stack.Screen name="Map" component={Map} />
			<Stack.Screen name="Favourite" component={Favourite} />
			<Stack.Screen name="Salons" component={Salons} />
			<Stack.Screen name="BarberOrder" component={BarberOrder} />
			<Stack.Screen name="StylistDetail" component={StylistDetail} />

		</Stack.Navigator>
	</NavigationContainer>
  );
}
