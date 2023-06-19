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

const Stack = createNativeStackNavigator();

export default function App() {

  return (
	<NavigationContainer>
		<Stack.Navigator   
			screenOptions={{
    			headerShown: false
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
		</Stack.Navigator>
	</NavigationContainer>
  );
}
