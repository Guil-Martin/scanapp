import React from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';

import { 
	StyledContainer,
	InnerContainer,
	PageLogo,
	PageTitle,
	StyledButton,
	ButtonText,
} from '../components/styles'

const HomePage = ({navigation}, props) => {

	const getValueFor = async (key) => {
		let result = await SecureStore.getItemAsync(key);
		if (result) { console.log("🔐 Here's your value 🔐 \n" + result); }
		return result;
	}

	return (
		<StyledContainer>
			<StatusBar styles="dark" />
			<InnerContainer>

				<PageLogo resizeMode="cover" source={ require('../assets/meanfood.png') } />
				<PageTitle>Food Scan</PageTitle>

				<StyledButton onPress={() => navigation.navigate("CategoriesScreen")} style={{width: "80%"}}>
					<ButtonText>Categories</ButtonText>
				</StyledButton>

				<StyledButton onPress={() => navigation.navigate("ScannerScreen")} style={{width: "80%"}}>
					<ButtonText>Scanner</ButtonText>
				</StyledButton>

				<StyledButton onPress={() => navigation.navigate("LoginScreen")} style={{width: "80%"}}>
					<ButtonText>Login</ButtonText>
				</StyledButton>

				<StyledButton  onPress={() => navigation.navigate("SignupScreen")} style={{width: "80%"}}>
					<ButtonText>Signup</ButtonText>
				</StyledButton>

			</InnerContainer>
		</StyledContainer>
	)
};

export default HomePage;