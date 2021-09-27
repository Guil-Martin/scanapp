import React, { useState, useContext } from 'react';

import * as SecureStore from 'expo-secure-store';
import { ServerContext } from './api-context'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppLoading from 'expo-app-loading';

import RootStack from './app/navigators/RootStack';
import UserContext from './user-context';

export default function App() {

	const server = useContext(ServerContext)

	const [appReady, setAppReady] = useState(false);

	const [userConnected, setUserConnected] = useState("");

	// const logout = () => {
	// 	setIsConnected(false);
	// 	SecureStore.deleteItemAsync("jwt");
	// }

	const checkLoginCredentials = async () => {

		const token = await SecureStore.getItemAsync("jwt");

		if (token !== null) {

			const resData = await server.get('hello', { headers: {"Authorization" : `Bearer ${token}`}})
			.then(res => res.data )
			.catch(err => { console.log(err) })
	
			if (resData != "anonymousUser") { 
				setUserConnected(resData); 
			}
		}

		setAppReady(true);

	}

	if (!appReady) {
		return <AppLoading 
			startAsync={ checkLoginCredentials }
			onFinish={() => setAppReady(true)}
			onError={console.warn}
		/>
	}

  return (
		<UserContext.Provider value={ userConnected }>
			<RootStack />
		</UserContext.Provider>
	)

} 