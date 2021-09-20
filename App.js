import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomePage from './app/screens/HomePage';
import Categories from './app/screens/Catgories';
import Products from './app/screens/Products';
import Scanner from './app/screens/Scanner';
import Login from './app/screens/Login';
import Signup from './app/screens/Signup';

import { 
	Colors,
} from './app/components/styles'
const { tertiary } = Colors;

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

export default function App() {
  return (
		<NavigationContainer>
			<Stack.Navigator 
				// initialRouteName="HomeScreen"
				screenOptions={{
					// headerStyle: { 
					// 	backgroundColor: 'transparent'
					// },
					headerTintColor: {tertiary},
					headerTransparent: true,
					headerTitle: '',
					headerLeftContainerStyle: {
						paddingLeft: 20
					}
				}}
			>

				<Stack.Screen name="HomeScreen" component={HomePage} 
					options={{title: "Home"}} />

				<Stack.Screen name="CategoriesScreen" component={Categories} 
					options={{title: "Categories"}} />

				<Stack.Screen name="ProductScreen" component={Products} 
					options={{title: "Products"}} />

				<Stack.Screen name="ScannerScreen" component={Scanner} 
					options={{title: "Scanner"}} />

				<Stack.Screen name="LoginScreen" component={Login} 
					options={{title: "Login"}} />

				<Stack.Screen name="SignupScreen" component={Signup}
					options={{title: "Signup"}} />

			</Stack.Navigator>
		</NavigationContainer>
  );
} 