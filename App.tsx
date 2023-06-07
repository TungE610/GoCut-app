import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DashboardScreen from './screens/DashboardScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingScreen from './screens/BookingScreen';

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
		</Stack.Navigator>
	</NavigationContainer>
  );
}
