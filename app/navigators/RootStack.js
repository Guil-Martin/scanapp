import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import HomePage from '../screens/HomePage';
import Categories from '../screens/Categories';
import Products from '../screens/Products';
import Scanner from '../screens/Scanner';
import Login from '../screens/Login';
import Signup from '../screens/Signup';

import { 
	Colors,
} from '../components/styles'
const { tertiary } = Colors;

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const RootStack = (props) => {
	return (
		<NavigationContainer>
			<Stack.Navigator 
				// initialRouteName="HomeScreen"
				screenOptions={{
					// headerStyle: { 
					// 	backgroundColor: 'transparent'
					// },
					headerTintColor: { tertiary },
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

export default RootStack;