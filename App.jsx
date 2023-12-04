import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
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

const Stack = createNativeStackNavigator();

export default function App() {

  return (
	<NavigationContainer>
		<Stack.Navigator   
			screenOptions={{
    			headerShown: false,
  			}}>
			<Stack.Screen
				name="Splash"
				component={SplashScreen}
				options={{title: 'Welcome'}}
			/>
			<Stack.Screen name="Dashboard" component={DashboardScreen} />
			<Stack.Screen name="Booking" component={BookingScreen} />
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
		</Stack.Navigator>
	</NavigationContainer>
  );
}
