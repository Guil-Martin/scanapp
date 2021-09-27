import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Button, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SecureStore from 'expo-secure-store';

import { ServerContext } from '../../api-context';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// Formik
import { Formik } from 'formik';

// Google Signin
import * as Google from 'expo-google-app-auth';

// Icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import { 
    StyledContainer,
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledButton,
    StyledTextInput,
    Colors,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent,
} from '../components/styles'
const { primary, brand, darkLight } = Colors;

const Login = ({navigation}, props) => {
	
		const server = useContext(ServerContext)

    const [hidePassword, setHidePassword] = useState(true);
		const [message, setMessage] = useState();
		const [messageType, setMessageType] = useState();
		const [googleSubmitting, setGoogleSubmitting] = useState(false);

		const handleLogin = async (credentials, setSubmitting) => {

			handleMessage(null);

			await server.post('auth', credentials)
			.then(res => {
				if (res.status != 200) {
					handleMessage(res.message)
				} else {
					SecureStore.setItemAsync("jwt", res.headers.authorization)
					navigation.navigate("HomeScreen")
				}
			})
			.catch(err => { 
				console.log(err);
				handleMessage("An error has occured, check your network and try again.");
			})
			.finally(() => setSubmitting(false))	

		}

		const handleMessage = (mess, type = 'FAILED') => {
			setMessage(mess);
			setMessageType(type);
		}

    return (
			<KeyboardAvoidingWrapper>
				
        <StyledContainer>
            <StatusBar styles="dark" />
            <InnerContainer>

                {/* <PageTitle>Javap</PageTitle> */}
                <SubTitle>Account Login</SubTitle>

                <Formik
                    initialValues={{ login: '', password: '' }}
                    onSubmit={(values, { setSubmitting }) => {
											if (values.login == '' || values.password == '') {
												handleMessage("Please fill all the fields")
												setSubmitting(false);
											} else {
												setSubmitting(true);
												handleLogin(values, setSubmitting);
											}
                    }}
                >

									{({
										values,
										handleChange,
										handleBlur,
										handleSubmit,
										isSubmitting,
									}) => (

										<StyledFormArea>
											<MyTextInput 
													label="Login"
													icon="person"
													placeholder="Your login name"
													placeholderTextColor={ darkLight }
													onChangeText={ handleChange('login') }
													onBlur={ handleBlur('login') }
													value={values.login}
											/>
											<MyTextInput 
													label="Password"
													icon="lock"
													placeholder="* * * * * *"
													placeholderTextColor={ darkLight }
													onChangeText={ handleChange('password') }
													onBlur={ handleBlur('password') }
													value={values.password}
													secureTextEntry={hidePassword}
													isPassword={true}
													hidePassword={hidePassword}
													setHidePassword={setHidePassword}
											/>

											<MsgBox type={messageType}>{message}</MsgBox>

											{!isSubmitting && <StyledButton onPress={handleSubmit}>
													<ButtonText>Login</ButtonText>
											</StyledButton>}
											{isSubmitting && <StyledButton disabled={true}>
													<ActivityIndicator size="large" color={ primary } />
											</StyledButton>}

											<Line />

											<StyledButton google={true} onPress={handleSubmit}>
													<Fontisto name="google" colors={primary} size={25} />
													<ButtonText google={true} >
															Sign in with Google
													</ButtonText>
											</StyledButton>

											<ExtraView>
													<ExtraText>Don't have an account ?</ExtraText>
													<TextLink onPress={() => navigation.navigate("SignupScreen")}>
															<TextLinkContent> Signup</TextLinkContent>
													</TextLink>
											</ExtraView>

										</StyledFormArea>
					 
									)}									

                </Formik>

								<Button title="Home"
										onPress={() => navigation.navigate("HomeScreen")}
								/>

            </InnerContainer>
        </StyledContainer>

			</KeyboardAvoidingWrapper>
);
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput { ...props } />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight}  />
                </RightIcon>
            )}
        </View>
    )
}

export default Login;