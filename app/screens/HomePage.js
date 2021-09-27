import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import { 
	StyledContainer,
	InnerContainer,
	PageLogo,
	PageTitle,
	StyledButton,
	SubTitle,
	ButtonText,
} from '../components/styles'

import UserContext from '../../user-context';

const HomePage = ({navigation, route}) => {

	const { newUserName } = route.params ? route.params : "";

	let userName = useContext(UserContext)
	
	if (newUserName != null && newUserName != "") { userName = newUserName }

	return (
		<StyledContainer>
			<StatusBar styles="dark" />
			<InnerContainer>

				<PageLogo resizeMode="cover" source={ require('../assets/meanfood.png') } />
				<PageTitle>Food Scan</PageTitle>

				{userName != "" && <SubTitle>{ userName }</SubTitle> }

				<StyledButton onPress={() => navigation.navigate("CategoriesScreen")} style={{width: "80%"}}>
					<ButtonText>Categories</ButtonText>
				</StyledButton>

				<StyledButton onPress={() => navigation.navigate("ScannerScreen")} style={{width: "80%"}}>
					<ButtonText>Scanner</ButtonText>
				</StyledButton>

					{userName != "" ?
					<InnerContainer>
						<StyledButton onPress={() => navigation.navigate("ProductAddScreen")} style={{width: "80%"}}>
							<ButtonText>Add product</ButtonText>
						</StyledButton>
						<StyledButton onPress={() => logout}>
							<ButtonText>Logout</ButtonText>
						</StyledButton>
					</InnerContainer> 
					: 
					<InnerContainer>
						<StyledButton onPress={() => navigation.navigate("LoginScreen")} style={{width: "80%"}}>
							<ButtonText>Login</ButtonText>
						</StyledButton>
						<StyledButton  onPress={() => navigation.navigate("SignupScreen")} style={{width: "80%"}}>
							<ButtonText>Signup</ButtonText>
						</StyledButton>
					</InnerContainer>}

			</InnerContainer>
		</StyledContainer>
	)
};

export default HomePage;